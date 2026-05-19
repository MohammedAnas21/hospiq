import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-Cml0bk9r.mjs";
import { A as AdminLayout } from "./AdminLayout-CNi3l4W1.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { Q as Plus, a8 as X, x as LoaderCircle, r as DollarSign, C as Calendar, Z as SquareCheckBig, Y as Square } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const statusColor = {
  proposal: "bg-blue-500/15 text-blue-400",
  in_progress: "bg-primary/15 text-primary",
  review: "bg-amber-500/15 text-amber-400",
  completed: "bg-emerald-500/15 text-emerald-400",
  on_hold: "bg-red-500/15 text-red-400"
};
const statusLabel = {
  proposal: "Proposal",
  in_progress: "In Progress",
  review: "Review",
  completed: "Completed",
  on_hold: "On Hold"
};
const emptyForm = {
  client_id: "",
  title: "",
  description: "",
  status: "proposal",
  start_date: "",
  due_date: "",
  budget: "",
  paid: ""
};
function Projects() {
  const [projects, setProjects] = reactExports.useState([]);
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modal, setModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ ...emptyForm });
  const [saving, setSaving] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const fetch = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name")
    ]);
    setProjects(pRes.data ?? []);
    setClients(cRes.data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetch();
  }, []);
  const save = async () => {
    setSaving(true);
    const payload = {
      ...form,
      budget: form.budget ? Number(form.budget) : null,
      paid: form.paid ? Number(form.paid) : null
    };
    if (selected?.id) {
      await supabase.from("projects").update(payload).eq("id", selected.id);
      setProjects((p) => p.map((pr) => pr.id === selected.id ? { ...pr, ...payload } : pr));
    } else {
      const { data } = await supabase.from("projects").insert([payload]).select().single();
      if (data) setProjects((p) => [data, ...p]);
    }
    setSaving(false);
    setModal(false);
    setSelected(null);
    setForm({ ...emptyForm });
  };
  const openEdit = (p) => {
    setSelected(p);
    setForm({
      client_id: p.client_id,
      title: p.title,
      description: p.description ?? "",
      status: p.status ?? "proposal",
      start_date: p.start_date ?? "",
      due_date: p.due_date ?? "",
      budget: String(p.budget ?? ""),
      paid: String(p.paid ?? "")
    });
    setModal(true);
  };
  const toggleMilestone = async (project, milestoneId) => {
    const updated = (project.milestones ?? []).map(
      (m) => m.id === milestoneId ? { ...m, done: !m.done } : m
    );
    await supabase.from("projects").update({ milestones: updated }).eq("id", project.id);
    setProjects((p) => p.map((pr) => pr.id === project.id ? { ...pr, milestones: updated } : pr));
  };
  const clientName = (id) => {
    const c = clients.find((c2) => c2.id === id);
    return c ? `${c.name} · ${c.business_name}` : "Unknown";
  };
  const progress = (p) => {
    if (!p.budget || !p.paid) return 0;
    return Math.min(100, Math.round(p.paid / p.budget * 100));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-heading tracking-tight", children: "Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-subtle mt-1", children: [
          projects.length,
          " total projects"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setSelected(null);
            setForm({ ...emptyForm });
            setModal(true);
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Project"
          ]
        }
      )
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-2xl p-6 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-heading", children: selected ? "Edit Project" : "New Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "text-dim hover:text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Client" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.client_id,
              onChange: (e) => setForm((p) => ({ ...p, client_id: e.target.value })),
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select client" }),
                clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
                  c.name,
                  " — ",
                  c.business_name
                ] }, c.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Project Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "Website + AI Receptionist",
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              rows: 2,
              placeholder: "Project scope...",
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.status,
                onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })),
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50",
                children: Object.entries(statusLabel).map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Budget ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: form.budget,
                onChange: (e) => setForm((p) => ({ ...p, budget: e.target.value })),
                placeholder: "2500",
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Start Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "date",
                value: form.start_date,
                onChange: (e) => setForm((p) => ({ ...p, start_date: e.target.value })),
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "date",
                value: form.due_date,
                onChange: (e) => setForm((p) => ({ ...p, due_date: e.target.value })),
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Amount Paid ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: form.paid,
                onChange: (e) => setForm((p) => ({ ...p, paid: e.target.value })),
                placeholder: "0",
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: save,
            disabled: saving || !form.client_id || !form.title,
            className: "flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2",
            children: [
              saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " ",
              selected ? "Save Changes" : "Create Project"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl glass text-subtle text-sm", children: "Cancel" })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }) }) : projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-sm text-subtle", children: "No projects yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-5 hover-lift cursor-pointer", onClick: () => openEdit(p), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[p.status ?? "proposal"]}`, children: statusLabel[p.status ?? "proposal"] }),
        p.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3" }),
          p.budget.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-heading text-sm mb-1", children: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-subtle mb-3", children: clientName(p.client_id) }),
      p.budget && p.paid !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-subtle mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            p.paid?.toLocaleString(),
            " / $",
            p.budget.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-surface rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-brand rounded-full transition-all", style: { width: `${progress(p)}%` } }) })
      ] }),
      p.due_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
        " Due ",
        new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ] }),
      (p.milestones ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-1.5", onClick: (e) => e.stopPropagation(), children: (p.milestones ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => toggleMilestone(p, m.id), children: [
        m.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5 text-primary shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5 text-dim shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${m.done ? "line-through text-dim" : "text-subtle"}`, children: m.title })
      ] }, m.id)) })
    ] }, p.id)) })
  ] });
}
function AdminProjects() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}) });
}
export {
  AdminProjects as component
};
