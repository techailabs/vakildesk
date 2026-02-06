import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Document {
  id: string;
  case_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  document_type: string | null;
  created_at: string;
  cases?: {
    id: string;
    case_title: string;
  } | null;
}

export function useDocuments(caseId?: string) {
  const { firm } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: documents, isLoading, error } = useQuery({
    queryKey: ['documents', firm?.id, caseId],
    queryFn: async () => {
      if (!firm?.id) return [];
      
      let query = supabase
        .from('documents')
        .select('*, cases!inner(id, case_title, firm_id)')
        .order('created_at', { ascending: false });

      if (caseId) {
        query = query.eq('case_id', caseId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Filter by firm_id since we can't do it directly due to nested join
      return (data as any[]).filter(doc => doc.cases?.firm_id === firm.id) as Document[];
    },
    enabled: !!firm?.id,
  });

  return {
    documents: documents ?? [],
    isLoading,
    error,
  };
}
