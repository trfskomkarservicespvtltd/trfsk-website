import { createClient } from "@/app/lib/supabase/server";

export type PerformanceEntry = {
  id: string;
  partner_name: string;
  transaction_type: string;
  transaction_date: string;
  investment_amount: number;
  payout_amount: number;
  roi: number | null;
  notes: string | null;
  source: string;
  created_at: string;
};

export async function getPerformanceEntries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("performance_entries")
    .select("id, partner_name, transaction_type, transaction_date, investment_amount, payout_amount, roi, notes, source, created_at")
    .order("transaction_date", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as PerformanceEntry[];
}
