import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Pricing() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Start as a solo practitioner. Upgrade to a firm when you grow.
              No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Solo Plan */}
            <div className="p-8 rounded-lg border border-border bg-card">
              <h3 className="text-2xl font-bold">Solo</h3>
              <p className="text-muted-foreground text-sm mt-1">
                For individual advocates
              </p>
              <div className="mt-6 mb-8">
                <span className="text-5xl font-bold">₹499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature>Unlimited cases</PricingFeature>
                <PricingFeature>Client portal</PricingFeature>
                <PricingFeature>Document storage (5GB)</PricingFeature>
                <PricingFeature>Hearing reminders</PricingFeature>
                <PricingFeature>Email support</PricingFeature>
                <PricingFeature disabled>Team collaboration</PricingFeature>
                <PricingFeature disabled>Case assignments</PricingFeature>
              </ul>
              <Link to="/signup">
                <Button variant="outline" className="w-full">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Firm Plan */}
            <div className="p-8 rounded-lg border-2 border-accent bg-card shadow-lg relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                Most Popular
              </span>
              <h3 className="text-2xl font-bold">Firm</h3>
              <p className="text-muted-foreground text-sm mt-1">
                For law firms with team members
              </p>
              <div className="mt-6 mb-2">
                <span className="text-5xl font-bold">₹799</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-accent font-medium mb-6">
                + ₹399 per additional team member
              </p>
              <ul className="space-y-4 mb-8">
                <PricingFeature>Everything in Solo</PricingFeature>
                <PricingFeature>Unlimited team members</PricingFeature>
                <PricingFeature>Team collaboration</PricingFeature>
                <PricingFeature>Case assignments</PricingFeature>
                <PricingFeature>Internal comments</PricingFeature>
                <PricingFeature>Document storage (20GB)</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
              <Link to="/signup">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-gold-light">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-lg border border-border bg-card md:col-span-2 lg:col-span-1">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground text-sm mt-1">
                For large firms with custom needs
              </p>
              <div className="mt-6 mb-8">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature>Everything in Firm</PricingFeature>
                <PricingFeature>Unlimited storage</PricingFeature>
                <PricingFeature>Custom integrations</PricingFeature>
                <PricingFeature>Dedicated support</PricingFeature>
                <PricingFeature>SLA guarantees</PricingFeature>
                <PricingFeature>On-premise option</PricingFeature>
              </ul>
              <a href="mailto:enterprise@vakildesk.com">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </a>
            </div>
          </div>

          {/* Plan Note */}
          <div className="mt-12 p-6 rounded-lg bg-secondary/50 border border-border max-w-3xl mx-auto">
            <div className="flex gap-4">
              <HelpCircle className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">
                  How does the upgrade work?
                </h4>
                <p className="text-sm text-muted-foreground">
                  You start with the Solo plan. When you invite your first team
                  member, your account automatically upgrades to the Firm plan.
                  We'll show you a confirmation before this happens, so there
                  are no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="trial" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How long is the free trial?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The free trial is 14 days with full access to all Solo plan
                features. No credit card required to start.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="upgrade" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Can I downgrade from Firm to Solo?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, but you'll need to remove all team members first. Once
                you're the only user, you can switch back to the Solo plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept all major credit/debit cards, UPI, and net banking for
                Indian customers. Enterprise customers can pay via invoice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What happens to my data if I cancel?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can export all your data before cancellation. We retain your
                data for 30 days after cancellation, after which it is
                permanently deleted.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. We use bank-grade encryption, secure cloud infrastructure,
                and strict access controls. Each firm's data is completely
                isolated from other firms.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Free Trial</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            14 days free. No credit card required. Cancel anytime.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function PricingFeature({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-3 text-sm ${
        disabled ? "text-muted-foreground/50" : ""
      }`}
    >
      <CheckCircle
        className={`h-5 w-5 ${disabled ? "text-muted-foreground/30" : "text-success"}`}
      />
      {children}
    </li>
  );
}
