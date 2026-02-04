import { AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 font-serif">Privacy & Disclaimer</h1>
            <p className="text-primary-foreground/80">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          {/* Important Disclaimer Box */}
          <div className="mb-12 p-6 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold mb-2 font-serif">Important Disclaimer</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>VakilDesk provides workflow and practice management tools only.</strong> 
                    We do not provide legal advice, legal opinions, or legal representation of any kind.
                  </p>
                  <p>
                    <strong>AI outputs are informational only.</strong> Any AI-generated summaries, 
                    explanations, or drafts should be reviewed by a qualified legal professional. 
                    AI cannot and does not provide legal advice or predict outcomes.
                  </p>
                  <p>
                    <strong>Payments between lawyers and clients happen directly.</strong> VakilDesk 
                    does not process or hold any payments between lawyers and their clients.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none">
            {/* Full Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-serif">Disclaimer</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  VakilDesk is a software-as-a-service platform designed to help
                  legal professionals manage their practice. We are not a law
                  firm and do not practice law.
                </li>
                <li>
                  Any AI-powered features (summaries, suggestions, drafts, explanations) are
                  provided for informational purposes only and should not be
                  relied upon as legal advice.
                </li>
                <li>
                  Lawyers using VakilDesk are solely responsible for their
                  professional obligations, including client confidentiality,
                  conflict checks, and legal advice.
                </li>
                <li>
                  VakilDesk does not guarantee any specific outcomes for cases
                  managed through our platform.
                </li>
                <li>
                  The "Explain My Case" feature for clients provides simplified 
                  explanations of case status and does not constitute legal advice. 
                  Clients should always consult with their lawyer for legal guidance.
                </li>
              </ul>
            </div>

            {/* Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-serif">Privacy Policy</h2>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                1. Information We Collect
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Information:</strong> Name, email, phone
                  number when you sign up.
                </li>
                <li>
                  <strong>Case Data:</strong> Case details, documents, and notes
                  you enter into the system.
                </li>
                <li>
                  <strong>Usage Data:</strong> How you use the platform to
                  improve our service.
                </li>
                <li>
                  <strong>Payment Information:</strong> Processed securely by
                  our payment partner. We do not store card details.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                2. How We Use Your Information
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>To provide and maintain the VakilDesk service.</li>
                <li>To communicate with you about your account and service updates.</li>
                <li>To improve our platform based on usage patterns.</li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                3. AI and Your Data
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Your case data and documents are NOT used to train AI models.
                </li>
                <li>
                  AI features process your data only to provide the requested service 
                  (summaries, explanations, etc.) and do not retain it.
                </li>
                <li>
                  All AI outputs are generated for your use only and are not shared 
                  with other users or third parties.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                4. Data Security
              </h3>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>All data encrypted in transit (TLS) and at rest (AES-256).</li>
                <li>Complete data isolation between firms — no cross-firm access.</li>
                <li>Regular security audits and vulnerability assessments.</li>
                <li>Access controls and multi-factor authentication options.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                5. Data Sharing
              </h3>
              <p className="text-muted-foreground">
                We do not sell your data. We only share data with:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Service providers necessary to operate the platform (hosting,
                  payment processing, AI services).
                </li>
                <li>When required by law or valid legal process.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                6. Your Rights
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Access and export your data at any time.</li>
                <li>Request deletion of your account and data.</li>
                <li>Opt out of non-essential communications.</li>
                <li>Request information about what data we hold about you.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                7. Data Retention
              </h3>
              <p className="text-muted-foreground">
                We retain your data as long as your account is active. After
                account deletion or cancellation, data is retained for 30 days 
                (in case you wish to restore) and then permanently deleted.
              </p>
            </div>

            {/* Terms of Service */}
            <div>
              <h2 className="text-2xl font-bold mb-6 font-serif">Terms of Service</h2>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                1. Acceptable Use
              </h3>
              <p className="text-muted-foreground">
                You agree to use VakilDesk only for lawful purposes and in
                accordance with the Bar Council of India regulations and all 
                applicable laws.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                2. Your Responsibilities
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Maintain confidentiality of your account credentials.</li>
                <li>Ensure client data is entered with proper authorization.</li>
                <li>Comply with all applicable professional and legal obligations.</li>
                <li>Review all AI-generated content before use.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                3. Service Availability
              </h3>
              <p className="text-muted-foreground">
                We strive for high availability but do not guarantee
                uninterrupted service. We are not liable for any damages arising
                from service interruptions.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                4. Limitation of Liability
              </h3>
              <p className="text-muted-foreground">
                VakilDesk's liability is limited to the amount you paid for the
                service in the 12 months preceding any claim. We are not liable 
                for any indirect, consequential, or punitive damages.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4 font-serif">
                5. Changes to Terms
              </h3>
              <p className="text-muted-foreground">
                We may update these terms from time to time. We will notify you 
                of material changes. Continued use after changes constitutes 
                acceptance of new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 font-serif">Contact Us</h3>
              <p className="text-muted-foreground">
                For any questions about this policy or your data, contact us at:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:privacy@vakildesk.com"
                  className="text-accent hover:underline font-medium"
                >
                  privacy@vakildesk.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
