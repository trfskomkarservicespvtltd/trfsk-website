import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const additions = await supabase
      .from("fund_addition_requests")
      .select(`
        *,
        investor_accounts (
          id,
          account_code,
          user_id,
          profiles (full_name)
        )
      `)
      .order("created_at", { ascending: false });

    return NextResponse.json({
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
    if (type !== "fund_addition") {
      return NextResponse.json({ error: "Only fund addition approvals are supported." }, { status: 400 });
    }
    const tableName = "fund_addition_requests";

    const { data: requestData, error: fetchError } = await supabase
      .from(tableName)
      .select("*, investor_accounts(account_code)")
      .eq("id", id)
      .single();

    if (fetchError || !requestData) {
      return NextResponse.json({ error: `${type} request not found` }, { status: 404 });
    }

    if (requestData.status !== "pending") {
      return NextResponse.json({ error: "This fund addition request has already been processed." }, { status: 409 });
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (action === "approve") {
      const { data, error } = await supabase.rpc("approve_fund_addition_request", {
        request_id: id,
        admin_id: adminUser.id,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, data });
    }

    const { data: updatedRequest, error: updateError } = await supabase
      .from(tableName)
      .update({
        status: "rejected",
        processed_by: adminUser.id,
        processed_at: new Date().toISOString(),
        rejection_reason: rejection_reason || "Rejected by admin",
      })
      .eq("id", id)
      .eq("status", "pending")
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error("Admin fund action error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
