import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { a6 as Users, a4 as UserCheck, d as Briefcase, r as DollarSign, l as CircleAlert, o as Clock } from "../_libs/lucide-react.mjs";
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
function Dashboard() {
  const [stats, setStats] = reactExports.useState({
    leads: 0,
    newLeads: 0,
    clients: 0,
    activeProjects: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    overdueInvoices: 0
  });
  const [recentLeads, setRecentLeads] = reactExports.useState([]);
  const [recentInvoices, setRecentInvoices] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function load() {
      const [leadsRes, clientsRes, projectsRes, invoicesRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*"),
        supabase.from("projects").select("*"),
        supabase.from("invoices").select("*").order("created_at", { ascending: false })
      ]);
      const leads = leadsRes.data ?? [];
      const clients = clientsRes.data ?? [];
      const projects = projectsRes.data ?? [];
      const invoices = invoicesRes.data ?? [];
      const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.total ?? 0), 0);
      setStats({
        leads: leads.length,
        newLeads: leads.filter((l) => l.status === "new").length,
        clients: clients.length,
        activeProjects: projects.filter((p) => p.status === "in_progress").length,
        totalRevenue,
        pendingInvoices: invoices.filter((i) => i.status === "sent").length,
        overdueInvoices: invoices.filter((i) => i.status === "overdue").length
      });
      setRecentLeads(leads.slice(0, 5));
      setRecentInvoices(invoices.slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);
  const statCards = [
    { label: "Total Leads", value: stats.leads, sub: `${stats.newLeads} new`, icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "Active Clients", value: stats.clients, sub: "all time", icon: UserCheck, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "Active Projects", value: stats.activeProjects, sub: "in progress", icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Revenue Collected", value: `$${stats.totalRevenue.toLocaleString()}`, sub: "paid invoices", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" }
  ];
  const statusColor = {
    new: "bg-primary/15 text-primary",
    contacted: "bg-amber-500/15 text-amber-400",
    closed: "bg-red-500/15 text-red-400",
    converted: "bg-emerald-500/15 text-emerald-400",
    draft: "bg-surface text-subtle",
    sent: "bg-blue-500/15 text-blue-400",
    paid: "bg-emerald-500/15 text-emerald-400",
    overdue: "bg-red-500/15 text-red-400"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle mt-1", children: "Welcome back. Here's what's happening." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-subtle uppercase tracking-wider", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-lg ${s.bg} grid place-items-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-4 h-4 ${s.color}` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-heading", children: loading ? "—" : s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle mt-1", children: s.sub })
    ] }, s.label)) }),
    (stats.overdueInvoices > 0 || stats.pendingInvoices > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      stats.overdueInvoices > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
        stats.overdueInvoices,
        " overdue invoice",
        stats.overdueInvoices > 1 ? "s" : "",
        " — follow up needed"
      ] }),
      stats.pendingInvoices > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 shrink-0" }),
        stats.pendingInvoices,
        " invoice",
        stats.pendingInvoices > 1 ? "s" : "",
        " awaiting payment"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-heading", children: "Recent Leads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/leads", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-subtle", children: "Loading..." }) : recentLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-subtle", children: "No leads yet" }) : recentLeads.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: l.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-subtle", children: [
              l.business_name,
              " · ",
              l.business_type
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[l.status ?? "new"]}`, children: l.status ?? "new" })
        ] }, l.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-heading", children: "Recent Invoices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/invoices", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-subtle", children: "Loading..." }) : recentInvoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-subtle", children: "No invoices yet" }) : recentInvoices.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: inv.invoice_number ?? "INV-????" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle", children: inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString()}` : "No due date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-heading", children: [
              "$",
              (inv.total ?? 0).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[inv.status ?? "draft"]}`, children: inv.status ?? "draft" })
          ] })
        ] }, inv.id)) })
      ] })
    ] })
  ] });
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
