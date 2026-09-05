import { createClient } from "@/app/lib/supabase/server";
import AdminForms from "./AdminForms";

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ data: profiles }, { data: accounts }, { count: entries }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").eq("role", "investor").order("created_at", { ascending: false }),
    supabase.from("investor_accounts").select("id, account_code, status, user_id").order("created_at", { ascending: false }),
    supabase.from("ledger_entries").select("id", { count: "exact", head: true }),
  ]);
  return <div className="space-y-10"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Operations</p><h1 className="mt-2 text-4xl font-semibold text-white">Investor control room</h1><p className="mt-2 text-slate-400">Manage account links and post auditable activity. Financial values are calculated from the ledger.</p></div><div className="grid gap-4 md:grid-cols-3"><Metric label="Investors" value={String(profiles?.length ?? 0)} /><Metric label="Linked accounts" value={String(accounts?.length ?? 0)} /><Metric label="Ledger entries" value={String(entries ?? 0)} /></div><AdminForms users={profiles ?? []} accounts={accounts ?? []} /></div>;
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-semibold text-amber-200">{value}</p></div>; }