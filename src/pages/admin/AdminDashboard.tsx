import { Building2, Users, CreditCard, AlertTriangle, Briefcase, Loader2 } from "lucide-react";
import { useAdminStats, useAdminFirms } from "@/hooks/useAdmin";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: firms, isLoading: firmsLoading } = useAdminFirms();

  const recentFirms = firms?.slice(0, 5) || [];

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Building2 className="h-5 w-5" />}
          label="Total Firms"
          value={statsLoading ? "..." : (stats?.totalFirms || 0).toString()}
          sublabel={`${stats?.activeFirms || 0} active`}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total Users"
          value={statsLoading ? "..." : (stats?.totalUsers || 0).toString()}
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Total Cases"
          value={statsLoading ? "..." : (stats?.totalCases || 0).toString()}
          highlight
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Pending Issues"
          value="0"
        />
      </div>

      {/* Recent Firms */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold font-serif">Recent Signups</h2>
        </div>
        {firmsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-court-red" />
          </div>
        ) : recentFirms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Firm</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Members</th>
                  <th>Cases</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {recentFirms.map((firm) => (
                  <tr key={firm.id}>
                    <td className="font-medium">{firm.name}</td>
                    <td>
                      <span className="status-badge status-active capitalize">{firm.plan_type}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          firm.plan_status === "active"
                            ? "status-active"
                            : firm.plan_status === "past_due"
                            ? "status-pending"
                            : "status-archived"
                        }`}
                      >
                        {firm.plan_status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="text-muted-foreground">{firm.member_count}</td>
                    <td className="text-muted-foreground">{firm.case_count}</td>
                    <td className="text-muted-foreground">
                      {new Date(firm.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No firms found
          </div>
        )}
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
