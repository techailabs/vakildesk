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
  Gavel,
} from "lucide-react";
import { SEO, buildBreadcrumbSchema } from "@/components/SEO";

export default function GurgaonDistrictCourt() {
  return (
    <div className="animate-fade-in">
      <SEO
        title="Gurgaon District Court Case Management for Lawyers"
        description="Digital court diary for Gurugram advocates. Track civil, criminal, family, MACT, RERA and consumer matters at Gurgaon District Court and Haryana courts."
        canonicalPath="/courts/gurgaon-district-court"
        keywords="gurgaon district court software, gurugram advocate, haryana rera, mact gurgaon, consumer forum gurugram"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Courts", path: "/" },
          { name: "Gurgaon District Court", path: "/courts/gurgaon-district-court" },
        ])}
      />
      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 rounded-full border border-accent/20">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Gurugram / Gurgaon</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary-foreground font-serif">
              Case Management for{" "}
              <span className="text-accent">Gurgaon District Court</span> Lawyers
            </h1>
            <p className="text-lg text-primary-foreground/75 max-w-3xl mx-auto">
              Digital court diary for advocates practicing at Gurugram District Courts. 
              Track civil suits, criminal matters, and family court cases effortlessly.
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

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-center">
            Why Gurgaon Lawyers Use VakilDesk
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <BenefitCard
              icon={<Calendar className="h-6 w-6" />}
              title="Gurugram Court Date Tracking"
              description="Track hearing dates across all Gurgaon district courts. Get reminders before every court appearance."
            />
            <BenefitCard
              icon={<Gavel className="h-6 w-6" />}
              title="Civil & Criminal Cases"
              description="Manage civil suits, criminal matters, motor accident claims, and family disputes — all case types supported."
            />
            <BenefitCard
              icon={<FileText className="h-6 w-6" />}
              title="Digital Case Files"
              description="Upload plaints, FIRs, charge sheets, and court orders. Find any document in seconds."
            />
            <BenefitCard
              icon={<Users className="h-6 w-6" />}
              title="Client Updates"
              description="Give your Gurgaon clients a portal to check case status and next hearing dates without calling you."
            />
            <BenefitCard
              icon={<Clock className="h-6 w-6" />}
              title="Adjournment Management"
              description="When cases get adjourned at Gurgaon courts, update the date and all reminders adjust automatically."
            />
            <BenefitCard
              icon={<Scale className="h-6 w-6" />}
              title="RERA & Consumer Forum"
              description="Also track matters at Haryana RERA and District Consumer Forum from the same dashboard."
            />
          </div>
        </div>
      </section>

      {/* Courts */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 font-serif text-center">
            Gurgaon & Haryana Courts We Support
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Gurugram District & Sessions Court",
              "Gurugram Civil Court",
              "Family Court, Gurugram",
              "Motor Accident Claims Tribunal",
              "Labour Court, Gurugram",
              "District Consumer Forum",
              "Haryana RERA, Gurugram",
              "Punjab & Haryana High Court (Chandigarh)",
              "Revenue Courts, Gurugram",
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
            Best Legal Software for Gurgaon District Court Advocates
          </h2>
          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p>
              Advocates practicing at the Gurugram District Court complex need a reliable 
              system to manage their growing caseload. VakilDesk is the digital court diary 
              that Gurgaon lawyers trust to organize cases, track hearing dates, and manage 
              client communications.
            </p>
            <p>
              Whether you handle civil litigation, criminal defense, family law, or RERA 
              matters in Gurugram, VakilDesk keeps all your cases organized. No more paper 
              diaries, no more missed dates, no more WhatsApp confusion with juniors.
            </p>
            <p>
              With the rapid growth of Gurugram's legal landscape — from real estate disputes 
              to corporate litigation — having a professional case management system is no 
              longer optional. VakilDesk helps you run a modern practice while maintaining 
              the professional standards expected in Indian courts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif text-primary-foreground">
            Start Managing Your Gurgaon Court Cases
          </h2>
          <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
            14 days free. Built for Gurugram district court advocates.
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
