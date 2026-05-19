import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
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
const ADMIN_EMAIL = "hello.hospiq@gmail.com";
const ADMIN_PASSWORD = "Anas@7790";
const AuthContext = reactExports.createContext({
  user: null,
  loading: false,
  signIn: async () => null,
  signOut: () => {
  }
});
function loadUser() {
  try {
    const stored = sessionStorage.getItem("hospiq_admin");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(loadUser);
  const [loading] = reactExports.useState(false);
  const signIn = async (email, password) => {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return "Invalid email or password";
    }
    const u = { email };
    sessionStorage.setItem("hospiq_admin", JSON.stringify(u));
    setUser(u);
    return null;
  };
  const signOut = () => {
    sessionStorage.removeItem("hospiq_admin");
    setUser(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, loading, signIn, signOut }, children });
}
const useAuth = () => reactExports.useContext(AuthContext);
const appCss = "/assets/styles-DyySm5_m.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hospiq — AI-Powered Digital Experiences for Modern Hospitality" },
      { name: "description", content: "Premium websites, AI receptionists, booking systems and automation built for hotels, restaurants, cafés and resorts." },
      { name: "author", content: "Hospiq" },
      { property: "og:title", content: "Hospiq — AI-Powered Digital Experiences for Modern Hospitality" },
      { property: "og:description", content: "Premium websites, AI receptionists, booking systems and automation built for hotels, restaurants, cafés and resorts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$8 = () => import("./admin-BFsOu0JM.mjs");
const Route$8 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-6Sn5z3rW.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Hospiq — AI-Powered Digital Experiences for Modern Hospitality"
    }, {
      name: "description",
      content: "Premium websites, AI receptionists, booking systems and automation built for hotels, restaurants, cafés and resorts. Hospiq helps hospitality brands scale globally."
    }, {
      property: "og:title",
      content: "Hospiq — AI-Powered Hospitality Technology"
    }, {
      property: "og:description",
      content: "Luxury websites, 24/7 AI receptionist, booking automation and analytics for modern hospitality brands."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.index-C9x8gy_5.mjs");
const Route$6 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.projects-D5lBlm39.mjs");
const Route$5 = createFileRoute("/admin/projects")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.login-CWfXxdEI.mjs");
const Route$4 = createFileRoute("/admin/login")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.leads-9Ms1l1_9.mjs");
const Route$3 = createFileRoute("/admin/leads")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.invoices-Bx-rcVoZ.mjs");
const Route$2 = createFileRoute("/admin/invoices")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.clients-Ch5DkKKZ.mjs");
const Route$1 = createFileRoute("/admin/clients")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.automation-D9ZGEQF4.mjs");
const Route = createFileRoute("/admin/automation")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AdminRoute = Route$8.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const AdminIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminProjectsRoute = Route$5.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminLeadsRoute = Route$3.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => AdminRoute
});
const AdminInvoicesRoute = Route$2.update({
  id: "/invoices",
  path: "/invoices",
  getParentRoute: () => AdminRoute
});
const AdminClientsRoute = Route$1.update({
  id: "/clients",
  path: "/clients",
  getParentRoute: () => AdminRoute
});
const AdminAutomationRoute = Route.update({
  id: "/automation",
  path: "/automation",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAutomationRoute,
  AdminClientsRoute,
  AdminInvoicesRoute,
  AdminLeadsRoute,
  AdminLoginRoute,
  AdminProjectsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useAuth as u
};
