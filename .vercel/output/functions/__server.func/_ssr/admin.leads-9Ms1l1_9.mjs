import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-DA5j0nEE.mjs";
import { A as AdminLayout } from "./AdminLayout-ClYG2frk.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { V as RefreshCw, W as Search, ab as X, y as LoaderCircle, a3 as StickyNote, M as Mail, a4 as Trash2, N as MessageSquare } from "../_libs/lucide-react.mjs";
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
const STATUS_OPTIONS = ["new", "contacted", "closed", "converted"];
const statusStyle = {
  new: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" },
  contacted: { background: "oklch(0.78 0.18 75 / 0.15)", color: "oklch(0.85 0.16 75)", border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  closed: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)", border: "1px solid oklch(0.62 0.24 27 / 0.3)" },
  converted: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" }
};
const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 },
  input: { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 },
  heading: { color: "oklch(0.93 0.012 285)" },
  body: { color: "oklch(0.72 0.018 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" },
  dim: { color: "oklch(0.38 0.010 285)" }
};
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
function Leads() {
  const [leads, setLeads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const [noteModal, setNoteModal] = reactExports.useState(null);
  const [noteText, setNoteText] = reactExports.useState("");
  const [converting, setConverting] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3e3);
  };
  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) showToast("Failed to load leads", "error");
    else setLeads(data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchLeads();
  }, []);
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) showToast("Failed to update status", "error");
    else {
      setLeads((p) => p.map((l) => l.id === id ? { ...l, status } : l));
      showToast("Status updated");
    }
    setUpdatingId(null);
  };
  const saveNote = async () => {
    if (!noteModal?.id) return;
    const { error } = await supabase.from("leads").update({ notes: noteText }).eq("id", noteModal.id);
    if (error) showToast("Failed to save note", "error");
    else {
      setLeads((p) => p.map((l) => l.id === noteModal.id ? { ...l, notes: noteText } : l));
      showToast("Note saved");
    }
    setNoteModal(null);
  };
  const convertToClient = async (lead) => {
    if (!lead.id) return;
    setConverting(lead.id);
    const { error } = await supabase.from("clients").insert([{
      name: lead.name,
      email: lead.email,
      business_name: lead.business_name,
      business_type: lead.business_type,
      lead_id: lead.id,
      status: "active"
    }]);
    if (error) showToast("Failed to convert lead", "error");
    else {
      await updateStatus(lead.id, "converted");
      showToast(`${lead.name} converted to client`);
    }
    setConverting(null);
  };
  const deleteLead = async (id) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setDeleting(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) showToast("Failed to delete lead", "error");
    else {
      setLeads((p) => p.filter((l) => l.id !== id));
      showToast("Lead deleted");
    }
    setDeleting(null);
  };
  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !search || [l.name, l.email, l.business_name, l.business_type, l.message].some((v) => v?.toLowerCase().includes(q));
    const matchFilter = filter === "all" || l.status === filter;
    return matchSearch && matchFilter;
  });
  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: leads.filter((l) => l.status === s).length }), {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-7xl mx-auto", children: [
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { msg: toast.msg, type: toast.type }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: S.heading, children: "Leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-0.5", style: S.subtle, children: [
          leads.length,
          " total inquiries"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fetchLeads, className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5", style: S.subtle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` }),
        " Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["all", ...STATUS_OPTIONS].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setFilter(s),
          className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
          style: filter === s ? { background: "oklch(0.66 0.22 295 / 0.2)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" } : { background: "oklch(1 0 0 / 0.04)", color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.08)" },
          children: [
            s,
            s !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 opacity-60", children: counts[s] ?? 0 })
          ]
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-xs ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5", style: S.dim }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search leads...",
            className: "w-full pl-9 pr-4 py-2 text-sm focus:outline-none",
            style: { ...S.input, padding: "8px 12px 8px 34px" }
          }
        )
      ] })
    ] }),
    noteModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl p-6 shadow-elegant", style: { background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold", style: S.heading, children: [
            "Note for ",
            noteModal.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5", style: S.subtle, children: noteModal.business_name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNoteModal(null), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: noteText,
          onChange: (e) => setNoteText(e.target.value),
          rows: 5,
          placeholder: "Write a note about this lead...",
          className: "w-full p-3 text-sm rounded-xl resize-none focus:outline-none",
          style: { ...S.input, borderRadius: 12 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveNote, className: "flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity", children: "Save Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNoteModal(null), className: "px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5", style: S.subtle, children: "Cancel" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.card, className: "overflow-hidden", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin", style: { color: "oklch(0.66 0.22 295)" } }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10", style: { color: "oklch(0.30 0.01 285)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: search ? "No leads match your search" : "No leads yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: ["Contact", "Business", "Message", "Status", "Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap", style: S.subtle, children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "transition-colors hover:bg-white/[0.02] cursor-pointer",
            style: i < filtered.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {},
            onClick: () => setExpandedId(expandedId === lead.id ? null : lead.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full grid place-items-center text-xs font-semibold shrink-0",
                    style: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
                    children: lead.name.charAt(0).toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium whitespace-nowrap", style: S.heading, children: lead.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs whitespace-nowrap", style: S.subtle, children: lead.email })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium whitespace-nowrap", style: S.body, children: lead.business_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", style: S.subtle, children: lead.business_type })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5 max-w-[220px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block text-xs", style: S.subtle, children: lead.message }),
                lead.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] mt-0.5 block truncate", style: { color: "oklch(0.66 0.22 295)" }, children: [
                  "📝 ",
                  lead.notes
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", onClick: (e) => e.stopPropagation(), children: updatingId === lead.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin", style: { color: "oklch(0.66 0.22 295)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: lead.status ?? "new",
                  onChange: (e) => updateStatus(lead.id, e.target.value),
                  className: "text-xs font-medium rounded-lg px-2 py-1 cursor-pointer focus:outline-none appearance-none",
                  style: { ...statusStyle[lead.status ?? "new"], background: statusStyle[lead.status ?? "new"].background },
                  children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, style: { background: "oklch(0.10 0.03 285)", color: "oklch(0.78 0.015 285)" }, className: "capitalize", children: s }, s))
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 whitespace-nowrap text-xs", style: S.subtle, children: lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setNoteModal(lead);
                      setNoteText(lead.notes ?? "");
                    },
                    className: "p-1.5 rounded-lg transition-colors hover:bg-white/5",
                    style: S.subtle,
                    title: "Add note",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${lead.email}`, className: "p-1.5 rounded-lg transition-colors hover:bg-white/5", style: S.subtle, title: "Send email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }) }),
                lead.status !== "converted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => convertToClient(lead),
                    disabled: converting === lead.id,
                    className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50",
                    style: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
                    children: [
                      converting === lead.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3" }),
                      "Convert"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => deleteLead(lead.id),
                    disabled: deleting === lead.id,
                    className: "p-1.5 rounded-lg transition-colors hover:bg-red-500/10 disabled:opacity-50",
                    style: { color: "oklch(0.52 0.015 285)" },
                    title: "Delete",
                    children: deleting === lead.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          lead.id
        ),
        expandedId === lead.id && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid oklch(1 0 0 / 0.05)", background: "oklch(1 0 0 / 0.02)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mt-0.5 shrink-0", style: { color: "oklch(0.66 0.22 295)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold mb-1", style: S.subtle, children: "Full Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", style: S.body, children: lead.message })
          ] })
        ] }) }) }, lead.id + "-exp")
      ] })) })
    ] }) }) })
  ] });
}
function Users(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) });
}
function UserPlus(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" }) });
}
function AdminLeads() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leads, {}) });
}
export {
  AdminLeads as component
};
