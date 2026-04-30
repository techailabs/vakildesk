import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, User, Shield, Users, Loader2 } from "lucide-react";
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
import { useAdminUsers } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const roleLabels: Record<string, string> = {
  lawyer_owner: "Firm Owner",
  lawyer_team: "Team Member",
  client: "Client",
  admin: "Admin",
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { data: users, isLoading } = useAdminUsers();
  const { toast } = useToast();
  const qc = useQueryClient();

  const setRole = async (userId: string, role: string) => {
    const { error } = await supabase.rpc("admin_set_user_role", {
      _target_user: userId,
      _role: role as any,
    });
    if (error) {
      toast({ title: "Failed to update role", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role updated" });
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  const setActive = async (userId: string, active: boolean) => {
    const { error } = await supabase.rpc("admin_set_user_active", {
      _target_user: userId,
      _active: active,
    });
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: active ? "User activated" : "User deactivated" });
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    }
  };

  const filteredUsers = (users || []).filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (roles: string[]) => {
    if (roles.includes("admin")) {
      return <Shield className="h-4 w-4 text-court-red" />;
    } else if (roles.includes("lawyer_owner")) {
      return <User className="h-4 w-4 text-navy" />;
    } else if (roles.includes("lawyer_team")) {
      return <Users className="h-4 w-4 text-gold" />;
    }
    return <User className="h-4 w-4 text-muted-foreground" />;
  };

  const getPrimaryRole = (roles: string[]) => {
    if (roles.includes("admin")) return "admin";
    if (roles.includes("lawyer_owner")) return "lawyer_owner";
    if (roles.includes("lawyer_team")) return "lawyer_team";
    if (roles.includes("client")) return "client";
    return "unknown";
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Users</h1>
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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-court-red" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Firm</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-navy">
                            {user.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2) || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.roles)}
                        <span>{roleLabels[getPrimaryRole(user.roles)] || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">
                      {user.firm_name || "—"}
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setRole(user.id, "admin")}>
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRole(user.id, "lawyer_owner")}>
                            Make Lawyer (Owner)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRole(user.id, "lawyer_team")}>
                            Make Lawyer (Team)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRole(user.id, "client")}>
                            Make Client
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setActive(user.id, false)}
                          >
                            Deactivate User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setActive(user.id, true)}>
                            Reactivate User
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
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
