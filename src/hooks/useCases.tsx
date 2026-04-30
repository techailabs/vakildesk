import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Case {
  id: string;
  case_number: string | null;
  case_title: string;
  case_type: string | null;
  court: string | null;
  courtroom: string | null;
  judge: string | null;
  next_hearing_date: string | null;
  stage: string | null;
  status: string;
  notes: string | null;
  client_id: string | null;
  firm_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  clients?: {
    id: string;
    name: string;
  } | null;
}

export function useCases() {
  const { firm } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cases, isLoading, error } = useQuery({
    queryKey: ['cases', firm?.id],
    queryFn: async () => {
      if (!firm?.id) return [];
      
      const { data, error } = await supabase
        .from('cases')
        .select('*, clients(id, name)')
        .eq('firm_id', firm.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Case[];
    },
    enabled: !!firm?.id,
  });

  const createCase = useMutation({
    mutationFn: async (newCase: Omit<Case, 'id' | 'created_at' | 'updated_at' | 'clients'>) => {
      // Strip nested join field if present
      const { clients: _omit, ...payload } = newCase as any;
      const { data, error } = await supabase
        .from('cases')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast({
        title: "Case created",
        description: "Your new case has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating case",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCase = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Case> & { id: string }) => {
      const { clients: _omit, ...payload } = updates as any;
      const { data, error } = await supabase
        .from('cases')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast({
        title: "Case updated",
        description: "Case has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating case",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    cases: cases ?? [],
    isLoading,
    error,
    createCase,
    updateCase,
  };
}

export function useTodayHearings() {
  const { firm } = useAuth();

  return useQuery({
    queryKey: ['today-hearings', firm?.id],
    queryFn: async () => {
      if (!firm?.id) return [];
      
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('cases')
        .select('*, clients(id, name)')
        .eq('firm_id', firm.id)
        .eq('next_hearing_date', today)
        .eq('status', 'active');

      if (error) throw error;
      return data as Case[];
    },
    enabled: !!firm?.id,
  });
}

export function useUpcomingHearings(limit = 5) {
  const { firm } = useAuth();

  return useQuery({
    queryKey: ['upcoming-hearings', firm?.id, limit],
    queryFn: async () => {
      if (!firm?.id) return [];
      
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('cases')
        .select('*, clients(id, name)')
        .eq('firm_id', firm.id)
        .gte('next_hearing_date', today)
        .eq('status', 'active')
        .order('next_hearing_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Case[];
    },
    enabled: !!firm?.id,
  });
}
