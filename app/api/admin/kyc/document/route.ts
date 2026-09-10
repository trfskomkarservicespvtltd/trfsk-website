import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const path = new URL(request.url).searchParams.get("path");
    if (!path || !path.startsWith("/")) return NextResponse.json({ error: "Invalid document" }, { status: 400 });
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from("partner-documents").createSignedUrl(path.slice(1), 300);
    if (error || !data?.signedUrl) return NextResponse.json({ error: error?.message ?? "Document unavailable" }, { status: 404 });
    return NextResponse.redirect(data.signedUrl);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
