import { useState } from "react";
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

const sources = ["Salary", "Freelance", "Business", "Investment Returns", "Rental", "Other"];

interface IncomeForm {
  amount: string;
  source: string;
  date: string;
  notes: string;
}

const defaultForm: IncomeForm = {
  amount: "",
  source: "Salary",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

const Income = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<IncomeForm>(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { data: incomeList = [], isLoading } = useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const { data, error } = await supabase.from("income").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        amount: parseFloat(form.amount),
        source: form.source,
        date: form.date,
        notes: form.notes || null,
        user_id: user!.id,
      };
      if (editId) {
        const { error } = await supabase.from("income").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("income").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      toast({ title: editId ? "Income updated" : "Income added" });
      setForm(defaultForm);
      setEditId(null);
      setOpen(false);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("income").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      toast({ title: "Income deleted" });
    },
  });

  const total = incomeList.reduce((sum, i) => sum + Number(i.amount), 0);

  const openEdit = (item: any) => {
    setForm({ amount: String(item.amount), source: item.source, date: item.date, notes: item.notes || "" });
    setEditId(item.id);
    setOpen(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Income</h1>
          <p className="text-muted-foreground">Track your earnings and revenue</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setForm(defaultForm); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl"><Plus className="mr-2 h-4 w-4" /> Add Income</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Income" : "Add Income"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" step="0.01" min="0" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Select value={form.source} onValueChange={(v) => setForm({ ...form, source: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>{sources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl" placeholder="Optional" />
              </div>
              <Button type="submit" className="w-full rounded-xl" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Income"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-xl px-4 py-2 inline-block">
        <span className="text-sm text-muted-foreground">Total Income: </span>
        <span className="font-bold text-foreground">₹{total.toLocaleString("en-IN")}</span>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : incomeList.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No income entries yet. Add your first one!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{format(new Date(item.date), "dd MMM yyyy")}</TableCell>
                  <TableCell><span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{item.source}</span></TableCell>
                  <TableCell className="font-semibold">₹{Number(item.amount).toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{item.notes || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Income;
