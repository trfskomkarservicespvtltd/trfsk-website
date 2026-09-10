import { NextResponse } from "next/server";
import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: profile }, { data: account }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase.from("investor_accounts").select("account_code, currency, rate, rate_type, kyc_status").eq("user_id", user.id).single(),
  ]);
  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });
  if (account.kyc_status !== "verified") return NextResponse.json({ error: "Agreement is available after KYC approval" }, { status: 403 });
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>TRFSK Partner Agreement</title><style>body{font-family:Arial;max-width:760px;margin:48px auto;line-height:1.6;color:#172033}h1{color:#08649b}table{width:100%;border-collapse:collapse}td{border:1px solid #ddd;padding:10px}</style></head><body><h1>TRFSK Partner Account Summary</h1><p>This document confirms the account details currently recorded in the TRFSK partner portal.</p><table><tr><td>Partner</td><td>${profile?.full_name ?? user.email}</td></tr><tr><td>Account</td><td>${account.account_code}</td></tr><tr><td>Rate</td><td>${account.rate}% ${account.rate_type}</td></tr><tr><td>Currency</td><td>${account.currency}</td></tr></table><p>Generated on ${new Date().toLocaleDateString("en-IN")}.</p><p>This is an account summary, not a substitute for legal review.</p></body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html", "Content-Disposition": `attachment; filename="Agreement-${account.account_code}.html"` } });
}