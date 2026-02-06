import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  name: string;
  phone: string | null;
}

interface UserRole {
  role: 'admin' | 'lawyer_owner' | 'lawyer_team' | 'client';
}

interface Firm {
  id: string;
  name: string;
  plan_type: 'solo' | 'firm';
  plan_status: 'active' | 'past_due' | 'cancelled' | 'trialing';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  roles: UserRole[];
  firm: Firm | null;
  loading: boolean;
  isAdmin: boolean;
  isLawyerOwner: boolean;
  isLawyerTeam: boolean;
  isClient: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [firm, setFirm] = useState<Firm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user data in parallel
          await fetchUserData(session.user.id);
        } else {
          setProfile(null);
          setRoles([]);
          setFirm(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile, roles, and firm membership in parallel
      const [profileRes, rolesRes, firmMemberRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_roles').select('role').eq('user_id', userId),
        supabase.from('firm_members').select('firm_id, firms(*)').eq('user_id', userId).eq('status', 'active').maybeSingle(),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
      }

      if (rolesRes.data) {
        setRoles(rolesRes.data as UserRole[]);
      }

      if (firmMemberRes.data?.firms) {
        setFirm(firmMemberRes.data.firms as unknown as Firm);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRoles([]);
    setFirm(null);
  };

  const isAdmin = roles.some(r => r.role === 'admin');
  const isLawyerOwner = roles.some(r => r.role === 'lawyer_owner');
  const isLawyerTeam = roles.some(r => r.role === 'lawyer_team');
  const isClient = roles.some(r => r.role === 'client');

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        roles,
        firm,
        loading,
        isAdmin,
        isLawyerOwner,
        isLawyerTeam,
        isClient,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
