import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase, type Lead, type Client, type Invoice, type Project } from "@/lib/supabase";
import {
  Users, UserCheck, Briefcase, DollarSign,
  Clock, AlertCircle, ArrowUpRight, TrendingUp,
  ArrowRight, CheckCircle2,
} from "lucide-react";

type Stats = {
  leads: number; newLeads: number; clients: number;
  activeProjects: number; totalRevenue: number;
  pendingInvoices: number; overdueInvoices: number;
};

const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 } as React.CSSProperties,
  label: { color: "oklch(0.52 0.015 285)", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.08em" },
  value: { color: "oklch(0.93 0.012 285)", fontSize: 26, fontWeight: 600, lineHeight: 1.2 },
  sub:   { color: "oklch(0.48 0.012 285)", fontSize: 12 },
  body:  { color: "oklch(0.72 0.018 285)", fontSize: 13 },
  heading: { color: "oklch(0.93 0.012 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" },
};

const statusPill: Record<string, React.CSSProperties> = {
  new:       { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
  contacted: { background: "oklch(0.78 0.18 75 / 0.15)",  color: "oklch(0.85 0.16 75)" },
  closed:    { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)" },
  converted: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
  draft:     { background: "oklch(1 0 0 / 0.06)",         color: "oklch(0.52 0.015 285)" },
  sent:      { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)" },
  paid:      { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
  overdue:   { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)" },
};

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({ leads: 0, newLeads: 0, clients: 0, activeProjects: 0, totalRevenue: 0, pendingInvoices: 0, overdueInvoices: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [lR, cR, pR, iR] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*"),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      ]);
      const leads = lR.data ?? [], clients = cR.data ?? [], projects = pR.data ?? [], invoices = iR.data ?? [];
      setStats({
        leads: leads.length, newLeads: leads.filter(l => l.status === "new").length,
        clients: clients.length, activeProjects: projects.filter(p => p.status === "in_progress").length,
        totalRevenue: invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.total ?? 0), 0),
        pendingInvoices: invoices.filter(i => i.status === "sent").length,
        overdueInvoices: invoices.filter(i => i.status === "overdue").length,
      });
      setRecentLeads(leads.slice(0, 6));
      setRecentInvoices(invoices.slice(0, 5));
      setRecentProjects(projects.slice(0, 4));
      setLoading(false);
    })();
  }, []);

  const statCards = [
    { label: "Total Leads",     value: stats.leads,     sub: `${stats.newLeads} new this week`, icon: Users,       accent: "oklch(0.66 0.22 295)" },
    { label: "Active Clients",  value: stats.clients,   sub: "all time",                        icon: UserCheck,   accent: "oklch(0.62 0.21 275)" },
    { label: "Live Projects",   value: stats.activeProjects, sub: "in progress",                icon: Briefcase,   accent: "oklch(0.72 0.20 310)" },
    { label: "Revenue",         value: `$${stats.totalRevenue.toLocaleString()}`, sub: "from paid invoices", icon: DollarSign, accent: "oklch(0.62 0.20 145)" },
  ];

  const projectStatus: Record<string, React.CSSProperties> = {
    proposal:    { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)" },
    in_progress: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" },
    review:      { background: "oklch(0.78 0.18 75 / 0.15)",  color: "oklch(0.85 0.16 75)" },
    completed:   { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)" },
    on_hold:     { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)" },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={S.heading}>Overview</h1>
          <p className="text-sm mt-0.5" style={S.subtle}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {(stats.overdueInvoices > 0 || stats.pendingInvoices > 0) && (
        <div className="flex flex-wrap gap-3">
          {stats.overdueInvoices > 0 && (
            <Link to="/admin/invoices" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80"
              style={{ background: "oklch(0.62 0.24 27 / 0.12)", border: "1px solid oklch(0.62 0.24 27 / 0.25)", color: "oklch(0.72 0.20 27)" }}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              {stats.overdueInvoices} overdue invoice{stats.overdueInvoices > 1 ? "s" : ""} — action needed
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}
          {stats.pendingInvoices > 0 && (
            <Link to="/admin/invoices" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-80"
              style={{ background: "oklch(0.78 0.18 75 / 0.10)", border: "1px solid oklch(0.78 0.18 75 / 0.25)", color: "oklch(0.85 0.16 75)" }}>
              <Clock className="w-4 h-4 shrink-0" />
              {stats.pendingInvoices} invoice{stats.pendingInvoices > 1 ? "s" : ""} awaiting payment
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} style={S.card} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: s.accent + "22" }}>
                <s.icon className="w-4 h-4" style={{ color: s.accent }} />
              </div>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "oklch(0.62 0.20 145)" }} />
            </div>
            <div style={S.value}>{loading ? "—" : s.value}</div>
            <div className="mt-1" style={S.label}>{s.label}</div>
            <div className="mt-1" style={S.sub}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Leads — 2 cols */}
        <div className="lg:col-span-2" style={{ ...S.card, overflow: "hidden" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: "oklch(0.66 0.22 295)" }} />
              <span className="text-sm font-semibold" style={S.heading}>Recent Leads</span>
            </div>
            <Link to="/admin/leads" className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: "oklch(0.66 0.22 295)" }}>
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>
          ) : recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Users className="w-8 h-8" style={{ color: "oklch(0.35 0.01 285)" }} />
              <p className="text-sm" style={S.subtle}>No leads yet</p>
            </div>
          ) : (
            <div>
              {recentLeads.map((l, i) => (
                <div key={l.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02]"
                  style={i < recentLeads.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {}}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-semibold shrink-0"
                      style={{ background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" }}>
                      {l.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={S.heading}>{l.name}</div>
                      <div className="text-xs" style={S.subtle}>{l.business_name} · {l.business_type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={statusPill[l.status ?? "new"]}>
                      {l.status ?? "new"}
                    </span>
                    <span className="text-xs hidden sm:block" style={S.subtle}>
                      {l.created_at ? new Date(l.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Invoices — 1 col */}
        <div style={{ ...S.card, overflow: "hidden" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" style={{ color: "oklch(0.62 0.20 145)" }} />
              <span className="text-sm font-semibold" style={S.heading}>Invoices</span>
            </div>
            <Link to="/admin/invoices" className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: "oklch(0.66 0.22 295)" }}>
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>
          ) : recentInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <FileTextIcon className="w-8 h-8" style={{ color: "oklch(0.35 0.01 285)" }} />
              <p className="text-sm" style={S.subtle}>No invoices yet</p>
            </div>
          ) : (
            <div>
              {recentInvoices.map((inv, i) => (
                <div key={inv.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02]"
                  style={i < recentInvoices.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {}}>
                  <div>
                    <div className="text-sm font-medium" style={S.heading}>{inv.invoice_number}</div>
                    <div className="text-xs" style={S.subtle}>{inv.due_date ? `Due ${new Date(inv.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "No due date"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={S.heading}>${(inv.total ?? 0).toLocaleString()}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={statusPill[inv.status ?? "draft"]}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Projects */}
      <div style={{ ...S.card, overflow: "hidden" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" style={{ color: "oklch(0.72 0.20 310)" }} />
            <span className="text-sm font-semibold" style={S.heading}>Active Projects</span>
          </div>
          <Link to="/admin/projects" className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: "oklch(0.66 0.22 295)" }}>
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12"><div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>
        ) : recentProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Briefcase className="w-8 h-8" style={{ color: "oklch(0.35 0.01 285)" }} />
            <p className="text-sm" style={S.subtle}>No projects yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y" style={{ borderColor: "oklch(1 0 0 / 0.05)" }}>
            {recentProjects.map((p) => {
              const pct = p.budget && p.paid ? Math.min(100, Math.round((p.paid / p.budget) * 100)) : 0;
              return (
                <div key={p.id} className="p-5 transition-colors hover:bg-white/[0.02]">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={projectStatus[p.status ?? "proposal"]}>
                      {(p.status ?? "proposal").replace("_", " ")}
                    </span>
                    {p.budget && <span className="text-xs" style={S.subtle}>${p.budget.toLocaleString()}</span>}
                  </div>
                  <div className="text-sm font-semibold mb-1" style={S.heading}>{p.title}</div>
                  {p.due_date && (
                    <div className="text-xs mb-3" style={S.subtle}>
                      Due {new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  )}
                  {p.budget && (
                    <div>
                      <div className="flex justify-between text-[10px] mb-1" style={S.subtle}>
                        <span>Progress</span><span>{pct}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 0.08)" }}>
                        <div className="h-full rounded-full bg-gradient-brand transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
