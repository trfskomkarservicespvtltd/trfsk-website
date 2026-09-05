import { createClient } from "@/app/lib/supabase/server";

type LedgerEntry = { id: string; entry_type: string; amount: number; effective_at: string; reference: string; notes: string | null };
type ReturnPeriod = { id: string; period_start: string; period_end: string; return_amount: number; return_rate: number | null; status: string };

export async function getInvestorDashboard(userId: string) {
  const supabase = await createClient();
  const { data: account } = await supabase.from("investor_accounts").select("id, account_code, currency, status").eq("user_id", userId).maybeSingle();
  if (!account) return null;

  const [{ data: ledger }, { data: returns }] = await Promise.all([
    supabase.from("ledger_entries").select("id, entry_type, amount, effective_at, reference, notes").eq("account_id", account.id).order("effective_at", { ascending: false }),
    supabase.from("return_periods").select("id, period_start, period_end, return_amount, return_rate, status").eq("account_id", account.id).eq("status", "approved").order("period_end", { ascending: false }),
  ]);

  const entries = (ledger ?? []) as LedgerEntry[];
  const principal = entries.reduce((total, entry) => total + (entry.entry_type === "contribution" ? entry.amount : 0), 0);
  const returnsEarned = entries.reduce((total, entry) => total + (entry.entry_type === "return" ? entry.amount : 0), 0);
  const adjustments = entries.reduce((total, entry) => total + (entry.entry_type === "adjustment" ? entry.amount : 0), 0);
  const withdrawals = entries.reduce((total, entry) => total + (entry.entry_type === "withdrawal" ? entry.amount : 0), 0);
  return { account, entries, returns: (returns ?? []) as ReturnPeriod[], principal, returnsEarned, currentValue: principal + returnsEarned + adjustments - withdrawals };
}