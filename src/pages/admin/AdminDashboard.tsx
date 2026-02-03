import { Building2, Users, CreditCard, AlertTriangle } from "lucide-react";

// Mock data
const stats = {
  totalFirms: 156,
  activeFirms: 142,
  totalUsers: 489,
  activeSubscriptions: 142,
  monthlyRevenue: "₹1,24,800",
  pendingIssues: 3,
};

const recentFirms = [
  {
    id: 1,
    name: "Singh & Associates",
    owner: "Adv. Rajesh Singh",
    plan: "Firm",
    status: "active",
    createdAt: "2025-01-28",
  },
  {
    id: 2,
    name: "Kapoor Law Chambers",
    owner: "Adv. Priya Kapoor",
    plan: "Solo",
    status: "active",
    createdAt: "2025-01-27",
  },
  {
    id: 3,
    name: "Verma Legal",
    owner: "Adv. Amit Verma",
    plan: "Firm",
    status: "past_due",
    createdAt: "2025-01-25",
  },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Building2 className="h-5 w-5" />}
          label="Total Firms"
          value={stats.totalFirms.toString()}
          sublabel={`${stats.activeFirms} active`}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total Users"
          value={stats.totalUsers.toString()}
        />
        <StatCard
          icon={<CreditCard className="h-5 w-5" />}
          label="Monthly Revenue"
          value={stats.monthlyRevenue}
          highlight
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Pending Issues"
          value={stats.pendingIssues.toString()}
          warning={stats.pendingIssues > 0}
        />
      </div>

      {/* Recent Firms */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Recent Signups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Owner</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {recentFirms.map((firm) => (
                <tr key={firm.id}>
                  <td className="font-medium">{firm.name}</td>
                  <td className="text-muted-foreground">{firm.owner}</td>
                  <td>
                    <span className="status-badge status-active">{firm.plan}</span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        firm.status === "active"
                          ? "status-active"
                          : firm.status === "past_due"
                          ? "status-pending"
                          : "status-archived"
                      }`}
                    >
                      {firm.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(firm.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sublabel,
  highlight,
  warning,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        warning
          ? "border-warning bg-warning/5"
          : highlight
          ? "border-success bg-success/5"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`${
            warning
              ? "text-warning"
              : highlight
              ? "text-success"
              : "text-muted-foreground"
          }`}
        >
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {sublabel && (
        <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
      )}
    </div>
  );
}
