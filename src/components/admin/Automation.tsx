import { useState } from "react";
import { Zap, Mail, Clock, CheckCircle2, Copy, ChevronDown, ChevronUp } from "lucide-react";

// NOTE: All template bodies use plain strings (no backticks) to avoid
// SSR treating {{var}} as JS template expressions.

const VAR = (v: string) => "{{" + v + "}}";

const templates = [
  {
    id: "welcome",
    label: "Welcome New Lead",
    trigger: "When a new lead submits the contact form",
    subject: "Thanks for reaching out to Hospiq \uD83D\uDC4B",
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
      "The Hospiq Team",
    ].join("\n"),
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
      "The Hospiq Team",
    ].join("\n"),
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
      "The Hospiq Team",
    ].join("\n"),
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
      "The Hospiq Team",
    ].join("\n"),
  },
  {
    id: "project_complete",
    label: "Project Completed",
    trigger: "When project status changes to 'completed'",
    subject: "Your project is live \uD83D\uDE80 — " + VAR("project_title"),
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
      "The Hospiq Team",
    ].join("\n"),
  },
];

const rules = [
  { label: "Auto-tag new leads",           desc: "Automatically set status to 'new' on form submission",                    active: true  },
  { label: "Overdue invoice alert",         desc: "Flag invoices as overdue when due date passes",                           active: true  },
  { label: "Lead follow-up reminder",       desc: "Remind admin to follow up after 3 days of no action",                    active: false },
  { label: "Convert lead on project creation", desc: "Auto-convert lead to client when a project is created for them",      active: false },
];

const VARS = ["name", "business_name", "invoice_number", "total", "due_date", "project_title"];

export function Automation() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);
  const [activeRules, setActiveRules] = useState(rules.map((r) => r.active));

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-heading tracking-tight">Automation</h1>
        <p className="text-sm text-subtle mt-1">Email templates and workflow rules</p>
      </div>

      {/* ── Workflow Rules ── */}
      <div>
        <h2 className="text-sm font-semibold text-heading mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Workflow Rules
        </h2>
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <div key={rule.label} className="glass gradient-border rounded-xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-body">{rule.label}</div>
                <div className="text-xs text-subtle mt-0.5">{rule.desc}</div>
              </div>
              <button
                onClick={() => setActiveRules((p) => p.map((v, idx) => idx === i ? !v : v))}
                className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${activeRules[i] ? "bg-primary" : "bg-surface-strong"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${activeRules[i] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-dim mt-3">
          * Full automation requires connecting an email provider (Resend / SendGrid) via Supabase Edge Functions.
        </p>
      </div>

      {/* ── Email Templates ── */}
      <div>
        <h2 className="text-sm font-semibold text-heading mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> Email Templates
        </h2>
        <div className="space-y-3">
          {templates.map((t) => (
            <div key={t.id} className="glass gradient-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface/50 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium text-body">{t.label}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-dim" />
                    <span className="text-xs text-subtle">{t.trigger}</span>
                  </div>
                </div>
                {expanded === t.id
                  ? <ChevronUp className="w-4 h-4 text-subtle shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-subtle shrink-0" />}
              </button>

              {expanded === t.id && (
                <div className="px-5 pb-5 border-t border-border">
                  <div className="mt-4">
                    <div className="text-xs text-subtle uppercase tracking-wider mb-1.5">Subject</div>
                    <div className="bg-surface rounded-lg px-4 py-2.5 text-sm text-body font-mono">{t.subject}</div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs text-subtle uppercase tracking-wider">Body</div>
                      <button
                        onClick={() => copy(t.id, t.body)}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {copied === t.id ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied === t.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <pre className="bg-surface rounded-lg px-4 py-3 text-xs text-body font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {t.body}
                    </pre>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {VARS.map((v) => (
                      <span key={v} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                        {"{{" + v + "}}"}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-dim mt-2">
                    Variables are replaced automatically when sending via Supabase Edge Functions.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Setup Guide ── */}
      <div className="glass gradient-border rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-heading mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" /> To enable live email sending
        </h3>
        <ol className="space-y-2 text-sm text-subtle list-decimal list-inside">
          <li>Create a free account at <span className="text-primary">resend.com</span></li>
          <li>Add your domain and get an API key</li>
          <li>Add <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">RESEND_API_KEY</span> to Supabase project secrets</li>
          <li>Deploy the Edge Function from <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">/supabase/functions/send-email</span></li>
          <li>Triggers will fire automatically on lead/invoice events</li>
        </ol>
      </div>
    </div>
  );
}
