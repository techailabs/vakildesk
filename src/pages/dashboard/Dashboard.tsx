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
} from "lucide-react";

// Mock data for demonstration
const todayHearings = [
  {
    id: 1,
    caseTitle: "State vs. Sharma",
    court: "Delhi High Court",
    courtroom: "Room 12",
    time: "10:30 AM",
  },
  {
    id: 2,
    caseTitle: "ABC Corp vs. XYZ Ltd",
    court: "District Court, Saket",
    courtroom: "Room 5",
    time: "2:00 PM",
  },
];

const recentCases = [
  {
    id: 1,
    title: "State vs. Sharma",
    court: "Delhi High Court",
    stage: "Arguments",
    nextHearing: "2026-02-10",
  },
  {
    id: 2,
    title: "ABC Corp vs. XYZ Ltd",
    court: "District Court, Saket",
    stage: "Evidence",
    nextHearing: "2026-02-15",
  },
  {
    id: 3,
    title: "Gupta Property Dispute",
    court: "Civil Court, Dwarka",
    stage: "Filing",
    nextHearing: "2026-02-20",
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your overview for today.
          </p>
        </div>
        <Link to="/dashboard/cases/new">
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light">
            <Plus className="h-4 w-4 mr-2" />
            Add New Case
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Active Cases"
          value="24"
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="Today's Hearings"
          value="2"
          highlight
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Clients"
          value="18"
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Documents"
          value="156"
        />
      </div>

      {/* Today in Court */}
      <div className="bg-card rounded-lg border border-border">
        <div className="section-header px-6 pt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold font-serif">Today in Court</h2>
          </div>
        </div>
        <div className="p-6 pt-0">
          {todayHearings.length > 0 ? (
            <div className="space-y-4">
              {todayHearings.map((hearing) => (
                <div
                  key={hearing.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
                >
                  <div>
                    <h3 className="font-medium">{hearing.caseTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hearing.court} • {hearing.courtroom}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium bg-accent text-accent-foreground px-3 py-1 rounded-full">
                      {hearing.time}
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
        <QuickAction
          icon={<Users className="h-5 w-5" />}
          label="Invite Client"
          href="/dashboard/clients"
        />
        <QuickAction
          icon={<CreditCard className="h-5 w-5" />}
          label="Request Payment"
          href="/dashboard/clients"
          comingSoon
        />
      </div>

      {/* AI Summary Section */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-accent" />
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
                  <td className="font-medium">{caseItem.title}</td>
                  <td className="text-muted-foreground">{caseItem.court}</td>
                  <td>
                    <span className="status-badge status-active">
                      {caseItem.stage}
                    </span>
                  </td>
                  <td>{new Date(caseItem.nextHearing).toLocaleDateString("en-IN")}</td>
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
        </div>
      </div>

      {/* Upgrade Banner (for Solo users) */}
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
        highlight ? "border-accent bg-accent/5" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`${
            highlight ? "text-accent" : "text-muted-foreground"
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
