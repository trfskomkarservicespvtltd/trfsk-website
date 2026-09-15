import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";
import * as XLSX from "xlsx";

const typeFromValue = (value: unknown) => {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("repay")) return "repayment";
  if (text.includes("payout") || text.includes("roi") || text.includes("return")) return "payout";
  if (text.includes("adjust")) return "adjustment";
  return "investment";
};

const numberValue = (value: unknown) => {
  if (typeof value === "number") return value;
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const dateValue = (value: unknown) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number") return new Date(Math.round((value - 25569) * 86400 * 1000)).toISOString().slice(0, 10);
  const normalized = String(value ?? "").replace(/(\d{1,2})(st|nd|rd|th)/gi, "$1");
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
};

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Excel file is required" }, { status: 400 });
    if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: "File must be smaller than 15MB" }, { status: 400 });

    const workbook = XLSX.read(await file.arrayBuffer(), { cellDates: true });
    const rows: Record<string, unknown>[] = [];
    for (const sheetName of workbook.SheetNames) {
      const sheetRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[sheetName], { defval: "" });
      for (const row of sheetRows) {
        const normalized = Object.fromEntries(Object.entries(row).map(([key, value]) => [key.toLowerCase().trim(), value]));
        const transactionDate = dateValue(normalized["date of investment"] ?? normalized.date ?? normalized["transaction date"] ?? normalized["repayment dates"]);
        if (!transactionDate) continue;
        const investment = numberValue(normalized["amount of investment"] ?? normalized.investment ?? normalized.capital);
        const payout = numberValue(normalized["repayment amount"] ?? normalized.repayment ?? normalized.payout ?? normalized.roi);
        rows.push({
          partner_name: sheetName,
          transaction_type: typeFromValue(normalized["transaction type"] ?? normalized["transactions type"] ?? normalized.type),
          transaction_date: transactionDate,
          investment_amount: investment,
          payout_amount: payout,
          roi: numberValue(normalized.roi) || null,
          notes: String(normalized.notes ?? normalized["agreement name"] ?? normalized["agreement name "] ?? "") || null,
          source: "excel",
          created_by: admin.id,
        });
      }
    }
    if (!rows.length) return NextResponse.json({ error: "No dated performance rows found" }, { status: 400 });
    const { error } = await supabase.from("performance_entries").insert(rows);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, imported: rows.length, sheets: workbook.SheetNames.length });
  } catch (error) {
    console.error("Performance import error:", error);
    return NextResponse.json({ error: "Could not import performance workbook" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const transactionDate = dateValue(body.transaction_date);
    if (!body.partner_name || !transactionDate) return NextResponse.json({ error: "Partner name and valid date are required" }, { status: 400 });
    const supabase = await createClient();
    const { data, error } = await supabase.from("performance_entries").insert({
      partner_name: String(body.partner_name).trim(),
      transaction_type: typeFromValue(body.transaction_type),
      transaction_date: transactionDate,
      investment_amount: numberValue(body.investment_amount),
      payout_amount: numberValue(body.payout_amount),
      roi: numberValue(body.roi) || null,
      notes: body.notes ? String(body.notes).trim() : null,
      source: "manual",
      created_by: admin.id,
    }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: "Could not save performance entry" }, { status: 401 });
  }
}
