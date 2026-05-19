import { useEffect, useState } from "react";
import { supabase, type Client } from "@/lib/supabase";
import { Search, Plus, Loader2, X, Mail, Phone, Building2, Globe } from "lucide-react";

const statusColor: Record<string, string> = {
  active:   "bg-emerald-500/15 text-emerald-400",
  inactive: "bg-amber-500/15 text-amber-400",
  churned:  "bg-red-500/15 text-red-400",
};

const empty: Omit<Client, "id" | "created_at"> = {
  name: "", email: "", phone: "", business_name: "",
  business_type: "", country: "", status: "active", notes: "",
};

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    setSaving(true);
    if (selected?.id) {
      await supabase.from("clients").update(form).eq("id", selected.id);
      setClients((p) => p.map((c) => c.id === selected.id ? { ...c, ...form } : c));
    } else {
      const { data } = await supabase.from("clients").insert([form]).select().single();
      if (data) setClients((p) => [data, ...p]);
    }
    setSaving(false);
    setModal(false);
    setSelected(null);
    setForm({ ...empty });
  };

  const openEdit = (c: Client) => {
    setSelected(c);
    setForm({ name: c.name, email: c.email, phone: c.phone ?? "", business_name: c.business_name,
      business_type: c.business_type, country: c.country ?? "", status: c.status ?? "active", notes: c.notes ?? "" });
    setModal(true);
  };

  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [c.name, c.email, c.business_name].some((v) => v?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading tracking-tight">Clients</h1>
          <p className="text-sm text-subtle mt-1">{clients.length} total clients</p>
        </div>
        <button onClick={() => { setSelected(null); setForm({ ...empty }); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium shadow-glow-soft hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-6 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-heading">{selected ? "Edit Client" : "New Client"}</h3>
              <button onClick={() => setModal(false)} className="text-dim hover:text-body"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "name", placeholder: "Mohammed Anas" },
                { label: "Email", key: "email", placeholder: "client@brand.com" },
                { label: "Phone", key: "phone", placeholder: "+91 98765 43210" },
                { label: "Business Name", key: "business_name", placeholder: "Velora Café" },
                { label: "Business Type", key: "business_type", placeholder: "Hotel / Restaurant..." },
                { label: "Country", key: "country", placeholder: "India" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Status</label>
                <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as Client["status"] }))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="churned">Churned</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={3} placeholder="Internal notes..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none" />
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-gradient-brand text-white text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {selected ? "Save Changes" : "Add Client"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 rounded-xl glass text-subtle text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-sm text-subtle">No clients yet</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} onClick={() => openEdit(c)}
              className="glass gradient-border rounded-2xl p-5 hover-lift cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 grid place-items-center text-primary font-bold text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColor[c.status ?? "active"]}`}>
                  {c.status}
                </span>
              </div>
              <h3 className="font-semibold text-heading text-sm">{c.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-subtle">
                  <Building2 className="w-3 h-3 shrink-0" /> {c.business_name}
                </div>
                <div className="flex items-center gap-2 text-xs text-subtle">
                  <Mail className="w-3 h-3 shrink-0" /> {c.email}
                </div>
                {c.phone && <div className="flex items-center gap-2 text-xs text-subtle"><Phone className="w-3 h-3 shrink-0" /> {c.phone}</div>}
                {c.country && <div className="flex items-center gap-2 text-xs text-subtle"><Globe className="w-3 h-3 shrink-0" /> {c.country}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
