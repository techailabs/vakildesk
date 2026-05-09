import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Tomorrow's date in IST (approx)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    // Find active cases with a hearing tomorrow whose firm has opted in
    const { data: cases, error: caseErr } = await supabase
      .from('cases')
      .select('id, case_title, case_number, court, courtroom, next_hearing_date, firm_id, firms!inner(name, hearing_reminders_opt_in, owner_id)')
      .eq('next_hearing_date', dateStr)
      .eq('status', 'active');

    if (caseErr) throw caseErr;

    let inserted = 0;
    for (const c of cases ?? []) {
      const firm = (c as any).firms;
      if (!firm?.hearing_reminders_opt_in) continue;

      // Notify all firm members
      const { data: members } = await supabase
        .from('firm_members')
        .select('user_id')
        .eq('firm_id', c.firm_id)
        .eq('status', 'active');

      const userIds = new Set<string>([firm.owner_id]);
      (members ?? []).forEach((m: any) => userIds.add(m.user_id));

      for (const userId of userIds) {
        // Skip if already notified for this case+date
        const { data: existing } = await supabase
          .from('notifications')
          .select('id')
          .eq('user_id', userId)
          .eq('case_id', c.id)
          .eq('kind', 'hearing_reminder')
          .gte('created_at', new Date(Date.now() - 26 * 3600 * 1000).toISOString())
          .maybeSingle();
        if (existing) continue;

        await supabase.from('notifications').insert({
          user_id: userId,
          firm_id: c.firm_id,
          case_id: c.id,
          kind: 'hearing_reminder',
          title: `Hearing tomorrow: ${c.case_title}`,
          body: `${c.court ?? 'Court'}${c.courtroom ? ' · ' + c.courtroom : ''} — ${c.case_number ?? ''}`.trim(),
          link: `/dashboard/cases/${c.id}`,
        });
        inserted++;
      }
    }

    return new Response(
      JSON.stringify({ ok: true, date: dateStr, cases: cases?.length ?? 0, notifications: inserted }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('hearing-reminders error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});