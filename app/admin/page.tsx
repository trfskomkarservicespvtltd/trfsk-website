import { createClient } from "@/app/lib/supabase/server";
import AdminForms from "./AdminForms";

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ data: accounts }, { data: profiles }, { count: entries }] = await Promise.all([
    supabase.from("investor_accounts").select("id, account_code, status, user_id").order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name"),
    supabase.from("ledger_entries").select("id", { count: "exact", head: true }),
  ]);
  const names = new Map((profiles ?? []).map((profile) => [profile.id, profile.full_name]));
  const accountOptions = (accounts ?? []).map((account) => ({ ...account, partnerName: names.get(account.user_id) || "Unnamed partner" }));
  return <div className="space-y-10"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Operations</p><h1 className="mt-2 text-4xl font-semibold text-white">Partner control room</h1><p className="mt-2 text-slate-400">Partner accounts are created automatically. Manage auditable financial activity and monthly returns here.</p></div><div className="grid gap-4 md:grid-cols-2"><Metric label="Partner accounts" value={String(accounts?.length ?? 0)} /><Metric label="Ledger entries" value={String(entries ?? 0)} /></div><AdminForms accounts={accountOptions} /></div>;
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-semibold text-amber-200">{value}</p></div>; }