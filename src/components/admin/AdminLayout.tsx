import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard, Users, Briefcase, FileText, Zap,
  LogOut, Menu, X, ChevronRight, UserCheck,
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
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col border-r border-border bg-background/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <img src={logo} alt="Hospiq" className="h-7 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(({ label, href, icon: Icon }) => {
            const active = path === href || (href !== "/admin" && path.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  active
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-subtle hover:text-body hover:bg-surface"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl glass">
            <div className="w-7 h-7 rounded-full bg-gradient-brand grid place-items-center text-white text-xs font-bold shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-subtle truncate flex-1">{user?.email}</span>
            <button onClick={signOut} className="text-dim hover:text-body transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 h-14 px-5 border-b border-border bg-background/90 backdrop-blur-xl">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-subtle hover:text-body transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-dim hidden sm:block">{user?.email}</span>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
