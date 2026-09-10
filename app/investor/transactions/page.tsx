import { requireUser } from "@/app/lib/auth";
import { getInvestorDashboard } from "@/app/lib/investor";
import Link from "next/link";
import { ArrowLeft, Download, Filter } from "lucide-react";

export default async function TransactionsPage() {
  const user = await requireUser();
  const dashboard = await getInvestorDashboard(user.id);
  
  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Account Not Found</h1>
          <p className="mt-2 text-slate-400">Your account is not linked yet. Please contact support.</p>
          <Link href="/investor" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { account, entries } = dashboard;
  
  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: account.currency }).format(value);
  
  const totalContributions = entries.filter((e) => e.entry_type === "contribution").reduce((sum, e) => sum + e.amount, 0);
  const totalReturns = entries.filter((e) => e.entry_type === "return").reduce((sum, e) => sum + e.amount, 0);

  const entryTypeColors: Record<string, { bg: string; text: string; border: string }> = {
    contribution: { bg: "bg-emerald-400/10", text: "text-emerald-300", border: "border-emerald-400/30" },
    withdrawal: { bg: "bg-rose-400/10", text: "text-rose-300", border: "border-rose-400/30" },
    return: { bg: "bg-cyan-400/10", text: "text-cyan-300", border: "border-cyan-400/30" },
    adjustment: { bg: "bg-slate-400/10", text: "text-slate-300", border: "border-slate-400/30" },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-8 px-6 py-12">
        
        <div className="flex items-center gap-4">
          <Link href="/investor" className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Partner Portal</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">Transaction History</h1>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Account Summary</h2>
              <p className="mt-1 text-sm text-slate-500">{account.account_code}</p>
            </div>
            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-semibold text-cyan-300">
              {account.status}
            </div>
          </div>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-400/20 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-500">Total Contributed</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">{money(totalContributions)}</p>
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-500">Total Returns Earned</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">{money(totalReturns)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-800/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">All Transactions</h2>
              <span className="text-sm text-slate-500">{entries.length} entries</span>
            </div>
          </div>
          
          {entries.length > 0 ? (
            <div className="divide-y divide-slate-800">
              {entries.map((entry) => {
                const colors = entryTypeColors[entry.entry_type] || entryTypeColors.adjustment;
                return (
                  <div key={entry.id} className="px-6 py-5 hover:bg-slate-800/30">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border}`}>
                            {entry.entry_type === "return" ? "monthly payout" : entry.entry_type}
                          </span>
                          {entry.notes && (
                            <span className="text-xs text-slate-500">{entry.notes}</span>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span>
                            {new Date(entry.effective_at).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="font-mono text-xs">{entry.reference}</span>
                        </div>
                      </div>
                      <div className={`text-right font-semibold ${entry.entry_type === "withdrawal" ? "text-rose-300" : "text-emerald-300"}`}>
                        {entry.entry_type === "contribution" || entry.entry_type === "adjustment" ? "+" : "-"}{money(entry.amount)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-500">No transactions yet.</p>
              <p className="mt-2 text-sm text-slate-600">Your transaction history will appear here once you add funds.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
