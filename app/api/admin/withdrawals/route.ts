import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = await createClient();
    
    const { data, error } = await supabase
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
      .order("created_at", { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const supabase = await createClient();
    
    const { id, action, rejection_reason } = await request.json();
    
    if (!id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const { data: withdrawalRequest, error: fetchError } = await supabase
      .from("withdrawal_requests")
      .select("*, investor_accounts(account_code)")
      .eq("id", id)
      .single();
    
    if (fetchError || !withdrawalRequest) {
      return NextResponse.json({ error: "Withdrawal request not found" }, { status: 404 });
    }
    
    let newStatus: string;
    let ledgerEntryType: string | null = null;
    
    if (action === "approve") {
      newStatus = "approved";
      ledgerEntryType = "withdrawal";
    } else if (action === "reject") {
      newStatus = "rejected";
    } else if (action === "complete") {
      newStatus = "completed";
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    
    const adminUser = await requireAdmin();
    
    const { data: updatedRequest, error: updateError } = await supabase
      .from("withdrawal_requests")
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
    
    if (ledgerEntryType && withdrawalRequest.account_id) {
      const reference = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      await supabase.from("ledger_entries").insert({
        account_id: withdrawalRequest.account_id,
        entry_type: ledgerEntryType,
        amount: withdrawalRequest.amount,
        effective_at: new Date().toISOString(),
        reference,
        notes: `Withdrawal request approved and processed`,
        created_by: adminUser.id,
      });
    }
    
    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error("Admin withdrawal action error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
