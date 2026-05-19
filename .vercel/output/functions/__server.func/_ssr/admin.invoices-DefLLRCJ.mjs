import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { Q as Plus, a8 as X, a0 as Trash2, x as LoaderCircle, m as CircleCheck, U as Send, R as Printer } from "../_libs/lucide-react.mjs";
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
const statusColor = {
  draft: "bg-surface text-subtle border-border",
  sent: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  overdue: "bg-red-500/15 text-red-400 border-red-500/25"
};
const emptyItem = { description: "", quantity: 1, rate: 0, amount: 0 };
function Invoices() {
  const [invoices, setInvoices] = reactExports.useState([]);
  const [clients, setClients] = reactExports.useState([]);
  const [projects, setProjects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modal, setModal] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    client_id: "",
    project_id: "",
    items: [{ ...emptyItem }],
    status: "draft",
    due_date: "",
    notes: "",
    tax: 0
  });
  const fetch = async () => {
    setLoading(true);
    const [iRes, cRes, pRes] = await Promise.all([
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name, email"),
      supabase.from("projects").select("id, title, client_id")
    ]);
    setInvoices(iRes.data ?? []);
    setClients(cRes.data ?? []);
    setProjects(pRes.data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetch();
  }, []);
  const updateItem = (idx, field, value) => {
    setForm((prev) => {
      const items = [...prev.items ?? []];
      items[idx] = { ...items[idx], [field]: value };
      if (field === "quantity" || field === "rate") {
        items[idx].amount = Number(items[idx].quantity) * Number(items[idx].rate);
      }
      return { ...prev, items };
    });
  };
  const addItem = () => setForm((p) => ({ ...p, items: [...p.items ?? [], { ...emptyItem }] }));
  const removeItem = (idx) => setForm((p) => ({ ...p, items: (p.items ?? []).filter((_, i) => i !== idx) }));
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
  const updateStatus = async (id, status) => {
    const extra = status === "paid" ? { paid_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] } : {};
    await supabase.from("invoices").update({ status, ...extra }).eq("id", id);
    setInvoices((p) => p.map((i) => i.id === id ? { ...i, status, ...extra } : i));
  };
  const clientName = (id) => clients.find((c) => c.id === id)?.name ?? "—";
  const clientEmail = (id) => clients.find((c) => c.id === id)?.email ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Invoices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-subtle mt-1", children: [
          invoices.length,
          " total invoices"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setModal(true),
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Invoice"
          ]
        }
      )
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-2xl p-6 w-full max-w-2xl shadow-elegant max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-heading", children: "New Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "text-dim hover:text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Client" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.client_id,
              onChange: (e) => setForm((p) => ({ ...p, client_id: e.target.value })),
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select client" }),
                clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
                  c.name,
                  " — ",
                  c.business_name
                ] }, c.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Project (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.project_id,
              onChange: (e) => setForm((p) => ({ ...p, project_id: e.target.value })),
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
                projects.filter((p) => !form.client_id || p.client_id === form.client_id).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.title }, p.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: form.due_date,
              onChange: (e) => setForm((p) => ({ ...p, due_date: e.target.value })),
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Tax (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: form.tax,
              onChange: (e) => setForm((p) => ({ ...p, tax: Number(e.target.value) })),
              placeholder: "0",
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-subtle uppercase tracking-wider", children: "Line Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addItem, className: "text-xs text-primary hover:underline flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
            " Add item"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 text-[10px] text-subtle uppercase tracking-wider px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-5", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-center", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-center", children: "Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-right", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-1" })
          ] }),
          (form.items ?? []).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: item.description,
                onChange: (e) => updateItem(idx, "description", e.target.value),
                placeholder: "Service description",
                className: "col-span-5 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: item.quantity,
                onChange: (e) => updateItem(idx, "quantity", Number(e.target.value)),
                className: "col-span-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body text-center focus:outline-none focus:border-primary/50"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: item.rate,
                onChange: (e) => updateItem(idx, "rate", Number(e.target.value)),
                className: "col-span-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-body text-center focus:outline-none focus:border-primary/50"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 text-right text-xs text-body font-medium", children: [
              "$",
              item.amount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(idx), className: "col-span-1 text-dim hover:text-red-400 transition-colors flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] }, idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface rounded-xl p-4 mb-4 space-y-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            subtotal.toLocaleString()
          ] })
        ] }),
        (form.tax ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Tax (",
            form.tax,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            taxAmt.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-heading border-t border-border pt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            total.toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: form.notes,
            onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
            rows: 2,
            placeholder: "Payment terms, bank details...",
            className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: save,
            disabled: saving || !form.client_id,
            className: "flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2",
            children: [
              saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " Create Invoice"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl glass text-subtle text-sm", children: "Cancel" })
      ] })
    ] }) }),
    preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-2xl p-8 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-wider mb-1", children: "Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-heading", children: preview.invoice_number })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPreview(null), className: "text-dim hover:text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle mb-1", children: "Bill To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-body font-medium", children: clientName(preview.client_id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-subtle text-xs", children: clientEmail(preview.client_id) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle mb-1", children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-body", children: preview.due_date ? new Date(preview.due_date).toLocaleDateString() : "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-xs text-subtle", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs text-subtle", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs text-subtle", children: "Rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs text-subtle", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: (preview.items ?? []).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-body", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right text-subtle", children: item.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-subtle", children: [
            "$",
            item.rate
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-body font-medium", children: [
            "$",
            item.amount
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface rounded-xl p-4 space-y-1 text-sm mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            preview.subtotal?.toLocaleString()
          ] })
        ] }),
        (preview.tax ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Tax (",
            preview.tax,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            ((preview.subtotal ?? 0) * (preview.tax ?? 0) / 100).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-heading border-t border-border pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            preview.total?.toLocaleString()
          ] })
        ] })
      ] }),
      preview.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-subtle mb-4", children: preview.notes }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        preview.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              updateStatus(preview.id, "paid");
              setPreview({ ...preview, status: "paid" });
            },
            className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              " Mark Paid"
            ]
          }
        ),
        preview.status === "draft" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              updateStatus(preview.id, "sent");
              setPreview({ ...preview, status: "sent" });
            },
            className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              " Mark Sent"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.print(), className: "px-4 py-2.5 rounded-xl glass text-subtle text-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
          " Print"
        ] })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }) }) : invoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-sm text-subtle", children: "No invoices yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass gradient-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Invoice #", "Client", "Amount", "Status", "Due Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs text-subtle font-medium uppercase tracking-wider whitespace-nowrap", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: invoices.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-surface/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-body", children: inv.invoice_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle", children: clientName(inv.client_id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-heading", children: [
          "$",
          (inv.total ?? 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-medium border capitalize ${statusColor[inv.status ?? "draft"]}`, children: inv.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle text-xs whitespace-nowrap", children: inv.due_date ? new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPreview(inv), className: "text-xs text-primary hover:underline", children: "View" }),
          inv.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(inv.id, "paid"), className: "text-xs text-emerald-400 hover:underline", children: "Mark Paid" }),
          inv.status === "draft" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(inv.id, "sent"), className: "text-xs text-blue-400 hover:underline", children: "Send" })
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
