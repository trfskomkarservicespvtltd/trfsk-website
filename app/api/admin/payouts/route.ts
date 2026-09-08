import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const supabase = await createClient();
    
    const { account_id, amount, period_start, period_end, transaction_reference, notes } = await request.json();

    if (!account_id || !amount || amount <= 0) {
      return NextResponse.json({ error: "Valid account and amount required" }, { status: 400 });
    }

    const adminUser = await requireAdmin();
    const reference = `PAYOUT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const { data: ledgerEntry, error: ledgerError } = await supabase
      .from("ledger_entries")
      .insert({
        account_id,
        entry_type: "return",
        amount: parseFloat(amount),
        effective_at: new Date().toISOString(),
        reference,
        notes: notes || `Monthly payout for period ${period_start} to ${period_end}. Tx: ${transaction_reference || "N/A"}`,
        created_by: adminUser.id,
      })
      .select()
      .single();

    if (ledgerError) {
      return NextResponse.json({ error: ledgerError.message }, { status: 500 });
    }

    if (period_start && period_end) {
      await supabase.from("return_periods").insert({
        account_id,
        period_start,
        period_end,
        return_amount: parseFloat(amount),
        status: "approved",
        approved_by: adminUser.id,
        approved_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, data: ledgerEntry });
  } catch (error) {
    console.error("Payout recording error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}