import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("investor_accounts")
      .select(`
        id,
        user_id,
        account_code,
        kyc_status,
        profiles (full_name),
        partner_details (*)
      `)
      .in("kyc_status", ["submitted", "verified", "rejected"])
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();
    const { userId, status } = await request.json();
    if (!userId || !["verified", "rejected"].includes(status)) {
      return NextResponse.json({ error: "User and valid KYC status are required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("investor_accounts")
      .update({ kyc_status: status })
      .eq("user_id", userId)
      .select("id, user_id, kyc_status")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, data, reviewedBy: admin.id });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
