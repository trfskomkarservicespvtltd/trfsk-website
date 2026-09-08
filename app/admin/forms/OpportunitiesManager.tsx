"use client";

import { useEffect, useState } from "react";

type Opportunity = {
  id: string;
  title: string;
  detail: string;
  status: string;
  sort_order: number;
  is_active: boolean;
};

export default function OpportunitiesManager() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [form, setForm] = useState({ title: "", detail: "", status: "Open for review", sort_order: "0" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchOpportunities(); }, []);

  async function fetchOpportunities() {
    try {
      const res = await fetch("/api/admin/opportunities");
      const data = await res.json();
      if (data.data) setOpportunities(data.data);
    } catch { /* ignore */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/opportunities", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: editingId ? JSON.stringify({ id: editingId, ...form }) : JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(editingId ? "Opportunity updated." : "Opportunity created.");
        setForm({ title: "", detail: "", status: "Open for review", sort_order: "0" });
        setEditingId(null);
        fetchOpportunities();
      } else {
        setMessage(data.error || "Failed");
      }
    } catch { setMessage("Network error"); }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this opportunity?")) return;
    try {
      const res = await fetch(`/api/admin/opportunities?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchOpportunities();
    } catch { /* ignore */ }
  }

  async function handleToggle(id: string, current: boolean) {
    try {
      const res = await fetch("/api/admin/opportunities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !current }),
      });
      if (res.ok) fetchOpportunities();
    } catch { /* ignore */ }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-lg font-semibold text-white">Manage Opportunities</h2>
      <p className="mt-1 text-sm text-slate-500">Add, edit, or remove opportunities shown on partner dashboard.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-400">Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Status<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="field mt-2"><option value="Open for review">Open for review</option><option value="Coming soon">Coming soon</option><option value="Closed">Closed</option></select></label>
          <label className="text-sm text-slate-400">Sort Order<input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="field mt-2" /></label>
        </div>
        <label className="text-sm text-slate-400">Detail<textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} className="field mt-2" rows={2} /></label>
        <div className="flex items-center gap-4">
          <button disabled={loading} type="submit" className="action">{loading ? "Saving..." : editingId ? "Update" : "Add Opportunity"}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", detail: "", status: "Open for review", sort_order: "0" }); }} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300">Cancel</button>}
          {message && <span className={`text-sm ${message.includes("updated") || message.includes("created") ? "text-emerald-300" : "text-rose-300"}`}>{message}</span>}
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {opportunities.map((opp) => (
          <div key={opp.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4">
            <div>
              <p className="font-semibold text-white">{opp.title}</p>
              <p className="text-xs text-slate-500">{opp.detail}</p>
              <span className="mt-2 inline-block rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">{opp.status}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(opp.id); setForm({ title: opp.title, detail: opp.detail, status: opp.status, sort_order: String(opp.sort_order) }); }} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800">Edit</button>
              <button onClick={() => handleToggle(opp.id, opp.is_active)} className={`rounded-lg px-3 py-1.5 text-xs ${opp.is_active ? "bg-emerald-600/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>{opp.is_active ? "Active" : "Hidden"}</button>
              <button onClick={() => handleDelete(opp.id)} className="rounded-lg bg-rose-600/20 px-3 py-1.5 text-xs text-rose-400">Delete</button>
            </div>
          </div>
        ))}
        {opportunities.length === 0 && <p className="text-center text-sm text-slate-500">No opportunities yet.</p>}
      </div>
    </div>
  );
}