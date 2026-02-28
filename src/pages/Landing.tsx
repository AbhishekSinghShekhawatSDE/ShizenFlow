import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Brain, PieChart, ArrowRight, Zap, Wallet, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  { icon: Wallet, title: "Track Everything", description: "Log expenses, income, and investments in one place. See where your money goes." },
  { icon: Brain, title: "AI Financial Advisor", description: "Chat with AI about your finances. Get spending alerts and savings tips based on your data." },
  { icon: PieChart, title: "Visual Breakdowns", description: "Category charts, monthly trends, portfolio allocation. Your numbers, visualized." },
  { icon: Shield, title: "Private and Secure", description: "Your financial data stays encrypted. No third-party sharing. You own your data." },
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

/* ─── Floating Particle GFX ─── */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(160, 60%, 55%, ${p.o})`;
        ctx.fill();
      }

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(160, 60%, 45%, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ─── Mouse-following glow ─── */
const useMouseGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);
  return { pos, handleMove };
};

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── Magnetic Button ─── */
const MagneticButton = ({ children, className, ...props }: React.ComponentProps<typeof Button>) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <Button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

const Landing = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const { pos, handleMove } = useMouseGlow();

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
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center nav-logo-pulse">
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
            <MagneticButton asChild className="rounded-xl gradient-btn">
              <Link to="/register">Get Started</Link>
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 px-6"
        style={{ background: "var(--gradient-hero)" }}
        onMouseMove={handleMove}
      >
        {/* Particle canvas */}
        <ParticleField />

        {/* Mouse glow */}
        <div
          className="absolute pointer-events-none w-[400px] h-[400px] rounded-full transition-all duration-300 ease-out"
          style={{
            left: pos.x - 200,
            top: pos.y - 200,
            background: "radial-gradient(circle, hsla(160, 60%, 45%, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl animate-float-delayed" />
          {/* Extra orbs */}
          <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-accent/5 blur-2xl orb-drift" />
          <div className="absolute bottom-1/4 right-1/3 w-[150px] h-[150px] rounded-full bg-secondary/8 blur-2xl orb-drift-reverse" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <div className="live-dot" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Finance Tracking</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-up">
            Your Money,{" "}
            <span className="gradient-text italic shimmer-text">Organized.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delayed font-light leading-relaxed">
            Track expenses, grow your investments, and chat with AI for personalized financial guidance. All in one app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delayed-2">
            <MagneticButton size="lg" asChild className="rounded-xl text-base px-8 h-13 gradient-btn group">
              <Link to="/register">
                Start Free <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <Button size="lg" variant="outline" asChild className="rounded-xl text-base px-8 h-13 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
              <Link to="/login">I have an account</Link>
            </Button>
          </div>

          {/* Animated stat chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-up-delayed-2">
            {["Free to use", "AI-powered", "Bank-level security"].map((label, i) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full glass-card text-xs font-medium text-muted-foreground chip-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="max-w-4xl mx-auto mt-20 relative group">
          <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="bento-card p-6 md:p-8 relative">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Savings", value: 245000, prefix: "₹", trend: "+12%", color: "text-primary" },
                { label: "Monthly Income", value: 85000, prefix: "₹", trend: "+5%", color: "text-primary" },
                { label: "Investments", value: 120000, prefix: "₹", trend: "+8%", color: "text-secondary" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4 text-center hover:border-primary/20 transition-colors">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    {stat.prefix}<AnimatedCounter target={stat.value} />
                  </p>
                  <p className={`text-xs font-medium ${stat.color}`}>{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex-1 glass-card rounded-2xl p-4 h-40 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-primary/20 bar-grow" style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}>
                    <div className="w-full rounded-t-md bg-primary h-full" />
                  </div>
                ))}
              </div>
              <div className="w-40 glass-card rounded-2xl p-4 flex flex-col items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary mb-2 score-pulse" />
                <p className="text-xs text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold gradient-text">A+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative" onMouseMove={handleMove}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />

        <div className="max-w-5xl mx-auto relative z-10">
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
              <div
                key={feature.title}
                ref={addRef}
                className="scroll-reveal bento-card p-8 group relative overflow-hidden feature-card"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, hsla(160, 60%, 45%, 0.06) 0%, transparent 60%)" }}
                />
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
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
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef} className="scroll-reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three steps to{" "}
              <span className="gradient-text-accent">financial clarity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {steps.map((s, i) => (
              <div key={s.step} ref={addRef} className="scroll-reveal bento-card p-8 relative group" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary border border-primary/30 step-badge">
                  {s.step}
                </div>
                <span className="text-5xl font-bold text-muted-foreground/10 mb-4 block">{s.step}</span>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={addRef} className="scroll-reveal grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 10000, suffix: "+", label: "Users" },
              { value: 50, suffix: "M+", label: "Transactions Tracked" },
              { value: 99, suffix: "%", label: "Uptime" },
              { value: 4.9, suffix: "/5", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center glass-card rounded-2xl p-6 hover:border-primary/20 transition-colors">
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
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
        <div ref={addRef} className="scroll-reveal max-w-3xl mx-auto text-center bento-card p-12 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 50%, hsl(160, 60%, 45%), transparent 70%)" }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Take control of your finances
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create a free account. Start tracking today. Let AI guide your next move.
            </p>
            <MagneticButton size="lg" asChild className="rounded-xl text-base px-8 h-13 gradient-btn group/btn">
              <Link to="/register">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Shizen<span className="gradient-text">Flow</span></span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered personal finance tracking. Take control of your money.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/register" className="hover:text-foreground transition-colors">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@shizenflow.app</li>
                <li>privacy@shizenflow.app</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 ShizenFlow. All rights reserved.</p>
            <p>
              ShizenFlow provides AI-generated insights for informational purposes only. Not financial advice.{" "}
              <Link to="/disclaimer" className="underline hover:text-foreground transition-colors">Learn more</Link>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
