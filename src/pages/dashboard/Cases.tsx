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
  Loader2,
  Briefcase,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCases } from "@/hooks/useCases";

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { cases, isLoading } = useCases();

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.case_number?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (c.clients?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Cases</h1>
          <p className="text-muted-foreground">
            Manage all your legal cases in one place
          </p>
        </div>
        <Link to="/dashboard/cases/new">
          <Button className="bg-gold text-navy-dark hover:bg-gold-light font-semibold">
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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : filteredCases.length > 0 ? (
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
                          className="font-medium hover:text-gold"
                        >
                          {caseItem.case_title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {caseItem.case_number}
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
                    <td className="text-muted-foreground">
                      {caseItem.clients?.name || "—"}
                    </td>
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
                      {caseItem.next_hearing_date ? (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(caseItem.next_hearing_date).toLocaleDateString("en-IN")}
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
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No cases found matching your criteria</p>
            <Link to="/dashboard/cases/new">
              <Button className="mt-4 bg-gold text-navy-dark hover:bg-gold-light">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Case
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
