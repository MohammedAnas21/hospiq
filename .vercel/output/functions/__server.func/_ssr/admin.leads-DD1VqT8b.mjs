import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { S as RefreshCw, T as Search, a8 as X, x as LoaderCircle, i as ChevronDown, $ as StickyNote, a5 as UserPlus } from "../_libs/lucide-react.mjs";
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
const statusColor = {
  new: "bg-primary/15 text-primary border-primary/25",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  closed: "bg-red-500/15 text-red-400 border-red-500/25",
  converted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
};
function Leads() {
  const [leads, setLeads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const [noteId, setNoteId] = reactExports.useState(null);
  const [noteText, setNoteText] = reactExports.useState("");
  const [converting, setConverting] = reactExports.useState(null);
  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetch();
  }, []);
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((p) => p.map((l) => l.id === id ? { ...l, status } : l));
    setUpdatingId(null);
  };
  const saveNote = async (id) => {
    await supabase.from("leads").update({ notes: noteText }).eq("id", id);
    setLeads((p) => p.map((l) => l.id === id ? { ...l, notes: noteText } : l));
    setNoteId(null);
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
    if (!error) {
      await updateStatus(lead.id, "converted");
    }
    setConverting(null);
  };
  const filtered = leads.filter((l) => {
    const matchSearch = !search || [l.name, l.email, l.business_name, l.business_type, l.message].some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || l.status === filter;
    return matchSearch && matchFilter;
  });
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-subtle mt-1", children: [
          leads.length,
          " total inquiries"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fetch, className: "flex items-center gap-2 px-3 py-2 rounded-xl glass text-subtle hover:text-body text-sm transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` }),
        " Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["all", ...STATUS_OPTIONS].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setFilter(s),
        className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === s ? "bg-primary/20 text-primary" : "glass text-subtle hover:text-body"}`,
        children: [
          s,
          " ",
          s !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 opacity-60", children: counts[s] ?? 0 })
        ]
      },
      s
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search leads...",
          className: "w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        }
      )
    ] }),
    noteId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-2xl p-6 w-full max-w-md shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-heading", children: "Add Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNoteId(null), className: "text-dim hover:text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: noteText,
          onChange: (e) => setNoteText(e.target.value),
          rows: 4,
          placeholder: "Write a note about this lead...",
          className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => saveNote(noteId), className: "flex-1 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium", children: "Save Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNoteId(null), className: "px-4 py-2 rounded-xl glass text-subtle text-sm", children: "Cancel" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass gradient-border rounded-2xl overflow-hidden", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-sm text-subtle", children: "No leads found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Name", "Email", "Business", "Type", "Message", "Status", "Date", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs text-subtle font-medium uppercase tracking-wider whitespace-nowrap", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-surface/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-body whitespace-nowrap", children: lead.name }),
          lead.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-subtle mt-0.5 max-w-[140px] truncate", children: [
            "📝 ",
            lead.notes
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle whitespace-nowrap", children: lead.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle whitespace-nowrap", children: lead.business_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle whitespace-nowrap", children: lead.business_type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", children: lead.message }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: updatingId === lead.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: lead.status ?? "new",
              onChange: (e) => updateStatus(lead.id, e.target.value),
              className: `appearance-none pl-2 pr-6 py-1 rounded-lg text-xs font-medium border cursor-pointer focus:outline-none ${statusColor[lead.status ?? "new"]} bg-transparent`,
              children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-background text-body capitalize", children: s }, s))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-subtle whitespace-nowrap text-xs", children: lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setNoteId(lead.id);
                setNoteText(lead.notes ?? "");
              },
              className: "p-1.5 rounded-lg glass text-subtle hover:text-body transition-colors",
              title: "Add note",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-3.5 h-3.5" })
            }
          ),
          lead.status !== "converted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => convertToClient(lead),
              disabled: converting === lead.id,
              className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-colors disabled:opacity-50",
              title: "Convert to client",
              children: [
                converting === lead.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3" }),
                "Convert"
              ]
            }
          )
        ] }) })
      ] }, lead.id)) })
    ] }) }) })
  ] });
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
