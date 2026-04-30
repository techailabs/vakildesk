import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Scale, CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { acceptInvitation, fetchInvitationByToken } from "@/hooks/useInvitations";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

export default function AcceptInvite() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [invite, setInvite] = useState<Awaited<ReturnType<typeof fetchInvitationByToken>>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchInvitationByToken(token)
      .then((inv) => {
        if (!inv) {
          setError("Invitation not found.");
        } else if (inv.status !== "pending") {
          setError(`This invitation has been ${inv.status}.`);
        } else if (new Date(inv.expires_at) < new Date()) {
          setError("This invitation has expired.");
        } else {
          setInvite(inv);
          setName(inv.client_name);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAccept = async () => {
    if (!token || !invite) return;
    setSubmitting(true);
    try {
      // If not logged in, sign up first
      if (!user) {
        if (!invite.client_email) {
          throw new Error("This invite has no email. Ask your lawyer to add one and resend.");
        }
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { error: suErr } = await supabase.auth.signUp({
          email: invite.client_email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { name },
          },
        });
        if (suErr && !suErr.message.includes("already registered")) throw suErr;
        // Try sign-in (works if auto-confirm is on or user already exists)
        const { error: siErr } = await supabase.auth.signInWithPassword({
          email: invite.client_email,
          password,
        });
        if (siErr) throw siErr;
      }
      await acceptInvitation(token);
      toast({
        title: "Welcome!",
        description: "You now have access to your client portal.",
      });
      navigate("/client", { replace: true });
    } catch (e: any) {
      toast({ title: "Could not accept invite", description: e.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <SEO
        title="Accept Client Invitation"
        description="Accept your VakilDesk client portal invitation."
        noindex
      />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 justify-center mb-6">
              <Scale className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold font-serif">VakilDesk</span>
            </div>

            {error ? (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>
                <h1 className="text-xl font-bold font-serif">Invalid Invitation</h1>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Link to="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            ) : invite ? (
              <>
                <h1 className="text-xl font-bold font-serif text-center mb-2">
                  You're invited to {invite.firm_name}
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Set up your client portal access to view your case status, hearing dates, and shared
                  documents.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={invite.client_email ?? ""} disabled />
                  </div>
                  {!user && (
                    <div className="space-y-2">
                      <Label>Set a Password</Label>
                      <Input
                        type="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                      />
                    </div>
                  )}
                  <Button
                    variant="cta"
                    className="w-full"
                    onClick={handleAccept}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {user ? "Accept Invitation" : "Create Account & Continue"}
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Clients can only see cases they are listed on. They cannot see internal lawyer notes
                  or other firm data.
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}