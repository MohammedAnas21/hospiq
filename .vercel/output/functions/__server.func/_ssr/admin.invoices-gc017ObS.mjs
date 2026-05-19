import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BhiOgvcJ.mjs";
import { A as AdminLayout } from "./AdminLayout-DijnUeCX.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { T as Plus, ab as X, a4 as Trash2, y as LoaderCircle, m as CircleCheck, X as Send, U as Printer, t as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./hospiq-logo-Df3vBjLG.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const statusStyle = {
  draft: { background: "oklch(1 0 0 / 0.06)", color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.12)" },
  sent: { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" },
  paid: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  overdue: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)", border: "1px solid oklch(0.62 0.24 27 / 0.3)" }
};
const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 },
  input: { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 },
  heading: { color: "oklch(0.93 0.012 285)" },
  body: { color: "oklch(0.72 0.018 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" }
};
const emptyItem = { description: "", quantity: 1, rate: 0, amount: 0 };
const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar", symbol: "$" },
  { value: "INR", label: "INR — Indian Rupee", symbol: "₹" }
];
function sym(currency) {
  return currency === "INR" ? "₹" : "$";
}
function fmt(amount, currency) {
  if (currency === "INR") {
    return "₹" + amount.toLocaleString("en-IN");
  }
  return "$" + amount.toLocaleString("en-US");
}
function Toast({ msg, type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-5 right-5 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up",
      style: { background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" },
      children: msg
    }
  );
}
function Invoices() {
  const [invoices, setInvoices] = reactExports.useState([]);
  const [clients, setClients] = reactExports.useState([]);
  const [projects, setProjects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modal, setModal] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({ client_id: "", project_id: "", currency: "USD", items: [{ ...emptyItem }], status: "draft", due_date: "", notes: "", tax: 0 });
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3e3);
  };
  const fetchAll = async () => {
    setLoading(true);
    const [iR, cR, pR] = await Promise.all([
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name, email"),
      supabase.from("projects").select("id, title, client_id")
    ]);
    setInvoices(iR.data ?? []);
    setClients(cR.data ?? []);
    setProjects(pR.data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchAll();
  }, []);
  const updateItem = (idx, field, value) => {
    setForm((prev) => {
      const items = [...prev.items ?? []];
      items[idx] = { ...items[idx], [field]: value };
      if (field === "quantity" || field === "rate") items[idx].amount = Number(items[idx].quantity) * Number(items[idx].rate);
      return { ...prev, items };
    });
  };
  const subtotal = (form.items ?? []).reduce((s, i) => s + (i.amount ?? 0), 0);
  const taxAmt = subtotal * ((form.tax ?? 0) / 100);
  const total = subtotal + taxAmt;
  const nextNum = () => {
    const nums = invoices.map((i) => parseInt(i.invoice_number?.replace("INV-", "") ?? "0")).filter(Boolean);
    return `INV-${nums.length ? Math.max(...nums) + 1 : 1001}`;
  };
  const save = async () => {
    if (!form.client_id) {
      showToast("Please select a client", "error");
      return;
    }
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
      invoice_number: nextNum()
    };
    const { data, error } = await supabase.from("invoices").insert([payload]).select().single();
    if (error) {
      console.error("Invoice create error:", error);
      showToast(`Failed: ${error.message}`, "error");
    } else {
      setInvoices((p) => [data, ...p]);
      showToast("Invoice created");
      setModal(false);
      setForm({ client_id: "", project_id: "", currency: "USD", items: [{ ...emptyItem }], status: "draft", due_date: "", notes: "", tax: 0 });
    }
    setSaving(false);
  };
  const updateStatus = async (id, status) => {
    const extra = status === "paid" ? { paid_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] } : {};
    const { error } = await supabase.from("invoices").update({ status, ...extra }).eq("id", id);
    if (error) showToast("Failed to update status", "error");
    else {
      setInvoices((p) => p.map((i) => i.id === id ? { ...i, status, ...extra } : i));
      if (preview?.id === id) setPreview((prev) => prev ? { ...prev, status, ...extra } : null);
      showToast(`Marked as ${status}`);
    }
  };
  const deleteInvoice = async (id, num) => {
    if (!confirm(`Delete ${num}? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) showToast("Failed to delete invoice", "error");
    else {
      setInvoices((p) => p.filter((i) => i.id !== id));
      showToast("Invoice deleted");
    }
    setDeleting(null);
  };
  const clientName = (id) => clients.find((c) => c.id === id)?.name ?? "—";
  const clientEmail = (id) => clients.find((c) => c.id === id)?.email ?? "";
  const stats = {
    total: invoices.length,
    draft: invoices.filter((i) => i.status === "draft").length,
    sent: invoices.filter((i) => i.status === "sent").length,
    paid: invoices.filter((i) => i.status === "paid").length,
    revenue: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + (i.total ?? 0), 0)
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-7xl mx-auto", children: [
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { msg: toast.msg, type: toast.type }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: S.heading, children: "Invoices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-0.5", style: S.subtle, children: [
          invoices.length,
          " total invoices"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setModal(true), className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Invoice"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Total", value: stats.total, color: "oklch(0.66 0.22 295)" },
      { label: "Sent", value: stats.sent, color: "oklch(0.62 0.21 240)" },
      { label: "Paid", value: stats.paid, color: "oklch(0.62 0.20 145)" },
      { label: "Revenue", value: loading ? "—" : `$${stats.revenue.toLocaleString()}`, color: "oklch(0.62 0.20 145)" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 rounded-xl", style: S.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider mb-1", style: S.subtle, children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold", style: { color: s.color }, children: loading ? "—" : s.value })
    ] }, s.label)) }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto", style: { background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", style: S.heading, children: "New Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "p-1.5 rounded-lg hover:bg-white/5", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Client *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.client_id, onChange: (e) => setForm((p) => ({ ...p, client_id: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select client" }),
            clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
              c.name,
              " — ",
              c.business_name
            ] }, c.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Project (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.project_id, onChange: (e) => setForm((p) => ({ ...p, project_id: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
            projects.filter((p) => !form.client_id || p.client_id === form.client_id).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.title }, p.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.currency ?? "USD", onChange: (e) => setForm((p) => ({ ...p, currency: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input, children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.value, children: c.label }, c.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: form.due_date, onChange: (e) => setForm((p) => ({ ...p, due_date: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Tax (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.tax, onChange: (e) => setForm((p) => ({ ...p, tax: Number(e.target.value) })), placeholder: "0", className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-semibold uppercase tracking-wider", style: S.subtle, children: "Line Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setForm((p) => ({ ...p, items: [...p.items ?? [], { ...emptyItem }] })), className: "text-xs flex items-center gap-1 transition-opacity hover:opacity-70", style: { color: "oklch(0.66 0.22 295)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
            " Add item"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden", style: { border: "1px solid oklch(1 0 0 / 0.08)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider", style: { background: "oklch(1 0 0 / 0.04)", color: "oklch(0.42 0.012 285)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-5", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-center", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "col-span-2 text-center", children: [
              "Rate (",
              sym(form.currency),
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-right", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-1" })
          ] }),
          (form.items ?? []).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-center px-3 py-2", style: { borderTop: "1px solid oklch(1 0 0 / 0.06)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: item.description, onChange: (e) => updateItem(idx, "description", e.target.value), placeholder: "Service description", className: "col-span-5 px-2 py-1.5 text-xs focus:outline-none rounded-lg", style: S.input }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: item.quantity, onChange: (e) => updateItem(idx, "quantity", Number(e.target.value)), className: "col-span-2 px-2 py-1.5 text-xs text-center focus:outline-none rounded-lg", style: S.input }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: item.rate, onChange: (e) => updateItem(idx, "rate", Number(e.target.value)), className: "col-span-2 px-2 py-1.5 text-xs text-center focus:outline-none rounded-lg", style: S.input }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-right text-xs font-semibold", style: S.heading, children: fmt(item.amount, form.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setForm((p) => ({ ...p, items: (p.items ?? []).filter((_, i) => i !== idx) })), className: "col-span-1 flex justify-center transition-colors hover:text-red-400", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] }, idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-4 mb-4 space-y-1.5 text-sm", style: { background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.07)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(subtotal, form.currency) })
        ] }),
        (form.tax ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Tax (",
            form.tax,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxAmt, form.currency) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold pt-1.5", style: { ...S.heading, borderTop: "1px solid oklch(1 0 0 / 0.08)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(total, form.currency) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Notes / Payment Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.notes, onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })), rows: 2, placeholder: "Bank details, payment terms...", className: "w-full px-3 py-2.5 text-sm focus:outline-none resize-none", style: { ...S.input, borderRadius: 12 } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2", children: [
          saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " Create Invoice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-colors", style: S.subtle, children: "Cancel" })
      ] })
    ] }) }),
    preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-2xl p-8 shadow-elegant max-h-[90vh] overflow-y-auto", style: { background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider mb-1", style: S.subtle, children: "Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", style: S.heading, children: preview.invoice_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize mt-1 inline-block", style: statusStyle[preview.status ?? "draft"], children: preview.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPreview(null), className: "p-1.5 rounded-lg hover:bg-white/5", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider mb-1", style: S.subtle, children: "Bill To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", style: S.heading, children: clientName(preview.client_id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", style: S.subtle, children: clientEmail(preview.client_id) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider mb-1", style: S.subtle, children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.body, children: preview.due_date ? new Date(preview.due_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—" }),
          preview.paid_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs mt-1", style: { color: "oklch(0.72 0.18 145)" }, children: [
            "Paid ",
            new Date(preview.paid_date).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid oklch(1 0 0 / 0.08)" }, children: ["Description", "Qty", "Rate", "Amount"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `py-2 text-[11px] font-semibold uppercase tracking-wider ${h !== "Description" ? "text-right" : "text-left"}`, style: S.subtle, children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (preview.items ?? []).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "1px solid oklch(1 0 0 / 0.05)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5", style: S.body, children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right", style: S.subtle, children: item.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 text-right", style: S.subtle, children: [
            sym(preview.currency),
            item.rate
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right font-medium", style: S.heading, children: fmt(item.amount, preview.currency) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-4 space-y-1.5 text-sm mb-4", style: { background: "oklch(1 0 0 / 0.04)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(preview.subtotal ?? 0, preview.currency) })
        ] }),
        (preview.tax ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Tax (",
            preview.tax,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt((preview.subtotal ?? 0) * (preview.tax ?? 0) / 100, preview.currency) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold pt-1.5", style: { ...S.heading, borderTop: "1px solid oklch(1 0 0 / 0.08)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(preview.total ?? 0, preview.currency) })
        ] })
      ] }),
      preview.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-4 p-3 rounded-xl", style: { ...S.subtle, background: "oklch(1 0 0 / 0.03)", border: "1px solid oklch(1 0 0 / 0.06)" }, children: preview.notes }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        preview.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(preview.id, "paid"),
            className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors",
            style: { background: "oklch(0.62 0.20 145 / 0.2)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              " Mark Paid"
            ]
          }
        ),
        preview.status === "draft" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => updateStatus(preview.id, "sent"),
            className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors",
            style: { background: "oklch(0.62 0.21 240 / 0.2)", color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              " Mark Sent"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.print(), className: "px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:bg-white/5 transition-colors", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
          " Print"
        ] })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin", style: { color: "oklch(0.66 0.22 295)" } }) }) : invoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", style: S.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl grid place-items-center", style: { background: "oklch(0.66 0.22 295 / 0.1)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-6 h-6", style: { color: "oklch(0.66 0.22 295)" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: "No invoices yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(true), className: "text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity", children: "Create first invoice" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.card, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: ["Invoice #", "Client", "Amount", "Status", "Due Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap", style: S.subtle, children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoices.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "transition-colors hover:bg-white/[0.02]", style: i < invoices.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {}, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 font-semibold", style: S.heading, children: inv.invoice_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", style: S.body, children: clientName(inv.client_id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 font-semibold", style: S.heading, children: fmt(inv.total ?? 0, inv.currency) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: statusStyle[inv.status ?? "draft"], children: inv.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-xs whitespace-nowrap", style: S.subtle, children: inv.due_date ? new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPreview(inv), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, title: "View", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }) }),
          inv.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(inv.id, "paid"), className: "text-xs px-2 py-1 rounded-lg transition-colors", style: { color: "oklch(0.72 0.18 145)", background: "oklch(0.62 0.20 145 / 0.1)" }, children: "Paid" }),
          inv.status === "draft" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(inv.id, "sent"), className: "text-xs px-2 py-1 rounded-lg transition-colors", style: { color: "oklch(0.72 0.18 240)", background: "oklch(0.62 0.21 240 / 0.1)" }, children: "Send" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteInvoice(inv.id, inv.invoice_number ?? ""), disabled: deleting === inv.id, className: "p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50", style: S.subtle, children: deleting === inv.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
        ] }) })
      ] }, inv.id)) })
    ] }) }) })
  ] });
}
function AdminInvoices() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/admin/login"
    });
  }, [user, loading]);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Invoices, {}) });
}
export {
  AdminInvoices as component
};
