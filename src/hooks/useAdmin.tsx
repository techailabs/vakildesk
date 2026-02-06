import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FirmWithDetails {
  id: string;
  name: string;
  owner_id: string;
  plan_type: 'solo' | 'firm';
  plan_status: 'active' | 'past_due' | 'cancelled' | 'trialing';
  created_at: string;
  updated_at: string;
  owner_email?: string;
  member_count?: number;
  case_count?: number;
}

export interface UserWithDetails {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  roles: string[];
  firm_name: string | null;
  created_at: string;
}

export function useAdminFirms() {
  return useQuery({
    queryKey: ['admin-firms'],
    queryFn: async () => {
      const { data: firms, error } = await supabase
        .from('firms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get additional details for each firm
      const firmsWithDetails = await Promise.all(
        firms.map(async (firm) => {
          const [membersRes, casesRes] = await Promise.all([
            supabase.from('firm_members').select('*', { count: 'exact', head: true }).eq('firm_id', firm.id),
            supabase.from('cases').select('*', { count: 'exact', head: true }).eq('firm_id', firm.id),
          ]);

          return {
            ...firm,
            member_count: membersRes.count || 0,
            case_count: casesRes.count || 0,
          } as FirmWithDetails;
        })
      );

      return firmsWithDetails;
    },
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get roles for all users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get firm memberships
      const { data: memberships, error: membershipsError } = await supabase
        .from('firm_members')
        .select('user_id, firms(name)')
        .eq('status', 'active');

      if (membershipsError) throw membershipsError;

      // Combine the data
      const users: UserWithDetails[] = profiles.map((profile) => {
        const userRoles = roles
          .filter(r => r.user_id === profile.id)
          .map(r => r.role);
        
        const membership = memberships.find(m => m.user_id === profile.id);
        const firmName = (membership?.firms as any)?.name || null;

        return {
          id: profile.id,
          email: profile.name, // We don't have email in profiles, using name as placeholder
          name: profile.name,
          phone: profile.phone,
          roles: userRoles,
          firm_name: firmName,
          created_at: profile.created_at,
        };
      });

      return users;
    },
  });
}

export function useAdminSubscriptions() {
  return useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, firms(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [firmsRes, usersRes, casesRes, activeFirmsRes] = await Promise.all([
        supabase.from('firms').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('cases').select('*', { count: 'exact', head: true }),
        supabase.from('firms').select('*', { count: 'exact', head: true }).eq('plan_status', 'active'),
      ]);

      return {
        totalFirms: firmsRes.count || 0,
        activeFirms: activeFirmsRes.count || 0,
        totalUsers: usersRes.count || 0,
        totalCases: casesRes.count || 0,
      };
    },
  });
}
