import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];
const paymentMethods = ["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking"];

interface ExpenseForm { amount: string; category: string; date: string; payment_method: string; notes: string; }
const defaultForm: ExpenseForm = { amount: "", category: "Other", date: new Date().toISOString().split("T")[0], payment_method: "Cash", notes: "" };

const Expenses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ExpenseForm>(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => { document.title = "Expenses | ShizenFlow"; }, []);

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expenses").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { amount: parseFloat(form.amount), category: form.category, date: form.date, payment_method: form.payment_method, notes: form.notes || null, user_id: user!.id };
      if (editId) { const { error } = await supabase.from("expenses").update(payload).eq("id", editId); if (error) throw error; }
      else { const { error } = await supabase.from("expenses").insert(payload); if (error) throw error; }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["expenses"] }); toast({ title: editId ? "Expense updated" : "Expense added" }); setForm(defaultForm); setEditId(null); setOpen(false); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("expenses").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["expenses"] }); toast({ title: "Expense deleted" }); },
  });

  const filtered = filterCategory === "all" ? expenses : expenses.filter((e) => e.category === filterCategory);
  const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);

  const openEdit = (expense: any) => {
    setForm({ amount: String(expense.amount), category: expense.category, date: expense.date, payment_method: expense.payment_method || "Cash", notes: expense.notes || "" });
    setEditId(expense.id); setOpen(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track your spending</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setForm(defaultForm); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gradient-btn"><Plus className="mr-2 h-4 w-4" /> Add Expense</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader><DialogTitle>{editId ? "Edit Expense" : "Add Expense"}</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" step="0.01" min="0" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-xl" /></div>
                <div className="space-y-2"><Label>Date</Label><Input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Category</Label><Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}><SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Payment</Label><Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}><SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger><SelectContent>{paymentMethods.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl" placeholder="Optional" /></div>
              <Button type="submit" className="w-full rounded-xl gradient-btn" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Expense"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48 rounded-xl"><SelectValue placeholder="Filter by category" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <div className="bento-card px-4 py-2"><span className="text-sm text-muted-foreground">Total: </span><span className="font-bold text-foreground">₹{total.toLocaleString("en-IN")}</span></div>
      </div>

      <div className="bento-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No expenses yet. Add your first expense to start tracking.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Category</TableHead><TableHead>Amount</TableHead><TableHead>Payment</TableHead><TableHead>Notes</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>{format(new Date(exp.date), "dd MMM yyyy")}</TableCell>
                  <TableCell><span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{exp.category}</span></TableCell>
                  <TableCell className="font-semibold">₹{Number(exp.amount).toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{exp.payment_method}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{exp.notes || ""}</TableCell>
                  <TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => openEdit(exp)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(exp.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Expenses;
