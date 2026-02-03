import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const cases = [
  {
    id: 1,
    caseNumber: "CRL/2024/1234",
    title: "State vs. Sharma",
    court: "Delhi High Court",
    courtroom: "Room 12",
    judge: "Hon'ble Justice Verma",
    stage: "Arguments",
    status: "active",
    nextHearing: "2025-02-10",
    client: "Mr. Raj Sharma",
  },
  {
    id: 2,
    caseNumber: "CS/2024/5678",
    title: "ABC Corp vs. XYZ Ltd",
    court: "District Court, Saket",
    courtroom: "Room 5",
    judge: "Hon'ble Judge Kapoor",
    stage: "Evidence",
    status: "active",
    nextHearing: "2025-02-15",
    client: "ABC Corporation",
  },
  {
    id: 3,
    caseNumber: "CS/2023/9012",
    title: "Gupta Property Dispute",
    court: "Civil Court, Dwarka",
    courtroom: "Room 8",
    judge: "Hon'ble Judge Singh",
    stage: "Filing",
    status: "active",
    nextHearing: "2025-02-20",
    client: "Mrs. Sunita Gupta",
  },
  {
    id: 4,
    caseNumber: "WP/2024/3456",
    title: "Consumer Rights Matter",
    court: "Consumer Forum",
    courtroom: "Room 2",
    judge: "Hon'ble President Kumar",
    stage: "Disposed",
    status: "archived",
    nextHearing: null,
    client: "Consumer Association",
  },
];

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cases</h1>
          <p className="text-muted-foreground">
            Manage all your legal cases in one place
          </p>
        </div>
        <Link to="/dashboard/cases/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Case
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cases</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Case
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th>Court</th>
                <th>Client</th>
                <th>Stage</th>
                <th>Next Hearing</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td>
                    <div>
                      <Link
                        to={`/dashboard/cases/${caseItem.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {caseItem.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.caseNumber}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{caseItem.court}</p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.courtroom}
                      </p>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{caseItem.client}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        caseItem.stage === "Disposed"
                          ? "status-archived"
                          : "status-active"
                      }`}
                    >
                      {caseItem.stage}
                    </span>
                  </td>
                  <td>
                    {caseItem.nextHearing ? (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(caseItem.nextHearing).toLocaleDateString("en-IN")}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        caseItem.status === "active"
                          ? "status-active"
                          : "status-archived"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/cases/${caseItem.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Case</DropdownMenuItem>
                        <DropdownMenuItem>Upload Document</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Archive Case
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No cases found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
