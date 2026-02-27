import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Brain, PieChart, ArrowRight, Zap, Wallet, BarChart3, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  {
    icon: Wallet,
    title: "Track Everything",
    description: "Log expenses, income, and investments in one place. See where your money goes.",
  },
  {
    icon: Brain,
    title: "AI Financial Advisor",
    description: "Chat with AI about your finances. Get spending alerts and savings tips based on your data.",
  },
  {
    icon: PieChart,
    title: "Visual Breakdowns",
    description: "Category charts, monthly trends, portfolio allocation. Your numbers, visualized.",
  },
  {
    icon: Shield,
    title: "Private and Secure",
    description: "Your financial data stays encrypted. No third-party sharing. You own your data.",
  },
];

const steps = [
  { step: "01", title: "Create your account", description: "Sign up with email or Google. Takes 30 seconds." },
  { step: "02", title: "Add your transactions", description: "Log expenses, income, and investments as they happen." },
  { step: "03", title: "Get AI insights", description: "ShizenFlow AI analyzes your data and tells you where to improve." },
];

const faqs = [
  { q: "What is ShizenFlow?", a: "ShizenFlow is an AI-powered finance tracker. You log your money. The AI tells you how to manage it better." },
  { q: "Is it free?", a: "Yes. Create an account and start tracking for free. No credit card required." },
  { q: "How does the AI work?", a: "ShizenFlow AI reads your financial data and produces a health score, spending alerts, savings tips, and investment recommendations. You can also chat with it for personalized advice." },
  { q: "Is my data safe?", a: "Yes. All data is encrypted and stored securely. We do not share your financial information with anyone." },
];

const Landing = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    document.title = "ShizenFlow | AI Finance Tracker";
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-sans tracking-tight text-foreground">
              Shizen<span className="gradient-text">Flow</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-xl gradient-btn">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <div className="live-dot" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Finance Tracking</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-up">
            Your Money,{" "}
            <span className="gradient-text italic">Organized.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delayed font-light leading-relaxed">
            Track expenses, grow your investments, and chat with AI for personalized financial guidance. All in one app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delayed-2">
            <Button size="lg" asChild className="rounded-xl text-base px-8 h-13 gradient-btn">
              <Link to="/register">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-xl text-base px-8 h-13 border-border/50 text-muted-foreground hover:text-foreground">
              <Link to="/login">I have an account</Link>
            </Button>
          </div>

          {/* Stats chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-up-delayed-2">
            {["Free to use", "AI-powered", "Bank-level security"].map((label) => (
              <span key={label} className="px-4 py-2 rounded-full glass-card text-xs font-medium text-muted-foreground">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="max-w-4xl mx-auto mt-20 relative">
          <div className="bento-card p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Savings", value: "₹2,45,000", trend: "+12%", color: "text-primary" },
                { label: "Monthly Income", value: "₹85,000", trend: "+5%", color: "text-primary" },
                { label: "Investments", value: "₹1,20,000", trend: "+8%", color: "text-secondary" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.color}`}>{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex-1 glass-card rounded-2xl p-4 h-40 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-primary/20" style={{ height: `${h}%` }}>
                    <div className="w-full rounded-t-md bg-primary transition-all duration-1000" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
              <div className="w-40 glass-card rounded-2xl p-4 flex flex-col items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold gradient-text">A+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef} className="scroll-reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">grow wealth</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete toolkit to track, analyze, and optimize your personal finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <div key={feature.title} ref={addRef} className="scroll-reveal bento-card p-8 group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-sans">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef} className="scroll-reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three steps to{" "}
              <span className="gradient-text-accent">financial clarity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={s.step} ref={addRef} className="scroll-reveal bento-card p-8" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="text-5xl font-bold text-muted-foreground/20 mb-4 block">{s.step}</span>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div ref={addRef} className="scroll-reveal text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common questions</h2>
          </div>
          <div ref={addRef} className="scroll-reveal">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bento-card px-6 border-0">
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div ref={addRef} className="scroll-reveal max-w-3xl mx-auto text-center bento-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, hsl(160, 60%, 45%), transparent 70%)" }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Take control of your finances
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create a free account. Start tracking today. Let AI guide your next move.
            </p>
            <Button size="lg" asChild className="rounded-xl text-base px-8 h-13 gradient-btn">
              <Link to="/register">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>ShizenFlow</span>
          </div>
          <p>2026 ShizenFlow. All rights reserved.</p>
        </div>
      </footer>

      {/* Disclaimer */}
      <div className="py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          ShizenFlow provides financial tracking and AI-generated insights for informational purposes only.
          This is not financial advice. Consult a qualified financial advisor for personalized guidance.
        </p>
      </div>
    </div>
  );
};

export default Landing;
