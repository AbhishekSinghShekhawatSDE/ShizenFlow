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

const investmentTypes = ["Mutual Fund", "Stocks", "Fixed Deposit", "PPF", "Gold", "Crypto", "Real Estate", "Other"];

interface InvestmentForm {
  amount: string;
  type: string;
  date: string;
  notes: string;
}

const defaultForm: InvestmentForm = {
  amount: "",
  type: "Other",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

const Investments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<InvestmentForm>(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { data: investments = [], isLoading } = useQuery({
    queryKey: ["investments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("investments").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        amount: parseFloat(form.amount),
        type: form.type,
        date: form.date,
        notes: form.notes || null,
        user_id: user!.id,
      };
      if (editId) {
        const { error } = await supabase.from("investments").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("investments").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast({ title: editId ? "Investment updated" : "Investment added" });
      setForm(defaultForm);
      setEditId(null);
      setOpen(false);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("investments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast({ title: "Investment deleted" });
    },
  });

  const total = investments.reduce((sum, i) => sum + Number(i.amount), 0);

  // Portfolio breakdown
  const breakdown = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + Number(inv.amount);
    return acc;
  }, {} as Record<string, number>);

  const openEdit = (item: any) => {
    setForm({ amount: String(item.amount), type: item.type, date: item.date, notes: item.notes || "" });
    setEditId(item.id);
    setOpen(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Manage your investment portfolio</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setForm(defaultForm); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl"><Plus className="mr-2 h-4 w-4" /> Add Investment</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Investment" : "Add Investment"}</DialogTitle>
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
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>{investmentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl" placeholder="Optional" />
              </div>
              <Button type="submit" className="w-full rounded-xl" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Investment"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-sm text-muted-foreground">Total Portfolio</p>
          <p className="text-2xl font-bold">₹{total.toLocaleString("en-IN")}</p>
        </div>
        {Object.entries(breakdown).slice(0, 3).map(([type, amount]) => (
          <div key={type} className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{type}</p>
            <p className="text-lg font-bold">₹{amount.toLocaleString("en-IN")}</p>
            <p className="text-xs text-primary">{total > 0 ? ((amount / total) * 100).toFixed(1) : 0}%</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : investments.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No investments yet. Start building your portfolio!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{format(new Date(inv.date), "dd MMM yyyy")}</TableCell>
                  <TableCell><span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{inv.type}</span></TableCell>
                  <TableCell className="font-semibold">₹{Number(inv.amount).toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{inv.notes || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(inv)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(inv.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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

export default Investments;
