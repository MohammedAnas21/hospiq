import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-DA5j0nEE.mjs";
import { A as AdminLayout } from "./AdminLayout-ClYG2frk.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { T as Plus, W as Search, ab as X, y as LoaderCircle, f as Building2, R as Pen, a4 as Trash2, M as Mail, S as Phone, G as Globe } from "../_libs/lucide-react.mjs";
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
  active: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  inactive: { background: "oklch(0.78 0.18 75 / 0.15)", color: "oklch(0.85 0.16 75)", border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  churned: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)", border: "1px solid oklch(0.62 0.24 27 / 0.3)" }
};
const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 },
  input: { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 },
  heading: { color: "oklch(0.93 0.012 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" }
};
const empty = { name: "", email: "", phone: "", business_name: "", business_type: "", country: "", status: "active", notes: "" };
function Toast({ msg, type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-5 right-5 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up",
      style: { background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" },
      children: msg
    }
  );
}
function Clients() {
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [modal, setModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ ...empty });
  const [saving, setSaving] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3e3);
  };
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    if (error) showToast("Failed to load clients", "error");
    else setClients(data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchClients();
  }, []);
  const openNew = () => {
    setSelected(null);
    setForm({ ...empty });
    setModal(true);
  };
  const openEdit = (c) => {
    setSelected(c);
    setForm({ name: c.name, email: c.email, phone: c.phone ?? "", business_name: c.business_name, business_type: c.business_type, country: c.country ?? "", status: c.status ?? "active", notes: c.notes ?? "" });
    setModal(true);
  };
  const save = async () => {
    if (!form.name || !form.email || !form.business_name) {
      showToast("Name, email and business name are required", "error");
      return;
    }
    setSaving(true);
    if (selected?.id) {
      const { error } = await supabase.from("clients").update(form).eq("id", selected.id);
      if (error) showToast("Failed to update client", "error");
      else {
        setClients((p) => p.map((c) => c.id === selected.id ? { ...c, ...form } : c));
        showToast("Client updated");
        setModal(false);
      }
    } else {
      const { data, error } = await supabase.from("clients").insert([form]).select().single();
      if (error) showToast("Failed to add client", "error");
      else {
        setClients((p) => [data, ...p]);
        showToast("Client added");
        setModal(false);
      }
    }
    setSaving(false);
  };
  const deleteClient = async (id, name) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) showToast("Failed to delete client", "error");
    else {
      setClients((p) => p.filter((c) => c.id !== id));
      showToast("Client deleted");
    }
    setDeleting(null);
  };
  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [c.name, c.email, c.business_name, c.country].some((v) => v?.toLowerCase().includes(q));
  });
  const Field = ({ label, k, placeholder, type = "text" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        value: form[k],
        onChange: (e) => setForm((p) => ({ ...p, [k]: e.target.value })),
        placeholder,
        className: "w-full px-3 py-2.5 text-sm focus:outline-none transition-colors",
        style: { ...S.input, outline: "none" },
        onFocus: (e) => e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)",
        onBlur: (e) => e.target.style.borderColor = "oklch(1 0 0 / 0.10)"
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-7xl mx-auto", children: [
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { msg: toast.msg, type: toast.type }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: S.heading, children: "Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-0.5", style: S.subtle, children: [
          clients.length,
          " total clients"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openNew, className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Add Client"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5", style: S.subtle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search clients...",
          className: "w-full pl-9 pr-4 py-2 text-sm focus:outline-none",
          style: { ...S.input, padding: "8px 12px 8px 34px" }
        }
      )
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto", style: { background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", style: S.heading, children: selected ? "Edit Client" : "New Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name *", k: "name", placeholder: "Mohammed Anas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email *", k: "email", placeholder: "client@brand.com", type: "email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", k: "phone", placeholder: "+91 98765 43210" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Business Name *", k: "business_name", placeholder: "Velora Café" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Business Type", k: "business_type", placeholder: "Hotel / Restaurant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country", k: "country", placeholder: "India" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.status,
              onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })),
              className: "w-full px-3 py-2.5 text-sm focus:outline-none",
              style: S.input,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "churned", children: "Churned" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: form.notes,
            onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
            rows: 3,
            placeholder: "Internal notes about this client...",
            className: "w-full px-3 py-2.5 text-sm focus:outline-none resize-none",
            style: { ...S.input, borderRadius: 12 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2", children: [
          saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " ",
          selected ? "Save Changes" : "Add Client"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5", style: S.subtle, children: "Cancel" })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin", style: { color: "oklch(0.66 0.22 295)" } }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", style: S.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10", style: { color: "oklch(0.30 0.01 285)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: search ? "No clients match your search" : "No clients yet" }),
      !search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: openNew, className: "text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity", children: "Add your first client" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.card, className: "p-5 group relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl grid place-items-center text-sm font-bold shrink-0",
              style: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
              children: c.name.charAt(0).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", style: S.heading, children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: statusStyle[c.status ?? "active"], children: c.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(c), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteClient(c.id, c.name), disabled: deleting === c.id, className: "p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50", style: S.subtle, children: deleting === c.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 shrink-0" }),
          c.business_name,
          " · ",
          c.business_type
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
          c.email
        ] }),
        c.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
          c.phone
        ] }),
        c.country && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 shrink-0" }),
          c.country
        ] })
      ] }),
      c.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 text-xs", style: { ...S.subtle, borderTop: "1px solid oklch(1 0 0 / 0.07)" }, children: [
        "📝 ",
        c.notes
      ] })
    ] }, c.id)) })
  ] });
}
function AdminClients() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clients, {}) });
}
export {
  AdminClients as component
};
