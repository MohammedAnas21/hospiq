import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BhiOgvcJ.mjs";
import { l as logo } from "./hospiq-logo-Df3vBjLG.mjs";
import { v as LayoutDashboard, a9 as Users, a8 as UserCheck, e as Briefcase, F as FileText, ac as Zap, z as LogOut, J as Menu, B as Bell } from "../_libs/lucide-react.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen", style: { background: "oklch(0.07 0.025 285)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed inset-y-0 left-0 z-50 w-56 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
        style: { background: "oklch(0.09 0.03 285)", borderRight: "1px solid oklch(1 0 0 / 0.07)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center h-14 px-4", style: { borderBottom: "1px solid oklch(1 0 0 / 0.07)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Hospiq", className: "h-6 w-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-2 py-3 space-y-0.5 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.15em]", style: { color: "oklch(0.42 0.012 285)" }, children: "Menu" }) }),
            nav.map(({ label, href, icon: Icon }) => {
              const active = path === href || href !== "/admin" && path.startsWith(href);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: href,
                  onClick: () => setOpen(false),
                  className: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? "font-medium" : "hover:bg-white/5"}`,
                  style: active ? { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" } : { color: "oklch(0.58 0.02 285)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
                    label,
                    active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto w-1.5 h-1.5 rounded-full", style: { background: "oklch(0.66 0.22 295)" } })
                  ]
                },
                href
              );
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", style: { borderTop: "1px solid oklch(1 0 0 / 0.07)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-2 py-2 rounded-lg", style: { background: "oklch(1 0 0 / 0.04)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full grid place-items-center text-white text-xs font-bold shrink-0 bg-gradient-brand", children: user?.email?.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", style: { color: "oklch(0.78 0.015 285)" }, children: "Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] truncate", style: { color: "oklch(0.48 0.012 285)" }, children: user?.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "shrink-0 p-1 rounded hover:bg-white/10 transition-colors", style: { color: "oklch(0.48 0.012 285)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }) })
          ] }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-black/60 lg:hidden", onClick: () => setOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 lg:ml-56 flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "header",
        {
          className: "sticky top-0 z-30 flex items-center h-14 px-5 gap-4",
          style: { background: "oklch(0.07 0.025 285 / 0.9)", borderBottom: "1px solid oklch(1 0 0 / 0.07)", backdropFilter: "blur(20px)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(true), className: "lg:hidden", style: { color: "oklch(0.52 0.015 285)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium capitalize", style: { color: "oklch(0.78 0.015 285)" }, children: path === "/admin" ? "Dashboard" : path.replace("/admin/", "") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-8 h-8 rounded-lg grid place-items-center transition-colors hover:bg-white/5", style: { color: "oklch(0.52 0.015 285)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold bg-gradient-brand", children: user?.email?.charAt(0).toUpperCase() })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
