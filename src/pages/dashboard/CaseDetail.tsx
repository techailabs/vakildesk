import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  Gavel,
  Building2,
  User,
  Loader2,
  Save,
  Lock,
  UserPlus,
  Check,
} from "lucide-react";
import { useCases } from "@/hooks/useCases";
import { InviteClientDialog } from "@/components/invite/InviteClientDialog";
import { useAuth } from "@/hooks/useAuth";

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, isLoading, updateCase } = useCases();
  const [internalNotes, setInternalNotes] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const { isAdmin, isLawyerOwner, isLawyerTeam } = useAuth();
  const canEditFirm = isAdmin || isLawyerOwner || isLawyerTeam;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const caseItem = cases.find((c) => c.id === id);

  // Internal notes live in a separate firm-only table (case_internal_notes)
  const { data: internalRow } = useQuery({
    queryKey: ["case-internal-notes", id],
    enabled: !!id && canEditFirm,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_internal_notes")
        .select("notes, updated_at")
        .eq("case_id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const saveInternal = useMutation({
    mutationFn: async (notes: string) => {
      if (!id) return;
      const { error } = await supabase
        .from("case_internal_notes")
        .upsert({ case_id: id, notes, updated_at: new Date().toISOString() }, { onConflict: "case_id" });
      if (error) throw error;
    },
    onSuccess: () => {
      setSavedAt(new Date());
      queryClient.invalidateQueries({ queryKey: ["case-internal-notes", id] });
    },
    onError: (e: Error) => toast({ title: "Could not save notes", description: e.message, variant: "destructive" }),
  });

  useEffect(() => {
    if (caseItem) {
      setClientNotes(caseItem.notes ?? "");
    }
  }, [caseItem]);

  useEffect(() => {
    if (internalRow) setInternalNotes(internalRow.notes ?? "");
  }, [internalRow]);

  // Debounced autosave for internal notes (firm members only)
  useEffect(() => {
    if (!caseItem || !canEditFirm) return;
    if (internalNotes === (internalRow?.notes ?? "")) return;
    const t = setTimeout(() => {
      saveInternal.mutate(internalNotes);
    }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalNotes, caseItem?.id, canEditFirm, internalRow?.notes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Case not found.</p>
        <Link to="/dashboard/cases">
          <Button variant="outline" className="mt-4">
            Back to Cases
          </Button>
        </Link>
      </div>
    );
  }

  const handleSaveInternal = () => {
    saveInternal.mutate(internalNotes);
  };

  const handleSaveClient = () => {
    updateCase.mutate({ id: caseItem.id, notes: clientNotes });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-serif">{caseItem.case_title}</h1>
            <p className="text-muted-foreground">
              {caseItem.case_number ?? "No case number"}
            </p>
          </div>
          <Button variant="outline" onClick={() => setInviteOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Client to This Case
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          icon={<Building2 className="h-4 w-4" />}
          label="Court"
          value={caseItem.court || "—"}
          sub={caseItem.courtroom || undefined}
        />
        <InfoCard
          icon={<Gavel className="h-4 w-4" />}
          label="Judge"
          value={caseItem.judge || "—"}
        />
        <InfoCard
          icon={<Calendar className="h-4 w-4" />}
          label="Next Hearing"
          value={
            caseItem.next_hearing_date
              ? new Date(caseItem.next_hearing_date).toLocaleDateString("en-IN")
              : "Not scheduled"
          }
          sub={caseItem.stage || undefined}
        />
        <InfoCard
          icon={<User className="h-4 w-4" />}
          label="Client"
          value={caseItem.clients?.name || "Unassigned"}
        />
      </div>

      {/* Client-visible notes */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="client-notes" className="text-base font-semibold font-serif">
            Case Notes (Client-Visible)
          </Label>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSaveClient}
            disabled={updateCase.isPending || clientNotes === (caseItem.notes ?? "")}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        <Textarea
          id="client-notes"
          rows={4}
          value={clientNotes}
          onChange={(e) => setClientNotes(e.target.value)}
          placeholder="Notes that may be shared with the client..."
        />
      </div>

      {/* Internal notes */}
      <div className="bg-destructive/[0.03] border border-destructive/20 rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-destructive" />
            <Label htmlFor="internal-notes" className="text-base font-semibold font-serif">
              Internal Notes
            </Label>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-destructive/10 text-destructive">
              FIRM ONLY · NEVER SHARED
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {updateCase.isPending && (
              <span className="flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>
            )}
            {saveInternal.isPending && (
              <span className="flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>
            )}
            {!saveInternal.isPending && savedAt && (
              <span className="flex items-center gap-1 text-success"><Check className="h-3 w-3" /> Saved {savedAt.toLocaleTimeString('en-IN')}</span>
            )}
            <Button
              size="sm"
              variant="cta"
              onClick={handleSaveInternal}
              disabled={!canEditFirm || saveInternal.isPending || internalNotes === (internalRow?.notes ?? "")}
            >
              <Save className="h-4 w-4 mr-2" />
              Save now
            </Button>
          </div>
        </div>
        <Textarea
          id="internal-notes"
          rows={6}
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          placeholder={canEditFirm
            ? "Strategy, opposing counsel notes, billing reminders, witness analysis... never visible to clients. Autosaves as you type."
            : "You don't have permission to edit internal notes."}
          readOnly={!canEditFirm}
          className="border-destructive/20 focus-visible:ring-destructive/40 bg-background"
        />
        <p className="text-xs text-muted-foreground">
          🔒 Enforced at the database layer. Clients viewing this case in their portal cannot see internal notes.
          {canEditFirm ? " Changes autosave after a short pause." : ""}
        </p>
      </div>

      <InviteClientDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        caseId={caseItem.id}
      />
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}