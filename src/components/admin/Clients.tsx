import { useEffect, useState } from "react";
import { supabase, type Client } from "@/lib/supabase";
import { Search, Plus, Loader2, X, Mail, Phone, Building2, Globe, Trash2, Edit2 } from "lucide-react";

const statusStyle: Record<string, React.CSSProperties> = {
  active:   { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
  inactive: { background: "oklch(0.78 0.18 75 / 0.15)",  color: "oklch(0.85 0.16 75)",  border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  churned:  { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)",  border: "1px solid oklch(0.62 0.24 27 / 0.3)" },
};

const S = {
  card:    { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 } as React.CSSProperties,
  input:   { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 } as React.CSSProperties,
  heading: { color: "oklch(0.93 0.012 285)" } as React.CSSProperties,
  body:    { color: "oklch(0.72 0.018 285)" } as React.CSSProperties,
  subtle:  { color: "oklch(0.52 0.015 285)" } as React.CSSProperties,
};

const empty: Omit<Client, "id" | "created_at"> = { name: "", email: "", phone: "", business_name: "", business_type: "", country: "", status: "active", notes: "" };

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up"
      style={{ background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" }}>
      {msg}
    </div>
  );
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    if (error) showToast("Failed to load clients", "error");
    else setClients(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const openNew = () => { setSelected(null); setForm({ ...empty }); setModal(true); };
  const openEdit = (c: Client) => {
    setSelected(c);
    setForm({ name: c.name, email: c.email, phone: c.phone ?? "", business_name: c.business_name, business_type: c.business_type, country: c.country ?? "", status: c.status ?? "active", notes: c.notes ?? "" });
    setModal(true);
  };

  const save = async () => {
    if (!form.name || !form.email || !form.business_name) { showToast("Name, email and business name are required", "error"); return; }
    setSaving(true);
    if (selected?.id) {
      const { error } = await supabase.from("clients").update(form).eq("id", selected.id);
      if (error) showToast("Failed to update client", "error");
      else { setClients(p => p.map(c => c.id === selected.id ? { ...c, ...form } : c)); showToast("Client updated"); setModal(false); }
    } else {
      const { data, error } = await supabase.from("clients").insert([form]).select().single();
      if (error) showToast("Failed to add client", "error");
      else { setClients(p => [data, ...p]); showToast("Client added"); setModal(false); }
    }
    setSaving(false);
  };

  const deleteClient = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) showToast("Failed to delete client", "error");
    else { setClients(p => p.filter(c => c.id !== id)); showToast("Client deleted"); }
    setDeleting(null);
  };

  const filtered = clients.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [c.name, c.email, c.business_name, c.country].some(v => v?.toLowerCase().includes(q));
  });

  const Field = ({ label, k, placeholder, type = "text" }: { label: string; k: keyof typeof form; placeholder: string; type?: string }) => (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>{label}</label>
      <input type={type} value={(form as any)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
        placeholder={placeholder} className="w-full px-3 py-2.5 text-sm focus:outline-none transition-colors"
        style={{ ...S.input, outline: "none" }}
        onFocus={e => (e.target.style.borderColor = "oklch(0.66 0.22 295 / 0.6)")}
        onBlur={e => (e.target.style.borderColor = "oklch(1 0 0 / 0.10)")} />
    </div>
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={S.heading}>Clients</h1>
          <p className="text-sm mt-0.5" style={S.subtle}>{clients.length} total clients</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity shadow-glow-soft">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={S.subtle} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full pl-9 pr-4 py-2 text-sm focus:outline-none"
          style={{ ...S.input, padding: "8px 12px 8px 34px" }} />
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl p-6 shadow-elegant max-h-[90vh] overflow-y-auto" style={{ background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold" style={S.heading}>{selected ? "Edit Client" : "New Client"}</h3>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name *" k="name" placeholder="Mohammed Anas" />
              <Field label="Email *" k="email" placeholder="client@brand.com" type="email" />
              <Field label="Phone" k="phone" placeholder="+91 98765 43210" />
              <Field label="Business Name *" k="business_name" placeholder="Velora Café" />
              <Field label="Business Type" k="business_type" placeholder="Hotel / Restaurant" />
              <Field label="Country" k="country" placeholder="India" />
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Client["status"] }))}
                  className="w-full px-3 py-2.5 text-sm focus:outline-none" style={S.input}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="churned">Churned</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={S.subtle}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3}
                placeholder="Internal notes about this client..."
                className="w-full px-3 py-2.5 text-sm focus:outline-none resize-none" style={{ ...S.input, borderRadius: 12 }} />
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {selected ? "Save Changes" : "Add Client"}
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
          <Building2 className="w-10 h-10" style={{ color: "oklch(0.30 0.01 285)" }} />
          <p className="text-sm" style={S.subtle}>{search ? "No clients match your search" : "No clients yet"}</p>
          {!search && <button onClick={openNew} className="text-sm px-4 py-2 rounded-xl text-white bg-gradient-brand hover:opacity-90 transition-opacity">Add your first client</button>}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} style={S.card} className="p-5 group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl grid place-items-center text-sm font-bold shrink-0"
                    style={{ background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" }}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={S.heading}>{c.name}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={statusStyle[c.status ?? "active"]}>{c.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle}><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteClient(c.id!, c.name)} disabled={deleting === c.id} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50" style={S.subtle}>
                    {deleting === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs" style={S.subtle}><Building2 className="w-3 h-3 shrink-0" />{c.business_name} · {c.business_type}</div>
                <div className="flex items-center gap-2 text-xs" style={S.subtle}><Mail className="w-3 h-3 shrink-0" />{c.email}</div>
                {c.phone && <div className="flex items-center gap-2 text-xs" style={S.subtle}><Phone className="w-3 h-3 shrink-0" />{c.phone}</div>}
                {c.country && <div className="flex items-center gap-2 text-xs" style={S.subtle}><Globe className="w-3 h-3 shrink-0" />{c.country}</div>}
              </div>
              {c.notes && <div className="mt-3 pt-3 text-xs" style={{ ...S.subtle, borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>📝 {c.notes}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
