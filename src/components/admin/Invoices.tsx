import { useEffect, useState } from "react";
import { supabase, type Invoice, type InvoiceItem, type Client, type Project } from "@/lib/supabase";
import { Plus, Loader2, X, Trash2, Printer, Send, CheckCircle2 } from "lucide-react";

const statusColor: Record<string, string> = {
  draft:   "bg-surface text-subtle border-border",
  sent:    "bg-blue-500/15 text-blue-400 border-blue-500/25",
  paid:    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  overdue: "bg-red-500/15 text-red-400 border-red-500/25",
};

const emptyItem: InvoiceItem = { description: "", quantity: 1, rate: 0, amount: 0 };

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Invoice>>({
    client_id: "", project_id: "", items: [{ ...emptyItem }],
    status: "draft", due_date: "", notes: "", tax: 0,
  });

  const fetch = async () => {
    setLoading(true);
    const [iRes, cRes, pRes] = await Promise.all([
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name, email"),
      supabase.from("projects").select("id, title, client_id"),
    ]);
    setInvoices(iRes.data ?? []);
    setClients(cRes.data ?? []);
    setProjects(pRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateItem = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    setForm((prev) => {
      const items = [...(prev.items ?? [])];
      items[idx] = { ...items[idx], [field]: value };
      if (field === "quantity" || field === "rate") {
        items[idx].amount = Number(items[idx].quantity) * Number(items[idx].rate);
      }
      return { ...prev, items };
    });
  };

  const addItem = () => setForm((p) => ({ ...p, items: [...(p.items ?? []), { ...emptyItem }] }));
  const removeItem = (idx: number) => setForm((p) => ({ ...p, items: (p.items ?? []).filter((_, i) => i !== idx) }));

  const subtotal = (form.items ?? []).reduce((s, i) => s + (i.amount ?? 0), 0);
  const taxAmt = subtotal * ((form.tax ?? 0) / 100);
  const total = subtotal + taxAmt;

  const nextInvoiceNumber = () => {
    const nums = invoices.map((i) => parseInt(i.invoice_number?.replace("INV-", "") ?? "0")).filter(Boolean);
    const next = nums.length ? Math.max(...nums) + 1 : 1001;
    return `INV-${next}`;
  };

  const save = async () => {
    setSaving(true);
    const payload = { ...form, subtotal, tax: form.tax ?? 0, total, invoice_number: nextInvoiceNumber() };
    const { data } = await supabase.from("invoices").insert([payload]).select().single();
    if (data) setInvoices((p) => [data, ...p]);
    setSaving(false);
    setModal(false);
    setForm({ client_id: "", project_id: "", items: [{ ...emptyItem }], status: "draft", due_date: "", notes: "", tax: 0 });
  };

  const updateStatus = async (id: string, status: Invoice["status"]) => {
    const extra = status === "paid" ? { paid_date: new Date().toISOString().split("T")[0] } : {};
    await supabase.from("invoices").update({ status, ...extra }).eq("id", id);
    setInvoices((p) => p.map((i) => i.id === id ? { ...i, status, ...extra } : i));
  };

  const clientName = (id: string) => clients.find((c) => c.id === id)?.name ?? "—";
  const clientEmail = (id: string) => clients.find((c) => c.id === id)?.email ?? "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading tracking-tight">Invoices</h1>
          <p className="text-sm text-subtle mt-1">{invoices.length} total invoices</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Create Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-6 w-full max-w-2xl shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-heading">New Invoice</h3>
              <button onClick={() => setModal(false)} className="text-dim hover:text-body"><X className="w-4 h-4" /></button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Client</label>
                <select value={form.client_id} onChange={(e) => setForm((p) => ({ ...p, client_id: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50">
                  <option value="">Select client</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.business_name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Project (optional)</label>
                <select value={form.project_id} onChange={(e) => setForm((p) => ({ ...p, project_id: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50">
                  <option value="">None</option>
                  {projects.filter((p) => !form.client_id || p.client_id === form.client_id).map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Due Date</label>
                <input type="date" value={form.due_date} onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Tax (%)</label>
                <input type="number" value={form.tax} onChange={(e) => setForm((p) => ({ ...p, tax: Number(e.target.value) }))}
                  placeholder="0"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
              </div>
            </div>

            {/* Line items */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-subtle uppercase tracking-wider">Line Items</label>
                <button onClick={addItem} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add item
                </button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[10px] text-subtle uppercase tracking-wider px-1">
                  <span className="col-span-5">Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-center">Rate</span>
                  <span className="col-span-2 text-right">Amount</span>
                  <span className="col-span-1" />
                </div>
                {(form.items ?? []).map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input value={item.description} onChange={(e) => updateItem(idx, "description", e.target.value)}
                      placeholder="Service description"
                      className="col-span-5 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
                    <input type="number" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                      className="col-span-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body text-center focus:outline-none focus:border-primary/50" />
                    <input type="number" value={item.rate} onChange={(e) => updateItem(idx, "rate", Number(e.target.value))}
                      className="col-span-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body text-center focus:outline-none focus:border-primary/50" />
                    <div className="col-span-2 text-right text-xs text-body font-medium">${item.amount.toLocaleString()}</div>
                    <button onClick={() => removeItem(idx)} className="col-span-1 text-dim hover:text-red-400 transition-colors flex justify-center">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-surface rounded-xl p-4 mb-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-subtle"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              {(form.tax ?? 0) > 0 && <div className="flex justify-between text-subtle"><span>Tax ({form.tax}%)</span><span>${taxAmt.toFixed(2)}</span></div>}
              <div className="flex justify-between font-semibold text-heading border-t border-border pt-1.5"><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>

            <div>
              <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={2} placeholder="Payment terms, bank details..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none" />
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving || !form.client_id}
                className="flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} Create Invoice
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 rounded-xl glass text-subtle text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-8 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-subtle uppercase tracking-wider mb-1">Invoice</div>
                <div className="text-xl font-bold text-heading">{preview.invoice_number}</div>
              </div>
              <button onClick={() => setPreview(null)} className="text-dim hover:text-body"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div><div className="text-xs text-subtle mb-1">Bill To</div><div className="text-body font-medium">{clientName(preview.client_id)}</div><div className="text-subtle text-xs">{clientEmail(preview.client_id)}</div></div>
              <div className="text-right"><div className="text-xs text-subtle mb-1">Due Date</div><div className="text-body">{preview.due_date ? new Date(preview.due_date).toLocaleDateString() : "—"}</div></div>
            </div>
            <table className="w-full text-sm mb-4">
              <thead><tr className="border-b border-border"><th className="text-left py-2 text-xs text-subtle">Description</th><th className="text-right py-2 text-xs text-subtle">Qty</th><th className="text-right py-2 text-xs text-subtle">Rate</th><th className="text-right py-2 text-xs text-subtle">Amount</th></tr></thead>
              <tbody className="divide-y divide-border">
                {(preview.items ?? []).map((item, i) => (
                  <tr key={i}><td className="py-2 text-body">{item.description}</td><td className="py-2 text-right text-subtle">{item.quantity}</td><td className="py-2 text-right text-subtle">${item.rate}</td><td className="py-2 text-right text-body font-medium">${item.amount}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="bg-surface rounded-xl p-4 space-y-1 text-sm mb-4">
              <div className="flex justify-between text-subtle"><span>Subtotal</span><span>${preview.subtotal?.toLocaleString()}</span></div>
              {(preview.tax ?? 0) > 0 && <div className="flex justify-between text-subtle"><span>Tax ({preview.tax}%)</span><span>${((preview.subtotal ?? 0) * (preview.tax ?? 0) / 100).toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-heading border-t border-border pt-1"><span>Total</span><span>${preview.total?.toLocaleString()}</span></div>
            </div>
            {preview.notes && <p className="text-xs text-subtle mb-4">{preview.notes}</p>}
            <div className="flex gap-2">
              {preview.status !== "paid" && (
                <button onClick={() => { updateStatus(preview.id!, "paid"); setPreview({ ...preview, status: "paid" }); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> Mark Paid
                </button>
              )}
              {preview.status === "draft" && (
                <button onClick={() => { updateStatus(preview.id!, "sent"); setPreview({ ...preview, status: "sent" }); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors">
                  <Send className="w-4 h-4" /> Mark Sent
                </button>
              )}
              <button onClick={() => window.print()} className="px-4 py-2.5 rounded-xl glass text-subtle text-sm flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-20 text-sm text-subtle">No invoices yet</div>
      ) : (
        <div className="glass gradient-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Invoice #", "Client", "Amount", "Status", "Due Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-subtle font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-body">{inv.invoice_number}</td>
                    <td className="px-4 py-3 text-subtle">{clientName(inv.client_id)}</td>
                    <td className="px-4 py-3 font-semibold text-heading">${(inv.total ?? 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border capitalize ${statusColor[inv.status ?? "draft"]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-subtle text-xs whitespace-nowrap">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setPreview(inv)} className="text-xs text-primary hover:underline">View</button>
                        {inv.status !== "paid" && (
                          <button onClick={() => updateStatus(inv.id!, "paid")} className="text-xs text-emerald-400 hover:underline">Mark Paid</button>
                        )}
                        {inv.status === "draft" && (
                          <button onClick={() => updateStatus(inv.id!, "sent")} className="text-xs text-blue-400 hover:underline">Send</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
