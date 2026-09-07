import { createClient } from "@/app/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();
  
  const [{ data: accounts }, { data: profiles }, { data: ledger }] = await Promise.all([
    supabase.from("investor_accounts").select("id, account_code, status, user_id, currency").order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name, role").eq("role", "investor"),
    supabase.from("ledger_entries").select("id, account_id, entry_type, amount, effective_at, reference").order("effective_at", { ascending: false }).limit(100),
  ]);

  const investorIds = new Set((profiles ?? []).map((profile) => profile.id));
  const names = new Map((profiles ?? []).map((profile) => [profile.id, profile.full_name]));
  const partnerAccounts = (accounts ?? []).filter((account) => investorIds.has(account.user_id));
  const accountNames = new Map(partnerAccounts.map((account) => [account.id, names.get(account.user_id) || "Unnamed partner"]));

  const entries = ledger ?? [];
  const total = (type: string) => entries.filter((entry) => entry.entry_type === type).reduce((sum, entry) => sum + Number(entry.amount), 0);
  const currentCapital = total("contribution") + total("return") + total("adjustment") - total("withdrawal");
  const totalContributions = total("contribution");
  const totalReturns = total("return");
  const totalWithdrawals = total("withdrawal");

  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-white">Dashboard Overview</h1>
          <p className="mt-2 max-w-2xl text-slate-400">Monitor partner capital, manage fund requests, and keep every account activity traceable.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/investor" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800">
            View Partner Dashboard
          </Link>
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-100">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Metric 
          label="Total Partners" 
          value={String(partnerAccounts.length)} 
          color="cyan"
        />
        <Metric 
          label="Current Capital" 
          value={money(currentCapital)} 
          color="white"
        />
        <Metric 
          label="Contributions" 
          value={money(totalContributions)} 
          color="emerald"
        />
        <Metric 
          label="Monthly Returns" 
          value={money(totalReturns)} 
          color="amber"
        />
        <Metric 
          label="Withdrawals" 
          value={money(totalWithdrawals)} 
          color="rose"
        />
      </div>

      <AdminDashboard />

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Recent Ledger Activity</h2>
            <p className="mt-1 text-sm text-slate-500">The same entries appear in each partner transaction history.</p>
          </div>
          <Link href="/admin/transactions" className="text-sm text-cyan-400 hover:text-cyan-300">
            View All →
          </Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Partner</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {entries.length > 0 ? entries.slice(0, 10).map((entry) => (
                <tr key={entry.id}>
                  <td className="py-3 pr-4 font-semibold text-white">{accountNames.get(entry.account_id) || "Unknown"}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      entry.entry_type === "contribution" ? "bg-emerald-400/10 text-emerald-300" :
                      entry.entry_type === "return" ? "bg-cyan-400/10 text-cyan-300" :
                      entry.entry_type === "withdrawal" ? "bg-rose-400/10 text-rose-300" :
                      "bg-slate-400/10 text-slate-300"
                    }`}>
                      {entry.entry_type}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-semibold">
                    {entry.entry_type === "withdrawal" ? "-" : "+"}{money(Number(entry.amount))}
                  </td>
                  <td className="py-3 pr-4">{new Date(entry.effective_at).toLocaleDateString("en-IN")}</td>
                  <td className="py-3 text-slate-500">{entry.reference}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-6 text-center text-slate-500">No ledger entries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function Metric({ label, value, color = "cyan" }: { label: string; value: string; color?: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "border-cyan-400/20 text-cyan-400",
    white: "border-white/20 text-white",
    emerald: "border-emerald-400/20 text-emerald-400",
    amber: "border-amber-400/20 text-amber-400",
    rose: "border-rose-400/20 text-rose-400",
  };

  return (
    <div className={`rounded-2xl border ${colorClasses[color]} bg-slate-900/70 p-5`}>
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${color === "white" ? "text-white" : colorClasses[color].split(" ")[1]}`}>{value}</p>
    </div>
  );
}
