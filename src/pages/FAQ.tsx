import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import { SEO, buildFAQSchema } from "@/components/SEO";

const FAQ_DATA: { section: string; items: { value: string; question: string; answer: string }[] }[] = [
  {
    section: "General Questions",
    items: [
      { value: "what-is", question: "What is VakilDesk?", answer: "VakilDesk is a digital practice management tool for Indian lawyers. It helps you manage cases, track hearing dates, store documents, communicate with clients, and collaborate with your team — all in one secure platform. Think of it as a digital replacement for your paper court diary." },
      { value: "legal-advice", question: "Does VakilDesk provide legal advice?", answer: "No. VakilDesk is a practice management tool, not a legal service. We do not provide legal advice, legal opinions, or legal representation. All AI features are informational only and should not be relied upon as legal advice. Lawyers using VakilDesk remain solely responsible for their professional obligations." },
      { value: "who-for", question: "Who is VakilDesk for?", answer: "VakilDesk is designed for Indian legal professionals: solo advocates, law chambers, small and mid-size law firms, and corporate legal teams. Whether you're handling 10 cases or 1,000, VakilDesk scales with your practice." },
    ],
  },
  {
    section: "Security & Privacy",
    items: [
      { value: "data-safe", question: "Is my data safe?", answer: "Yes. We use bank-grade encryption (TLS for data in transit, AES-256 for data at rest). Each firm's data is completely isolated — there is no cross-firm data access. We conduct regular security audits and never sell or share your data with third parties." },
      { value: "data-location", question: "Where is my data stored?", answer: "Your data is stored on secure cloud servers with industry-standard security certifications. We use infrastructure designed for sensitive data, with automatic backups and disaster recovery." },
      { value: "data-ownership", question: "Who owns my data?", answer: "You do. Your case data, documents, and information belong to you. You can export all your data at any time. If you cancel your subscription, your data is retained for 30 days before permanent deletion." },
    ],
  },
  {
    section: "Client Portal",
    items: [
      { value: "clients-use", question: "Can clients use VakilDesk?", answer: "Yes, but with limited access. You can invite clients to view their specific case information, see next hearing dates, and upload documents. Clients cannot see internal notes, other cases, or any confidential information. They can only access what you share with them." },
      { value: "client-ai", question: "What is 'Explain My Case' for clients?", answer: "It's an AI feature that explains the case to clients in simple, non-legal language. Clients can understand what their case is about, what happened at the last hearing, and what the next hearing is for — without you having to explain it repeatedly. Note: This is informational only, not legal advice." },
    ],
  },
  {
    section: "AI Features",
    items: [
      { value: "ai-decide", question: "Does AI decide anything in my case?", answer: "Absolutely not. AI in VakilDesk is strictly an assistant tool. It can summarize documents, extract information, and generate drafts — but it cannot and does not make any legal decisions, provide legal advice, or suggest legal strategy. All AI outputs must be reviewed by the lawyer." },
      { value: "ai-accuracy", question: "Is AI output always accurate?", answer: "No. While our AI is designed to be helpful, it can make mistakes. All AI-generated content should be treated as a draft that needs human review. Never rely solely on AI output for important matters. Always verify information from original sources." },
      { value: "ai-training", question: "Is my data used to train AI?", answer: "No. Your case data and documents are not used to train AI models. Your information remains private and is only used to provide services to you." },
    ],
  },
  {
    section: "Billing & Plans",
    items: [
      { value: "trial", question: "How long is the free trial?", answer: "The free trial is 14 days with full access to all Solo plan features. No credit card is required to start. You'll only be asked for payment details when you decide to continue after the trial." },
      { value: "cancel", question: "What happens if I cancel?", answer: "If you cancel, you'll continue to have access until the end of your current billing period. After that, your account becomes read-only — you can export your data but can't add new cases. After 30 days, your data is permanently deleted unless you resubscribe." },
      { value: "downgrade", question: "Can I downgrade from Firm to Solo?", answer: "Yes, but you'll need to remove all team members first. Once you're the only user in the firm, you can switch back to the Solo plan from your account settings." },
      { value: "refund", question: "Do you offer refunds?", answer: "We offer a 14-day free trial so you can evaluate VakilDesk before paying. If you're not satisfied within the first 7 days of a paid subscription, contact us for a refund discussion. After 7 days, subscriptions are non-refundable but you can cancel anytime to stop future charges." },
    ],
  },
  {
    section: "Features",
    items: [
      { value: "courts", question: "Which courts does VakilDesk support?", answer: "VakilDesk is designed for all Indian courts — from the Supreme Court and High Courts to District Courts, Tribunals, and forums. You can customize court names and add any jurisdiction you practice in." },
      { value: "offline", question: "Does VakilDesk work offline?", answer: "Currently, VakilDesk requires an internet connection. We're working on offline features and document export for court use. This is marked as 'Coming Soon' on our roadmap." },
      { value: "whatsapp", question: "Can I get WhatsApp reminders?", answer: "WhatsApp hearing reminders are on our roadmap and marked as 'Coming Soon'. Currently, we support email reminders and in-app notifications." },
    ],
  },
];

export default function FAQ() {
  const allItems = FAQ_DATA.flatMap((s) => s.items);
  return (
    <div className="animate-fade-in">
      <SEO
        title="FAQ — Common Questions about VakilDesk for Indian Lawyers"
        description="Answers about pricing, security, AI features, client portal, court support, and more for Indian advocates and law firms using VakilDesk."
        canonicalPath="/faq"
        keywords="vakildesk faq, legal software questions india, lawyer software help"
        jsonLd={buildFAQSchema(allItems)}
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Everything you need to know about VakilDesk. Can't find an answer? 
              Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          {FAQ_DATA.map((section) => (
            <FAQSection key={section.section} title={section.section}>
              {section.items.map((it) => (
                <FAQItem key={it.value} value={it.value} question={it.question} answer={it.answer} />
              ))}
            </FAQSection>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4 font-serif">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our support team is here to help. Reach out and we'll get back to you 
            within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@vakildesk.com">
              <Button variant="outline">
                Email Support
              </Button>
            </a>
            <Link to="/signup">
              <Button variant="cta">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 font-serif border-b border-border pb-3">
        {title}
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {children}
      </Accordion>
    </div>
  );
}

function FAQItem({
  value,
  question,
  answer,
}: {
  value: string;
  question: string;
  answer: string;
}) {
  return (
    <AccordionItem value={value} className="border rounded-lg px-6 bg-card">
      <AccordionTrigger className="hover:no-underline text-left">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
