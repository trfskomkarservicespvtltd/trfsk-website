import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const adminUser = await requireAdmin();
    const supabase = await createClient();
    
    const { account_id, amount, period_start, period_end, transaction_reference, notes } = await request.json();

    if (!account_id || !amount || amount <= 0 || !period_start || !period_end) {
      return NextResponse.json({ error: "Account, amount, period start, and period end are required" }, { status: 400 });
    }

    const { data: ledgerEntry, error: payoutError } = await supabase.rpc("record_monthly_payout", {
      payout_account_id: account_id,
      payout_amount: parseFloat(amount),
      payout_period_start: period_start,
      payout_period_end: period_end,
      payout_notes: notes || `Monthly payout. Transaction: ${transaction_reference || "N/A"}`,
      admin_id: adminUser.id,
    });

    if (payoutError) return NextResponse.json({ error: payoutError.message }, { status: 400 });

    return NextResponse.json({ success: true, data: ledgerEntry });
  } catch (error) {
    console.error("Payout recording error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}