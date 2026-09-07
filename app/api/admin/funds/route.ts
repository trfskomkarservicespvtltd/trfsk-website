import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const [withdrawals, additions] = await Promise.all([
      supabase
        .from("withdrawal_requests")
        .select(`
          *,
          investor_accounts (
            id,
            account_code,
            user_id,
            profiles (full_name, email)
          )
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("fund_addition_requests")
        .select(`
          *,
          investor_accounts (
            id,
            account_code,
            user_id,
            profiles (full_name, email)
          )
        `)
        .order("created_at", { ascending: false }),
    ]);

    return NextResponse.json({
      withdrawals: withdrawals.data || [],
      fund_additions: additions.data || [],
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const supabase = await createClient();
    const body = await request.json();
    const { type, action, id, rejection_reason } = body;

    if (!type || !action || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const adminUser = await requireAdmin();
    let tableName = type === "withdrawal" ? "withdrawal_requests" : "fund_addition_requests";
    let entryType = type === "withdrawal" ? "withdrawal" : "contribution";

    const { data: requestData, error: fetchError } = await supabase
      .from(tableName)
      .select("*, investor_accounts(account_code)")
      .eq("id", id)
      .single();

    if (fetchError || !requestData) {
      return NextResponse.json({ error: `${type} request not found` }, { status: 404 });
    }

    let newStatus: string;
    if (action === "approve") {
      newStatus = type === "withdrawal" ? "approved" : "approved";
    } else if (action === "reject") {
      newStatus = type === "withdrawal" ? "rejected" : "rejected";
    } else if (action === "complete" && type === "withdrawal") {
      newStatus = "completed";
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const { data: updatedRequest, error: updateError } = await supabase
      .from(tableName)
      .update({
        status: newStatus,
        processed_by: adminUser.id,
        processed_at: new Date().toISOString(),
        rejection_reason: action === "reject" ? rejection_reason : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if ((action === "approve" || action === "complete") && requestData.account_id) {
      const reference = `${type === "withdrawal" ? "WD" : "FA"}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await supabase.from("ledger_entries").insert({
        account_id: requestData.account_id,
        entry_type: entryType,
        amount: requestData.amount,
        effective_at: new Date().toISOString(),
        reference,
        notes: `${type === "withdrawal" ? "Withdrawal" : "Fund addition"} request approved`,
        created_by: adminUser.id,
      });
    }

    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error("Admin fund action error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
