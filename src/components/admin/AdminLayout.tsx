import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard, Users, Briefcase, FileText, Zap,
  LogOut, Menu, X, UserCheck, Bell, Settings,
} from "lucide-react";
import logo from "@/assets/hospiq-logo.svg";

const nav = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Leads",      href: "/admin/leads",      icon: Users },
  { label: "Clients",    href: "/admin/clients",    icon: UserCheck },
  { label: "Projects",   href: "/admin/projects",   icon: Briefcase },
  { label: "Invoices",   href: "/admin/invoices",   icon: FileText },
  { label: "Automation", href: "/admin/automation", icon: Zap },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.07 0.025 285)" }}>
      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "oklch(0.09 0.03 285)", borderRight: "1px solid oklch(1 0 0 / 0.07)" }}>

        {/* Logo */}
        <div className="flex items-center h-14 px-4" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
          <img src={logo} alt="Hospiq" className="h-6 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          <div className="px-3 py-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "oklch(0.42 0.012 285)" }}>Menu</span>
          </div>
          {nav.map(({ label, href, icon: Icon }) => {
            const active = path === href || (href !== "/admin" && path.startsWith(href));
            return (
              <Link key={href} to={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "font-medium"
                    : "hover:bg-white/5"
                }`}
                style={active
                  ? { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" }
                  : { color: "oklch(0.58 0.02 285)" }
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.66 0.22 295)" }} />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg" style={{ background: "oklch(1 0 0 / 0.04)" }}>
            <div className="w-7 h-7 rounded-full grid place-items-center text-white text-xs font-bold shrink-0 bg-gradient-brand">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: "oklch(0.78 0.015 285)" }}>Admin</div>
              <div className="text-[10px] truncate" style={{ color: "oklch(0.48 0.012 285)" }}>{user?.email}</div>
            </div>
            <button onClick={signOut} className="shrink-0 p-1 rounded hover:bg-white/10 transition-colors" style={{ color: "oklch(0.48 0.012 285)" }}>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-14 px-5 gap-4"
          style={{ background: "oklch(0.07 0.025 285 / 0.9)", borderBottom: "1px solid oklch(1 0 0 / 0.07)", backdropFilter: "blur(20px)" }}>
          <button onClick={() => setOpen(true)} className="lg:hidden" style={{ color: "oklch(0.52 0.015 285)" }}>
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title from path */}
          <div className="flex-1">
            <span className="text-sm font-medium capitalize" style={{ color: "oklch(0.78 0.015 285)" }}>
              {path === "/admin" ? "Dashboard" : path.replace("/admin/", "")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg grid place-items-center transition-colors hover:bg-white/5" style={{ color: "oklch(0.52 0.015 285)" }}>
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold bg-gradient-brand">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
