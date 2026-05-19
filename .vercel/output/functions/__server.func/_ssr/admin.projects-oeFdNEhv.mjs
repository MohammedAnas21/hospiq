import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BhiOgvcJ.mjs";
import { A as AdminLayout } from "./AdminLayout-DijnUeCX.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { T as Plus, ab as X, a1 as SquareCheckBig, a0 as Square, o as CirclePlus, y as LoaderCircle, s as DollarSign, R as Pen, a4 as Trash2, C as Calendar } from "../_libs/lucide-react.mjs";
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
const statusStyle = {
  proposal: { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" },
  in_progress: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" },
  review: { background: "oklch(0.78 0.18 75 / 0.15)", color: "oklch(0.85 0.16 75)", border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  completed: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  on_hold: { background: "oklch(0.62 0.24 27 / 0.15)", color: "oklch(0.72 0.20 27)", border: "1px solid oklch(0.62 0.24 27 / 0.3)" }
};
const statusLabel = { proposal: "Proposal", in_progress: "In Progress", review: "Review", completed: "Completed", on_hold: "On Hold" };
const S = {
  card: { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 },
  input: { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 },
  heading: { color: "oklch(0.93 0.012 285)" },
  subtle: { color: "oklch(0.52 0.015 285)" }
};
const emptyForm = { client_id: "", title: "", description: "", status: "proposal", start_date: "", due_date: "", budget: "", paid: "" };
function Toast({ msg, type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-5 right-5 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up",
      style: { background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" },
      children: msg
    }
  );
}
function Projects() {
  const [projects, setProjects] = reactExports.useState([]);
  const [clients, setClients] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modal, setModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ ...emptyForm });
  const [milestones, setMilestones] = reactExports.useState([]);
  const [newMilestone, setNewMilestone] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3e3);
  };
  const fetchAll = async () => {
    setLoading(true);
    const [pR, cR] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name")
    ]);
    setProjects(pR.data ?? []);
    setClients(cR.data ?? []);
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchAll();
  }, []);
  const openNew = () => {
    setSelected(null);
    setForm({ ...emptyForm });
    setMilestones([]);
    setModal(true);
  };
  const openEdit = (p) => {
    setSelected(p);
    setForm({ client_id: p.client_id, title: p.title, description: p.description ?? "", status: p.status ?? "proposal", start_date: p.start_date ?? "", due_date: p.due_date ?? "", budget: String(p.budget ?? ""), paid: String(p.paid ?? "") });
    setMilestones(p.milestones ?? []);
    setModal(true);
  };
  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones((p) => [...p, { id: Date.now().toString(), title: newMilestone.trim(), done: false }]);
    setNewMilestone("");
  };
  const save = async () => {
    if (!form.client_id || !form.title) {
      showToast("Client and title are required", "error");
      return;
    }
    setSaving(true);
    const payload = { ...form, budget: form.budget ? Number(form.budget) : null, paid: form.paid ? Number(form.paid) : null, milestones };
    if (selected?.id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", selected.id);
      if (error) showToast("Failed to update project", "error");
      else {
        setProjects((p) => p.map((pr) => pr.id === selected.id ? { ...pr, ...payload } : pr));
        showToast("Project updated");
        setModal(false);
      }
    } else {
      const { data, error } = await supabase.from("projects").insert([payload]).select().single();
      if (error) showToast("Failed to create project", "error");
      else {
        setProjects((p) => [data, ...p]);
        showToast("Project created");
        setModal(false);
      }
    }
    setSaving(false);
  };
  const deleteProject = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) showToast("Failed to delete project", "error");
    else {
      setProjects((p) => p.filter((pr) => pr.id !== id));
      showToast("Project deleted");
    }
    setDeleting(null);
  };
  const toggleMilestone = async (project, milestoneId) => {
    const updated = (project.milestones ?? []).map((m) => m.id === milestoneId ? { ...m, done: !m.done } : m);
    await supabase.from("projects").update({ milestones: updated }).eq("id", project.id);
    setProjects((p) => p.map((pr) => pr.id === project.id ? { ...pr, milestones: updated } : pr));
  };
  const clientName = (id) => {
    const c = clients.find((c2) => c2.id === id);
    return c ? `${c.name} · ${c.business_name}` : "Unknown";
  };
  const progress = (p) => !p.budget || !p.paid ? 0 : Math.min(100, Math.round(p.paid / p.budget * 100));
  const filtered = filterStatus === "all" ? projects : projects.filter((p) => p.status === filterStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-7xl mx-auto", children: [
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { msg: toast.msg, type: toast.type }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", style: S.heading, children: "Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-0.5", style: S.subtle, children: [
          projects.length,
          " total projects"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openNew, className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Project"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["all", ...Object.keys(statusLabel)].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setFilterStatus(s),
        className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
        style: filterStatus === s ? { background: "oklch(0.66 0.22 295 / 0.2)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" } : { background: "oklch(1 0 0 / 0.04)", color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.08)" },
        children: [
          s === "all" ? "All" : statusLabel[s],
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 opacity-60", children: s === "all" ? projects.length : projects.filter((p) => p.status === s).length })
        ]
      },
      s
    )) }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto", style: { background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", style: S.heading, children: selected ? "Edit Project" : "New Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        [
          { label: "Client *", type: "select" },
          { label: "Project Title *", key: "title", placeholder: "Website + AI Receptionist" },
          { label: "Description", key: "description", placeholder: "Project scope...", textarea: true }
        ].map((f) => f.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Client *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.client_id, onChange: (e) => setForm((p) => ({ ...p, client_id: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select client" }),
            clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
              c.name,
              " — ",
              c.business_name
            ] }, c.id))
          ] })
        ] }, "client") : f.textarea ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form[f.key], onChange: (e) => setForm((p) => ({ ...p, [f.key]: e.target.value })), rows: 2, placeholder: f.placeholder, className: "w-full px-3 py-2.5 text-sm focus:outline-none resize-none", style: { ...S.input, borderRadius: 12 } })
        ] }, f.key) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form[f.key], onChange: (e) => setForm((p) => ({ ...p, [f.key]: e.target.value })), placeholder: f.placeholder, className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input })
        ] }, f.key)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
          { label: "Status", type: "select-status" },
          { label: "Budget ($)", key: "budget", placeholder: "2500", type: "number" },
          { label: "Start Date", key: "start_date", type: "date" },
          { label: "Due Date", key: "due_date", type: "date" },
          { label: "Amount Paid ($)", key: "paid", placeholder: "0", type: "number" }
        ].map((f) => f.type === "select-status" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.status, onChange: (e) => setForm((p) => ({ ...p, status: e.target.value })), className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input, children: Object.entries(statusLabel).map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v, children: l }, v)) })
        ] }, "status") : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-1.5", style: S.subtle, children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: f.type, value: form[f.key], onChange: (e) => setForm((p) => ({ ...p, [f.key]: e.target.value })), placeholder: f.placeholder, className: "w-full px-3 py-2.5 text-sm focus:outline-none", style: S.input })
        ] }, f.key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-semibold uppercase tracking-wider mb-2", style: S.subtle, children: "Milestones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mb-2", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMilestones((p) => p.map((x) => x.id === m.id ? { ...x, done: !x.done } : x)), children: m.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4", style: { color: "oklch(0.66 0.22 295)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4", style: S.subtle }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm flex-1 ${m.done ? "line-through" : ""}`, style: m.done ? S.subtle : { color: "oklch(0.78 0.015 285)" }, children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMilestones((p) => p.filter((x) => x.id !== m.id)), style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) })
          ] }, m.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newMilestone, onChange: (e) => setNewMilestone(e.target.value), onKeyDown: (e) => e.key === "Enter" && addMilestone(), placeholder: "Add milestone...", className: "flex-1 px-3 py-2 text-sm focus:outline-none", style: { ...S.input, borderRadius: 8 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addMilestone, className: "px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5", style: { color: "oklch(0.66 0.22 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2", children: [
          saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " ",
          selected ? "Save Changes" : "Create Project"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setModal(false), className: "px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5", style: S.subtle, children: "Cancel" })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin", style: { color: "oklch(0.66 0.22 295)" } }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", style: S.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-10 h-10", style: { color: "oklch(0.30 0.01 285)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: S.subtle, children: "No projects yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: openNew, className: "text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity", children: "Create first project" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((p) => {
      const pct = progress(p);
      const done = (p.milestones ?? []).filter((m) => m.done).length;
      const total = (p.milestones ?? []).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.card, className: "p-5 group relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", style: statusStyle[p.status ?? "proposal"], children: statusLabel[p.status ?? "proposal"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(p), className: "p-1.5 rounded-lg hover:bg-white/5 transition-colors", style: S.subtle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteProject(p.id, p.title), disabled: deleting === p.id, className: "p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50", style: S.subtle, children: deleting === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", style: S.heading, children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-3", style: S.subtle, children: clientName(p.client_id) }),
        p.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] mb-1", style: S.subtle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Payment $",
              (p.paid ?? 0).toLocaleString(),
              " / $",
              p.budget.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full overflow-hidden", style: { background: "oklch(1 0 0 / 0.08)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-brand transition-all", style: { width: `${pct}%` } }) })
        ] }),
        p.due_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs mb-3", style: S.subtle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
          " Due ",
          new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        ] }),
        total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3", style: { borderTop: "1px solid oklch(1 0 0 / 0.07)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] mb-2", style: S.subtle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              done,
              "/",
              total
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            (p.milestones ?? []).slice(0, 3).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => toggleMilestone(p, m.id), children: [
              m.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5 shrink-0", style: { color: "oklch(0.66 0.22 295)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5 shrink-0", style: S.subtle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${m.done ? "line-through" : ""}`, style: m.done ? S.subtle : { color: "oklch(0.72 0.018 285)" }, children: m.title })
            ] }, m.id)),
            total > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px]", style: S.subtle, children: [
              "+",
              total - 3,
              " more"
            ] })
          ] })
        ] })
      ] }, p.id);
    }) })
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
