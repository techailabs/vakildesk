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
  Gavel,
  MapPin,
  Clock,
  Star,
  UserPlus,
  FolderOpen,
  BellRing,
  Landmark,
} from "lucide-react";
import { SEO, SOFTWARE_SCHEMA, ORG_SCHEMA, buildFAQSchema } from "@/components/SEO";

const HOME_FAQS = [
  {
    question: "Is VakilDesk compliant with Indian data laws?",
    answer:
      "Yes. VakilDesk follows Indian data protection norms, with bank-grade encryption (TLS in transit, AES-256 at rest) and complete data isolation per firm.",
  },
  {
    question: "Can solo advocates use VakilDesk?",
    answer:
      "Absolutely. VakilDesk is built for solo practitioners as well as multi-advocate firms. The Solo plan starts at ₹499/month.",
  },
  {
    question: "Does VakilDesk work for Delhi High Court and District Courts?",
    answer:
      "Yes. VakilDesk supports advocates practising at the Supreme Court, all High Courts (including Delhi HC), and District Courts across India including Gurgaon, Saket, Patiala House, and Tis Hazari.",
  },
  {
    question: "Can clients see my internal notes?",
    answer:
      "No. The client portal shows only the case status, next hearing date, and documents you explicitly mark as shared. Internal notes and billing remain private to the firm.",
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <SEO
        title="VakilDesk: AI-Powered Legal Practice Management for Indian Lawyers"
        description="The digital backbone for modern Indian law firms. Automate court tracking, manage cases, and run a world-class client portal — all in one secure platform."
        canonicalPath="/"
        keywords="legal practice management india, lawyer software india, case management software, advocate diary, delhi high court software, ai legal drafting"
        jsonLd={[ORG_SCHEMA, SOFTWARE_SCHEMA, buildFAQSchema(HOME_FAQS)]}
      />
      {/* Hero Section — Authority-First Design */}
      <section className="relative py-24 md:py-36 bg-primary overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 rounded-full border border-accent/20">
                  <Gavel className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Built for Indian Courts</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary-foreground font-serif">
                  The Digital Backbone for{" "}
                  <span className="text-accent">Modern Indian Law Firms</span>
                </h1>
                
                <p className="text-lg md:text-xl text-primary-foreground/75 max-w-xl leading-relaxed font-sans">
                  Replace paper diaries and WhatsApp chaos. Track cause lists, manage hearings,
                  brief juniors, and run a private client portal — built for advocates practising
                  before Indian courts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-accent text-primary hover:bg-gold-light w-full sm:w-auto font-semibold text-base px-8 h-12"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto h-12"
                    >
                      See How It Works
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-primary-foreground/50">
                  14 days free · No credit card required · Cancel anytime
                </p>
              </div>

              {/* Right: Stats / Social Proof */}
              <div className="hidden lg:block">
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-6">
                    <HeroStat number="500+" label="Advocates Trust Us" />
                    <HeroStat number="15,000+" label="Cases Managed" />
                    <HeroStat number="50+" label="Courts Covered" />
                    <HeroStat number="99.9%" label="Uptime Guaranteed" />
                  </div>
                  <div className="mt-8 pt-6 border-t border-primary-foreground/10">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="h-8 w-8 rounded-full bg-accent/20 border-2 border-primary flex items-center justify-center">
                            <Scale className="h-3 w-3 text-accent" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-xs text-primary-foreground/50 mt-0.5">Trusted by lawyers across India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* e-Courts Trust Strip */}
      <section className="py-8 bg-secondary border-y border-border">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-5 font-medium">
            Aligned with Indian Court Workflows
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center items-center">
            <TrustItem icon={<Landmark className="h-5 w-5" />} text="e-Courts Compatible" />
            <TrustItem icon={<Scale className="h-5 w-5" />} text="Supreme Court · High Courts" />
            <TrustItem icon={<Gavel className="h-5 w-5" />} text="District & Tribunal Ready" />
            <TrustItem icon={<Lock className="h-5 w-5" />} text="Bank-Grade Encryption" />
            <TrustItem icon={<MapPin className="h-5 w-5" />} text="Delhi · Mumbai · Gurgaon" />
          </div>
        </div>
      </section>

      {/* How It Works — 3 Steps */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">How It Works</p>
            <h2 className="text-3xl font-bold mb-4 font-serif">
              From Paper Diary to Digital Practice in 3 Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No training required. Set up your firm, add your cases, and start running a
              modern legal practice the same day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StepCard
              step="01"
              icon={<UserPlus className="h-7 w-7" />}
              title="Create Your Firm"
              description="Sign up in 60 seconds. Add your firm name, invite junior advocates if you have a team, and you're ready."
            />
            <StepCard
              step="02"
              icon={<FolderOpen className="h-7 w-7" />}
              title="Add Cases & Hearings"
              description="Enter case numbers, courts, judges, and next hearing dates. Upload orders and pleadings to keep everything in one place."
            />
            <StepCard
              step="03"
              icon={<BellRing className="h-7 w-7" />}
              title="Stay Court-Ready"
              description="Get hearing reminders, share status with clients via private portal, and brief juniors with one click — never miss a date."
            />
          </div>
        </div>
      </section>

      {/* Why VakilDesk */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Why Lawyers Choose VakilDesk
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Replace your paper diary with a secure digital system built specifically 
              for the Indian legal profession.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <WhyCard icon={<Clock className="h-6 w-6" />} title="Never miss a hearing date" />
            <WhyCard icon={<Bell className="h-6 w-6" />} title="Replace WhatsApp chaos" />
            <WhyCard icon={<Users className="h-6 w-6" />} title="Clear junior coordination" />
            <WhyCard icon={<Gavel className="h-6 w-6" />} title="Designed for Indian courts" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Everything You Need to Run Your Practice
            </h2>
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
      <section className="py-20 bg-background">
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

      {/* GEO Section - Courts */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Used Across Indian Courts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              VakilDesk supports lawyers practicing in courts across India — from the Supreme Court to District Courts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/courts/delhi-high-court" className="group">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors text-center">
                <MapPin className="h-6 w-6 text-accent mx-auto mb-3" />
                <h3 className="font-semibold font-serif mb-1 group-hover:text-accent transition-colors">Delhi High Court</h3>
                <p className="text-sm text-muted-foreground">Advocates practicing at Delhi HC</p>
              </div>
            </Link>
            <Link to="/courts/gurgaon-district-court" className="group">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors text-center">
                <MapPin className="h-6 w-6 text-accent mx-auto mb-3" />
                <h3 className="font-semibold font-serif mb-1 group-hover:text-accent transition-colors">Gurgaon District Court</h3>
                <p className="text-sm text-muted-foreground">Advocates in Gurugram courts</p>
              </div>
            </Link>
            <div className="p-6 rounded-lg border border-border bg-card text-center opacity-70">
              <MapPin className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold font-serif mb-1">More Courts</h3>
              <p className="text-sm text-muted-foreground">Coming soon across India</p>
            </div>
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

      {/* Roadmap / Coming Soon */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3 font-serif">Coming Soon</h2>
            <p className="text-muted-foreground text-sm">Features on our roadmap</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {["WhatsApp Hearing Reminders", "AI Firm Memory", "Payment Analytics", "Multi-City Courts", "Offline Print Packs"].map(f => (
              <span key={f} className="px-4 py-2 text-sm bg-card border border-border rounded-full text-muted-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif text-primary-foreground">
            Ready to Modernize Your Practice?
          </h2>
          <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
            Join hundreds of Indian lawyers who trust VakilDesk to manage their
            legal practice. 14 days free, no credit card required.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-accent text-primary hover:bg-gold-light font-semibold text-base px-8 h-12"
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

function HeroStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-accent">{number}</p>
      <p className="text-xs text-primary-foreground/60 mt-1">{label}</p>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-secondary-foreground">
      <div className="text-accent">{icon}</div>
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
}

function WhyCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
      <div className="text-accent flex-shrink-0">{icon}</div>
      <span className="font-medium text-sm">{title}</span>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-8 rounded-lg border border-border bg-card hover:border-accent/40 transition-colors">
      <span className="absolute -top-4 left-6 px-3 py-1 text-xs font-bold tracking-widest bg-primary text-primary-foreground rounded">
        STEP {step}
      </span>
      <div className="text-accent mb-4 mt-2">{icon}</div>
      <h3 className="text-lg font-bold font-serif mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
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
      <div className="text-accent mb-4">{icon}</div>
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
        <span className="inline-block px-3 py-1 text-xs font-medium bg-accent text-primary rounded-full mb-4">
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
            highlighted ? "bg-accent text-primary hover:bg-gold-light font-semibold" : ""
          }`}
          variant={highlighted ? "default" : "outline"}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
