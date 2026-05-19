import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { l as logo } from "./hospiq-logo-Df3vBjLG.mjs";
import { u as LayoutDashboard, a6 as Users, a4 as UserCheck, d as Briefcase, F as FileText, a9 as Zap, j as ChevronRight, y as LogOut, z as Menu } from "../_libs/lucide-react.mjs";
const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: UserCheck },
  { label: "Projects", href: "/admin/projects", icon: Briefcase },
  { label: "Invoices", href: "/admin/invoices", icon: FileText },
  { label: "Automation", href: "/admin/automation", icon: Zap }
];
function AdminLayout({ children }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  const path = location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed inset-y-0 left-0 z-50 w-60 flex flex-col border-r border-border bg-background/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 px-5 py-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Hospiq", className: "h-7 w-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-0.5 overflow-y-auto", children: nav.map(({ label, href, icon: Icon }) => {
            const active = path === href || href !== "/admin" && path.startsWith(href);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: href,
                onClick: () => setOpen(false),
                className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${active ? "bg-primary/15 text-primary font-medium" : "text-subtle hover:text-body hover:bg-surface"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
                  label,
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 ml-auto opacity-60" })
                ]
              },
              href
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-xl glass", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-brand grid place-items-center text-white text-xs font-bold shrink-0", children: user?.email?.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-subtle truncate flex-1", children: user?.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "text-dim hover:text-body transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }) })
          ] }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
        onClick: () => setOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 lg:ml-60 flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center gap-4 h-14 px-5 border-b border-border bg-background/90 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen(true),
            className: "lg:hidden text-subtle hover:text-body transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-dim hidden sm:block", children: user?.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-5 sm:p-8", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
