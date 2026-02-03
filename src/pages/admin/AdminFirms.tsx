import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  Building2,
  Users,
  Calendar,
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

// Mock data
const firms = [
  {
    id: 1,
    name: "Singh & Associates",
    owner: "Adv. Rajesh Singh",
    email: "rajesh@singhlaw.com",
    plan: "Firm",
    status: "active",
    members: 3,
    cases: 24,
    createdAt: "2024-06-15",
  },
  {
    id: 2,
    name: "Kapoor Law Chambers",
    owner: "Adv. Priya Kapoor",
    email: "priya@kapoorlaw.com",
    plan: "Solo",
    status: "active",
    members: 1,
    cases: 12,
    createdAt: "2024-08-20",
  },
  {
    id: 3,
    name: "Verma Legal",
    owner: "Adv. Amit Verma",
    email: "amit@vermalegal.com",
    plan: "Firm",
    status: "past_due",
    members: 2,
    cases: 18,
    createdAt: "2024-09-10",
  },
  {
    id: 4,
    name: "Sharma Advocates",
    owner: "Adv. Neha Sharma",
    email: "neha@sharmaadvocates.com",
    plan: "Solo",
    status: "suspended",
    members: 1,
    cases: 5,
    createdAt: "2024-10-05",
  },
];

export default function AdminFirms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredFirms = firms.filter((firm) => {
    const matchesSearch =
      firm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || firm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Firms</h1>
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
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Firms Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Owner</th>
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
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{firm.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {firm.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{firm.owner}</td>
                  <td>
                    <span className="status-badge status-active">{firm.plan}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {firm.members}
                    </div>
                  </td>
                  <td>{firm.cases}</td>
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
                  <td>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(firm.createdAt).toLocaleDateString("en-IN")}
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
                        {firm.status === "suspended" ? (
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
      </div>
    </div>
  );
}
