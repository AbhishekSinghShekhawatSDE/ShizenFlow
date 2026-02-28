import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | ShizenFlow";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Shizen<span className="gradient-text">Flow</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10 text-sm">Last updated: February 28, 2026</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">By creating an account or using ShizenFlow, you agree to be bound by these Terms of Service. If you do not agree, do not use the service. ShizenFlow reserves the right to modify these terms at any time with prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">ShizenFlow is an AI-powered personal finance tracking application that allows users to log expenses, income, and investments, and receive AI-generated insights. The service is provided "as is" and is intended for personal, non-commercial use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground">You must provide accurate information when creating an account. You are responsible for maintaining the security of your credentials and for all activity under your account. Notify us immediately of any unauthorized use. You must be at least 18 years old to use this service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. User Data & Responsibilities</h2>
            <p className="text-muted-foreground">You retain ownership of all financial data you input into ShizenFlow. You are responsible for the accuracy of your data. You agree not to use the service for any illegal activity, including money laundering, fraud, or tax evasion.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. AI-Generated Content Disclaimer</h2>
            <p className="text-muted-foreground">ShizenFlow provides AI-generated financial insights for informational purposes only. This content does NOT constitute financial, investment, tax, or legal advice. Always consult a qualified financial advisor before making financial decisions. ShizenFlow is not liable for any losses resulting from actions taken based on AI-generated content.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">ShizenFlow shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of or inability to use the service. Our total liability shall not exceed the amount paid by you, if any, for the service in the twelve months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Prohibited Conduct</h2>
            <p className="text-muted-foreground">You agree not to: reverse-engineer, disassemble, or attempt to derive the source code of the service; use automated tools to scrape or extract data; impersonate others; or upload malicious content. Violation may result in immediate account termination.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
            <p className="text-muted-foreground">We may suspend or terminate your account at our discretion if you violate these terms. You may delete your account at any time. Upon termination, your data will be deleted in accordance with our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground">These terms are governed by applicable laws. Any disputes shall be resolved through binding arbitration. By using ShizenFlow, you waive the right to participate in class-action lawsuits.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-muted-foreground">For questions about these terms, contact us at legal@shizenflow.app.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
