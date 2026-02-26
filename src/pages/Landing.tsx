import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Brain, PieChart, ArrowRight, Sparkles, Wallet, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Track Everything",
    description: "Expenses, income, and investments — all in one beautiful dashboard.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized financial advice based on your spending patterns.",
  },
  {
    icon: PieChart,
    title: "Visual Analytics",
    description: "Beautiful charts and visualizations to understand your money flow.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and never shared with third parties.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-sans tracking-tight text-foreground">
              Lotus<span className="gradient-text">FINANCE</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Wealth Tracking</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-up">
            Your Money,{" "}
            <span className="gradient-text">Smarter.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delayed font-light leading-relaxed">
            Track expenses, grow investments, and get AI-driven insights — all in one 
            beautifully crafted platform designed for your financial freedom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delayed-2">
            <Button size="lg" asChild className="rounded-xl text-base px-8 h-13 shadow-lg">
              <Link to="/register">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-xl text-base px-8 h-13">
              <Link to="/login">I have an account</Link>
            </Button>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="max-w-4xl mx-auto mt-20 relative">
          <div className="glass-card-elevated rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Savings", value: "₹2,45,000", trend: "+12%", color: "text-primary" },
                { label: "Monthly Income", value: "₹85,000", trend: "+5%", color: "text-primary" },
                { label: "Investments", value: "₹1,20,000", trend: "+8%", color: "text-accent-foreground" },
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
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-primary/20"
                    style={{ height: `${h}%` }}
                  >
                    <div
                      className="w-full rounded-t-md bg-primary transition-all duration-1000"
                      style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                    />
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
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything you need to{" "}
            <span className="gradient-text">grow wealth</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            A complete toolkit to track, analyze, and optimize your personal finances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center glass-card-elevated rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to take control?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of users who are already making smarter financial decisions with Lotus Finance.
          </p>
          <Button size="lg" asChild className="rounded-xl text-base px-8 h-13">
            <Link to="/register">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Lotus Finance</span>
          </div>
          <p>© 2026 Lotus Finance. All rights reserved.</p>
        </div>
      </footer>

      {/* Disclaimer */}
      <div className="py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          Disclaimer: Lotus Finance provides financial tracking and AI-generated insights for informational purposes only. 
          This is not financial advice. Please consult a qualified financial advisor for personalized guidance.
        </p>
      </div>
    </div>
  );
};

export default Landing;
