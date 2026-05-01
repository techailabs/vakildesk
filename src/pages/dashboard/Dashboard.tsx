import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Plus,
  Users,
  ArrowRight,
  Sparkles,
  Upload,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCases, useTodayHearings } from "@/hooks/useCases";
import { useClients } from "@/hooks/useClients";
import { useDocuments } from "@/hooks/useDocuments";
import { InviteClientDialog } from "@/components/invite/InviteClientDialog";

export default function Dashboard() {
  const { profile, firm, isLawyerOwner, loading: authLoading } = useAuth();
  const { cases, isLoading: casesLoading } = useCases();
  const { data: todayHearings, isLoading: hearingsLoading } = useTodayHearings();
  const { clients, isLoading: clientsLoading } = useClients();
  const { documents, isLoading: docsLoading } = useDocuments();
  const [inviteOpen, setInviteOpen] = useState(false);

  const activeCases = cases.filter(c => c.status === 'active');
  const recentCases = cases.slice(0, 5);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.name || 'User'}! Here's your overview for today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setInviteOpen(true)}>
            <Users className="h-4 w-4 mr-2" />
            Invite Client
          </Button>
          <Link to="/dashboard/cases/new">
            <Button variant="cta">
              <Plus className="h-4 w-4 mr-2" />
              Add New Case
            </Button>
          </Link>
        </div>
      </div>

      {/* Plan Badge */}
      {firm && (
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-gold/10 text-gold font-medium">
            {firm.plan_type === 'firm' ? 'Firm Plan' : 'Solo Plan'}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{firm.name}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Active Cases"
          value={casesLoading ? "..." : activeCases.length.toString()}
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="Today's Hearings"
          value={hearingsLoading ? "..." : (todayHearings?.length || 0).toString()}
          highlight
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Clients"
          value={clientsLoading ? "..." : clients.length.toString()}
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Documents"
          value={docsLoading ? "..." : documents.length.toString()}
        />
      </div>

      {/* Today in Court */}
      <div className="bg-card rounded-lg border border-border">
        <div className="section-header px-6 pt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold font-serif">Today in Court</h2>
          </div>
        </div>
        <div className="p-6 pt-0">
          {hearingsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
          ) : todayHearings && todayHearings.length > 0 ? (
            <div className="space-y-4">
              {todayHearings.map((hearing) => (
                <div
                  key={hearing.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
                >
                  <div>
                    <h3 className="font-medium">{hearing.case_title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hearing.court} • {hearing.courtroom}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium bg-gold text-navy-dark px-3 py-1 rounded-full">
                      {hearing.stage}
                    </span>
                    <Link to={`/dashboard/cases/${hearing.id}`}>
                      <Button variant="ghost" size="sm">
                        View Case
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No hearings scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction
          icon={<Plus className="h-5 w-5" />}
          label="Add Case"
          href="/dashboard/cases/new"
        />
        <QuickAction
          icon={<Upload className="h-5 w-5" />}
          label="Upload Order"
          href="/dashboard/documents"
        />
        <QuickActionButton
          icon={<Users className="h-5 w-5" />}
          label="Invite Client"
          onClick={() => setInviteOpen(true)}
        />
        <QuickAction
          icon={<CreditCard className="h-5 w-5" />}
          label="Request Payment"
          href="/dashboard/clients"
          comingSoon
        />
      </div>

      {/* AI Summary Section */}
      <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold font-serif">AI Case Summary</h3>
              <span className="coming-soon-badge">Coming Soon</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get AI-generated summaries of your cases, extract court directions, 
              and prepare checklists for upcoming hearings.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" disabled>
                <FileText className="h-4 w-4 mr-2" />
                Summarize Case
              </Button>
              <Button variant="outline" size="sm" disabled>
                Extract Directions
              </Button>
              <Button variant="outline" size="sm" disabled>
                Prep Checklist
              </Button>
            </div>
          </div>
        </div>
        <div className="ai-disclaimer mt-4">
          AI features are informational only and do not constitute legal advice.
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-card rounded-lg border border-border">
        <div className="section-header px-6 pt-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold font-serif">Recent Cases</h2>
          </div>
          <Link to="/dashboard/cases">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          {casesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
          ) : recentCases.length > 0 ? (
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Case Title</th>
                  <th>Court</th>
                  <th>Stage</th>
                  <th>Next Hearing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((caseItem) => (
                  <tr key={caseItem.id}>
                    <td className="font-medium">{caseItem.case_title}</td>
                    <td className="text-muted-foreground">{caseItem.court}</td>
                    <td>
                      <span className="status-badge status-active">
                        {caseItem.stage}
                      </span>
                    </td>
                    <td>
                      {caseItem.next_hearing_date 
                        ? new Date(caseItem.next_hearing_date).toLocaleDateString("en-IN")
                        : "—"
                      }
                    </td>
                    <td>
                      <Link to={`/dashboard/cases/${caseItem.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No cases yet. Add your first case to get started.</p>
              <Link to="/dashboard/cases/new">
                <Button variant="cta" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Case
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Banner (for Solo users) */}
      {firm?.plan_type === 'solo' && isLawyerOwner && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Growing your practice?</h3>
                <p className="text-sm text-muted-foreground">
                  Invite team members to collaborate on cases. Upgrade to Firm
                  plan automatically.
                </p>
              </div>
            </div>
            <Link to="/dashboard/team">
              <Button variant="outline">Invite Team Member</Button>
            </Link>
          </div>
        </div>
      )}

      <InviteClientDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        highlight ? "border-gold bg-gold/5" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`${
            highlight ? "text-gold" : "text-muted-foreground"
          }`}
        >
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href,
  comingSoon,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  comingSoon?: boolean;
}) {
  const content = (
    <div className={`p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-center ${comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <div className="flex flex-col items-center gap-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
        {comingSoon && <span className="coming-soon-badge text-xs">Soon</span>}
      </div>
    </div>
  );

  if (comingSoon) {
    return content;
  }

  return <Link to={href}>{content}</Link>;
}

function QuickActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}
