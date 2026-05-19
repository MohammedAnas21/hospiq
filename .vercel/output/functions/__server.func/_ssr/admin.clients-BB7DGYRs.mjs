import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { Q as Plus, T as Search, a8 as X, x as LoaderCircle, e as Building2, M as Mail, P as Phone, G as Globe } from "../_libs/lucide-react.mjs";
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
  active: "bg-emerald-500/15 text-emerald-400",
  inactive: "bg-amber-500/15 text-amber-400",
  churned: "bg-red-500/15 text-red-400"
};
const empty = {
  name: "",
  email: "",
  phone: "",
  business_name: "",
  business_type: "",
  country: "",
  status: "active",
  notes: ""
};
function Clients() {
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [modal, setModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ ...empty });
  const [saving, setSaving] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients(data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetch();
  }, []);
  const save = async () => {
    setSaving(true);
    if (selected?.id) {
      await supabase.from("clients").update(form).eq("id", selected.id);
      setClients((p) => p.map((c) => c.id === selected.id ? { ...c, ...form } : c));
    } else {
      const { data } = await supabase.from("clients").insert([form]).select().single();
      if (data) setClients((p) => [data, ...p]);
    }
    setSaving(false);
    setModal(false);
    setSelected(null);
    setForm({ ...empty });
  };
  const openEdit = (c) => {
    setSelected(c);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone ?? "",
      business_name: c.business_name,
      business_type: c.business_type,
      country: c.country ?? "",
      status: c.status ?? "active",
      notes: c.notes ?? ""
    });
    setModal(true);
  };
  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [c.name, c.email, c.business_name].some((v) => v?.toLowerCase().includes(q));
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-subtle mt-1", children: [
          clients.length,
          " total clients"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setSelected(null);
            setForm({ ...empty });
            setModal(true);
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Client"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search clients...",
          className: "w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
        }
      )
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-2xl p-6 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-heading", children: selected ? "Edit Client" : "New Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "text-dim hover:text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        [
          { label: "Full Name", key: "name", placeholder: "Mohammed Anas" },
          { label: "Email", key: "email", placeholder: "client@brand.com" },
          { label: "Phone", key: "phone", placeholder: "+91 98765 43210" },
          { label: "Business Name", key: "business_name", placeholder: "Velora Café" },
          { label: "Business Type", key: "business_type", placeholder: "Hotel / Restaurant..." },
          { label: "Country", key: "country", placeholder: "India" }
        ].map(({ label, key, placeholder }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: form[key],
              onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
              placeholder,
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
            }
          )
        ] }, key)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.status,
              onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })),
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: form.notes,
            onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
            rows: 3,
            placeholder: "Internal notes...",
            className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: save,
            disabled: saving,
            className: "flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2",
            children: [
              saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " ",
              selected ? "Save Changes" : "Add Client"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl glass text-subtle text-sm", children: "Cancel" })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-sm text-subtle", children: "No clients yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => openEdit(c),
        className: "glass gradient-border rounded-2xl p-5 hover-lift cursor-pointer group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 grid place-items-center text-primary font-bold text-sm", children: c.name.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[c.status ?? "active"]}`, children: c.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-heading text-sm", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3 shrink-0" }),
              " ",
              c.business_name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
              " ",
              c.email
            ] }),
            c.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
              " ",
              c.phone
            ] }),
            c.country && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-subtle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 shrink-0" }),
              " ",
              c.country
            ] })
          ] })
        ]
      },
      c.id
    )) })
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
