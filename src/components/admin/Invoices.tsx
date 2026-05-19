import { useEffect, useState } from "react";
import { supabase, type Invoice, type InvoiceItem, type Client, type Project } from "@/lib/supabase";
import { Plus, Loader2, X, Trash2, Printer, Send, CheckCircle2, Eye, Edit2 } from "lucide-react";

const statusStyle: Record<string, React.CSSProperties> = {
  draft:   { background: "oklch(1 0 0 / 0.06)",          color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.12)" },
  sent:    { background: "oklch(0.62 0.21 240 / 0.15)",   color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" },
  paid:    { background: "oklch(0.62 0.20 145 / 0.15)",   color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  overdue: { background: "oklch(0.62 0.24 27 / 0.15)",    color: "oklch(0.72 0.20 27)",  border: "1px solid oklch(0.62 0.24 27 / 0.3)" },
};

const S = {
  card:    { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 } as React.CSSProperties,
  input:   { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 } as React.CSSProperties,
  heading: { color: "oklch(0.93 0.012 285)" } as React.CSSProperties,
  body:    { color: "oklch(0.72 0.018 285)" } as React.CSSProperties,
  subtle:  { color: "oklch(0.52 0.015 285)" } as React.CSSProperties,
};

const emptyItem: InvoiceItem = { description: "", quantity: 1, rate: 0, amount: 0 };

const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar", symbol: "$" },
  { value: "INR", label: "INR — Indian Rupee", symbol: "₹" },
] as const;

function sym(currency?: string) {
  return currency === "INR" ? "₹" : "$";
}

function fmt(amount: number, currency?: string) {
  if (currency === "INR") {
    return "₹" + amount.toLocaleString("en-IN");
  }
  return "$" + amount.toLocaleString("en-US");
}

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up"
      style={{ background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" }}>
      {msg}
    </div>
  );
}

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState<Partial<Invoice>>({ client_id: "", project_id: "", currency: "USD", items: [{ ...emptyItem }], status: "draft", due_date: "", notes: "", tax: 0 });

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const fetchAll = async () => {
    setLoading(true);
    const [iR, cR, pR] = await Promise.all([
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name, email"),
      supabase.from("projects").select("id, title, client_id"),
    ]);
    setInvoices(iR.data ?? []);
    setClients(cR.data ?? []);
    setProjects(pR.data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateItem = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    setForm(prev => {
      const items = [...(prev.items ?? [])];
      items[idx] = { ...items[idx], [field]: value };
      if (field === "quantity" || field === "rate") items[idx].amount = Number(items[idx].quantity) * Number(items[idx].rate);
      return { ...prev, items };
    });
  };

  const subtotal = (form.items ?? []).reduce((s, i) => s + (i.amount ?? 0), 0);
  const taxAmt = subtotal * ((form.tax ?? 0) / 100);
  const total = subtotal + taxAmt;

  const nextNum = () => {
    const nums = invoices.map(i => parseInt(i.invoice_number?.replace("INV-", "") ?? "0")).filter(Boolean);
    return `INV-${nums.length ? Math.max(...nums) + 1 : 1001}`;
  };

  const save = async () => {
    if (!form.client_id) { showToast("Please select a client", "error"); return; }
    setSaving(true);
    const payload = {
      ...form,
      // Fix: send null instead of empty string for optional UUID fields
      project_id: form.project_id || null,
      due_date: form.due_date || null,
      subtotal,
      tax: form.tax ?? 0,
      total,
      currency: form.currency ?? "USD",
      invoice_number: nextNum(),
    };
    const { data, error } = await supabase.from("invoices").insert([payload]).select().single();
    if (error) {
      console.error("Invoice create error:", error);
      showToast(`Failed: ${error.message}`, "error");
    } else {
      setInvoices(p => [data, ...p]);
      showToast("Invoice created");
      setModal(false);
      setForm({ client_id: "", project_id: "", currency: "USD", items: [{ ...emptyItem }], status: "draft", due_date: "", notes: "", tax: 0 });
    }
    setSaving(false);
  };

  const updateStatus = async (id: string, status: Invoice["status"]) => {
    const extra = status === "paid" ? { paid_date: new Date().toISOString().split("T")[0] } : {};
    const { error } = await supabase.from("invoices").update({ status, ...extra }).eq("id", id);
    if (error) showToast("Failed to update status", "error");
    else { setInvoices(p => p.map(i => i.id === id ? { ...i, status, ...extra } : i)); if (preview?.id === id) setPreview(prev => prev ? { ...prev, status, ...extra } : null); showToast(`Marked as ${status}`); }
  };

  const deleteInvoice = async (id: string, num: string) => {
    if (!confirm(`Delete ${num}? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) showToast("Failed to delete invoice", "error");
    else { setInvoices(p => p.filter(i => i.id !== id)); showToast("Invoice deleted"); }
    setDeleting(null);
  };

  const clientName = (id: string) => clients.find(c => c.id === id)?.name ?? "—";
  const clientEmail = (id: string) => clients.find(c => c.id === id)?.email ?? "";

  const stats = {
    total: invoices.length,
    draft: invoices.filter(i => i.status === "draft").length,
    sent: invoices.filter(i => i.status === "sent").length,
    paid: invoices.filter(i => i.status === "paid").length,
    revenue: invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.total ?? 0), 0),
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={S.heading}>Invoices</h1>
          <p className="text-sm mt-0.5" style={S.subtle}>{invoices.length} total invoices</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "oklch(0.66 0.22 295)" },
          { label: "Sent", value: stats.sent, color: "oklch(0.62 0.21 240)" },
          { label: "Paid", value: stats.paid, color: "oklch(0.62 0.20 145)" },
          { label: "Revenue", value: loading ? "—" : `$${stats.revenue.toLocaleString()}`, color: "oklch(0.62 0.20 145)" },
        ].map(s => (
          <div key={s.label} className="px-4 py-3 rounded-xl" style={S.card}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={S.subtle}>{s.label}</div>
            <div className="text-xl font-semibold" style={{ color: s.color }}>{loading ? "—" : s.value}</div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto" style={{ background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold" style={S.heading}>New Invoice</h3>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-white/5" style={S.subtle}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Client *</label>
                <select value={form.client_id} onChange={e => setForm(p => ({ ...p, client_id: e.target.value }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                  <option value="">Select client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} — {c.business_name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Project (optional)</label>
                <select value={form.project_id} onChange={e => setForm(p => ({ ...p, project_id: e.target.value }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                  <option value="">None</option>
                  {projects.filter(p => !form.client_id || p.client_id === form.client_id).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Currency</label>
                <select value={form.currency ?? "USD"} onChange={e => setForm(p => ({ ...p, currency: e.target.value as "USD" | "INR" }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                  {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Tax (%)</label>
                <input type="number" value={form.tax} onChange={e => setForm(p => ({ ...p, tax: Number(e.target.value) }))} placeholder="0" className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input} />
              </div>
            </div>

            {/* Line items */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider" style={S.subtle}>Line Items</label>
                <button onClick={() => setForm(p => ({ ...p, items: [...(p.items ?? []), { ...emptyItem }] }))} className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: "oklch(0.66 0.22 295)" }}>
                  <Plus className="w-3 h-3" /> Add item
                </button>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid oklch(1 0 0 / 0.08)" }}>
                <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ background: "oklch(1 0 0 / 0.04)", color: "oklch(0.42 0.012 285)" }}>
                  <span className="col-span-5">Description</span><span className="col-span-2 text-center">Qty</span><span className="col-span-2 text-center">Rate ({sym(form.currency)})</span><span className="col-span-2 text-right">Amount</span><span className="col-span-1" />
                </div>
                {(form.items ?? []).map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center px-3 py-2" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
                    <input value={item.description} onChange={e => updateItem(idx, "description", e.target.value)} placeholder="Service description" className="col-span-5 px-2 py-1.5 text-xs focus:outline-none rounded-lg" style={S.input} />
                    <input type="number" value={item.quantity} onChange={e => updateItem(idx, "quantity", Number(e.target.value))} className="col-span-2 px-2 py-1.5 text-xs text-center focus:outline-none rounded-lg" style={S.input} />
                    <input type="number" value={item.rate} onChange={e => updateItem(idx, "rate", Number(e.target.value))} className="col-span-2 px-2 py-1.5 text-xs text-center focus:outline-none rounded-lg" style={S.input} />
                    <div className="col-span-2 text-right text-xs font-semibold" style={S.heading}>{fmt(item.amount, form.currency)}</div>
                    <button onClick={() => setForm(p => ({ ...p, items: (p.items ?? []).filter((_, i) => i !== idx) }))} className="col-span-1 flex justify-center transition-colors hover:text-red-400" style={S.subtle}><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="rounded-xl p-4 mb-4 space-y-1.5 text-sm" style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.07)" }}>
              <div className="flex justify-between" style={S.subtle}><span>Subtotal</span><span>{fmt(subtotal, form.currency)}</span></div>
              {(form.tax ?? 0) > 0 && <div className="flex justify-between" style={S.subtle}><span>Tax ({form.tax}%)</span><span>{fmt(taxAmt, form.currency)}</span></div>}
              <div className="flex justify-between font-semibold pt-1.5" style={{ ...S.heading, borderTop: "1px solid oklch(1 0 0 / 0.08)" }}><span>Total</span><span>{fmt(total, form.currency)}</span></div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Notes / Payment Details</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} placeholder="Bank details, payment terms..." className="w-full px-3 py-2.5 text-sm focus:outline-none resize-none" style={{ ...S.input, borderRadius: 12 }} />
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} Create Invoice
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-colors" style={S.subtle}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl p-8 shadow-elegant max-h-[90vh] overflow-y-auto" style={{ background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={S.subtle}>Invoice</div>
                <div className="text-2xl font-bold" style={S.heading}>{preview.invoice_number}</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize mt-1 inline-block" style={statusStyle[preview.status ?? "draft"]}>{preview.status}</span>
              </div>
              <button onClick={() => setPreview(null)} className="p-1.5 rounded-lg hover:bg-white/5" style={S.subtle}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={S.subtle}>Bill To</div>
                <div className="font-medium" style={S.heading}>{clientName(preview.client_id)}</div>
                <div className="text-xs" style={S.subtle}>{clientEmail(preview.client_id)}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={S.subtle}>Due Date</div>
                <div style={S.body}>{preview.due_date ? new Date(preview.due_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}</div>
                {preview.paid_date && <div className="text-xs mt-1" style={{ color: "oklch(0.72 0.18 145)" }}>Paid {new Date(preview.paid_date).toLocaleDateString()}</div>}
              </div>
            </div>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}>
                  {["Description", "Qty", "Rate", "Amount"].map(h => <th key={h} className={`py-2 text-[11px] font-semibold uppercase tracking-wider ${h !== "Description" ? "text-right" : "text-left"}`} style={S.subtle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(preview.items ?? []).map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}>
                    <td className="py-2.5" style={S.body}>{item.description}</td>
                    <td className="py-2.5 text-right" style={S.subtle}>{item.quantity}</td>
                    <td className="py-2.5 text-right" style={S.subtle}>{sym(preview.currency)}{item.rate}</td>
                    <td className="py-2.5 text-right font-medium" style={S.heading}>{fmt(item.amount, preview.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rounded-xl p-4 space-y-1.5 text-sm mb-4" style={{ background: "oklch(1 0 0 / 0.04)" }}>
              <div className="flex justify-between" style={S.subtle}><span>Subtotal</span><span>{fmt(preview.subtotal ?? 0, preview.currency)}</span></div>
              {(preview.tax ?? 0) > 0 && <div className="flex justify-between" style={S.subtle}><span>Tax ({preview.tax}%)</span><span>{fmt((preview.subtotal ?? 0) * (preview.tax ?? 0) / 100, preview.currency)}</span></div>}
              <div className="flex justify-between font-bold pt-1.5" style={{ ...S.heading, borderTop: "1px solid oklch(1 0 0 / 0.08)" }}><span>Total</span><span>{fmt(preview.total ?? 0, preview.currency)}</span></div>
            </div>
            {preview.notes && <p className="text-xs mb-4 p-3 rounded-xl" style={{ ...S.subtle, background: "oklch(1 0 0 / 0.03)", border: "1px solid oklch(1 0 0 / 0.06)" }}>{preview.notes}</p>}
            <div className="flex gap-2">
              {preview.status !== "paid" && (
                <button onClick={() => updateStatus(preview.id!, "paid")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: "oklch(0.62 0.20 145 / 0.2)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" }}>
                  <CheckCircle2 className="w-4 h-4" /> Mark Paid
                </button>
              )}
              {preview.status === "draft" && (
                <button onClick={() => updateStatus(preview.id!, "sent")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: "oklch(0.62 0.21 240 / 0.2)", color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" }}>
                  <Send className="w-4 h-4" /> Mark Sent
                </button>
              )}
              <button onClick={() => window.print()} className="px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:bg-white/5 transition-colors" style={S.subtle}>
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin" style={{ color: "oklch(0.66 0.22 295)" }} /></div>
      ) : invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3" style={S.card}>
          <div className="w-12 h-12 rounded-xl grid place-items-center" style={{ background: "oklch(0.66 0.22 295 / 0.1)" }}>
            <Eye className="w-6 h-6" style={{ color: "oklch(0.66 0.22 295)" }} />
          </div>
          <p className="text-sm" style={S.subtle}>No invoices yet</p>
          <button onClick={() => setModal(true)} className="text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity">Create first invoice</button>
        </div>
      ) : (
        <div style={S.card} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
                  {["Invoice #", "Client", "Amount", "Status", "Due Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap" style={S.subtle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={inv.id} className="transition-colors hover:bg-white/[0.02]" style={i < invoices.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {}}>
                    <td className="px-5 py-3.5 font-semibold" style={S.heading}>{inv.invoice_number}</td>
                    <td className="px-5 py-3.5" style={S.body}>{clientName(inv.client_id)}</td>
                    <td className="px-5 py-3.5 font-semibold" style={S.heading}>{fmt(inv.total ?? 0, inv.currency)}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={statusStyle[inv.status ?? "draft"]}>{inv.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={S.subtle}>
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setPreview(inv)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle} title="View"><Eye className="w-3.5 h-3.5" /></button>
                        {inv.status !== "paid" && (
                          <button onClick={() => updateStatus(inv.id!, "paid")} className="text-xs px-2 py-1 rounded-lg transition-colors" style={{ color: "oklch(0.72 0.18 145)", background: "oklch(0.62 0.20 145 / 0.1)" }}>Paid</button>
                        )}
                        {inv.status === "draft" && (
                          <button onClick={() => updateStatus(inv.id!, "sent")} className="text-xs px-2 py-1 rounded-lg transition-colors" style={{ color: "oklch(0.72 0.18 240)", background: "oklch(0.62 0.21 240 / 0.1)" }}>Send</button>
                        )}
                        <button onClick={() => deleteInvoice(inv.id!, inv.invoice_number ?? "")} disabled={deleting === inv.id} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50" style={S.subtle}>
                          {deleting === inv.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
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
