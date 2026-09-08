import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const supabase = await createClient();
    
    const { email, full_name, phone, address, city, state, pincode, pan, aadhaar, bank_name, bank_account_name, bank_account_no, ifsc, rate, rate_type, due_day, currency, initial_contribution } = await request.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: "Email and full name are required" }, { status: 400 });
    }

    const accountCode = `TRF-${randomBytes(5).toString("hex").toUpperCase()}`;

    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email,
      password: randomBytes(16).toString("hex"),
      email_confirm: true,
      user_metadata: { full_name, phone },
    });

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.user.id, full_name, role: "investor" })
      .select()
      .single();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    const { data: account, error: accountError } = await supabase
      .from("investor_accounts")
      .insert({
        user_id: user.user.id,
        account_code: accountCode,
        currency: currency || "INR",
        status: "active",
        rate: rate || 12,
        rate_type: rate_type || "monthly",
        due_day: due_day || 15,
      })
      .select()
      .single();

    if (accountError) {
      return NextResponse.json({ error: accountError.message }, { status: 400 });
    }

    if (bank_name || bank_account_name || bank_account_no || ifsc || address || city || state || pincode || pan || aadhaar) {
      await supabase.from("partner_details").upsert({
        user_id: user.user.id,
        address: address || "",
        city: city || "",
        state: state || "",
        pincode: pincode || "",
        pan: pan || "",
        aadhaar: aadhaar || "",
        bank_name: bank_name || "",
        bank_account_name: bank_account_name || "",
        bank_account_no: bank_account_no || "",
        ifsc: ifsc || "",
      });
    }

    if (initial_contribution && parseFloat(initial_contribution) > 0) {
      const reference = `INIT-${Date.now()}-${randomBytes(3).toString("hex").toUpperCase()}`;
      await supabase.from("ledger_entries").insert({
        account_id: account.id,
        entry_type: "contribution",
        amount: parseFloat(initial_contribution),
        effective_at: new Date().toISOString(),
        reference,
        notes: "Initial capital deployed",
        created_by: user.user.id,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: user.user.id,
        accountId: account.id,
        accountCode,
        email: user.user.email,
        temporaryPassword: "Check email for login",
      },
    });
  } catch (error) {
    console.error("Manual partner creation error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}