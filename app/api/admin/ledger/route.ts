import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

const entrySchema = z.object({ accountId: z.string().uuid(), entryType: z.enum(["contribution", "withdrawal", "return", "adjustment"]), amount: z.coerce.number().positive(), effectiveAt: z.string().datetime(), reference: z.string().min(3).max(80), notes: z.string().max(500).optional() });

export async function POST(request: Request) {
  const admin = await requireAdmin();
  const parsed = entrySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid ledger entry" }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase.from("ledger_entries").insert({ account_id: parsed.data.accountId, entry_type: parsed.data.entryType, amount: parsed.data.amount, effective_at: parsed.data.effectiveAt, reference: parsed.data.reference, notes: parsed.data.notes, created_by: admin.id }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ entry: data }, { status: 201 });
}