import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Users,
  Bell,
  Shield,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Building2,
} from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Features() {
  return (
    <div className="animate-fade-in">
      <SEO
        title="Features — Case, Hearing, Document & Client Management"
        description="Every feature designed for Indian advocates: case diary, hearing reminders, document storage, client portal, firm collaboration, and AI assistance."
        canonicalPath="/features"
        keywords="legal case management features, lawyer hearing reminders, advocate document storage, indian law firm software"
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Features Built for Indian Legal Practice
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Every feature designed with the needs of Indian advocates in mind.
              From district courts to High Courts and the Supreme Court.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid gap-20">
            {/* Case Management */}
            <FeatureSection
              icon={<Calendar className="h-10 w-10" />}
              title="Case Management"
              description="Keep all your case information organized and accessible. Track every detail from filing to disposal."
              features={[
                "Store case numbers, courts, and jurisdictions",
                "Track judges and courtroom assignments",
                "Record case stages (filing, hearing, evidence, arguments, reserved, disposed)",
                "Organize by active, archived, or all cases",
                "Quick search and filter by any field",
              ]}
              whyLawyers="Replace your paper diary with a searchable, organized digital system that never gets lost."
              reverse={false}
            />

            {/* Hearing Calendar */}
            <FeatureSection
              icon={<Bell className="h-10 w-10" />}
              title="Hearing Calendar & Reminders"
              description="Never miss a court date. See your entire schedule at a glance and get timely reminders."
              features={[
                "Automatic reminders before hearing dates",
                "'Today in Court' dashboard view",
                "Calendar with monthly/weekly views",
                "Track adjournments and new dates",
                "Set custom reminder timings",
              ]}
              whyLawyers="Know exactly where you need to be each day. No more checking multiple diaries."
              reverse={true}
            />

            {/* Document Drafting */}
            <FeatureSection
              icon={<FileText className="h-10 w-10" />}
              title="Document Drafting & Storage"
              description="All your case documents in one secure place. Upload, organize, and find files instantly."
              features={[
                "Upload orders, affidavits, petitions, and more",
                "Categorize documents by type",
                "Quick preview without downloading",
                "Secure cloud storage with encryption",
                "Share specific documents with clients",
              ]}
              whyLawyers="Find any document in seconds. No more digging through files and folders."
              reverse={false}
            />

            {/* Client Portal */}
            <FeatureSection
              icon={<Users className="h-10 w-10" />}
              title="Client Portal"
              description="Keep your clients informed without endless phone calls. They get their own dashboard."
              features={[
                "Clients see their case status at a glance",
                "Next hearing date always visible",
                "Clients can upload documents securely",
                "Read-only access to case information",
                "No access to internal lawyer notes",
              ]}
              whyLawyers="Reduce client calls by 80%. Let them check status anytime."
              reverse={true}
            />

            {/* Firm Collaboration */}
            <FeatureSection
              icon={<Building2 className="h-10 w-10" />}
              title="Firm Collaboration"
              description="For law firms with multiple advocates. Collaborate on cases and manage your team."
              features={[
                "Invite team members to your firm",
                "Assign cases to specific advocates",
                "Internal comments per case (hidden from clients)",
                "Track who's handling what",
                "Shared document access within firm",
              ]}
              whyLawyers="Coordinate court appearances, share notes, and ensure nothing falls through the cracks."
              reverse={false}
              firmOnly
            />

            {/* AI Assistance */}
            <FeatureSection
              icon={<Sparkles className="h-10 w-10" />}
              title="AI Assistance"
              description="Use AI to speed up routine tasks. Summarize files, extract directions, and prepare for hearings."
              features={[
                "Summarize case PDFs quickly",
                "Extract last court directions",
                "Generate court-day preparation checklist",
                "Explain case to client in simple language",
                "Draft basic documents (affidavits, notices)",
              ]}
              whyLawyers="Save hours on preparation. Let AI handle the routine so you can focus on strategy."
              reverse={true}
              comingSoon
            />

            {/* Security */}
            <FeatureSection
              icon={<Shield className="h-10 w-10" />}
              title="Security & Privacy"
              description="Your clients trust you with sensitive information. We help you keep that trust."
              features={[
                "Bank-grade encryption (TLS + AES-256)",
                "Complete data isolation per firm",
                "No cross-firm data access",
                "Regular security audits",
                "GDPR-ready privacy controls",
              ]}
              whyLawyers="Your data stays yours. We never sell or share it with anyone."
              reverse={false}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Try VakilDesk free for 14 days. No credit card required.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="cta">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureSection({
  icon,
  title,
  description,
  features,
  whyLawyers,
  reverse,
  firmOnly,
  comingSoon,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  whyLawyers: string;
  reverse: boolean;
  firmOnly?: boolean;
  comingSoon?: boolean;
}) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-12 items-start ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-primary">{icon}</div>
          {firmOnly && (
            <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded">
              Firm Plan
            </span>
          )}
          {comingSoon && (
            <span className="coming-soon-badge">Coming Soon</span>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4 font-serif">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
          <p className="text-sm font-medium text-foreground">
            <span className="text-accent">Why lawyers use this:</span> {whyLawyers}
          </p>
        </div>
      </div>
      <div
        className={`bg-muted rounded-lg aspect-video flex items-center justify-center border border-border ${
          reverse ? "md:order-1" : ""
        }`}
      >
        <div className="text-muted-foreground/30 scale-150">{icon}</div>
      </div>
    </div>
  );
}
