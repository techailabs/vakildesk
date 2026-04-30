import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Check, Link2, Send } from "lucide-react";
import { useClientInvitations, buildInviteLink } from "@/hooks/useInvitations";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  caseId?: string;
}

export function InviteClientDialog({ open, onOpenChange, caseId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { create } = useClientInvitations();
  const { toast } = useToast();

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLink(null);
    setCopied(false);
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    const inv = await create.mutateAsync({
      client_name: name.trim(),
      client_email: email.trim() || undefined,
      client_phone: phone.trim() || undefined,
      case_id: caseId ?? null,
    });
    setLink(buildInviteLink(inv.token));
  };

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast({ title: "Link copied" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-accent" />
            Invite Client
          </DialogTitle>
          <DialogDescription>
            Generate a secure invitation link. Share it via WhatsApp, email, or SMS — your client
            sets up their own portal access.
          </DialogDescription>
        </DialogHeader>

        {!link ? (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="inv-name">Client Name *</Label>
              <Input
                id="inv-name"
                placeholder="e.g., Mr. Rakesh Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv-email">Email</Label>
              <Input
                id="inv-email"
                type="email"
                placeholder="client@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv-phone">Phone</Label>
              <Input
                id="inv-phone"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Link expires in 14 days. The client will only see cases they are linked to.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-emerald/10 border border-emerald/30 p-4">
              <p className="text-sm font-medium text-emerald-dark mb-1">Invitation ready ✓</p>
              <p className="text-xs text-muted-foreground">
                Share this link with <strong>{name}</strong>. They'll be able to set their password and
                access only their case(s).
              </p>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-md bg-muted border border-border">
              <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <code className="text-xs flex-1 truncate">{link}</code>
              <Button size="sm" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {email && (
              <a
                href={`mailto:${email}?subject=Your%20VakilDesk%20client%20portal%20access&body=${encodeURIComponent(
                  `Hello ${name},\n\nPlease use the link below to access your case portal:\n${link}\n\nThis link expires in 14 days.`,
                )}`}
                className="text-sm text-accent hover:underline inline-flex items-center gap-1"
              >
                <Send className="h-3.5 w-3.5" /> Open in email client
              </a>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {link ? "Done" : "Cancel"}
          </Button>
          {!link && (
            <Button variant="cta" onClick={handleCreate} disabled={create.isPending}>
              {create.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4 mr-2" />
                  Generate Invite Link
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}