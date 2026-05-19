import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-DA5j0nEE.mjs";
import { l as logo } from "./hospiq-logo-Df3vBjLG.mjs";
import { y as LoaderCircle, u as EyeOff, t as Eye, A as ArrowRight, Z as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function AdminLogin() {
  const {
    user,
    loading,
    signIn
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) });
  if (user) {
    navigate({
      to: "/admin"
    });
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const err = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err);
    else navigate({
      to: "/admin"
    });
  };
  const inp = {
    background: "oklch(0.12 0.03 285)",
    border: "1px solid oklch(1 0 0 / 0.10)",
    borderRadius: 10,
    color: "oklch(0.88 0.015 285)",
    fontSize: 14,
    width: "100%",
    padding: "10px 14px",
    outline: "none"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen items-center justify-center p-4", style: {
    background: "oklch(0.07 0.025 285)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      background: "radial-gradient(60% 50% at 50% 0%, oklch(0.66 0.22 295 / 0.12), transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Hospiq", className: "h-8 w-auto mb-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: {
          color: "oklch(0.93 0.012 285)"
        }, children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1.5", style: {
          color: "oklch(0.52 0.015 285)"
        }, children: "Sign in to manage your business" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "rounded-2xl p-6 space-y-4", style: {
        background: "oklch(0.10 0.03 285)",
        border: "1px solid oklch(1 0 0 / 0.10)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: {
            color: "oklch(0.52 0.015 285)"
          }, children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "admin@hospiq.com", style: inp, onFocus: (e) => e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)", onBlur: (e) => e.target.style.borderColor = "oklch(1 0 0 / 0.10)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: {
            color: "oklch(0.52 0.015 285)"
          }, children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPw ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "Enter your password", style: {
              ...inp,
              paddingRight: 40
            }, onFocus: (e) => e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)", onBlur: (e) => e.target.style.borderColor = "oklch(1 0 0 / 0.10)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw(!showPw), className: "absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80", style: {
              color: "oklch(0.42 0.012 285)"
            }, children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm", style: {
          background: "oklch(0.62 0.24 27 / 0.12)",
          color: "oklch(0.72 0.20 27)",
          border: "1px solid oklch(0.62 0.24 27 / 0.25)"
        }, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-95 transition-opacity disabled:opacity-60 mt-2", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mt-5 text-xs", style: {
        color: "oklch(0.38 0.010 285)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
        "Secure admin access · Hospiq"
      ] })
    ] })
  ] });
}
export {
  AdminLogin as component
};
