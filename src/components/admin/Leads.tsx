import { useEffect, useState } from "react";
import { supabase, type Lead } from "@/lib/supabase";
import { Search, RefreshCw, UserPlus, Loader2, StickyNote, X, Trash2, Mail, MessageSquare } from "lucide-react";

const STATUS_OPTIONS: Lead["status"][] = ["new", "contacted", "closed", "converted"];

const statusStyle: Record<string, React.CSSProperties> = {
  new:       { background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" },
  contacted: { background: "oklch(0.78 0.18 75 / 0.15)",  color: "oklch(0.85 0.16 75)",  border: "1px solid oklch(0.78 0.18 75 / 0.3)" },
  closed:    { background: "oklch(0.62 0.24 27 / 0.15)",  color: "oklch(0.72 0.20 27)",  border: "1px solid oklch(0.62 0.24 27 / 0.3)" },
  converted: { background: "oklch(0.62 0.20 145 / 0.15)", color: "oklch(0.72 0.18 145)", border: "1px solid oklch(0.62 0.20 145 / 0.3)" },
};

const S = {
  card:    { background: "oklch(0.10 0.03 285)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 16 } as React.CSSProperties,
  input:   { background: "oklch(0.12 0.03 285)", border: "1px solid oklch(1 0 0 / 0.10)", borderRadius: 10, color: "oklch(0.78 0.015 285)", fontSize: 13 } as React.CSSProperties,
  heading: { color: "oklch(0.93 0.012 285)" } as React.CSSProperties,
  body:    { color: "oklch(0.72 0.018 285)" } as React.CSSProperties,
  subtle:  { color: "oklch(0.52 0.015 285)" } as React.CSSProperties,
  dim:     { color: "oklch(0.38 0.010 285)" } as React.CSSProperties,
};

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-elegant animate-fade-up"
      style={{ background: type === "success" ? "oklch(0.62 0.20 145 / 0.95)" : "oklch(0.62 0.24 27 / 0.95)", color: "white", backdropFilter: "blur(12px)" }}>
      {msg}
    </div>
  );
}

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");
  const [converting, setConverting] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) showToast("Failed to load leads", "error");
    else setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    setUpdatingId(id);
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) showToast("Failed to update status", "error");
    else { setLeads(p => p.map(l => l.id === id ? { ...l, status } : l)); showToast("Status updated"); }
    setUpdatingId(null);
  };

  const saveNote = async () => {
    if (!noteModal?.id) return;
    const { error } = await supabase.from("leads").update({ notes: noteText }).eq("id", noteModal.id);
    if (error) showToast("Failed to save note", "error");
    else { setLeads(p => p.map(l => l.id === noteModal.id ? { ...l, notes: noteText } : l)); showToast("Note saved"); }
    setNoteModal(null);
  };

  const convertToClient = async (lead: Lead) => {
    if (!lead.id) return;
    setConverting(lead.id);
    const { error } = await supabase.from("clients").insert([{
      name: lead.name, email: lead.email,
      business_name: lead.business_name, business_type: lead.business_type,
      lead_id: lead.id, status: "active",
    }]);
    if (error) showToast("Failed to convert lead", "error");
    else { await updateStatus(lead.id, "converted"); showToast(`${lead.name} converted to client`); }
    setConverting(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setDeleting(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) showToast("Failed to delete lead", "error");
    else { setLeads(p => p.filter(l => l.id !== id)); showToast("Lead deleted"); }
    setDeleting(null);
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !search || [l.name, l.email, l.business_name, l.business_type, l.message].some(v => v?.toLowerCase().includes(q));
    const matchFilter = filter === "all" || l.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s!]: leads.filter(l => l.status === s).length }), {} as Record<string, number>);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={S.heading}>Leads</h1>
          <p className="text-sm mt-0.5" style={S.subtle}>{leads.length} total inquiries</p>
        </div>
        <button onClick={fetchLeads} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5" style={S.subtle}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["all", ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setFilter(s!)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
              style={filter === s
                ? { background: "oklch(0.66 0.22 295 / 0.2)", color: "oklch(0.78 0.18 295)", border: "1px solid oklch(0.66 0.22 295 / 0.3)" }
                : { background: "oklch(1 0 0 / 0.04)", color: "oklch(0.52 0.015 285)", border: "1px solid oklch(1 0 0 / 0.08)" }
              }>
              {s}{s !== "all" && <span className="ml-1.5 opacity-60">{counts[s] ?? 0}</span>}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px] max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={S.dim} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2 text-sm focus:outline-none"
            style={{ ...S.input, padding: "8px 12px 8px 34px" }} />
        </div>
      </div>

      {/* Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl p-6 shadow-elegant" style={{ background: "oklch(0.11 0.03 285)", border: "1px solid oklch(1 0 0 / 0.12)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold" style={S.heading}>Note for {noteModal.name}</h3>
                <p className="text-xs mt-0.5" style={S.subtle}>{noteModal.business_name}</p>
              </div>
              <button onClick={() => setNoteModal(null)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={S.subtle}><X className="w-4 h-4" /></button>
            </div>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={5}
              placeholder="Write a note about this lead..."
              className="w-full p-3 text-sm rounded-xl resize-none focus:outline-none"
              style={{ ...S.input, borderRadius: 12 }} />
            <div className="flex gap-2 mt-4">
              <button onClick={saveNote} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-brand hover:opacity-90 transition-opacity">Save Note</button>
              <button onClick={() => setNoteModal(null)} className="px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5" style={S.subtle}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={S.card} className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin" style={{ color: "oklch(0.66 0.22 295)" }} /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Users className="w-10 h-10" style={{ color: "oklch(0.30 0.01 285)" }} />
            <p className="text-sm" style={S.subtle}>{search ? "No leads match your search" : "No leads yet"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
                  {["Contact", "Business", "Message", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap" style={S.subtle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <>
                    <tr key={lead.id} className="transition-colors hover:bg-white/[0.02] cursor-pointer"
                      style={i < filtered.length - 1 ? { borderBottom: "1px solid oklch(1 0 0 / 0.05)" } : {}}
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id!)}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-semibold shrink-0"
                            style={{ background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" }}>
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium whitespace-nowrap" style={S.heading}>{lead.name}</div>
                            <div className="text-xs whitespace-nowrap" style={S.subtle}>{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium whitespace-nowrap" style={S.body}>{lead.business_name}</div>
                        <div className="text-xs" style={S.subtle}>{lead.business_type}</div>
                      </td>
                      <td className="px-5 py-3.5 max-w-[220px]">
                        <span className="truncate block text-xs" style={S.subtle}>{lead.message}</span>
                        {lead.notes && <span className="text-[10px] mt-0.5 block truncate" style={{ color: "oklch(0.66 0.22 295)" }}>📝 {lead.notes}</span>}
                      </td>
                      <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                        {updatingId === lead.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" style={{ color: "oklch(0.66 0.22 295)" }} />
                        ) : (
                          <select value={lead.status ?? "new"} onChange={e => updateStatus(lead.id!, e.target.value as Lead["status"])}
                            className="text-xs font-medium rounded-lg px-2 py-1 cursor-pointer focus:outline-none appearance-none"
                            style={{ ...statusStyle[lead.status ?? "new"], background: statusStyle[lead.status ?? "new"].background }}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: "oklch(0.10 0.03 285)", color: "oklch(0.78 0.015 285)" }} className="capitalize">{s}</option>)}
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs" style={S.subtle}>
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                      </td>
                      <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => { setNoteModal(lead); setNoteText(lead.notes ?? ""); }}
                            className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={S.subtle} title="Add note">
                            <StickyNote className="w-3.5 h-3.5" />
                          </button>
                          <a href={`mailto:${lead.email}`} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={S.subtle} title="Send email">
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          {lead.status !== "converted" && (
                            <button onClick={() => convertToClient(lead)} disabled={converting === lead.id}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                              style={{ background: "oklch(0.66 0.22 295 / 0.15)", color: "oklch(0.78 0.18 295)" }}>
                              {converting === lead.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />}
                              Convert
                            </button>
                          )}
                          <button onClick={() => deleteLead(lead.id!)} disabled={deleting === lead.id}
                            className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10 disabled:opacity-50" style={{ color: "oklch(0.52 0.015 285)" }} title="Delete">
                            {deleting === lead.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === lead.id && (
                      <tr key={lead.id + "-exp"} style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)", background: "oklch(1 0 0 / 0.02)" }}>
                        <td colSpan={6} className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.66 0.22 295)" }} />
                            <div>
                              <div className="text-xs font-semibold mb-1" style={S.subtle}>Full Message</div>
                              <p className="text-sm leading-relaxed" style={S.body}>{lead.message}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
}
function UserPlus(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>;
}
