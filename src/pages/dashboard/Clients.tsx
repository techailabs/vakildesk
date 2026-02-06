import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Briefcase,
  Loader2,
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
import { Label } from "@/components/ui/label";
import { useClients } from "@/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const { clients, isLoading, createClient } = useClients();
  const { firm } = useAuth();
  const { toast } = useToast();

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const handleAddClient = async () => {
    if (!firm?.id || !newClientName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a client name",
        variant: "destructive",
      });
      return;
    }

    await createClient.mutateAsync({
      name: newClientName,
      email: newClientEmail || undefined,
      phone: newClientPhone || undefined,
      firm_id: firm.id,
    });

    setNewClientName("");
    setNewClientEmail("");
    setNewClientPhone("");
    setInviteDialogOpen(false);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-navy-dark hover:bg-gold-light font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Client</DialogTitle>
              <DialogDescription>
                Add a new client to your firm. They can optionally be invited to access their case portal.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input 
                  id="clientName" 
                  placeholder="Enter client name"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@example.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone Number</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
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
              <Button 
                onClick={handleAddClient}
                disabled={createClient.isPending}
                className="bg-gold text-navy-dark hover:bg-gold-light"
              >
                {createClient.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Client"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Clients Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : filteredClients.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-card rounded-lg border border-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-navy">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem>Send Invitation</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-semibold mb-1">{client.name}</h3>
              <span
                className={`status-badge ${
                  client.user_id ? "status-active" : "status-pending"
                } mb-4`}
              >
                {client.user_id ? "Portal Active" : "No Portal Access"}
              </span>

              <div className="space-y-2 text-sm mt-3">
                {client.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{client.case_count || 0} case(s)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No clients found</p>
          <Button 
            className="mt-4 bg-gold text-navy-dark hover:bg-gold-light"
            onClick={() => setInviteDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Client
          </Button>
        </div>
      )}
    </div>
  );
}
