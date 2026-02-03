import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Shield,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
    setLoading(false);
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Adv. Rajesh Singh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="rajesh.singh@lawfirm.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="barId">Bar Council ID</Label>
            <Input id="barId" placeholder="D/1234/2020" />
          </div>
        </div>
      </div>

      {/* Firm Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Firm Details</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firmName">Firm Name</Label>
            <Input id="firmName" defaultValue="Singh & Associates" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firmAddress">Office Address</Label>
            <Input
              id="firmAddress"
              defaultValue="123, Legal Complex, Delhi"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hearing Reminders</p>
              <p className="text-sm text-muted-foreground">
                Get notified before upcoming hearings
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Client Activity</p>
              <p className="text-sm text-muted-foreground">
                Notifications when clients upload documents
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Team Updates</p>
              <p className="text-sm text-muted-foreground">
                Notifications for team member activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Digest</p>
              <p className="text-sm text-muted-foreground">
                Daily summary of activities
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Subscription</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg mb-4">
          <div>
            <p className="font-semibold">Firm Plan</p>
            <p className="text-sm text-muted-foreground">
              ₹799/month • 2 team members
            </p>
          </div>
          <span className="status-badge status-active">Active</span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline">Billing History</Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Security</h2>
        </div>

        <div className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <p className="text-sm text-muted-foreground">
            Last password change: 30 days ago
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
