import Link from "next/link";
import { requireUser } from "@/app/lib/auth";
import { getInvestorDashboard } from "@/app/lib/investor";
import LiveRefresh from "./LiveRefresh";
import PartnerTools from "./PartnerTools";
import PartnerExtras from "./PartnerExtras";
import FundActions from "./FundActions";

const money = (value: number, currency: string) => new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(value);

export default async function InvestorPage() {
  const user = await requireUser();
  const dashboard = await getInvestorDashboard(user.id);
  if (!dashboard) return <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-100"><h1 className="text-2xl font-semibold">We could not load your account</h1><p className="mt-2 text-sm text-rose-200/80">Please refresh once. If the problem continues, contact support.</p></div>;

  const { account, entries } = dashboard;
  const partnerName = dashboard.profile?.full_name || user.email?.split("@")[0] || "Partner";
  const recentEntries = entries.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-12">
      <LiveRefresh accountId={account.id} />
      
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Partner dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Welcome, {partnerName}</h1>
          <p className="mt-2 text-slate-400">Your investment overview for account {account.account_code}. Approved activity updates in real time.</p>
        </div>
        <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          {account.status}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Current position" value={money(dashboard.currentValue, account.currency)} accent="text-white" />
        <Metric label="Contributed capital" value={money(dashboard.principal, account.currency)} />
        <Metric label="Profit earned" value={money(dashboard.returnsEarned, account.currency)} accent="text-emerald-300" />
        <Metric label="Upcoming payout" value={money(dashboard.upcomingPayout, account.currency)} accent="text-amber-300" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Payout rate" value={`${account.rate}% ${account.rate_type === "annual" ? "p.a." : "monthly"}`} accent="text-cyan-300" />
        <Metric label="Next due date" value={dashboard.nextDueDate} accent="text-slate-200" />
        <Metric label="KYC status" value={account.kyc_status} accent="text-amber-300" />
      </div>

      <FundActions accountId={account.id} />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Transaction history</h2>
          <Link href="/investor/transactions" className="text-sm text-cyan-400 hover:text-cyan-300">View all</Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {recentEntries.length > 0 ? recentEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      entry.entry_type === "contribution" ? "bg-emerald-400/10 text-emerald-300" :
                      entry.entry_type === "return" ? "bg-cyan-400/10 text-cyan-300" :
                      entry.entry_type === "withdrawal" ? "bg-rose-400/10 text-rose-300" :
                      "bg-slate-400/10 text-slate-300"
                    }`}>
                      {entry.entry_type === "return" ? "monthly payout" : entry.entry_type}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-semibold">
                    {entry.entry_type === "contribution" || entry.entry_type === "adjustment" ? "+" : "-"}{money(entry.amount, account.currency)}
                  </td>
                  <td className="py-3 pr-4">{new Date(entry.effective_at).toLocaleDateString("en-IN")}</td>
                  <td className="py-3 text-slate-500">{entry.reference}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="py-6 text-center text-slate-500">No transactions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Fund addition requests</h2>
            <p className="mt-1 text-sm text-slate-500">Funds appear in your account only after admin approval.</p>
          </div>
          <span className="text-sm text-slate-500">{dashboard.fundAdditions.length} requests</span>
        </div>
        <div className="mt-5 space-y-3">
          {dashboard.fundAdditions.length > 0 ? dashboard.fundAdditions.map((request) => (
            <div key={request.id} className="flex flex-col justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-white">{money(request.amount, account.currency)}</p>
                <p className="mt-1 text-xs text-slate-500">{request.payment_method.replace("_", " ")} · {new Date(request.created_at).toLocaleDateString("en-IN")}</p>
                {request.rejection_reason && <p className="mt-1 text-xs text-rose-300">{request.rejection_reason}</p>}
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${request.status === "approved" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : request.status === "rejected" ? "border-rose-400/30 bg-rose-400/10 text-rose-300" : "border-amber-400/30 bg-amber-400/10 text-amber-300"}`}>
                {request.status}
              </span>
            </div>
          )) : <p className="py-6 text-center text-sm text-slate-500">No fund addition requests yet.</p>}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <PartnerTools details={dashboard.details ?? {}} kycStatus={account.kyc_status} />
        <PartnerExtras accountCode={account.account_code} />
      </div>
    </div>
  );
}

function Metric({ label, value, accent = "text-cyan-300" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-3 text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}
