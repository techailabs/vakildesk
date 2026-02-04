import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MessageCircle,
  Calendar,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";

// This is a client dashboard component - would be shown when user role is 'client'
// For now, creating it as a reference component

// Mock client case data
const clientCase = {
  id: 1,
  title: "Property Dispute - ABC vs. XYZ",
  caseNumber: "CS/123/2025",
  court: "District Court, Saket",
  lawyerName: "Adv. Rajesh Kumar",
  status: "Active",
  stage: "Evidence",
  nextHearing: "2026-02-15",
  lastUpdated: "2026-02-01",
};

const caseTimeline = [
  {
    id: 1,
    date: "2026-02-01",
    event: "Arguments heard",
    description: "Plaintiff arguments completed. Next: Defendant arguments.",
  },
  {
    id: 2,
    date: "2026-01-15",
    event: "Evidence submitted",
    description: "Property documents and sale deed submitted to court.",
  },
  {
    id: 3,
    date: "2025-12-20",
    event: "Case filed",
    description: "Suit filed for specific performance of contract.",
  },
];

export default function ClientDashboard() {
  return (
    <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold font-serif">Your Case Status</h1>
        <p className="text-muted-foreground">
          View your case details and upcoming hearings
        </p>
      </div>

      {/* Case Overview Card */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold font-serif">{clientCase.title}</h2>
            <p className="text-sm text-muted-foreground">
              Case No: {clientCase.caseNumber}
            </p>
          </div>
          <span className="status-badge status-active">{clientCase.status}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <InfoRow label="Court" value={clientCase.court} />
          <InfoRow label="Your Lawyer" value={clientCase.lawyerName} />
          <InfoRow label="Current Stage" value={clientCase.stage} />
          <InfoRow label="Last Updated" value={new Date(clientCase.lastUpdated).toLocaleDateString("en-IN")} />
        </div>

        {/* Next Hearing Highlight */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Next Hearing Date</p>
              <p className="text-lg font-bold">
                {new Date(clientCase.nextHearing).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explain My Case */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold font-serif mb-2">
              Understand Your Case
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click below to get a simple, jargon-free explanation of your case 
              status, what happened at the last hearing, and what to expect next.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-gold-light">
              <MessageCircle className="h-4 w-4 mr-2" />
              Explain My Case
            </Button>
          </div>
        </div>
        <div className="ai-disclaimer mt-4">
          This explanation is for your understanding only and does not constitute 
          legal advice. Please consult your lawyer for legal guidance.
        </div>
      </div>

      {/* Case Timeline */}
      <div className="bg-card rounded-lg border border-border">
        <div className="section-header px-6 pt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold font-serif">Case Timeline</h2>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {caseTimeline.map((event, index) => (
              <div key={event.id} className="relative pl-6">
                {index !== caseTimeline.length - 1 && (
                  <div className="absolute left-[7px] top-6 w-0.5 h-full bg-border" />
                )}
                <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background" />
                <div className="pb-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-IN")}
                  </p>
                  <h4 className="font-medium">{event.event}</h4>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shared Documents */}
      <div className="bg-card rounded-lg border border-border">
        <div className="section-header px-6 pt-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold font-serif">Shared Documents</h2>
          </div>
          <Button variant="outline" size="sm">
            Upload Document
          </Button>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-3">
            <DocumentRow
              name="Court Order - 01 Feb 2026"
              type="Order"
              date="2026-02-01"
            />
            <DocumentRow
              name="Property Documents"
              type="Evidence"
              date="2026-01-15"
            />
            <DocumentRow
              name="Sale Deed Copy"
              type="Evidence"
              date="2025-12-20"
            />
          </div>
        </div>
      </div>

      {/* Contact Lawyer */}
      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2 font-serif">Have Questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Contact your lawyer for legal advice and case updates.
        </p>
        <Button variant="outline">
          Contact {clientCase.lawyerName}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function DocumentRow({
  name,
  type,
  date,
}: {
  name: string;
  type: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString("en-IN")}
        </span>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
}
