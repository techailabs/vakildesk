import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DemoUser {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'admin' | 'lawyer_owner' | 'lawyer_team' | 'client';
  firmName?: string;
  planType?: 'solo' | 'firm';
}

const demoUsers: DemoUser[] = [
  { email: 'admin@vakildesk.com', password: 'Vakil@123', name: 'Admin User', phone: '+91 98765 43210', role: 'admin' },
  { email: 'solo@vakildesk.com', password: 'Vakil@123', name: 'Adv. Rajesh Kumar', phone: '+91 98765 43211', role: 'lawyer_owner', firmName: 'Kumar Law Associates', planType: 'solo' },
  { email: 'firm@vakildesk.com', password: 'Vakil@123', name: 'Adv. Priya Singh', phone: '+91 98765 43212', role: 'lawyer_owner', firmName: 'Singh & Associates LLP', planType: 'firm' },
  { email: 'team@vakildesk.com', password: 'Vakil@123', name: 'Adv. Amit Verma', phone: '+91 98765 43213', role: 'lawyer_team' },
  { email: 'client@vakildesk.com', password: 'Vakil@123', name: 'Ramesh Gupta', phone: '+91 98765 43214', role: 'client' },
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const createdUsers: { email: string; id: string }[] = [];
    const errors: string[] = [];
    
    // Create users
    for (const user of demoUsers) {
      // Check if user already exists
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === user.email);
      
      let userId: string;
      
      if (existingUser) {
        userId = existingUser.id;
        console.log(`User ${user.email} already exists with ID: ${userId}`);
      } else {
        // Create new user
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            name: user.name,
            phone: user.phone,
          },
        });

        if (authError) {
          errors.push(`Failed to create user ${user.email}: ${authError.message}`);
          continue;
        }
        
        userId = authData.user.id;
        console.log(`Created user ${user.email} with ID: ${userId}`);
      }

      createdUsers.push({ email: user.email, id: userId });

      // Check if profile exists
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (!existingProfile) {
        // Create profile
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: userId,
            name: user.name,
            phone: user.phone,
          });

        if (profileError) {
          errors.push(`Failed to create profile for ${user.email}: ${profileError.message}`);
        }
      }

      // Check if role exists
      const { data: existingRole } = await supabaseAdmin
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .eq('role', user.role)
        .maybeSingle();

      if (!existingRole) {
        // Create user role
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: userId,
            role: user.role,
          });

        if (roleError) {
          errors.push(`Failed to create role for ${user.email}: ${roleError.message}`);
        }
      }

      // Create firm if lawyer_owner
      if (user.role === 'lawyer_owner' && user.firmName) {
        const { data: existingFirm } = await supabaseAdmin
          .from('firms')
          .select('id')
          .eq('owner_id', userId)
          .maybeSingle();

        if (!existingFirm) {
          const { data: firmData, error: firmError } = await supabaseAdmin
            .from('firms')
            .insert({
              name: user.firmName,
              owner_id: userId,
              plan_type: user.planType || 'solo',
              plan_status: 'active',
            })
            .select()
            .single();

          if (firmError) {
            errors.push(`Failed to create firm for ${user.email}: ${firmError.message}`);
          } else {
            // Add owner as firm member
            await supabaseAdmin
              .from('firm_members')
              .insert({
                firm_id: firmData.id,
                user_id: userId,
                status: 'active',
                invited_by: userId,
              });

            // Create subscription
            await supabaseAdmin
              .from('subscriptions')
              .insert({
                firm_id: firmData.id,
                plan: user.planType || 'solo',
                status: 'active',
              });
          }
        }
      }
    }

    // Find firm owner (Priya Singh - firm plan) and team member
    const firmOwner = createdUsers.find(u => u.email === 'firm@vakildesk.com');
    const teamMember = createdUsers.find(u => u.email === 'team@vakildesk.com');
    const clientUser = createdUsers.find(u => u.email === 'client@vakildesk.com');
    const soloOwner = createdUsers.find(u => u.email === 'solo@vakildesk.com');

    // Get the firm for team member assignment
    if (firmOwner && teamMember) {
      const { data: firm } = await supabaseAdmin
        .from('firms')
        .select('id')
        .eq('owner_id', firmOwner.id)
        .single();

      if (firm) {
        // Add team member to firm
        const { data: existingMember } = await supabaseAdmin
          .from('firm_members')
          .select('id')
          .eq('firm_id', firm.id)
          .eq('user_id', teamMember.id)
          .maybeSingle();

        if (!existingMember) {
          await supabaseAdmin
            .from('firm_members')
            .insert({
              firm_id: firm.id,
              user_id: teamMember.id,
              status: 'active',
              invited_by: firmOwner.id,
            });
        }

        // Create clients for firm
        const { data: existingClients } = await supabaseAdmin
          .from('clients')
          .select('id')
          .eq('firm_id', firm.id);

        if (!existingClients || existingClients.length === 0) {
          await supabaseAdmin
            .from('clients')
            .insert([
              { firm_id: firm.id, name: 'ABC Corporation', email: 'legal@abccorp.com', phone: '+91 98765 43220', user_id: clientUser?.id || null },
              { firm_id: firm.id, name: 'Suresh Patel', email: 'suresh@example.com', phone: '+91 98765 43221' },
            ]);
        }

        // Create cases for firm
        const { data: existingCases } = await supabaseAdmin
          .from('cases')
          .select('id')
          .eq('firm_id', firm.id);

        if (!existingCases || existingCases.length === 0) {
          const { data: clients } = await supabaseAdmin
            .from('clients')
            .select('id')
            .eq('firm_id', firm.id);

          const insertedCases = await supabaseAdmin
            .from('cases')
            .insert([
              {
                firm_id: firm.id,
                created_by: firmOwner.id,
                case_title: 'ABC Corp vs. DEF Industries',
                case_number: 'ARB/2025/1111',
                court: 'Supreme Court of India',
                courtroom: 'Court 1',
                judge: 'Hon. Chief Justice',
                case_type: 'Commercial',
                stage: 'Hearing',
                status: 'active',
                next_hearing_date: '2026-02-12',
                notes: 'Major commercial arbitration case',
                client_id: clients?.[0]?.id || null,
              },
              {
                firm_id: firm.id,
                created_by: teamMember.id,
                case_title: 'Patel vs. State',
                case_number: 'WP/2025/2222',
                court: 'Delhi High Court',
                courtroom: 'Room 8',
                judge: 'Hon. Justice Rao',
                case_type: 'Writ',
                stage: 'Arguments',
                status: 'active',
                next_hearing_date: '2026-02-18',
                notes: 'Writ petition regarding service matter',
                client_id: clients?.[1]?.id || null,
              },
            ])
            .select();

          // Add case assignments
          if (insertedCases.data) {
            for (const caseItem of insertedCases.data) {
              await supabaseAdmin
                .from('case_assignments')
                .insert({
                  case_id: caseItem.id,
                  assigned_to: teamMember.id,
                  assigned_by: firmOwner.id,
                  hearing_date: caseItem.next_hearing_date,
                });

              // Add comments
              await supabaseAdmin
                .from('case_comments')
                .insert([
                  { case_id: caseItem.id, user_id: firmOwner.id, comment: 'Client briefing completed. Ready for next hearing.' },
                  { case_id: caseItem.id, user_id: teamMember.id, comment: 'Documents prepared and reviewed.' },
                ]);

              // Add documents
              await supabaseAdmin
                .from('documents')
                .insert({
                  case_id: caseItem.id,
                  uploaded_by: firmOwner.id,
                  file_name: `${caseItem.case_title.replace(/[^a-zA-Z0-9]/g, '_')}_Brief.pdf`,
                  file_url: 'https://example.com/docs/brief.pdf',
                  document_type: 'misc',
                  file_size: 1024000,
                  shared_with_client: true,
                });

              // Set internal notes (private to firm) so privacy tests pass
              await supabaseAdmin
                .from('cases')
                .update({
                  internal_notes:
                    'PRIVATE: Strategy memo — opposing counsel relies on Section 17. Clients must not see this.',
                })
                .eq('id', caseItem.id);

              // Link client user to this case via case_parties for privacy testing
              if (clientUser) {
                const { data: clientRow } = await supabaseAdmin
                  .from('clients')
                  .select('id')
                  .eq('user_id', clientUser.id)
                  .eq('firm_id', firm.id)
                  .maybeSingle();
                if (clientRow) {
                  await supabaseAdmin
                    .from('case_parties')
                    .insert({
                      case_id: caseItem.id,
                      client_id: clientRow.id,
                      party_role: 'petitioner',
                      party_name: 'ABC Corporation (Demo)',
                    });
                }
              }
            }
          }
        }
      }
    }

    // Create solo lawyer data
    if (soloOwner) {
      const { data: soloFirm } = await supabaseAdmin
        .from('firms')
        .select('id')
        .eq('owner_id', soloOwner.id)
        .single();

      if (soloFirm) {
        // Create clients for solo
        const { data: existingClients } = await supabaseAdmin
          .from('clients')
          .select('id')
          .eq('firm_id', soloFirm.id);

        if (!existingClients || existingClients.length === 0) {
          await supabaseAdmin
            .from('clients')
            .insert([
              { firm_id: soloFirm.id, name: 'Vikram Shah', email: 'vikram@example.com', phone: '+91 98765 43230' },
              { firm_id: soloFirm.id, name: 'Meera Kapoor', email: 'meera@example.com', phone: '+91 98765 43231' },
            ]);
        }

        // Create cases for solo
        const { data: existingCases } = await supabaseAdmin
          .from('cases')
          .select('id')
          .eq('firm_id', soloFirm.id);

        if (!existingCases || existingCases.length === 0) {
          const { data: clients } = await supabaseAdmin
            .from('clients')
            .select('id')
            .eq('firm_id', soloFirm.id);

          const insertedCases = await supabaseAdmin
            .from('cases')
            .insert([
              {
                firm_id: soloFirm.id,
                created_by: soloOwner.id,
                case_title: 'State vs. Sharma',
                case_number: 'CR/2025/1234',
                court: 'Delhi High Court',
                courtroom: 'Room 12',
                judge: 'Hon. Justice Sharma',
                case_type: 'Criminal',
                stage: 'Arguments',
                status: 'active',
                next_hearing_date: '2026-02-10',
                notes: 'Important case regarding property dispute',
                client_id: clients?.[0]?.id || null,
              },
              {
                firm_id: soloFirm.id,
                created_by: soloOwner.id,
                case_title: 'Shah vs. XYZ Ltd',
                case_number: 'CS/2025/5678',
                court: 'District Court, Saket',
                courtroom: 'Room 5',
                judge: 'Hon. Justice Mehta',
                case_type: 'Civil',
                stage: 'Evidence',
                status: 'active',
                next_hearing_date: '2026-02-15',
                notes: 'Contract dispute case',
                client_id: clients?.[0]?.id || null,
              },
              {
                firm_id: soloFirm.id,
                created_by: soloOwner.id,
                case_title: 'Kapoor Property Dispute',
                case_number: 'CS/2025/9012',
                court: 'Civil Court, Dwarka',
                courtroom: 'Room 3',
                judge: 'Hon. Justice Kapoor',
                case_type: 'Civil',
                stage: 'Filing',
                status: 'active',
                next_hearing_date: '2026-02-20',
                notes: 'Family property partition case',
                client_id: clients?.[1]?.id || null,
              },
            ])
            .select();

          // Add documents
          if (insertedCases.data) {
            for (const caseItem of insertedCases.data) {
              await supabaseAdmin
                .from('documents')
                .insert({
                  case_id: caseItem.id,
                  uploaded_by: soloOwner.id,
                  file_name: `${caseItem.case_title.replace(/[^a-zA-Z0-9]/g, '_')}_Order.pdf`,
                  file_url: 'https://example.com/docs/order.pdf',
                  document_type: 'order',
                  file_size: 512000,
                });
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Demo data seeded successfully',
        users: createdUsers.map(u => u.email),
        errors: errors.length > 0 ? errors : undefined,
        loginCredentials: {
          admin: { email: 'admin@vakildesk.com', password: 'Vakil@123' },
          solo: { email: 'solo@vakildesk.com', password: 'Vakil@123' },
          firm: { email: 'firm@vakildesk.com', password: 'Vakil@123' },
          team: { email: 'team@vakildesk.com', password: 'Vakil@123' },
          client: { email: 'client@vakildesk.com', password: 'Vakil@123' },
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error seeding demo data:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
