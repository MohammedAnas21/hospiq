import { useEffect, useState } from "react";
import { supabase, type Lead } from "@/lib/supabase";
import { Search, RefreshCw, UserPlus, Loader2, ChevronDown, StickyNote, X } from "lucide-react";

const STATUS_OPTIONS: Lead["status"][] = ["new", "contacted", "closed", "converted"];

const statusColor: Record<string, string> = {
  new:       "bg-primary/15 text-primary border-primary/25",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  closed:    "bg-red-500/15 text-red-400 border-red-500/25",
  converted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [converting, setConverting] = useState<string | null>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    setUpdatingId(id);
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((p) => p.map((l) => l.id === id ? { ...l, status } : l));
    setUpdatingId(null);
  };

  const saveNote = async (id: string) => {
    await supabase.from("leads").update({ notes: noteText }).eq("id", id);
    setLeads((p) => p.map((l) => l.id === id ? { ...l, notes: noteText } : l));
    setNoteId(null);
  };

  const convertToClient = async (lead: Lead) => {
    if (!lead.id) return;
    setConverting(lead.id);
    const { error } = await supabase.from("clients").insert([{
      name: lead.name,
      email: lead.email,
      business_name: lead.business_name,
      business_type: lead.business_type,
      lead_id: lead.id,
      status: "active",
    }]);
    if (!error) {
      await updateStatus(lead.id, "converted");
    }
    setConverting(null);
  };

  const filtered = leads.filter((l) => {
    const matchSearch = !search || [l.name, l.email, l.business_name, l.business_type, l.message]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || l.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s!] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading tracking-tight">Leads</h1>
          <p className="text-sm text-subtle mt-1">{leads.length} total inquiries</p>
        </div>
        <button onClick={fetch} className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-subtle hover:text-body text-sm transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s!)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              filter === s ? "bg-primary/20 text-primary" : "glass text-subtle hover:text-body"
            }`}
          >
            {s} {s !== "all" && <span className="ml-1 opacity-60">{counts[s] ?? 0}</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads..."
          className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Note modal */}
      {noteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-6 w-full max-w-md shadow-elegant">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-heading">Add Note</h3>
              <button onClick={() => setNoteId(null)} className="text-dim hover:text-body"><X className="w-4 h-4" /></button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
              placeholder="Write a note about this lead..."
              className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button onClick={() => saveNote(noteId)} className="flex-1 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium">Save Note</button>
              <button onClick={() => setNoteId(null)} className="px-4 py-2 rounded-xl glass text-subtle text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass gradient-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-sm text-subtle">No leads found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Email", "Business", "Type", "Message", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-subtle font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-body whitespace-nowrap">{lead.name}</div>
                      {lead.notes && <div className="text-xs text-subtle mt-0.5 max-w-[140px] truncate">📝 {lead.notes}</div>}
                    </td>
                    <td className="px-4 py-3 text-subtle whitespace-nowrap">{lead.email}</td>
                    <td className="px-4 py-3 text-subtle whitespace-nowrap">{lead.business_name}</td>
                    <td className="px-4 py-3 text-subtle whitespace-nowrap">{lead.business_type}</td>
                    <td className="px-4 py-3 text-subtle max-w-[200px]">
                      <span className="truncate block">{lead.message}</span>
                    </td>
                    <td className="px-4 py-3">
                      {updatingId === lead.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <div className="relative">
                          <select
                            value={lead.status ?? "new"}
                            onChange={(e) => updateStatus(lead.id!, e.target.value as Lead["status"])}
                            className={`appearance-none pl-2 pr-6 py-1 rounded-lg text-xs font-medium border cursor-pointer focus:outline-none ${statusColor[lead.status ?? "new"]} bg-transparent`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="bg-background text-body capitalize">{s}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-subtle whitespace-nowrap text-xs">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setNoteId(lead.id!); setNoteText(lead.notes ?? ""); }}
                          className="p-1.5 rounded-lg glass text-subtle hover:text-body transition-colors"
                          title="Add note"
                        >
                          <StickyNote className="w-3.5 h-3.5" />
                        </button>
                        {lead.status !== "converted" && (
                          <button
                            onClick={() => convertToClient(lead)}
                            disabled={converting === lead.id}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-colors disabled:opacity-50"
                            title="Convert to client"
                          >
                            {converting === lead.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />}
                            Convert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
