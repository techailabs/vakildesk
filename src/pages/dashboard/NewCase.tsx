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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Case created",
      description: "Your new case has been added successfully.",
    });

    navigate("/dashboard/cases");
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
        <h1 className="text-2xl font-bold">Add New Case</h1>
        <p className="text-muted-foreground">
          Enter the details of the new case
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Case Information</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">Case Number</Label>
                <Input
                  id="caseNumber"
                  placeholder="e.g., CRL/2024/1234"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseTitle">Case Title</Label>
                <Input
                  id="caseTitle"
                  placeholder="e.g., State vs. Sharma"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caseType">Case Type</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criminal">Criminal</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="writ">Writ Petition</SelectItem>
                  <SelectItem value="consumer">Consumer</SelectItem>
                  <SelectItem value="labour">Labour</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="arbitration">Arbitration</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Court Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold">Court Details</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select court" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((court) => (
                      <SelectItem key={court} value={court.toLowerCase()}>
                        {court}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courtroom">Courtroom</Label>
                <Input id="courtroom" placeholder="e.g., Room 12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="judge">Presiding Judge</Label>
              <Input
                id="judge"
                placeholder="e.g., Hon'ble Justice Verma"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Current Stage</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage.toLowerCase()}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nextHearing">Next Hearing Date</Label>
                <Input id="nextHearing" type="date" />
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold">Client Details</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" placeholder="Enter client name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="client@example.com"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold">Additional Notes</h2>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about the case..."
                rows={4}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button type="submit" disabled={loading}>
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
