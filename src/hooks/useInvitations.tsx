import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface ClientInvitation {
  id: string;
  firm_id: string;
  invited_by: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  case_id: string | null;
  token: string;
  status: "pending" | "accepted" | "revoked" | "expired";
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
}

export function useClientInvitations() {
  const { firm, user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["client_invitations", firm?.id],
    queryFn: async () => {
      if (!firm?.id) return [] as ClientInvitation[];
      const { data, error } = await supabase
        .from("client_invitations")
        .select("*")
        .eq("firm_id", firm.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClientInvitation[];
    },
    enabled: !!firm?.id,
  });

  const create = useMutation({
    mutationFn: async (input: {
      client_name: string;
      client_email?: string;
      client_phone?: string;
      case_id?: string | null;
    }) => {
      if (!firm?.id || !user?.id) throw new Error("Not ready");
      const { data, error } = await supabase
        .from("client_invitations")
        .insert({
          firm_id: firm.id,
          invited_by: user.id,
          client_name: input.client_name,
          client_email: input.client_email ?? null,
          client_phone: input.client_phone ?? null,
          case_id: input.case_id ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return data as ClientInvitation;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["client_invitations"] });
      toast({ title: "Invitation created", description: "Share the link with your client." });
    },
    onError: (e: Error) =>
      toast({ title: "Could not create invite", description: e.message, variant: "destructive" }),
  });

  const revoke = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("client_invitations")
        .update({ status: "revoked" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["client_invitations"] });
      toast({ title: "Invitation revoked" });
    },
  });

  return { list, create, revoke };
}

/** Public lookup of invitation by token (uses SECURITY DEFINER fn). */
export async function fetchInvitationByToken(token: string) {
  const { data, error } = await supabase.rpc("get_invitation_by_token", { _token: token });
  if (error) throw error;
  return (data?.[0] ?? null) as null | {
    id: string;
    firm_id: string;
    firm_name: string;
    client_name: string;
    client_email: string | null;
    status: string;
    expires_at: string;
  };
}

export async function acceptInvitation(token: string) {
  const { data, error } = await supabase.rpc("accept_client_invitation", { _token: token });
  if (error) throw error;
  return data as { firm_id: string; client_id: string };
}

export function buildInviteLink(token: string) {
  return `${window.location.origin}/invite/${token}`;
}