import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  firm_id: string;
  user_id: string | null;
  created_at: string;
  case_count?: number;
}

export function useClients() {
  const { firm } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients', firm?.id],
    queryFn: async () => {
      if (!firm?.id) return [];
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('firm_id', firm.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get case counts for each client
      const clientsWithCounts = await Promise.all(
        data.map(async (client) => {
          const { count } = await supabase
            .from('cases')
            .select('*', { count: 'exact', head: true })
            .eq('client_id', client.id);
          
          return { ...client, case_count: count ?? 0 };
        })
      );
      
      return clientsWithCounts as Client[];
    },
    enabled: !!firm?.id,
  });

  const createClient = useMutation({
    mutationFn: async (newClient: { name: string; email?: string; phone?: string; firm_id: string }) => {
      const { data, error } = await supabase
        .from('clients')
        .insert(newClient)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Client added",
        description: "New client has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding client",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    clients: clients ?? [],
    isLoading,
    error,
    createClient,
  };
}
