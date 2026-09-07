import { NextResponse } from "next/server";
import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function PATCH(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const supabase = await createClient();

  if (body.fund_addition_request) {
    const { amount, payment_method, payment_reference } = body;
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const { data: account } = await supabase
      .from("investor_accounts")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("fund_addition_requests")
      .insert({
        account_id: account.id,
        amount,
        payment_method: payment_method || "bank_transfer",
        payment_reference: payment_reference || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, message: "Fund addition request submitted. Admin will review." });
  }

  const details = Object.fromEntries(["address", "city", "state", "pincode", "pan", "aadhaar", "bank_name", "bank_account_name", "bank_account_no", "ifsc"].map((key) => [key, String(body[key] ?? "").trim()]));
  
  const { data, error } = await supabase.from("partner_details").upsert({ user_id: user.id, ...details, updated_at: new Date().toISOString() }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase.from("investor_accounts").update({ kyc_status: "submitted" }).eq("user_id", user.id);
  return NextResponse.json({ details: data });
}
