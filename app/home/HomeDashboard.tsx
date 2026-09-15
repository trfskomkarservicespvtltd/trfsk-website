"use client";

import { useState } from "react";
import { BarChart3, CalendarDays, CircleDollarSign, FileSpreadsheet, Plus, TrendingUp, Upload } from "lucide-react";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PerformanceEntry } from "@/app/lib/performance";

const colors = ["#22d3ee", "#34d399", "#fbbf24", "#fb7185", "#a78bfa"];
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function HomeDashboard({ entries, isAdmin }: { entries: PerformanceEntry[]; isAdmin: boolean }) {
  const [records, setRecords] = useState(entries);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const totalInvested = records.reduce((sum, entry) => sum + Number(entry.investment_amount), 0);
  const totalPayouts = records.reduce((sum, entry) => sum + Number(entry.payout_amount), 0);
  const netValue = totalInvested + totalPayouts;
  const partnerCount = new Set(records.map((entry) => entry.partner_name)).size;
  const monthly = Object.values(records.reduce<Record<string, { month: string; invested: number; payouts: number }>>((months, entry) => {
    const month = entry.transaction_date.slice(0, 7);
    months[month] ??= { month, invested: 0, payouts: 0 };
    months[month].invested += Number(entry.investment_amount);
    months[month].payouts += Number(entry.payout_amount);
    return months;
  }, {})).sort((a, b) => a.month.localeCompare(b.month)).map((item) => ({ ...item, label: new Date(`${item.month}-01`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }) }));
  const typeTotals = records.reduce<Record<string, number>>((types, entry) => {
    types[entry.transaction_type] = (types[entry.transaction_type] ?? 0) + Number(entry.investment_amount) + Number(entry.payout_amount);
    return types;
  }, {});
  const byType = Object.entries(typeTotals).map(([name, value]) => ({ name, value }));

  async function importWorkbook(file: File | undefined) {
    if (!file) return;
    setUploading(true); setMessage("");
    const form = new FormData(); form.set("file", file);
    const response = await fetch("/api/admin/performance", { method: "POST", body: form });
    const result = await response.json();
    setMessage(response.ok ? `Imported ${result.imported} performance rows from ${result.sheets} sheets.` : result.error ?? "Import failed.");
    if (response.ok) window.location.reload();
    setUploading(false);
  }

  async function saveManual(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/performance", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    const result = await response.json();
    setMessage(response.ok ? "Performance record added." : result.error ?? "Could not save record.");
    if (response.ok) { setRecords((current) => [...current, result.data]); setManualOpen(false); event.currentTarget.reset(); }
  }

  return <div className="min-h-screen bg-[#07111f] text-white"><div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Business intelligence</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">Home overview</h1><p className="mt-3 max-w-2xl text-slate-400">A clear view of capital deployed, payouts delivered, and the performance story behind the business.</p></div>{isAdmin && <div className="flex flex-wrap gap-3"><label className="flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"><Upload size={17} />{uploading ? "Importing..." : "Import Excel"}<input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(event) => importWorkbook(event.target.files?.[0])} disabled={uploading} /></label><button type="button" onClick={() => setManualOpen((open) => !open)} className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"><Plus size={17} />Manual entry</button></div>}</div>
    {message && <p className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-200">{message}</p>}
    {manualOpen && isAdmin && <form onSubmit={saveManual} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-3"><input name="partner_name" required placeholder="Partner or business name" className="field" /><select name="transaction_type" className="field"><option value="investment">Investment</option><option value="payout">Payout</option><option value="return">Return</option><option value="repayment">Repayment</option><option value="adjustment">Adjustment</option></select><input name="transaction_date" required type="date" className="field" /><input name="investment_amount" type="number" min="0" step="0.01" placeholder="Investment amount" className="field" /><input name="payout_amount" type="number" min="0" step="0.01" placeholder="Payout amount" className="field" /><input name="roi" type="number" min="0" step="0.01" placeholder="ROI %" className="field" /><input name="notes" placeholder="Notes" className="field md:col-span-2" /><button className="action">Save performance</button></form>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={<CircleDollarSign />} label="Total deployed" value={money(totalInvested)} tone="cyan" /><Stat icon={<TrendingUp />} label="Total payouts" value={money(totalPayouts)} tone="emerald" /><Stat icon={<BarChart3 />} label="Net activity" value={money(netValue)} tone="amber" /><Stat icon={<CalendarDays />} label="Partners covered" value={String(partnerCount)} tone="violet" /></div>
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"><section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Capital and payouts</h2><p className="mt-1 text-sm text-slate-500">Monthly movement across the imported and manual records.</p></div><span className="text-xs uppercase tracking-wider text-slate-500">{records.length} records</span></div><div className="mt-6 h-80">{monthly.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={monthly}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="label" stroke="#64748b" /><YAxis stroke="#64748b" tickFormatter={(value) => `${Math.round(value / 1000)}k`} /><Tooltip formatter={(value) => money(Number(value ?? 0))} contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12 }} /><Line type="monotone" dataKey="invested" name="Invested" stroke="#22d3ee" strokeWidth={3} dot={false} /><Line type="monotone" dataKey="payouts" name="Payouts" stroke="#34d399" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer> : <EmptyState />}</div></section><section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><h2 className="text-lg font-semibold">Activity mix</h2><p className="mt-1 text-sm text-slate-500">How the recorded business activity is distributed.</p><div className="mt-6 h-80">{byType.length ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={byType} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={3}>{byType.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip formatter={(value) => money(Number(value ?? 0))} contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12 }} /></PieChart></ResponsiveContainer> : <EmptyState />}</div></section></div>
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Recent performance</h2><p className="mt-1 text-sm text-slate-500">The latest imported and manually recorded activity.</p></div><FileSpreadsheet className="text-cyan-300" /></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500"><tr><th className="pb-3 pr-4">Partner</th><th className="pb-3 pr-4">Type</th><th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Investment</th><th className="pb-3 pr-4">Payout</th><th className="pb-3">Source</th></tr></thead><tbody className="divide-y divide-slate-800">{records.slice().reverse().slice(0, 12).map((entry) => <tr key={entry.id}><td className="py-3 pr-4 font-semibold">{entry.partner_name}</td><td className="py-3 pr-4 capitalize text-slate-400">{entry.transaction_type}</td><td className="py-3 pr-4 text-slate-400">{new Date(entry.transaction_date).toLocaleDateString("en-IN")}</td><td className="py-3 pr-4 text-cyan-300">{money(entry.investment_amount)}</td><td className="py-3 pr-4 text-emerald-300">{money(entry.payout_amount)}</td><td className="py-3 text-slate-500">{entry.source}</td></tr>)}</tbody></table></div></section>
  </div></div>;
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) { const tones: Record<string, string> = { cyan: "text-cyan-300 border-cyan-400/20", emerald: "text-emerald-300 border-emerald-400/20", amber: "text-amber-300 border-amber-400/20", violet: "text-violet-300 border-violet-400/20" }; return <div className={`rounded-2xl border bg-slate-900/70 p-5 ${tones[tone]}`}><div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>{icon}</div><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
function EmptyState() { return <div className="flex h-full items-center justify-center text-sm text-slate-600">Add or import performance data to see this chart.</div>; }
