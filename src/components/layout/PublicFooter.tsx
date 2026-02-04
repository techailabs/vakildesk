import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold text-primary-foreground font-serif">VakilDesk</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Digital Court Diary for Indian Lawyers. Manage cases, track
              hearings, and collaborate with your team.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground font-serif">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-features"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  AI Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground font-serif">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground font-serif">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@vakildesk.com"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} VakilDesk. All rights reserved. Made in India 🇮🇳
            </p>
            <p className="text-xs text-muted-foreground">
              VakilDesk is a practice management tool, not a legal service.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
