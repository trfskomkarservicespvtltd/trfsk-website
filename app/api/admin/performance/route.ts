import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";
import * as XLSX from "xlsx";

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

const typeFromValue = (value: unknown) => {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("repay")) return "repayment";
  if (text.includes("payout") || text.includes("roi") || text.includes("return")) return "payout";
  if (text.includes("adjust")) return "adjustment";
  return "investment";
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
        
        // Map actual column names from the Excel file
        const partnerName = String(
          normalized["agreement name"] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          normalized["agreement name "] ?? 
          ""
        ).trim() || sheetName;
        
        // Transaction type from "Transaction types" column
        const transactionType = String(normalized["transaction types"] ?? "").toLowerCase().includes("repay") ? "repayment" : "investment";
        
        // Date: prefer "date of investment" / "Date of Investment" / "Date of Agreement", fall back to "repayment dates" / "Repayment Dates"
        const investmentDate = dateValue(normalized["date of investment"] ?? normalized["date of investment"] ?? normalized["date of agreement"] ?? normalized["date of agreement"]);
        const repaymentDate = dateValue(normalized["repayment dates"] ?? normalized["repayment dates"]);
        
        // Investment amount
        const investmentAmount = numberValue(normalized["amount of investment"] ?? normalized["amount of investment"] ?? 0);
        
        // Payout amount from "repayment amount"
        const payoutAmount = numberValue(normalized["repayment amount"] ?? normalized["repayment amount"] ?? 0);
        
        // ROI from various possible columns
        const roi = numberValue(normalized["roi"] ?? normalized["roi"] ?? normalized["paid roi %"] ?? normalized["paid roi %"] ?? 0) || null;
        
        // Use investment date if available, otherwise repayment date
        const transactionDate = investmentDate || dateValue(normalized["date of investment"] ?? normalized["date of investment"]);
        
        if (!transactionDate) continue;
        
        // Determine if this is a repayment row (has repayment date or repayment amount but no investment amount)
        const hasInvestment = numberValue(normalized["amount of investment"] ?? 0) > 0;
        const hasRepayment = numberValue(normalized["repayment amount"] ?? 0) > 0;
        const transactionTypeFromData = !hasInvestment && hasRepayment ? "repayment" : "investment";
        
        // For repayment rows, use repayment date
        const finalDate = transactionTypeFromData === "repayment" ? (dateValue(normalized["repayment dates"] ?? normalized["repayment dates"]) || transactionDate) : transactionDate;
        if (!finalDate) continue;
        
        rows.push({
          partner_name: String(normalized["agreement name"] ?? normalized["agreement name"] ?? "").trim() || sheetName,
          transaction_type: transactionTypeFromData,
          transaction_date: finalDate,
          investment_amount: numberValue(normalized["amount of investment"] ?? normalized["amount of investment"] ?? 0),
          payout_amount: numberValue(normalized["repayment amount"] ?? normalized["repayment amount"] ?? 0),
          roi: numberValue(normalized["roi"] ?? normalized["roi"] ?? normalized["paid roi %"] ?? normalized["paid roi %"]) || null,
          notes: String(normalized["notes"] ?? "").trim() || null,
          source: "excel",
          created_by: admin.id,
        });
      }
    }
    if (!rows.length) return NextResponse.json({ error: "No valid performance rows found" }, { status: 400 });
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

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdmin();
    const supabase = await createClient();
    const body = await request.json();
    const { ids, source } = body;

    if (ids && Array.isArray(ids) && ids.length > 0) {
      const { error } = await supabase.from("performance_entries").delete().in("id", ids);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, deleted: ids.length });
    }

    if (source === "excel") {
      const { error } = await supabase.from("performance_entries").delete().eq("source", "excel");
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, deleted: "all excel records" });
    }

    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Could not delete performance entries" }, { status: 401 });
  }
}
