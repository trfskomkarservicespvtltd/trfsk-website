import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Search, Filter, Download } from "lucide-react";

export default async function AdminTransactionsPage() {
  const supabase = await createClient();
  
  const { data: ledger } = await supabase
    .from("ledger_entries")
    .select(`
      id,
      entry_type,
      amount,
      effective_at,
      reference,
      notes,
      created_at,
      investor_accounts (
        id,
        account_code,
        user_id,
        profiles (full_name)
      )
    `)
    .order("created_at", { ascending: false });

  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  const total = (type: string) => (ledger ?? []).filter((e) => e.entry_type === type).reduce((sum, e) => sum + Number(e.amount), 0);

  const entryTypeColors: Record<string, { bg: string; text: string }> = {
    contribution: { bg: "bg-emerald-400/10", text: "text-emerald-300" },
    withdrawal: { bg: "bg-rose-400/10", text: "text-rose-300" },
    return: { bg: "bg-cyan-400/10", text: "text-cyan-300" },
    adjustment: { bg: "bg-slate-400/10", text: "text-slate-300" },
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-12">
        
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-sm text-slate-400 hover:text-cyan-400">← Back to Dashboard</Link>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white">All Transactions</h1>
            <p className="mt-2 text-slate-400">Complete ledger of all financial movements across all accounts.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-700 bg-slate-900/70 p-4">
              <div>
                <p className="text-xs text-slate-500">Total In</p>
                <p className="text-lg font-semibold text-emerald-400">+{money(total("contribution") + total("return"))}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Out</p>
                <p className="text-lg font-semibold text-rose-400">-{money(total("withdrawal"))}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Contributions</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-400">{money(total("contribution"))}</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Returns</p>
            <p className="mt-2 text-2xl font-semibold text-cyan-400">{money(total("return"))}</p>
          </div>
          <div className="rounded-2xl border border-rose-400/20 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Withdrawals</p>
            <p className="mt-2 text-2xl font-semibold text-rose-400">{money(total("withdrawal"))}</p>
          </div>
          <div className="rounded-2xl border border-slate-400/20 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-500">Adjustments</p>
            <p className="mt-2 text-2xl font-semibold text-slate-300">{money(total("adjustment"))}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Partner</th>
                  <th className="px-6 py-4">Account</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(ledger ?? []).map((entry) => {
                  const colors = entryTypeColors[entry.entry_type] || { bg: "bg-slate-400/10", text: "text-slate-300" };
                  return (
                    <tr key={entry.id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(entry.effective_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {entry.investor_accounts?.profiles?.full_name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 font-mono text-cyan-400">
                        {entry.investor_accounts?.account_code || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          {entry.entry_type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-semibold ${entry.entry_type === "withdrawal" ? "text-rose-300" : entry.entry_type === "contribution" ? "text-emerald-300" : "text-cyan-300"}`}>
                        {entry.entry_type === "withdrawal" ? "-" : "+"}{money(Number(entry.amount))}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        {entry.reference}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {entry.notes || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {(ledger ?? []).length === 0 && (
            <div className="py-12 text-center text-slate-500">No transactions found.</div>
          )}
        </div>

      </div>
    </div>
  );
}
