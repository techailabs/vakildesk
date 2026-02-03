import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, CreditCard, AlertCircle } from "lucide-react";
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

// Mock data
const subscriptions = [
  {
    id: 1,
    firm: "Singh & Associates",
    plan: "Firm",
    amount: "₹1,597",
    status: "active",
    nextBilling: "2025-03-01",
    members: 3,
  },
  {
    id: 2,
    firm: "Kapoor Law Chambers",
    plan: "Solo",
    amount: "₹499",
    status: "active",
    nextBilling: "2025-02-15",
    members: 1,
  },
  {
    id: 3,
    firm: "Verma Legal",
    plan: "Firm",
    amount: "₹1,198",
    status: "past_due",
    nextBilling: "2025-01-25",
    members: 2,
  },
  {
    id: 4,
    firm: "Sharma Advocates",
    plan: "Solo",
    amount: "₹499",
    status: "cancelled",
    nextBilling: null,
    members: 1,
  },
];

export default function AdminSubscriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.firm
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = subscriptions
    .filter((s) => s.status === "active")
    .reduce((acc, s) => {
      const amount = parseInt(s.amount.replace(/[₹,]/g, ""));
      return acc + amount;
    }, 0);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">Manage billing and subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          <p className="text-2xl font-bold">
            {subscriptions.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-success bg-success/5">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg border border-warning bg-warning/5">
          <p className="text-sm text-muted-foreground">Past Due</p>
          <p className="text-2xl font-bold">
            {subscriptions.filter((s) => s.status === "past_due").length}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-2xl font-bold">
            {subscriptions.filter((s) => s.status === "cancelled").length}
          </p>
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
          </SelectContent>
        </Select>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Plan</th>
                <th>Members</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Next Billing</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{sub.firm}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge status-active">{sub.plan}</span>
                  </td>
                  <td>{sub.members}</td>
                  <td className="font-medium">{sub.amount}/mo</td>
                  <td>
                    <span
                      className={`status-badge ${
                        sub.status === "active"
                          ? "status-active"
                          : sub.status === "past_due"
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
                    {sub.nextBilling
                      ? new Date(sub.nextBilling).toLocaleDateString("en-IN")
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
      </div>
    </div>
  );
}
