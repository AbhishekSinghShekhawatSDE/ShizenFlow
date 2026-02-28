import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };



const AIInsights = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState<Msg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "AI Insights | ShizenFlow"; }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => { const { data } = await supabase.from("expenses").select("*").order("date", { ascending: false }); return data || []; },
  });

  const { data: incomeList = [] } = useQuery({
    queryKey: ["income"],
    queryFn: async () => { const { data } = await supabase.from("income").select("*").order("date", { ascending: false }); return data || []; },
  });

  const { data: investments = [] } = useQuery({
    queryKey: ["investments"],
    queryFn: async () => { const { data } = await supabase.from("investments").select("*").order("date", { ascending: false }); return data || []; },
  });

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalIncome = incomeList.reduce((s, i) => s + Number(i.amount), 0);
  const totalInvestments = investments.reduce((s, i) => s + Number(i.amount), 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

  const categorySpend = expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + Number(e.amount); return acc; }, {} as Record<string, number>);
  const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0];
  const hasData = expenses.length > 0 || incomeList.length > 0 || investments.length > 0;

  const insights: { icon: any; color: string; title: string; text: string }[] = [];
  if (savings < 0) insights.push({ icon: AlertTriangle, color: "text-destructive", title: "Spending Alert", text: `You spend ₹${Math.abs(savings).toLocaleString("en-IN")} more than you earn. Cut discretionary expenses.` });
  else if (savingsRate < 20 && totalIncome > 0) insights.push({ icon: AlertTriangle, color: "text-accent", title: "Low Savings Rate", text: `Your savings rate is ${savingsRate.toFixed(1)}%. Target at least 20%.` });
  else if (savingsRate >= 20) insights.push({ icon: TrendingUp, color: "text-primary", title: "Strong Savings", text: `You save ${savingsRate.toFixed(1)}% of your income. Keep going.` });

  if (topCategory) {
    const pct = totalExpenses > 0 ? ((topCategory[1] / totalExpenses) * 100).toFixed(0) : 0;
    insights.push({ icon: Lightbulb, color: "text-accent", title: "Top Spending Category", text: `${topCategory[0]} is ${pct}% of your expenses (₹${topCategory[1].toLocaleString("en-IN")}). Look for ways to reduce it.` });
  }

  if (totalInvestments === 0 && totalIncome > 0) insights.push({ icon: AlertTriangle, color: "text-accent", title: "No Investments", text: "You have no tracked investments. Allocate 10-15% of income to grow your wealth." });
  else if (totalInvestments > 0) {
    const rate = (totalInvestments / totalIncome) * 100;
    insights.push({ icon: TrendingUp, color: "text-primary", title: "Investment Allocation", text: `You invested ₹${totalInvestments.toLocaleString("en-IN")} (${rate.toFixed(1)}% of income). Diversify across asset classes.` });
  }

  let healthScore = 50;
  if (savingsRate >= 20) healthScore += 20; else if (savingsRate >= 10) healthScore += 10;
  if (totalInvestments > 0) healthScore += 15;
  if (savings >= 0) healthScore += 15;
  healthScore = Math.min(healthScore, 100);
  const healthGrade = healthScore >= 80 ? "A" : healthScore >= 60 ? "B" : healthScore >= 40 ? "C" : "D";

  const financialContext = `User financial data: Total income ₹${totalIncome}, total expenses ₹${totalExpenses}, savings ₹${savings}, savings rate ${savingsRate.toFixed(1)}%, investments ₹${totalInvestments}, health score ${healthScore}/100 (${healthGrade}). Top categories: ${Object.entries(categorySpend).map(([k, v]) => `${k}: ₹${v}`).join(", ")}.`;

  const sendChat = async (input: string) => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Msg = { role: "user", content: input };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsStreaming(true);

    let assistantSoFar = "";
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Please sign in again.", variant: "destructive" });
        setIsStreaming(false);
        return;
      }

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          mode: "chat",
          messages: [...chatMessages, userMsg],
          context: financialContext,
        }),
      });

      if (resp.status === 429) { toast({ title: "Rate limited. Try again in a moment.", variant: "destructive" }); setIsStreaming(false); return; }
      if (resp.status === 402) { toast({ title: "AI credits exhausted. Add credits in Settings.", variant: "destructive" }); setIsStreaming(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setChatMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
    } catch (e: any) {
      console.error("Chat error:", e);
      toast({ title: "AI chat failed", description: e.message, variant: "destructive" });
    } finally {
      setIsStreaming(false);
    }
  };

  const quickPrompts = ["How do I cut spending?", "Is my savings rate healthy?", "Where should I invest?"];

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <p className="text-muted-foreground">Smart analysis of your financial data</p>
      </div>

      {!hasData ? (
        <div className="bento-card p-12 text-center">
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No data yet</p>
          <p className="text-muted-foreground">Add expenses, income, and investments to get personalized AI insights.</p>
        </div>
      ) : (
        <>
          {/* Health Score */}
          <div className="bento-card p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Financial Health Score</p>
            <div className="text-6xl font-bold gradient-text mb-2">{healthGrade}</div>
            <p className="text-muted-foreground">{healthScore}/100 points</p>
            <div className="w-full max-w-xs mx-auto mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${healthScore}%` }} />
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bento-card p-4"><p className="text-sm text-muted-foreground">Total Income</p><p className="text-xl font-bold">₹{totalIncome.toLocaleString("en-IN")}</p></div>
            <div className="bento-card p-4"><p className="text-sm text-muted-foreground">Total Expenses</p><p className="text-xl font-bold">₹{totalExpenses.toLocaleString("en-IN")}</p></div>
            <div className="bento-card p-4"><p className="text-sm text-muted-foreground">Net Savings</p><p className={`text-xl font-bold ${savings >= 0 ? "text-primary" : "text-destructive"}`}>₹{savings.toLocaleString("en-IN")}</p></div>
            <div className="bento-card p-4"><p className="text-sm text-muted-foreground">Investments</p><p className="text-xl font-bold">₹{totalInvestments.toLocaleString("en-IN")}</p></div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Insights</h2>
            {insights.map((insight, i) => (
              <div key={i} className="bento-card p-6 flex items-start gap-4">
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

          {/* AI Chat */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" /> Chat with AI
            </h2>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button key={p} onClick={() => sendChat(p)} className="px-3 py-1.5 rounded-full text-xs font-medium bento-card text-muted-foreground hover:text-foreground transition-colors" disabled={isStreaming}>
                  {p}
                </button>
              ))}
            </div>

            <div className="bento-card p-4 max-h-96 overflow-y-auto space-y-4">
              {chatMessages.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">Ask the AI anything about your finances.</p>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}
              {isStreaming && chatMessages[chatMessages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendChat(chatInput); }} className="flex gap-2">
              <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about your finances..." className="rounded-xl flex-1" disabled={isStreaming} />
              <Button type="submit" className="rounded-xl gradient-btn" disabled={isStreaming || !chatInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsights;
