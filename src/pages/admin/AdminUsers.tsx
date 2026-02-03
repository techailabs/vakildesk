import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, User, Shield, Users } from "lucide-react";
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
const users = [
  {
    id: 1,
    name: "Adv. Rajesh Singh",
    email: "rajesh@singhlaw.com",
    role: "lawyer_owner",
    firm: "Singh & Associates",
    status: "active",
    lastLogin: "2025-02-02",
  },
  {
    id: 2,
    name: "Adv. Priya Kapoor",
    email: "priya@kapoorlaw.com",
    role: "lawyer_team",
    firm: "Singh & Associates",
    status: "active",
    lastLogin: "2025-02-01",
  },
  {
    id: 3,
    name: "Mr. Raj Sharma",
    email: "raj.sharma@email.com",
    role: "client",
    firm: "Singh & Associates",
    status: "active",
    lastLogin: "2025-01-30",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@vakildesk.com",
    role: "admin",
    firm: null,
    status: "active",
    lastLogin: "2025-02-02",
  },
];

const roleLabels: Record<string, string> = {
  lawyer_owner: "Firm Owner",
  lawyer_team: "Team Member",
  client: "Client",
  admin: "Admin",
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-destructive" />;
      case "lawyer_owner":
        return <User className="h-4 w-4 text-primary" />;
      case "lawyer_team":
        return <Users className="h-4 w-4 text-accent" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all platform users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="lawyer_owner">Firm Owner</SelectItem>
            <SelectItem value="lawyer_team">Team Member</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Firm</th>
                <th>Status</th>
                <th>Last Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span>{roleLabels[user.role]}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">
                    {user.firm || "—"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status === "active"
                          ? "status-active"
                          : "status-archived"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(user.lastLogin).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend User
                        </DropdownMenuItem>
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
