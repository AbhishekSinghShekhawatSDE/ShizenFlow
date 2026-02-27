import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIInsights = () => {
  const { user } = useAuth();

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

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalIncome = incomeList.reduce((s, i) => s + Number(i.amount), 0);
  const totalInvestments = investments.reduce((s, i) => s + Number(i.amount), 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

  // Category breakdown
  const categorySpend = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {} as Record<string, number>);
  const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0];

  const hasData = expenses.length > 0 || incomeList.length > 0 || investments.length > 0;

  // Generate insights based on data
  const insights = [];

  if (savings < 0) {
    insights.push({ icon: AlertTriangle, color: "text-destructive", title: "Spending Alert", text: `You're spending ₹${Math.abs(savings).toLocaleString("en-IN")} more than you earn. Consider reducing discretionary expenses.` });
  } else if (savingsRate < 20 && totalIncome > 0) {
    insights.push({ icon: AlertTriangle, color: "text-yellow-500", title: "Low Savings Rate", text: `Your savings rate is ${savingsRate.toFixed(1)}%. Aim for at least 20% to build a strong financial cushion.` });
  } else if (savingsRate >= 20) {
    insights.push({ icon: TrendingUp, color: "text-primary", title: "Great Savings!", text: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!` });
  }

  if (topCategory) {
    const pct = totalExpenses > 0 ? ((topCategory[1] / totalExpenses) * 100).toFixed(0) : 0;
    insights.push({ icon: Lightbulb, color: "text-accent-foreground", title: "Top Spending Category", text: `${topCategory[0]} accounts for ${pct}% of your expenses (₹${topCategory[1].toLocaleString("en-IN")}). Look for ways to optimize here.` });
  }

  if (totalInvestments === 0 && totalIncome > 0) {
    insights.push({ icon: AlertTriangle, color: "text-yellow-500", title: "No Investments", text: "You haven't tracked any investments yet. Consider allocating at least 10-15% of income to investments." });
  } else if (totalInvestments > 0) {
    const investmentRate = (totalInvestments / totalIncome) * 100;
    insights.push({ icon: TrendingUp, color: "text-primary", title: "Investment Allocation", text: `You've invested ₹${totalInvestments.toLocaleString("en-IN")} (${investmentRate.toFixed(1)}% of income). Diversify across asset classes for optimal returns.` });
  }

  // Financial health score
  let healthScore = 50;
  if (savingsRate >= 20) healthScore += 20;
  else if (savingsRate >= 10) healthScore += 10;
  if (totalInvestments > 0) healthScore += 15;
  if (savings >= 0) healthScore += 15;
  healthScore = Math.min(healthScore, 100);
  const healthGrade = healthScore >= 80 ? "A" : healthScore >= 60 ? "B" : healthScore >= 40 ? "C" : "D";

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <p className="text-muted-foreground">Smart analysis of your financial data</p>
      </div>

      {!hasData ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No data yet</p>
          <p className="text-muted-foreground">Start adding expenses, income, and investments to get personalized AI insights.</p>
        </div>
      ) : (
        <>
          {/* Health Score */}
          <div className="glass-card-elevated rounded-2xl p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Financial Health Score</p>
            <div className="text-6xl font-bold gradient-text mb-2">{healthGrade}</div>
            <p className="text-muted-foreground">{healthScore}/100 points</p>
            <div className="w-full max-w-xs mx-auto mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${healthScore}%` }} />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-xl font-bold">₹{totalIncome.toLocaleString("en-IN")}</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-bold">₹{totalExpenses.toLocaleString("en-IN")}</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Net Savings</p>
              <p className={`text-xl font-bold ${savings >= 0 ? "text-primary" : "text-destructive"}`}>₹{savings.toLocaleString("en-IN")}</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Investments</p>
              <p className="text-xl font-bold">₹{totalInvestments.toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Insights & Recommendations</h2>
            {insights.map((insight, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 ${insight.color}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold mb-1">{insight.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsights;
