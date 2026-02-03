import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Adv. Priya Kapoor",
    email: "priya.kapoor@lawfirm.com",
    role: "lawyer_team",
    status: "active",
    joinedAt: "2024-06-15",
    casesAssigned: 8,
  },
  {
    id: 2,
    name: "Adv. Amit Verma",
    email: "amit.verma@lawfirm.com",
    role: "lawyer_team",
    status: "invited",
    joinedAt: null,
    casesAssigned: 0,
  },
];

export default function Team() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [upgradeAlertOpen, setUpgradeAlertOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const isSoloPlan = teamMembers.length === 0; // Would come from actual plan data

  const handleInviteClick = () => {
    if (isSoloPlan) {
      setUpgradeAlertOpen(true);
    } else {
      setInviteDialogOpen(true);
    }
  };

  const handleConfirmUpgrade = () => {
    setUpgradeAlertOpen(false);
    setInviteDialogOpen(true);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your firm's team members
          </p>
        </div>
        <Button onClick={handleInviteClick}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Team Member
        </Button>
      </div>

      {/* Plan Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-medium">Firm Plan Active</p>
            <p className="text-sm text-muted-foreground">
              ₹799/month + ₹399 per additional team member
            </p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      {teamMembers.length > 0 ? (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Status</th>
                  <th>Cases Assigned</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          member.status === "active"
                            ? "status-active"
                            : "status-pending"
                        }`}
                      >
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </td>
                    <td>{member.casesAssigned} cases</td>
                    <td>
                      {member.joinedAt ? (
                        new Date(member.joinedAt).toLocaleDateString("en-IN")
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          {member.status === "invited" && (
                            <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-semibold mb-2">No Team Members Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You're currently on the Solo plan. Invite your first team member to
            unlock collaboration features and upgrade to the Firm plan.
          </p>
          <Button onClick={handleInviteClick}>
            <Plus className="h-4 w-4 mr-2" />
            Invite First Team Member
          </Button>
        </div>
      )}

      {/* Upgrade Alert */}
      <AlertDialog open={upgradeAlertOpen} onOpenChange={setUpgradeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-accent" />
              </div>
              <AlertDialogTitle>Upgrade to Firm Plan</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Inviting a team member will upgrade your account from Solo (₹499/month) 
              to Firm (₹799/month + ₹399 per additional member).
              <br /><br />
              This enables team collaboration, case assignments, and internal comments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUpgrade}>
              Continue & Upgrade
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your firm. They'll receive an email with 
              instructions to set up their account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="memberName">Full Name</Label>
              <Input id="memberName" placeholder="Adv. Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email Address</Label>
              <Input
                id="memberEmail"
                type="email"
                placeholder="advocate@email.com"
                value={pendingEmail}
                onChange={(e) => setPendingEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setInviteDialogOpen(false)}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
