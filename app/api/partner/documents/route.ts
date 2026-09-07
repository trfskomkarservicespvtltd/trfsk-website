import { NextResponse } from "next/server";
import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  const user = await requireUser();
  const form = await request.formData();
  const type = form.get("type");
  const file = form.get("file");
  if ((type !== "pan" && type !== "aadhaar") || !(file instanceof File)) return NextResponse.json({ error: "Document type and file are required" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Documents must be smaller than 8MB" }, { status: 400 });
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  if (!["jpg", "jpeg", "png", "webp", "pdf"].includes(extension)) return NextResponse.json({ error: "Only JPG, PNG, WEBP, and PDF files are allowed" }, { status: 400 });
  const supabase = await createClient();
  const path = `${user.id}/${type}-${Date.now()}.${extension}`;
  const upload = await supabase.storage.from("partner-documents").upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: true });
  if (upload.error) return NextResponse.json({ error: upload.error.message }, { status: 400 });
  const column = type === "pan" ? "pan_document_path" : "aadhaar_document_path";
  const { error } = await supabase.from("partner_details").update({ [column]: path, updated_at: new Date().toISOString() }).eq("user_id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, type });
}