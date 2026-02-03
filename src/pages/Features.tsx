import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Users,
  Bell,
  Shield,
  Search,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
          <div className="grid gap-16">
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
              reverse={false}
            />

            {/* Hearing Reminders */}
            <FeatureSection
              icon={<Bell className="h-10 w-10" />}
              title="Hearing Reminders"
              description="Never miss a court date. Get timely reminders for all your upcoming hearings."
              features={[
                "Automatic reminders before hearing dates",
                "Daily 'Today in Court' view",
                "Calendar integration",
                "Track adjournments and new dates",
                "Set custom reminder timings",
              ]}
              reverse={true}
            />

            {/* Document Storage */}
            <FeatureSection
              icon={<FileText className="h-10 w-10" />}
              title="Document Storage"
              description="All your case documents in one secure place. Upload, organize, and find files instantly."
              features={[
                "Upload orders, affidavits, petitions, and more",
                "Categorize documents by type",
                "Quick preview without downloading",
                "Secure cloud storage",
                "Share specific documents with clients",
              ]}
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
                "Clients can upload documents",
                "Read-only access to case information",
                "No access to internal lawyer notes",
              ]}
              reverse={true}
            />

            {/* Team Collaboration */}
            <FeatureSection
              icon={<MessageSquare className="h-10 w-10" />}
              title="Team Collaboration (Firm Plan)"
              description="For law firms with multiple advocates. Collaborate on cases and manage your team."
              features={[
                "Invite team members to your firm",
                "Assign cases to specific advocates",
                "Internal comments per case (hidden from clients)",
                "Track who's handling what",
                "Shared document access within firm",
              ]}
              reverse={false}
            />

            {/* Security */}
            <FeatureSection
              icon={<Shield className="h-10 w-10" />}
              title="Security & Privacy"
              description="Your clients trust you with sensitive information. We help you keep that trust."
              features={[
                "Bank-grade encryption",
                "Complete data isolation per firm",
                "No cross-firm data access",
                "Regular security audits",
                "GDPR-ready privacy controls",
              ]}
              reverse={true}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Try VakilDesk free for 14 days. No credit card required.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
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
  reverse,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  reverse: boolean;
}) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <div className="text-primary mb-4">{icon}</div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`bg-secondary rounded-lg aspect-video flex items-center justify-center ${
          reverse ? "md:order-1" : ""
        }`}
      >
        <div className="text-muted-foreground/30">{icon}</div>
      </div>
    </div>
  );
}
