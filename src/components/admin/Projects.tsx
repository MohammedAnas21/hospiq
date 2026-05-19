import { useEffect, useState } from "react";
import { supabase, type Project, type Client, type Milestone } from "@/lib/supabase";
import { Plus, Loader2, X, CheckSquare, Square, Calendar, DollarSign, Trash2, Edit2, PlusCircle } from "lucide-react";

const statusStyle: Record<string, React.CSSProperties> = {
  proposal:    { background: "oklch(0.62 0.21 240 / 0.15)", color: "oklch(0.72 0.18 240)", border: "1px solid oklch(0.62 0.21 240 / 0.3)" },
  in_progress: { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" },
  review:      { background: "oklch(0.78 0.18 75 / 0.15)",  color: "oklch(0.85 0.16 75)",  border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  completed:   { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  on_hold:     { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)",  border: "1px solid oklch(0.62 0.24 27 / 0.3)" },
};

const statusLabel: Record<string, string> = { proposal: "Proposal", in_progress: "In Progress", review: "Review", completed: "Completed", on_hold: "On Hold" };

const S = {
  card:    { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 } as React.CSSProperties,
  input:   { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 } as React.CSSProperties,
  heading: { color: "oklch(0.93 0.012 285)" } as React.CSSProperties,
  subtle:  { color: "oklch(0.52 0.015 285)" } as React.CSSProperties,
};

const emptyForm = { client_id: "", title: "", description: "", status: "proposal" as Project["status"], start_date: "", due_date: "", budget: "", paid: "" };

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up"
      style={{ background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" }}>
      {msg}
    </div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const showToast = (msg: string, type: "success" | "error" = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const fetchAll = async () => {
    setLoading(true);
    const [pR, cR] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name, business_name"),
    ]);
    setProjects(pR.data ?? []);
    setClients(cR.data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openNew = () => { setSelected(null); setForm({ ...emptyForm }); setMilestones([]); setModal(true); };
  const openEdit = (p: Project) => {
    setSelected(p);
    setForm({ client_id: p.client_id, title: p.title, description: p.description ?? "", status: p.status ?? "proposal", start_date: p.start_date ?? "", due_date: p.due_date ?? "", budget: String(p.budget ?? ""), paid: String(p.paid ?? "") });
    setMilestones(p.milestones ?? []);
    setModal(true);
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones(p => [...p, { id: Date.now().toString(), title: newMilestone.trim(), done: false }]);
    setNewMilestone("");
  };

  const save = async () => {
    if (!form.client_id || !form.title) { showToast("Client and title are required", "error"); return; }
    setSaving(true);
    const payload = { ...form, budget: form.budget ? Number(form.budget) : null, paid: form.paid ? Number(form.paid) : null, milestones };
    if (selected?.id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", selected.id);
      if (error) showToast("Failed to update project", "error");
      else { setProjects(p => p.map(pr => pr.id === selected.id ? { ...pr, ...payload } : pr)); showToast("Project updated"); setModal(false); }
    } else {
      const { data, error } = await supabase.from("projects").insert([payload]).select().single();
      if (error) showToast("Failed to create project", "error");
      else { setProjects(p => [data, ...p]); showToast("Project created"); setModal(false); }
    }
    setSaving(false);
  };

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) showToast("Failed to delete project", "error");
    else { setProjects(p => p.filter(pr => pr.id !== id)); showToast("Project deleted"); }
    setDeleting(null);
  };

  const toggleMilestone = async (project: Project, milestoneId: string) => {
    const updated = (project.milestones ?? []).map(m => m.id === milestoneId ? { ...m, done: !m.done } : m);
    await supabase.from("projects").update({ milestones: updated }).eq("id", project.id!);
    setProjects(p => p.map(pr => pr.id === project.id ? { ...pr, milestones: updated } : pr));
  };

  const clientName = (id: string) => { const c = clients.find(c => c.id === id); return c ? `${c.name} · ${c.business_name}` : "Unknown"; };
  const progress = (p: Project) => (!p.budget || !p.paid) ? 0 : Math.min(100, Math.round((p.paid / p.budget) * 100));

  const filtered = filterStatus === "all" ? projects : projects.filter(p => p.status === filterStatus);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={S.heading}>Projects</h1>
          <p className="text-sm mt-0.5" style={S.subtle}>{projects.length} total projects</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {["all", ...Object.keys(statusLabel)].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
            style={filterStatus === s
              ? { background: "oklch(0.66 0.22 295 / 0.2)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" }
              : { background: "oklch(1 0 0 / 0.04)", color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.08)" }
            }>
            {s === "all" ? "All" : statusLabel[s]}
            <span className="ml-1.5 opacity-60">{s === "all" ? projects.length : projects.filter(p => p.status === s).length}</span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto" style={{ background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold" style={S.heading}>{selected ? "Edit Project" : "New Project"}</h3>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Client *", type: "select" },
                { label: "Project Title *", key: "title", placeholder: "Website + AI Receptionist" },
                { label: "Description", key: "description", placeholder: "Project scope...", textarea: true },
              ].map((f: any) => f.type === "select" ? (
                <div key="client">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Client *</label>
                  <select value={form.client_id} onChange={e => setForm(p => ({ ...p, client_id: e.target.value }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                    <option value="">Select client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} — {c.business_name}</option>)}
                  </select>
                </div>
              ) : f.textarea ? (
                <div key={f.key}>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>{f.label}</label>
                  <textarea value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} rows={2} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm focus:outline-none resize-none" style={{ ...S.input, borderRadius: 12 }} />
                </div>
              ) : (
                <div key={f.key}>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Status", type: "select-status" },
                  { label: "Budget ($)", key: "budget", placeholder: "2500", type: "number" },
                  { label: "Start Date", key: "start_date", type: "date" },
                  { label: "Due Date", key: "due_date", type: "date" },
                  { label: "Amount Paid ($)", key: "paid", placeholder: "0", type: "number" },
                ].map((f: any) => f.type === "select-status" ? (
                  <div key="status">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Status</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Project["status"] }))} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                      {Object.entries(statusLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                ) : (
                  <div key={f.key}>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>{f.label}</label>
                    <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input} />
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={S.subtle}>Milestones</label>
                <div className="space-y-1.5 mb-2">
                  {milestones.map(m => (
                    <div key={m.id} className="flex items-center gap-2">
                      <button onClick={() => setMilestones(p => p.map(x => x.id === m.id ? { ...x, done: !x.done } : x))}>
                        {m.done ? <CheckSquare className="w-4 h-4" style={{ color: "oklch(0.66 0.22 295)" }} /> : <Square className="w-4 h-4" style={S.subtle} />}
                      </button>
                      <span className={`text-sm flex-1 ${m.done ? "line-through" : ""}`} style={m.done ? S.subtle : { color: "oklch(0.78 0.015 285)" }}>{m.title}</span>
                      <button onClick={() => setMilestones(p => p.filter(x => x.id !== m.id))} style={S.subtle}><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newMilestone} onChange={e => setNewMilestone(e.target.value)} onKeyDown={e => e.key === "Enter" && addMilestone()} placeholder="Add milestone..." className="flex-1 px-3 py-2 text-sm focus:outline-none" style={{ ...S.input, borderRadius: 8 }} />
                  <button onClick={addMilestone} className="px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ color: "oklch(0.66 0.22 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" }}>
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {selected ? "Save Changes" : "Create Project"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5" style={S.subtle}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin" style={{ color: "oklch(0.66 0.22 295)" }} /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3" style={S.card}>
          <DollarSign className="w-10 h-10" style={{ color: "oklch(0.30 0.01 285)" }} />
          <p className="text-sm" style={S.subtle}>No projects yet</p>
          <button onClick={openNew} className="text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity">Create first project</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => {
            const pct = progress(p);
            const done = (p.milestones ?? []).filter(m => m.done).length;
            const total = (p.milestones ?? []).length;
            return (
              <div key={p.id} style={S.card} className="p-5 group relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={statusStyle[p.status ?? "proposal"]}>
                    {statusLabel[p.status ?? "proposal"]}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle}><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteProject(p.id!, p.title)} disabled={deleting === p.id} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50" style={S.subtle}>
                      {deleting === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1" style={S.heading}>{p.title}</h3>
                <p className="text-xs mb-3" style={S.subtle}>{clientName(p.client_id)}</p>

                {p.budget && (
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] mb-1" style={S.subtle}>
                      <span>Payment ${(p.paid ?? 0).toLocaleString()} / ${p.budget.toLocaleString()}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 0.08)" }}>
                      <div className="h-full rounded-full bg-gradient-brand transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                {p.due_date && (
                  <div className="flex items-center gap-1.5 text-xs mb-3" style={S.subtle}>
                    <Calendar className="w-3 h-3" /> Due {new Date(p.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                )}

                {total > 0 && (
                  <div className="pt-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
                    <div className="flex items-center justify-between text-[10px] mb-2" style={S.subtle}>
                      <span>Milestones</span><span>{done}/{total}</span>
                    </div>
                    <div className="space-y-1.5">
                      {(p.milestones ?? []).slice(0, 3).map(m => (
                        <div key={m.id} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleMilestone(p, m.id)}>
                          {m.done ? <CheckSquare className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.66 0.22 295)" }} /> : <Square className="w-3.5 h-3.5 shrink-0" style={S.subtle} />}
                          <span className={`text-xs ${m.done ? "line-through" : ""}`} style={m.done ? S.subtle : { color: "oklch(0.72 0.018 285)" }}>{m.title}</span>
                        </div>
                      ))}
                      {total > 3 && <p className="text-[10px]" style={S.subtle}>+{total - 3} more</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
