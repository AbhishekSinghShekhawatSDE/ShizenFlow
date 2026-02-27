import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Brain, TrendingUp, AlertTriangle, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const displayName = user?.user_metadata?.display_name || "there";
  const [aiAlerts, setAiAlerts] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);

  useEffect(() => { document.title = "Dashboard | ShizenFlow"; }, []);

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data } = await supabase.from("expenses").select("*").order("date", { ascending: false });
      return data || [];
    },
  });

  const { data: incomeList = [] } = useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const { data } = await supabase.from("income").select("*").order("date", { ascending: false });
      return data || [];
    },
  });

  const { data: investments = [] } = useQuery({
    queryKey: ["investments"],
    queryFn: async () => {
      const { data } = await supabase.from("investments").select("*").order("date", { ascending: false });
      return data || [];
    },
  });

  const totalExpenses = expenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
  const totalIncome = incomeList.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const totalInvestments = investments.reduce((s: number, i: any) => s + Number(i.amount), 0);
  const savings = totalIncome - totalExpenses;
  const hasData = expenses.length > 0 || incomeList.length > 0 || investments.length > 0;

  // Fetch AI alerts when data is available
  useEffect(() => {
    if (!hasData || aiAlerts.length > 0) return;

    const fetchAlerts = async () => {
      // Check cache first
      const cacheKey = `dashboard-alerts-${new Date().toISOString().split("T")[0]}`;
      const { data: cached } = await supabase
        .from("ai_cache")
        .select("response")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached?.response) {
        try { setAiAlerts(JSON.parse(cached.response)); } catch { /* ignore */ }
        return;
      }

      setAiLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("ai-chat", {
          body: {
            mode: "alerts",
            context: {
              totalIncome,
              totalExpenses,
              savings,
              totalInvestments,
              expenseCount: expenses.length,
              incomeCount: incomeList.length,
            },
          },
        });
        if (error) throw error;
        const alerts = data?.alerts || [];
        setAiAlerts(alerts);

        // Cache for 24h
        await supabase.from("ai_cache").insert({
          cache_key: cacheKey,
          response: JSON.stringify(alerts),
          user_id: user!.id,
          token_count: 0,
        });
      } catch (e: any) {
        console.error("AI alerts error:", e);
      } finally {
        setAiLoading(false);
      }
    };

    fetchAlerts();
  }, [hasData, totalIncome, totalExpenses, savings, totalInvestments]);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {displayName}</h1>
        <p className="text-muted-foreground">Your financial overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Net Savings", value: `₹${savings.toLocaleString("en-IN")}`, sub: savings >= 0 ? "You are in the green" : "You are spending more than you earn", color: savings >= 0 ? "text-primary" : "text-destructive" },
          { label: "Monthly Income", value: `₹${totalIncome.toLocaleString("en-IN")}`, sub: `${incomeList.length} entries`, color: "text-foreground" },
          { label: "Monthly Expenses", value: `₹${totalExpenses.toLocaleString("en-IN")}`, sub: `${expenses.length} entries`, color: "text-foreground" },
        ].map((card) => (
          <div key={card.label} className="bento-card p-6">
            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* AI Alerts */}
      {aiLoading && (
        <div className="bento-card p-6 mb-6 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground text-sm">AI is analyzing your finances...</span>
        </div>
      )}

      {aiAlerts.filter((_, i) => !dismissed.includes(i)).length > 0 && (
        <div className="space-y-3 mb-8">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" /> AI Alerts
          </h2>
          {aiAlerts.map((alert, i) =>
            dismissed.includes(i) ? null : (
              <div key={i} className="bento-card p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground flex-1">{alert}</p>
                <button onClick={() => setDismissed((d) => [...d, i])} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {!hasData && (
        <div className="bento-card p-8 text-center">
          <p className="text-muted-foreground">
            Start by adding your expenses and income to see your dashboard come alive.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
