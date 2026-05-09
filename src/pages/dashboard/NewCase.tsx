import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCases } from "@/hooks/useCases";
import { useClients } from "@/hooks/useClients";

const courts = [
  "Supreme Court of India",
  "Delhi High Court",
  "Bombay High Court",
  "Calcutta High Court",
  "Madras High Court",
  "District Court",
  "Sessions Court",
  "Consumer Forum",
  "Labour Court",
  "Other",
];

const stages = [
  "Filing",
  "Notice",
  "Written Statement",
  "Evidence",
  "Arguments",
  "Reserved",
  "Disposed",
];

export default function NewCase() {
  const [loading, setLoading] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [caseType, setCaseType] = useState("");
  const [court, setCourt] = useState("");
  const [courtroom, setCourtroom] = useState("");
  const [judge, setJudge] = useState("");
  const [stage, setStage] = useState("");
  const [nextHearing, setNextHearing] = useState("");
  const [clientId, setClientId] = useState("");
  const [notes, setNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, firm } = useAuth();
  const { createCase } = useCases();
  const { clients } = useClients();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firm?.id || !user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a case",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await createCase.mutateAsync({
        case_number: caseNumber || null,
        case_title: caseTitle,
        case_type: caseType || null,
        court: court || null,
        courtroom: courtroom || null,
        judge: judge || null,
        stage: stage || 'Filing',
        next_hearing_date: nextHearing || null,
        client_id: clientId || null,
        notes: notes || null,
        firm_id: firm.id,
        created_by: user.id,
        status: 'active',
      } as any).then(async (created: any) => {
        if (internalNotes && created?.id) {
          await supabase
            .from("case_internal_notes")
            .insert({ case_id: created.id, notes: internalNotes });
        }
      });

      navigate("/dashboard/cases");
    } catch (error) {
      console.error("Failed to create case:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </button>
        <h1 className="text-2xl font-bold font-serif">Add New Case</h1>
        <p className="text-muted-foreground">
          Enter the details of the new case
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-serif">Case Information</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">Case Number</Label>
                <Input
                  id="caseNumber"
                  placeholder="e.g., CRL/2024/1234"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseTitle">Case Title *</Label>
                <Input
                  id="caseTitle"
                  placeholder="e.g., State vs. Sharma"
                  required
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caseType">Case Type</Label>
              <Select value={caseType} onValueChange={setCaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Criminal">Criminal</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Writ">Writ Petition</SelectItem>
                  <SelectItem value="Consumer">Consumer</SelectItem>
                  <SelectItem value="Labour">Labour</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Arbitration">Arbitration</SelectItem>
                  <SelectItem value="IPR">IPR</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Court Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold font-serif">Court Details</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Select value={court} onValueChange={setCourt}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select court" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courtroom">Courtroom</Label>
                <Input 
                  id="courtroom" 
                  placeholder="e.g., Room 12"
                  value={courtroom}
                  onChange={(e) => setCourtroom(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="judge">Presiding Judge</Label>
              <Input
                id="judge"
                placeholder="e.g., Hon'ble Justice Verma"
                value={judge}
                onChange={(e) => setJudge(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Current Stage</Label>
                <Select value={stage} onValueChange={setStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextHearing">Next Hearing Date</Label>
                <Input 
                  id="nextHearing" 
                  type="date"
                  value={nextHearing}
                  onChange={(e) => setNextHearing(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold font-serif">Client</h2>

            <div className="space-y-2">
              <Label htmlFor="client">Select Client</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing client (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No client</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                You can add a new client from the Clients page
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold font-serif">Additional Notes</h2>
            <div className="space-y-2">
              <Label htmlFor="notes">Client-Visible Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about the case..."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                These notes can be shared with the client through the portal.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="internalNotes" className="flex items-center gap-2">
                Internal Notes (Firm Only)
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-destructive/10 text-destructive">
                  PRIVATE
                </span>
              </Label>
              <Textarea
                id="internalNotes"
                placeholder="Strategy, opposing counsel notes, billing reminders... never visible to clients."
                rows={4}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="border-destructive/30 focus-visible:ring-destructive/40"
              />
              <p className="text-xs text-muted-foreground">
                🔒 Only your firm members can see these notes — never shared with clients.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button 
              type="submit" 
              disabled={loading}
              variant="cta"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Case"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
