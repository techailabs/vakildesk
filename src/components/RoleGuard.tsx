import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type Role = "admin" | "lawyer_owner" | "lawyer_team" | "client";

interface RoleGuardProps {
  allow: Role[];
  children: ReactNode;
  /** When forbidden, redirect to user's natural dashboard instead of /login */
  redirectForbidden?: boolean;
}

/**
 * Wraps a page and:
 *  - waits for auth + roles to load,
 *  - sends unauthenticated users to /login,
 *  - sends users without an allowed role to their own dashboard.
 */
export function RoleGuard({ allow, children, redirectForbidden = true }: RoleGuardProps) {
  const { user, roles, loading, isAdmin, isClient } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Wait for roles before judging
  if (roles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const hasAllowed = roles.some((r) => allow.includes(r.role));
  if (!hasAllowed) {
    if (!redirectForbidden) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
          <div className="max-w-md text-center bg-card border border-border rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-2 font-serif">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to view this page.
            </p>
          </div>
        </div>
      );
    }
    if (isAdmin) return <Navigate to="/admin" replace />;
    if (isClient) return <Navigate to="/client" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}