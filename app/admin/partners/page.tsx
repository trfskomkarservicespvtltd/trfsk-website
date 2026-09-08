import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";

export default async function AdminPartnersPage() {
  const supabase = await createClient();
  
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .eq("role", "investor")
    .order("created_at", { ascending: false });

  const { data: accounts } = await supabase
    .from("investor_accounts")
    .select("id, user_id, account_code, status, currency, rate, rate_type, created_at")
    .order("created_at", { ascending: false });

  const { data: partnerDetails } = await supabase
    .from("partner_details")
    .select("user_id, city, state, pan, bank_name")
    .order("created_at", { ascending: false });

  const { data: ledger } = await supabase
    .from("ledger_entries")
    .select("account_id, entry_type, amount")
    .order("created_at", { ascending: false });

  const accountMap = new Map((accounts ?? []).map((a) => [a.user_id, a]));
  const detailsMap = new Map((partnerDetails ?? []).map((d) => [d.user_id, d]));

  const ledgerByAccount = new Map<string, { contributions: number; withdrawals: number; returns: number }>();
  (ledger ?? []).forEach((entry) => {
    if (!ledgerByAccount.has(entry.account_id)) {
      ledgerByAccount.set(entry.account_id, { contributions: 0, withdrawals: 0, returns: 0 });
    }
    const stats = ledgerByAccount.get(entry.account_id)!;
    if (entry.entry_type === "contribution") stats.contributions += Number(entry.amount);
    if (entry.entry_type === "withdrawal") stats.withdrawals += Number(entry.amount);
    if (entry.entry_type === "return") stats.returns += Number(entry.amount);
  });

  const partners = (profiles ?? [])
    .map((profile) => {
      const account = accountMap.get(profile.id);
      const details = detailsMap.get(profile.id);
      const stats = account ? ledgerByAccount.get(account.id) || { contributions: 0, withdrawals: 0, returns: 0 } : { contributions: 0, withdrawals: 0, returns: 0 };
      return {
        ...profile,
        account,
        details,
        stats,
      };
    });

  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    paused: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    closed: "bg-slate-400/10 text-slate-300 border-slate-400/30",
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-12">
        
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-sm text-slate-400 hover:text-cyan-400">← Back to Dashboard</Link>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white">Partner Management</h1>
            <p className="mt-2 text-slate-400">View and manage all registered partners and their accounts.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              Total Partners: <span className="font-semibold text-cyan-400">{partners.length}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Partner</th>
                  <th className="px-6 py-4">Account Code</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Capital</th>
                  <th className="px-6 py-4">Returns</th>
                  <th className="px-6 py-4">Withdrawals</th>
                  <th className="px-6 py-4">Rate</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{partner.full_name || "Unnamed Partner"}</p>
                        {partner.details && (
                          <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            {partner.details.city && <span>{partner.details.city}</span>}
                            {partner.details.state && <span>, {partner.details.state}</span>}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-cyan-400">{partner.account?.account_code || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[partner.account?.status || "active"]}`}>
                        {partner.account?.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white">{money(partner.stats.contributions)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-400">{money(partner.stats.returns)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-rose-400">{money(partner.stats.withdrawals)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">
                        {partner.account?.rate ? `${partner.account.rate}% ${partner.account.rate_type === "annual" ? "p.a." : "monthly"}` : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400">
                        {partner.created_at ? new Date(partner.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {partners.length === 0 && (
            <div className="py-12 text-center text-slate-500">No partners found.</div>
          )}
        </div>

      </div>
    </div>
  );
}