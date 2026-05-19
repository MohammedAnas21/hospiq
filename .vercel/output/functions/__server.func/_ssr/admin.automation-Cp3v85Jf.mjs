import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { a9 as Zap, M as Mail, o as Clock, k as ChevronUp, i as ChevronDown, m as CircleCheck, q as Copy } from "../_libs/lucide-react.mjs";
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
const VAR = (v) => "{{" + v + "}}";
const templates = [
  {
    id: "welcome",
    label: "Welcome New Lead",
    trigger: "When a new lead submits the contact form",
    subject: "Thanks for reaching out to Hospiq 👋",
    body: [
      "Hi " + VAR("name") + ",",
      "",
      "Thanks for getting in touch! We've received your inquiry about " + VAR("business_name") + " and we're excited to learn more.",
      "",
      "We'll review your details and get back to you within 24 hours with a tailored proposal.",
      "",
      "In the meantime, feel free to reply to this email with any questions.",
      "",
      "Warm regards,",
      "The Hospiq Team"
    ].join("\n")
  },
  {
    id: "followup",
    label: "Follow-Up (3 Days)",
    trigger: "3 days after lead status = contacted",
    subject: "Following up — Hospiq x " + VAR("business_name"),
    body: [
      "Hi " + VAR("name") + ",",
      "",
      "Just following up on our earlier conversation about your project at " + VAR("business_name") + ".",
      "",
      "We'd love to move forward and show you what we can build for you. Would you be available for a quick 20-minute call this week?",
      "",
      "You can book directly here: [Calendly Link]",
      "",
      "Best,",
      "The Hospiq Team"
    ].join("\n")
  },
  {
    id: "invoice_sent",
    label: "Invoice Sent",
    trigger: "When invoice status changes to 'sent'",
    subject: "Invoice " + VAR("invoice_number") + " from Hospiq — $" + VAR("total"),
    body: [
      "Hi " + VAR("name") + ",",
      "",
      "Please find your invoice attached for the work completed on " + VAR("project_title") + ".",
      "",
      "Invoice #: " + VAR("invoice_number"),
      "Amount Due: $" + VAR("total"),
      "Due Date: " + VAR("due_date"),
      "",
      "Payment details:",
      VAR("payment_notes"),
      "",
      "Please don't hesitate to reach out if you have any questions.",
      "",
      "Thank you,",
      "The Hospiq Team"
    ].join("\n")
  },
  {
    id: "invoice_overdue",
    label: "Overdue Invoice Reminder",
    trigger: "When invoice due date passes and status = sent",
    subject: "Reminder: Invoice " + VAR("invoice_number") + " is overdue",
    body: [
      "Hi " + VAR("name") + ",",
      "",
      "This is a friendly reminder that invoice " + VAR("invoice_number") + " for $" + VAR("total") + " was due on " + VAR("due_date") + ".",
      "",
      "If you've already made the payment, please disregard this message. Otherwise, we'd appreciate your prompt attention.",
      "",
      "If you have any questions or need to discuss payment arrangements, please reply to this email.",
      "",
      "Thank you,",
      "The Hospiq Team"
    ].join("\n")
  },
  {
    id: "project_complete",
    label: "Project Completed",
    trigger: "When project status changes to 'completed'",
    subject: "Your project is live 🚀 — " + VAR("project_title"),
    body: [
      "Hi " + VAR("name") + ",",
      "",
      "Great news — " + VAR("project_title") + " is now live and ready for the world to see!",
      "",
      "Here's a summary of what was delivered:",
      "- Premium website",
      "- AI integrations",
      "- All agreed deliverables",
      "",
      "We'd love to hear your feedback. If you're happy with the results, a quick review would mean the world to us.",
      "",
      "Looking forward to growing together,",
      "The Hospiq Team"
    ].join("\n")
  }
];
const rules = [
  { label: "Auto-tag new leads", desc: "Automatically set status to 'new' on form submission", active: true },
  { label: "Overdue invoice alert", desc: "Flag invoices as overdue when due date passes", active: true },
  { label: "Lead follow-up reminder", desc: "Remind admin to follow up after 3 days of no action", active: false },
  { label: "Convert lead on project creation", desc: "Auto-convert lead to client when a project is created for them", active: false }
];
const VARS = ["name", "business_name", "invoice_number", "total", "due_date", "project_title"];
function Automation() {
  const [expanded, setExpanded] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(null);
  const [activeRules, setActiveRules] = reactExports.useState(rules.map((r) => r.active));
  const copy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Automation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle mt-1", children: "Email templates and workflow rules" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-heading mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
        " Workflow Rules"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: rules.map((rule, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-xl px-5 py-4 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: rule.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle mt-0.5", children: rule.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveRules((p) => p.map((v, idx) => idx === i ? !v : v)),
            className: `relative w-10 h-5 rounded-full transition-colors shrink-0 ${activeRules[i] ? "bg-primary" : "bg-surface-strong"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${activeRules[i] ? "translate-x-5" : "translate-x-0.5"}` })
          }
        )
      ] }, rule.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-dim mt-3", children: "* Full automation requires connecting an email provider (Resend / SendGrid) via Supabase Edge Functions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-heading mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary" }),
        " Email Templates"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setExpanded(expanded === t.id ? null : t.id),
            className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface/50 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: t.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-dim" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-subtle", children: t.trigger })
                ] })
              ] }),
              expanded === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-subtle shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-subtle shrink-0" })
            ]
          }
        ),
        expanded === t.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-wider mb-1.5", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface rounded-lg px-4 py-2.5 text-sm text-body font-mono", children: t.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-wider", children: "Body" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => copy(t.id, t.body),
                  className: "flex items-center gap-1 text-xs text-primary hover:underline",
                  children: [
                    copied === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                    copied === t.id ? "Copied!" : "Copy"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-surface rounded-lg px-4 py-3 text-xs text-body font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto", children: t.body })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: VARS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono", children: "{{" + v + "}}" }, v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-dim mt-2", children: "Variables are replaced automatically when sending via Supabase Edge Functions." })
        ] })
      ] }, t.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-heading mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
        " To enable live email sending"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-2 text-sm text-subtle list-decimal list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Create a free account at ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "resend.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Add your domain and get an API key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Add ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-surface px-1.5 py-0.5 rounded", children: "RESEND_API_KEY" }),
          " to Supabase project secrets"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Deploy the Edge Function from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-surface px-1.5 py-0.5 rounded", children: "/supabase/functions/send-email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Triggers will fire automatically on lead/invoice events" })
      ] })
    ] })
  ] });
}
function AdminAutomation() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Automation, {}) });
}
export {
  AdminAutomation as component
};
