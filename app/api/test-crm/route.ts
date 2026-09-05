import { NextResponse } from "next/server";
import { testConnection } from "@/app/lib/zoho";
import { requireAdmin } from "@/app/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const data = await testConnection();

    return NextResponse.json(data);

  } catch (e) {

    return NextResponse.json(
      {
        success: false,
        error: String(e),
      },
      { status: 500 }
    );

  }
}