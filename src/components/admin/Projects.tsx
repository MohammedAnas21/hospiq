import { useEffect, useState } from "react";
import { supabase, type Project, type Client } from "@/lib/supabase";
import { Plus, Loader2, X, CheckSquare, Square, Calendar, DollarSign } from "lucide-react";

const statusColor: Record<string, string> = {
  proposal:    "bg-blue-500/15 text-blue-400",
  in_progress: "bg-primary/15 text-primary",
  review:      "bg-amber-500/15 text-amber-400",
  completed:   "bg-emerald-500/15 text-emerald-400",
  on_hold:     "bg-red-500/15 text-red-400",
};

const statusLabel: Record<string, string> = {
  proposal: "Proposal", in_progress: "In Progress",
  review: "Review", completed: "Completed", on_hold: "On Hold",
};

const emptyForm = {
  client_id: "", title: "", description: "",
  status: "proposal" as Project["status"],
  start_date: "", due_date: "", budget: "", paid: "",
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const fetch = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name"),
    ]);
    setProjects(pRes.data ?? []);
    setClients(cRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    setSaving(true);
    const payload = {
      ...form,
      budget: form.budget ? Number(form.budget) : null,
      paid: form.paid ? Number(form.paid) : null,
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

  const openEdit = (p: Project) => {
    setSelected(p);
    setForm({
      client_id: p.client_id, title: p.title, description: p.description ?? "",
      status: p.status ?? "proposal", start_date: p.start_date ?? "",
      due_date: p.due_date ?? "", budget: String(p.budget ?? ""), paid: String(p.paid ?? ""),
    });
    setModal(true);
  };

  const toggleMilestone = async (project: Project, milestoneId: string) => {
    const updated = (project.milestones ?? []).map((m) =>
      m.id === milestoneId ? { ...m, done: !m.done } : m
    );
    await supabase.from("projects").update({ milestones: updated }).eq("id", project.id!);
    setProjects((p) => p.map((pr) => pr.id === project.id ? { ...pr, milestones: updated } : pr));
  };

  const clientName = (id: string) => {
    const c = clients.find((c) => c.id === id);
    return c ? `${c.name} · ${c.business_name}` : "Unknown";
  };

  const progress = (p: Project) => {
    if (!p.budget || !p.paid) return 0;
    return Math.min(100, Math.round((p.paid / p.budget) * 100));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading tracking-tight">Projects</h1>
          <p className="text-sm text-subtle mt-1">{projects.length} total projects</p>
        </div>
        <button onClick={() => { setSelected(null); setForm({ ...emptyForm }); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-6 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-heading">{selected ? "Edit Project" : "New Project"}</h3>
              <button onClick={() => setModal(false)} className="text-dim hover:text-body"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Client</label>
                <select value={form.client_id} onChange={(e) => setForm((p) => ({ ...p, client_id: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50">
                  <option value="">Select client</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.business_name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Project Title</label>
                <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Website + AI Receptionist"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={2} placeholder="Project scope..."
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as Project["status"] }))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50">
                    {Object.entries(statusLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Budget ($)</label>
                  <input type="number" value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                    placeholder="2500"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Start Date</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Due Date</label>
                  <input type="date" value={form.due_date} onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Amount Paid ($)</label>
                  <input type="number" value={form.paid} onChange={(e) => setForm((p) => ({ ...p, paid: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving || !form.client_id || !form.title}
                className="flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {selected ? "Save Changes" : "Create Project"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 rounded-xl glass text-subtle text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-sm text-subtle">No projects yet</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="glass gradient-border rounded-2xl p-5 hover-lift cursor-pointer" onClick={() => openEdit(p)}>
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[p.status ?? "proposal"]}`}>
                  {statusLabel[p.status ?? "proposal"]}
                </span>
                {p.budget && (
                  <div className="flex items-center gap-1 text-xs text-subtle">
                    <DollarSign className="w-3 h-3" />{p.budget.toLocaleString()}
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-heading text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-subtle mb-3">{clientName(p.client_id)}</p>

              {p.budget && p.paid !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-subtle mb-1">
                    <span>Payment</span>
                    <span>${p.paid?.toLocaleString()} / ${p.budget.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-brand rounded-full transition-all" style={{ width: `${progress(p)}%` }} />
                  </div>
                </div>
              )}

              {p.due_date && (
                <div className="flex items-center gap-1.5 text-xs text-subtle">
                  <Calendar className="w-3 h-3" /> Due {new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              )}

              {(p.milestones ?? []).length > 0 && (
                <div className="mt-3 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                  {(p.milestones ?? []).map((m) => (
                    <div key={m.id} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleMilestone(p, m.id)}>
                      {m.done ? <CheckSquare className="w-3.5 h-3.5 text-primary shrink-0" /> : <Square className="w-3.5 h-3.5 text-dim shrink-0" />}
                      <span className={`text-xs ${m.done ? "line-through text-dim" : "text-subtle"}`}>{m.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
