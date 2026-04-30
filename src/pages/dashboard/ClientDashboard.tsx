import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MessageCircle,
  Calendar,
  FileText,
  Clock,
  ArrowRight,
  LogOut,
  Scale,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

export default function ClientDashboard() {
  const { user, profile, loading, signOut, isClient } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Load only cases the client is linked to (RLS enforces this).
  // Note: we exclude internal_notes from selection so client never receives it.
  const { data: cases, isLoading: casesLoading } = useQuery({
    queryKey: ["client-cases", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select(
          "id, case_title, case_number, court, courtroom, stage, status, next_hearing_date, notes, updated_at",
        )
        .order("next_hearing_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: sharedDocs } = useQuery({
    queryKey: ["client-docs", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id, file_name, document_type, created_at, file_url, case_id")
        .eq("shared_with_client", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (loading || casesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const primaryCase = cases?.[0];
  const daysToHearing = primaryCase?.next_hearing_date
    ? Math.ceil(
        (new Date(primaryCase.next_hearing_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title="My Case Portal" description="Your VakilDesk client portal." noindex />
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-7 w-7 text-accent" />
            <span className="text-lg font-bold font-serif">VakilDesk</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.name || user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold font-serif">My Cases</h1>
            <p className="text-muted-foreground">
              View your case status, next hearings, and documents shared by your lawyer
            </p>
          </div>

          {/* Next Hearing Countdown */}
          {primaryCase?.next_hearing_date && (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-accent" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Next Hearing</p>
                  <p className="text-lg font-bold">
                    {new Date(primaryCase.next_hearing_date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {daysToHearing !== null && (
                    <p className="text-sm font-medium text-accent">
                      {daysToHearing > 0
                        ? `${daysToHearing} day${daysToHearing === 1 ? "" : "s"} to go`
                        : daysToHearing === 0
                          ? "Today"
                          : "Past hearing"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Cases List */}
          <div className="space-y-4">
            {cases && cases.length > 0 ? (
              cases.map((c: any) => (
                <div key={c.id} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold font-serif">{c.case_title}</h2>
                      {c.case_number && (
                        <p className="text-sm text-muted-foreground">Case No: {c.case_number}</p>
                      )}
                    </div>
                    <span className="status-badge status-active">{c.status}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <InfoRow label="Court" value={c.court || "—"} />
                    <InfoRow label="Stage" value={c.stage || "—"} />
                    <InfoRow
                      label="Next Hearing"
                      value={
                        c.next_hearing_date
                          ? new Date(c.next_hearing_date).toLocaleDateString("en-IN")
                          : "—"
                      }
                    />
                    <InfoRow
                      label="Last Updated"
                      value={new Date(c.updated_at).toLocaleDateString("en-IN")}
                    />
                  </div>
                  {c.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-md text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Update from your lawyer:</p>
                      {c.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="font-semibold mb-2">No cases yet</h3>
                <p className="text-sm text-muted-foreground">
                  When your lawyer links you to a case, it will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Shared Documents */}
          <div className="bg-card rounded-lg border border-border">
            <div className="section-header px-6 pt-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold font-serif">Shared Documents</h2>
              </div>
            </div>
            <div className="p-6 pt-0">
              {sharedDocs && sharedDocs.length > 0 ? (
                <div className="space-y-3">
                  {sharedDocs.map((d: any) => (
                    <DocumentRow
                      key={d.id}
                      name={d.file_name}
                      type={d.document_type || "Document"}
                      date={d.created_at}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No documents shared yet.
                </p>
              )}
            </div>
          </div>

          <div className="ai-disclaimer">
            This portal shows only what your lawyer chooses to share. It does not constitute legal
            advice. Please contact your lawyer for legal guidance.
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function DocumentRow({
  name,
  type,
  date,
}: {
  name: string;
  type: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString("en-IN")}
        </span>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
}
