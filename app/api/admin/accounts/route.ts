import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

const accountSchema = z.object({ userId: z.string().uuid(), accountCode: z.string().min(3).max(30), currency: z.string().length(3).default("INR") });

export async function POST(request: Request) {
  const admin = await requireAdmin();
  const parsed = accountSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid account details" }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase.from("investor_accounts").insert({ user_id: parsed.data.userId, account_code: parsed.data.accountCode, currency: parsed.data.currency.toUpperCase() }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ account: data, createdBy: admin.id }, { status: 201 });
}