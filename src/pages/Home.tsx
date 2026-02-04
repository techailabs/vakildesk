import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Users,
  Bell,
  Shield,
  ArrowRight,
  CheckCircle,
  Scale,
  Building2,
  Briefcase,
  Sparkles,
  Lock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
              Digital Court Diary for{" "}
              <span className="text-accent">Indian Lawyers</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto font-sans">
              Manage cases, hearings, documents, clients, and junior preparation 
              — all in one secure platform designed for advocates and law firms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-gold-light w-full sm:w-auto font-semibold"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-secondary border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <TrustItem icon={<Scale className="h-6 w-6" />} text="Built for Indian Courts" />
            <TrustItem icon={<Lock className="h-6 w-6" />} text="Secure & Confidential" />
            <TrustItem icon={<Building2 className="h-6 w-6" />} text="Designed for Advocates & Firms" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Everything You Need to Run Your Practice
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Replace your paper diary with a secure digital system built specifically 
              for the Indian legal profession.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Case Diary Replacement"
              description="Track all your cases, courts, courtrooms, judges, and hearing dates in one organized system."
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8" />}
              title="Hearing Date Reminders"
              description="Never miss a hearing. Get automated reminders before every court date."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Affidavit & Document Drafting"
              description="Upload, organize, and manage case documents. Orders, petitions, and affidavits all in one place."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Client Communication"
              description="Give clients their own portal to view case status, next hearing dates, and shared documents."
            />
            <FeatureCard
              icon={<Briefcase className="h-8 w-8" />}
              title="Firm Collaboration"
              description="For firms: assign cases, add internal notes, and coordinate court appearances with your team."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="AI-Assisted Preparation"
              description="Summarize case files, extract court directions, and generate preparation checklists."
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Who Uses VakilDesk
            </h2>
            <p className="text-muted-foreground">
              From solo practitioners to large chambers — we serve the entire legal profession.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <AudienceCard
              title="Solo Advocates"
              description="Manage your practice efficiently without needing a team."
            />
            <AudienceCard
              title="Law Chambers"
              description="Coordinate between senior and junior advocates seamlessly."
            />
            <AudienceCard
              title="Small & Mid-size Firms"
              description="Full team collaboration with case assignments and internal notes."
            />
            <AudienceCard
              title="Corporate Legal Teams"
              description="Track matters, vendors, and external counsel in one place."
            />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Start solo and grow into a firm when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PlanCard
              title="Solo"
              price="₹499"
              description="Perfect for individual advocates"
              features={[
                "Unlimited cases",
                "Client portal",
                "Document storage",
                "Hearing reminders",
                "Email support",
              ]}
              cta="Start Free Trial"
              href="/signup"
            />
            <PlanCard
              title="Firm"
              price="₹799"
              description="For law firms with team members"
              features={[
                "Everything in Solo",
                "Team collaboration",
                "Case assignments",
                "Internal comments",
                "Priority support",
              ]}
              cta="Start Free Trial"
              href="/signup"
              highlighted
              note="+ ₹399 per additional team member"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Firm plan activates automatically when you invite your first team member.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Ready to Modernize Your Practice?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of Indian lawyers who trust VakilDesk to manage their
            legal practice. 14 days free, no credit card required.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-gold-light font-semibold"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-foreground">
      <div className="text-accent">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  comingSoon,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold font-serif">{title}</h3>
        {comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function AudienceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card text-center">
      <h4 className="font-semibold mb-2 font-serif">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PlanCard({
  title,
  price,
  description,
  features,
  cta,
  href,
  highlighted,
  note,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  note?: string;
}) {
  return (
    <div
      className={`p-8 rounded-lg border ${
        highlighted
          ? "border-accent bg-card shadow-lg"
          : "border-border bg-card"
      }`}
    >
      {highlighted && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold font-serif">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
      <div className="mt-4 mb-2">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      {note && (
        <p className="text-xs text-accent font-medium mb-4">{note}</p>
      )}
      <ul className="space-y-3 mb-8 mt-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-success" />
            {feature}
          </li>
        ))}
      </ul>
      <Link to={href}>
        <Button
          className={`w-full ${
            highlighted ? "bg-accent text-accent-foreground hover:bg-gold-light" : ""
          }`}
          variant={highlighted ? "default" : "outline"}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
