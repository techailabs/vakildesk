import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Calendar,
  FileText,
  Users,
  Clock,
  Scale,
  Building2,
} from "lucide-react";
import { SEO, buildBreadcrumbSchema } from "@/components/SEO";

export default function DelhiHighCourt() {
  return (
    <div className="animate-fade-in">
      <SEO
        title="Delhi High Court Case Management Software for Advocates"
        description="Track Delhi High Court matters, hearing dates, cause lists, and documents. Built for advocates practising at Delhi HC, Patiala House, Tis Hazari, Saket and more."
        canonicalPath="/courts/delhi-high-court"
        keywords="delhi high court software, delhi advocate software, patiala house court, tis hazari, saket court, case management delhi"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Courts", path: "/" },
          { name: "Delhi High Court", path: "/courts/delhi-high-court" },
        ])}
      />
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 rounded-full border border-accent/20">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Delhi High Court</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary-foreground font-serif">
              Case Management Software for{" "}
              <span className="text-accent">Delhi High Court</span> Advocates
            </h1>
            <p className="text-lg text-primary-foreground/75 max-w-3xl mx-auto">
              Track your Delhi HC matters, manage hearing dates, organize case files, 
              and coordinate with juniors — all from one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button size="lg" variant="cta" className="h-12 px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Delhi HC Lawyers Need VakilDesk */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-center">
            Why Delhi High Court Advocates Choose VakilDesk
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <BenefitCard
              icon={<Calendar className="h-6 w-6" />}
              title="Track Delhi HC Cause Lists"
              description="Stay on top of your Delhi High Court hearing schedule with automated reminders and daily cause list tracking."
            />
            <BenefitCard
              icon={<Building2 className="h-6 w-6" />}
              title="Multiple Bench Management"
              description="Manage cases across different benches — Single Bench, Division Bench, and Full Bench matters organized clearly."
            />
            <BenefitCard
              icon={<FileText className="h-6 w-6" />}
              title="Case Document Organization"
              description="Upload and organize plaints, written statements, affidavits, and court orders for each Delhi HC matter."
            />
            <BenefitCard
              icon={<Users className="h-6 w-6" />}
              title="Junior Coordination"
              description="Assign Delhi HC appearances to junior advocates. They get all case details and documents instantly."
            />
            <BenefitCard
              icon={<Clock className="h-6 w-6" />}
              title="Adjournment Tracking"
              description="When dates get adjourned at Delhi HC, update once and all linked calendars and reminders adjust automatically."
            />
            <BenefitCard
              icon={<Scale className="h-6 w-6" />}
              title="Writ & Civil Matters"
              description="Whether you handle writ petitions, civil appeals, or original suits — track every case type at Delhi HC."
            />
          </div>
        </div>
      </section>

      {/* Courts Covered */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-center">
            Delhi Courts We Support
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Delhi High Court (Original Side)",
              "Delhi High Court (Appellate Side)",
              "Patiala House Courts",
              "Tis Hazari Courts",
              "Saket Courts",
              "Karkardooma Courts",
              "Rohini Courts",
              "Dwarka Courts",
              "National Consumer Disputes Redressal Commission",
            ].map((court) => (
              <div key={court} className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-sm">{court}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 font-serif">
            Best Legal Practice Management Software for Delhi Lawyers
          </h2>
          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p>
              If you are an advocate practicing at the Delhi High Court or any of the district 
              courts in Delhi NCR, VakilDesk is designed specifically for your workflow. Track 
              your Delhi HC matters, manage hearing dates across Patiala House, Tis Hazari, 
              Saket, and other courts — all from one secure dashboard.
            </p>
            <p>
              VakilDesk replaces the traditional paper court diary that Delhi lawyers have 
              relied on for decades. With digital case tracking, automated hearing reminders, 
              and secure document storage, you never miss a date or lose a file again.
            </p>
            <p>
              Whether you handle writ petitions before the Delhi High Court, criminal matters 
              at Patiala House, or civil suits at Tis Hazari — VakilDesk organizes your entire 
              practice in one place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif text-primary-foreground">
            Start Managing Your Delhi HC Cases Today
          </h2>
          <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
            14 days free. No credit card required. Built for Delhi advocates.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="cta" className="h-12 px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <div className="text-accent mb-3">{icon}</div>
      <h3 className="font-semibold mb-2 font-serif">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
