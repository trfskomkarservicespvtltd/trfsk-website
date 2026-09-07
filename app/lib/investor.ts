import { createClient } from "@/app/lib/supabase/server";

type LedgerEntry = { id: string; entry_type: string; amount: number; effective_at: string; reference: string; notes: string | null };
type ReturnPeriod = { id: string; period_start: string; period_end: string; return_amount: number; return_rate: number | null; status: string };
type PartnerDetails = { address: string; city: string; state: string; pincode: string; pan: string; aadhaar: string; bank_name: string; bank_account_name: string; bank_account_no: string; ifsc: string };

export async function getInvestorDashboard(userId: string) {
  const supabase = await createClient();
  const [{ data: account }, { data: details }] = await Promise.all([
    supabase.from("investor_accounts").select("id, account_code, currency, status, rate, rate_type, due_day, kyc_status").eq("user_id", userId).maybeSingle(),
    supabase.from("partner_details").select("address, city, state, pincode, pan, aadhaar, bank_name, bank_account_name, bank_account_no, ifsc").eq("user_id", userId).maybeSingle(),
  ]);
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
  const monthlyRate = account.rate_type === "annual" ? Number(account.rate) / 12 : Number(account.rate);
  const nextDue = new Date();
  nextDue.setMonth(nextDue.getMonth() + 1, account.due_day);
  return { account, details: details as PartnerDetails | null, entries, returns: (returns ?? []) as ReturnPeriod[], principal, returnsEarned, currentValue: principal + returnsEarned + adjustments - withdrawals, upcomingPayout: Math.max(principal + returnsEarned - withdrawals, 0) * (monthlyRate / 100), nextDueDate: nextDue.toISOString().slice(0, 10) };
}