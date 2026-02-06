import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminSubscriptions } from "@/hooks/useAdmin";

export default function AdminSubscriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: subscriptions, isLoading } = useAdminSubscriptions();

  const filteredSubscriptions = (subscriptions || []).filter((sub) => {
    const firmName = (sub.firms as any)?.name || "";
    const matchesSearch = firmName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = (subscriptions || []).filter((s) => s.status === "active").length;
  const pastDueCount = (subscriptions || []).filter((s) => s.status === "past_due").length;
  const cancelledCount = (subscriptions || []).filter((s) => s.status === "cancelled").length;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Subscriptions</h1>
        <p className="text-muted-foreground">Manage billing and subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">Total Subscriptions</p>
          <p className="text-2xl font-bold">
            {isLoading ? "..." : (subscriptions?.length || 0)}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-success bg-success/5">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold">{isLoading ? "..." : activeCount}</p>
        </div>
        <div className="p-4 rounded-lg border border-warning bg-warning/5">
          <p className="text-sm text-muted-foreground">Past Due</p>
          <p className="text-2xl font-bold">{isLoading ? "..." : pastDueCount}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-2xl font-bold">{isLoading ? "..." : cancelledCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="past_due">Past Due</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="trialing">Trialing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-court-red" />
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Firm</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Period End</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-navy/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-navy" />
                        </div>
                        <span className="font-medium">{(sub.firms as any)?.name || "Unknown Firm"}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge status-active capitalize">{sub.plan}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          sub.status === "active"
                            ? "status-active"
                            : sub.status === "past_due"
                            ? "status-pending"
                            : sub.status === "trialing"
                            ? "status-pending"
                            : "status-archived"
                        }`}
                      >
                        {sub.status === "past_due" && (
                          <AlertCircle className="h-3 w-3 mr-1 inline" />
                        )}
                        {sub.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="text-muted-foreground">
                      {sub.current_period_end
                        ? new Date(sub.current_period_end).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Invoices</DropdownMenuItem>
                          {sub.status === "past_due" && (
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          )}
                          {sub.status === "cancelled" ? (
                            <DropdownMenuItem className="text-success">
                              Reactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-destructive">
                              Cancel Subscription
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No subscriptions found
          </div>
        )}
      </div>
    </div>
  );
}
