import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  FileSearch,
  ListChecks,
  MessageCircle,
  FileText,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { SEO } from "@/components/SEO";

export default function AIFeatures() {
  return (
    <div className="animate-fade-in">
      <SEO
        title="AI for Indian Lawyers — Summaries, Drafts & Client Explanations"
        description="AI that helps Indian advocates summarise case files, extract court directions, draft routine documents, and explain cases to clients. Not legal advice."
        canonicalPath="/ai-features"
        keywords="ai legal assistant india, ai case summary, ai legal drafting, ai for lawyers"
      />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-accent/20 rounded-full">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              AI-Assisted Legal Documentation & Case Understanding
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Save time on routine tasks. Let AI help you prepare, summarize, and 
              communicate — while you focus on legal strategy.
            </p>
          </div>
        </div>
      </section>

      {/* What AI Can Do */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 font-serif">What AI Can Help With</h2>
              <p className="text-muted-foreground">
                Our AI tools are designed to assist with documentation and understanding, 
                not to replace legal judgment.
              </p>
            </div>

            <div className="grid gap-6">
              <AICapabilityCard
                icon={<FileSearch className="h-6 w-6" />}
                title="Summarize Case Files"
                description="Upload lengthy case documents and get concise summaries highlighting key facts, parties, and issues."
              />
              <AICapabilityCard
                icon={<ListChecks className="h-6 w-6" />}
                title="Extract Last Court Directions"
                description="Quickly pull out the specific directions from the last order without reading through the entire document."
              />
              <AICapabilityCard
                icon={<FileText className="h-6 w-6" />}
                title="Generate Preparation Checklist"
                description="Before a hearing, get a checklist of documents to carry, points to argue, and deadlines to mention."
              />
              <AICapabilityCard
                icon={<MessageCircle className="h-6 w-6" />}
                title="Explain Case to Client"
                description="Generate simple, jargon-free explanations of case status and proceedings for clients to understand."
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Limitations - Critical Section */}
      <section className="py-16 bg-destructive/5 border-y border-destructive/20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2 font-serif">Important: What AI Cannot Do</h2>
                <p className="text-muted-foreground">
                  Our AI is a tool to assist lawyers, not replace legal expertise. 
                  Please read carefully.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  AI CAN
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Summarize factual content from documents
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Extract dates, names, and key information
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Translate legal language to simple language
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Create preparation checklists
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Draft routine document templates
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  AI CANNOT
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Provide legal advice or opinions
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Predict case outcomes or likelihood of success
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Suggest legal arguments or strategy
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Replace professional legal judgment
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Guarantee accuracy of all outputs
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>All AI outputs are informational only.</strong> Always review AI-generated 
                content before using it. The lawyer remains responsible for all professional obligations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client AI Feature */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 font-serif">AI for Your Clients</h2>
              <p className="text-muted-foreground">
                Clients often struggle to understand legal proceedings. Our AI can help explain 
                their case in simple terms.
              </p>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold font-serif">"Explain My Case" Button</h3>
              </div>

              <p className="text-muted-foreground mb-6">
                When clients log into their portal, they can click "Explain My Case" to get:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Simple Language Summary:</strong> What the case is about, without legal jargon
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>What Happened Last Time:</strong> Summary of the last hearing in plain terms
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>What's Next:</strong> What the next hearing date is for and what to expect
                  </div>
                </li>
              </ul>

              <div className="ai-disclaimer">
                This feature helps clients understand proceedings but does not constitute legal advice. 
                Clients are always advised to consult with their lawyer for legal guidance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Try AI Features Free</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            AI features are included in all plans. Start your 14-day free trial today.
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

function AICapabilityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-card rounded-lg border border-border flex gap-4">
      <div className="p-3 bg-accent/10 rounded-lg h-fit">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
