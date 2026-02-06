import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  Building2,
  Users,
  Calendar,
  Loader2,
} from "lucide-react";
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
import { useAdminFirms } from "@/hooks/useAdmin";

export default function AdminFirms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: firms, isLoading } = useAdminFirms();

  const filteredFirms = (firms || []).filter((firm) => {
    const matchesSearch =
      firm.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || firm.plan_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Firms</h1>
        <p className="text-muted-foreground">Manage all registered firms</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search firms..."
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

      {/* Firms Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-court-red" />
          </div>
        ) : filteredFirms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Firm</th>
                  <th>Plan</th>
                  <th>Members</th>
                  <th>Cases</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map((firm) => (
                  <tr key={firm.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-navy/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-navy" />
                        </div>
                        <div>
                          <p className="font-medium">{firm.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge status-active capitalize">{firm.plan_type}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {firm.member_count}
                      </div>
                    </td>
                    <td>{firm.case_count}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          firm.plan_status === "active"
                            ? "status-active"
                            : firm.plan_status === "past_due"
                            ? "status-pending"
                            : firm.plan_status === "trialing"
                            ? "status-pending"
                            : "status-archived"
                        }`}
                      >
                        {firm.plan_status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(firm.created_at).toLocaleDateString("en-IN")}
                      </div>
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
                          <DropdownMenuItem>View Users</DropdownMenuItem>
                          <DropdownMenuItem>View Billing</DropdownMenuItem>
                          {firm.plan_status === "cancelled" ? (
                            <DropdownMenuItem className="text-success">
                              Reactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-destructive">
                              Suspend
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
            No firms found
          </div>
        )}
      </div>
    </div>
  );
}
