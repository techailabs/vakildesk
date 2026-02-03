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
} from "lucide-react";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Digital Court Diary for{" "}
              <span className="text-accent">Indian Lawyers</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Manage your cases, track hearings, collaborate with your team, and
              keep clients informed. All in one professional platform built for
              legal practice in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-gold-light w-full sm:w-auto"
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
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Run Your Practice
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Indian legal practitioners. From solo
              advocates to growing firms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Case Management"
              description="Track all your cases in one place. Store court details, judges, hearing dates, and case stages."
            />
            <FeatureCard
              icon={<Bell className="h-8 w-8" />}
              title="Hearing Reminders"
              description="Never miss a hearing. Get timely reminders for upcoming court dates and deadlines."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Document Storage"
              description="Upload and organize case documents. Orders, affidavits, and evidence all in one place."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Client Portal"
              description="Keep clients informed with their own dashboard. They can view case status and upload documents."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team Collaboration"
              description="For firms: Assign cases to team members, add internal comments, and track work."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure & Private"
              description="Your data stays private. Bank-grade security with complete data isolation per firm."
            />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
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
              note="Unlocks when you invite team members"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Modernize Your Practice?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of Indian lawyers who trust VakilDesk to manage their
            legal practice.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-gold-light"
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
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
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      {note && (
        <p className="text-xs text-accent font-medium mb-4">{note}</p>
      )}
      <ul className="space-y-3 mb-8">
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
