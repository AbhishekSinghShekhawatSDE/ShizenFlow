import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | ShizenFlow";
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10 text-sm">Last updated: February 28, 2026</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground">We collect information you provide directly, including your name, email address, and financial data you voluntarily enter (expenses, income, and investment records). We also collect usage data such as device information, browser type, IP address, and interaction patterns with our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">Your information is used to provide and improve ShizenFlow's services, including generating AI-powered financial insights and recommendations. We use your data to personalize your experience, maintain account security, and communicate service updates. We do not sell your personal or financial data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Storage & Security</h2>
            <p className="text-muted-foreground">All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use industry-standard security practices, including secure authentication, row-level security policies, and regular security audits. Your financial data is stored on secure, SOC 2-compliant infrastructure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. AI Data Processing</h2>
            <p className="text-muted-foreground">When you use our AI features, your financial data is processed to generate insights and recommendations. AI-generated content is for informational purposes only and does not constitute financial advice. We may cache AI responses temporarily to improve performance but do not use your data to train third-party AI models.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground">We do not share, sell, or rent your personal financial data to any third party. We may share anonymized, aggregated data for analytical purposes. We may disclose information if required by law or to protect the rights and safety of ShizenFlow and its users.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to access, correct, or delete your personal data at any time. You may export your financial data or request complete account deletion. To exercise these rights, contact us at privacy@shizenflow.app.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies & Tracking</h2>
            <p className="text-muted-foreground">We use essential cookies for authentication and session management. We do not use third-party advertising cookies. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">We may update this Privacy Policy periodically. We will notify users of material changes via email or in-app notification. Continued use of ShizenFlow after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
            <p className="text-muted-foreground">For privacy-related inquiries, contact us at privacy@shizenflow.app.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
