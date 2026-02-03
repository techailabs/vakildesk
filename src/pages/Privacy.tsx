export default function Privacy() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy & Disclaimer</h1>
            <p className="text-primary-foreground/80">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <div className="prose prose-neutral max-w-none">
            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Disclaimer</h2>
              <div className="p-6 bg-secondary/50 rounded-lg border border-border mb-6">
                <p className="text-sm text-muted-foreground mb-0">
                  <strong>Important:</strong> VakilDesk is a practice management
                  tool, not a legal service. We do not provide legal advice,
                  legal representation, or legal opinions of any kind.
                </p>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  VakilDesk is a software-as-a-service platform designed to help
                  legal professionals manage their practice. We are not a law
                  firm.
                </li>
                <li>
                  Any AI-powered features (summaries, suggestions, etc.) are
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
              </ul>
            </div>

            {/* Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>

              <h3 className="text-lg font-semibold mt-8 mb-4">
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
                  our payment partner (Stripe).
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                2. How We Use Your Information
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>To provide and maintain the VakilDesk service.</li>
                <li>To communicate with you about your account and service updates.</li>
                <li>To improve our platform based on usage patterns.</li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                3. Data Security
              </h3>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>All data encrypted in transit (TLS) and at rest.</li>
                <li>Complete data isolation between firms.</li>
                <li>Regular security audits and vulnerability assessments.</li>
                <li>Access controls and authentication measures.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                4. Data Sharing
              </h3>
              <p className="text-muted-foreground">
                We do not sell your data. We only share data with:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Service providers necessary to operate the platform (hosting,
                  payment processing).
                </li>
                <li>When required by law or valid legal process.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                5. Your Rights
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Access and export your data at any time.</li>
                <li>Request deletion of your account and data.</li>
                <li>Opt out of non-essential communications.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                6. Data Retention
              </h3>
              <p className="text-muted-foreground">
                We retain your data as long as your account is active. After
                account deletion, data is permanently removed within 30 days.
              </p>
            </div>

            {/* Terms of Service */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                1. Acceptable Use
              </h3>
              <p className="text-muted-foreground">
                You agree to use VakilDesk only for lawful purposes and in
                accordance with the Bar Council of India regulations.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                2. Your Responsibilities
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Maintain confidentiality of your account credentials.</li>
                <li>Ensure client data is entered with proper authorization.</li>
                <li>Comply with all applicable professional and legal obligations.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                3. Service Availability
              </h3>
              <p className="text-muted-foreground">
                We strive for high availability but do not guarantee
                uninterrupted service. We are not liable for any damages arising
                from service interruptions.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                4. Limitation of Liability
              </h3>
              <p className="text-muted-foreground">
                VakilDesk's liability is limited to the amount you paid for the
                service in the 12 months preceding any claim.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">
                5. Changes to Terms
              </h3>
              <p className="text-muted-foreground">
                We may update these terms from time to time. Continued use after
                changes constitutes acceptance of new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 bg-secondary/50 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">
                For any questions about this policy or your data, contact us at:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:privacy@vakildesk.com"
                  className="text-primary hover:underline"
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
