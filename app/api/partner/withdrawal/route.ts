import { NextResponse } from "next/server";
import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const supabase = await createClient();
    
    const { amount, payment_method, payment_reference } = await request.json();
    
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
      .from("withdrawal_requests")
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
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Withdrawal request error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    const supabase = await createClient();
    
    const { data: account } = await supabase
      .from("investor_accounts")
      .select("id")
      .eq("user_id", user.id)
      .single();
    
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
    
    const { data, error } = await supabase
      .from("withdrawal_requests")
      .select("*")
      .eq("account_id", account.id)
      .order("created_at", { ascending: false });
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
