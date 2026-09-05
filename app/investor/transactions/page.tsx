import { requireUser } from "@/app/lib/auth";
import { getInvestorDashboard } from "@/app/lib/investor";

export default async function TransactionsPage() {
  const user = await requireUser();
  const dashboard = await getInvestorDashboard(user.id);
  if (!dashboard) return <p className="text-slate-400">Your account is not linked yet.</p>;
  return <div><h1 className="text-3xl font-semibold text-white">Transactions</h1><p className="mt-2 text-slate-400">A complete record of activity on {dashboard.account.account_code}.</p><div className="mt-8 overflow-hidden rounded-2xl border border-slate-800"><div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-800 bg-slate-900 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"><span>Activity</span><span>Amount</span></div>{dashboard.entries.map((entry) => <div key={entry.id} className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-800 bg-slate-950 px-5 py-4 last:border-0"><div><p className="capitalize text-sm text-slate-200">{entry.entry_type}</p><p className="mt-1 text-xs text-slate-500">{new Date(entry.effective_at).toLocaleString("en-IN")} · {entry.reference}</p></div><span className={entry.entry_type === "withdrawal" ? "text-rose-300" : "text-emerald-300"}>{entry.entry_type === "withdrawal" ? "-" : "+"}{new Intl.NumberFormat("en-IN", { style: "currency", currency: dashboard.account.currency }).format(entry.amount)}</span></div>)}</div></div>;
}