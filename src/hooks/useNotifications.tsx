import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AppNotification {
  id: string;
  user_id: string;
  case_id: string | null;
  kind: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

export function useNotifications() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await (supabase as any)
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as AppNotification[];
    },
    enabled: !!user,
  });

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes' as any,
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => qc.invalidateQueries({ queryKey: ['notifications', user.id] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications', user?.id] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await (supabase as any)
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications', user?.id] }),
  });

  const items = query.data ?? [];
  const unreadCount = items.filter((n) => !n.read).length;
  return { items, unreadCount, isLoading: query.isLoading, markRead, markAllRead };
}