import { useEffect, useState } from "react";
import { supabase, type Lead, type Client, type Invoice, type Project } from "@/lib/supabase";
import { Users, UserCheck, Briefcase, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type Stats = {
  leads: number;
  newLeads: number;
  clients: number;
  activeProjects: number;
  totalRevenue: number;
  pendingInvoices: number;
  overdueInvoices: number;
};

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    leads: 0, newLeads: 0, clients: 0, activeProjects: 0,
    totalRevenue: 0, pendingInvoices: 0, overdueInvoices: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [leadsRes, clientsRes, projectsRes, invoicesRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*"),
        supabase.from("projects").select("*"),
        supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      ]);

      const leads: Lead[] = leadsRes.data ?? [];
      const clients: Client[] = clientsRes.data ?? [];
      const projects: Project[] = projectsRes.data ?? [];
      const invoices: Invoice[] = invoicesRes.data ?? [];

      const totalRevenue = invoices
        .filter((i) => i.status === "paid")
        .reduce((sum, i) => sum + (i.total ?? 0), 0);

      setStats({
        leads: leads.length,
        newLeads: leads.filter((l) => l.status === "new").length,
        clients: clients.length,
        activeProjects: projects.filter((p) => p.status === "in_progress").length,
        totalRevenue,
        pendingInvoices: invoices.filter((i) => i.status === "sent").length,
        overdueInvoices: invoices.filter((i) => i.status === "overdue").length,
      });

      setRecentLeads(leads.slice(0, 5));
      setRecentInvoices(invoices.slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Leads",       value: stats.leads,           sub: `${stats.newLeads} new`,          icon: Users,        color: "text-primary",     bg: "bg-primary/10" },
    { label: "Active Clients",    value: stats.clients,         sub: "all time",                        icon: UserCheck,    color: "text-violet-400",  bg: "bg-violet-400/10" },
    { label: "Active Projects",   value: stats.activeProjects,  sub: "in progress",                     icon: Briefcase,    color: "text-indigo-400",  bg: "bg-indigo-400/10" },
    { label: "Revenue Collected", value: `$${stats.totalRevenue.toLocaleString()}`, sub: "paid invoices", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  const statusColor: Record<string, string> = {
    new: "bg-primary/15 text-primary",
    contacted: "bg-amber-500/15 text-amber-400",
    closed: "bg-red-500/15 text-red-400",
    converted: "bg-emerald-500/15 text-emerald-400",
    draft: "bg-surface text-subtle",
    sent: "bg-blue-500/15 text-blue-400",
    paid: "bg-emerald-500/15 text-emerald-400",
    overdue: "bg-red-500/15 text-red-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-heading tracking-tight">Dashboard</h1>
        <p className="text-sm text-subtle mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass gradient-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-subtle uppercase tracking-wider">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg ${s.bg} grid place-items-center`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <div className="text-2xl font-semibold text-heading">{loading ? "—" : s.value}</div>
            <div className="text-xs text-subtle mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(stats.overdueInvoices > 0 || stats.pendingInvoices > 0) && (
        <div className="flex flex-wrap gap-3">
          {stats.overdueInvoices > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {stats.overdueInvoices} overdue invoice{stats.overdueInvoices > 1 ? "s" : ""} — follow up needed
            </div>
          )}
          {stats.pendingInvoices > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400">
              <Clock className="w-4 h-4 shrink-0" />
              {stats.pendingInvoices} invoice{stats.pendingInvoices > 1 ? "s" : ""} awaiting payment
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="glass gradient-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-heading">Recent Leads</h2>
            <a href="/admin/leads" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="px-5 py-8 text-center text-sm text-subtle">Loading...</div>
            ) : recentLeads.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-subtle">No leads yet</div>
            ) : recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors">
                <div>
                  <div className="text-sm font-medium text-body">{l.name}</div>
                  <div className="text-xs text-subtle">{l.business_name} · {l.business_type}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[l.status ?? "new"]}`}>
                  {l.status ?? "new"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="glass gradient-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-heading">Recent Invoices</h2>
            <a href="/admin/invoices" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="px-5 py-8 text-center text-sm text-subtle">Loading...</div>
            ) : recentInvoices.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-subtle">No invoices yet</div>
            ) : recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors">
                <div>
                  <div className="text-sm font-medium text-body">{inv.invoice_number ?? "INV-????"}</div>
                  <div className="text-xs text-subtle">{inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString()}` : "No due date"}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-heading">${(inv.total ?? 0).toLocaleString()}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[inv.status ?? "draft"]}`}>
                    {inv.status ?? "draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
