import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BhiOgvcJ.mjs";
import { A as AdminLayout } from "./AdminLayout-DijnUeCX.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { a9 as Users, a8 as UserCheck, e as Briefcase, s as DollarSign, l as CircleAlert, A as ArrowRight, p as Clock, a6 as TrendingUp, a as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 },
  label: { color: "oklch(0.52 0.015 285)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" },
  value: { color: "oklch(0.93 0.012 285)", fontSize: 26, fontWeight: 600, lineHeight: 1.2 },
  sub: { color: "oklch(0.48 0.012 285)", fontSize: 12 },
  heading: { color: "oklch(0.93 0.012 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" }
};
const statusPill = {
  new: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
  contacted: { background: "oklch(0.78 0.18 75 / 0.15)", color: "oklch(0.85 0.16 75)" },
  closed: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)" },
  converted: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
  draft: { background: "oklch(1 0 0 / 0.06)", color: "oklch(0.52 0.015 285)" },
  sent: { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)" },
  paid: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
  overdue: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)" }
};
function Dashboard() {
  const [stats, setStats] = reactExports.useState({ leads: 0, newLeads: 0, clients: 0, activeProjects: 0, totalRevenue: 0, pendingInvoices: 0, overdueInvoices: 0 });
  const [recentLeads, setRecentLeads] = reactExports.useState([]);
  const [recentInvoices, setRecentInvoices] = reactExports.useState([]);
  const [recentProjects, setRecentProjects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      const [lR, cR, pR, iR] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*"),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("invoices").select("*").order("created_at", { ascending: false })
      ]);
      const leads = lR.data ?? [], clients = cR.data ?? [], projects = pR.data ?? [], invoices = iR.data ?? [];
      setStats({
        leads: leads.length,
        newLeads: leads.filter((l) => l.status === "new").length,
        clients: clients.length,
        activeProjects: projects.filter((p) => p.status === "in_progress").length,
        totalRevenue: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + (i.total ?? 0), 0),
        pendingInvoices: invoices.filter((i) => i.status === "sent").length,
        overdueInvoices: invoices.filter((i) => i.status === "overdue").length
      });
      setRecentLeads(leads.slice(0, 6));
      setRecentInvoices(invoices.slice(0, 5));
      setRecentProjects(projects.slice(0, 4));
      setLoading(false);
    })();
  }, []);
  const statCards = [
    { label: "Total Leads", value: stats.leads, sub: `${stats.newLeads} new this week`, icon: Users, accent: "oklch(0.66 0.22 295)" },
    { label: "Active Clients", value: stats.clients, sub: "all time", icon: UserCheck, accent: "oklch(0.62 0.21 275)" },
    { label: "Live Projects", value: stats.activeProjects, sub: "in progress", icon: Briefcase, accent: "oklch(0.72 0.20 310)" },
    { label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, sub: "from paid invoices", icon: DollarSign, accent: "oklch(0.62 0.20 145)" }
  ];
  const projectStatus = {
    proposal: { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)" },
    in_progress: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
    review: { background: "oklch(0.78 0.18 75 / 0.15)", color: "oklch(0.85 0.16 75)" },
    completed: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
    on_hold: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: S.heading, children: "Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: S.subtle, children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) })
    ] }) }),
    (stats.overdueInvoices > 0 || stats.pendingInvoices > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      stats.overdueInvoices > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/invoices",
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80",
          style: { background: "oklch(0.62 0.24 27 / 0.12)", border: "1px solid oklch(0.62 0.24 27 / 0.25)", color: "oklch(0.72 0.20 27)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
            stats.overdueInvoices,
            " overdue invoice",
            stats.overdueInvoices > 1 ? "s" : "",
            " — action needed",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
          ]
        }
      ),
      stats.pendingInvoices > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/invoices",
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80",
          style: { background: "oklch(0.78 0.18 75 / 0.10)", border: "1px solid oklch(0.78 0.18 75 / 0.25)", color: "oklch(0.85 0.16 75)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 shrink-0" }),
            stats.pendingInvoices,
            " invoice",
            stats.pendingInvoices > 1 ? "s" : "",
            " awaiting payment",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.card, className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl grid place-items-center", style: { background: s.accent + "22" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4", style: { color: s.accent } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5", style: { color: "oklch(0.62 0.20 145)" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.value, children: loading ? "—" : s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", style: S.label, children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", style: S.sub, children: s.sub })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", style: { ...S.card, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4", style: { color: "oklch(0.66 0.22 295)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", style: S.heading, children: "Recent Leads" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/leads", className: "flex items-center gap-1 text-xs transition-opacity hover:opacity-70", style: { color: "oklch(0.66 0.22 295)" }, children: [
            "View all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }) }) : recentLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8", style: { color: "oklch(0.35 0.01 285)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: "No leads yet" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentLeads.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02]",
            style: i < recentLeads.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {},
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full grid place-items-center text-xs font-semibold shrink-0",
                    style: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
                    children: l.name.charAt(0).toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", style: S.heading, children: l.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", style: S.subtle, children: [
                    l.business_name,
                    " · ",
                    l.business_type
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: statusPill[l.status ?? "new"], children: l.status ?? "new" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs hidden sm:block", style: S.subtle, children: l.created_at ? new Date(l.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "" })
              ] })
            ]
          },
          l.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...S.card, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4", style: { color: "oklch(0.62 0.20 145)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", style: S.heading, children: "Invoices" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/invoices", className: "flex items-center gap-1 text-xs transition-opacity hover:opacity-70", style: { color: "oklch(0.66 0.22 295)" }, children: [
            "View all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }) }) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileTextIcon, { className: "w-8 h-8", style: { color: "oklch(0.35 0.01 285)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: "No invoices yet" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentInvoices.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02]",
            style: i < recentInvoices.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {},
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", style: S.heading, children: inv.invoice_number }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", style: S.subtle, children: inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "No due date" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold", style: S.heading, children: [
                  "$",
                  (inv.total ?? 0).toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: statusPill[inv.status ?? "draft"], children: inv.status })
              ] })
            ]
          },
          inv.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...S.card, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4", style: { color: "oklch(0.72 0.20 310)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", style: S.heading, children: "Active Projects" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/projects", className: "flex items-center gap-1 text-xs transition-opacity hover:opacity-70", style: { color: "oklch(0.66 0.22 295)" }, children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }) }) : recentProjects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-8 h-8", style: { color: "oklch(0.35 0.01 285)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: "No projects yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y", style: { borderColor: "oklch(1 0 0 / 0.05)" }, children: recentProjects.map((p) => {
        const pct = p.budget && p.paid ? Math.min(100, Math.round(p.paid / p.budget * 100)) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 transition-colors hover:bg-white/[0.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: projectStatus[p.status ?? "proposal"], children: (p.status ?? "proposal").replace("_", " ") }),
            p.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: S.subtle, children: [
              "$",
              p.budget.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold mb-1", style: S.heading, children: p.title }),
          p.due_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs mb-3", style: S.subtle, children: [
            "Due ",
            new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
          ] }),
          p.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] mb-1", style: S.subtle, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full overflow-hidden", style: { background: "oklch(1 0 0 / 0.08)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-brand transition-all", style: { width: `${pct}%` } }) })
          ] })
        ] }, p.id);
      }) })
    ] })
  ] });
}
function FileTextIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...props, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) });
}
function AdminIndex() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) });
}
export {
  AdminIndex as component
};
