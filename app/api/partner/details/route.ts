import { NextResponse } from "next/server";
import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function PATCH(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const details = Object.fromEntries(["address", "city", "state", "pincode", "pan", "aadhaar", "bank_name", "bank_account_name", "bank_account_no", "ifsc"].map((key) => [key, String(body[key] ?? "").trim()]));
  const supabase = await createClient();
  const { data, error } = await supabase.from("partner_details").upsert({ user_id: user.id, ...details, updated_at: new Date().toISOString() }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase.from("investor_accounts").update({ kyc_status: "submitted" }).eq("user_id", user.id);
  return NextResponse.json({ details: data });
}