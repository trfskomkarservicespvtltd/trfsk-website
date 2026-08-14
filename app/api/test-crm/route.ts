import { NextResponse } from "next/server";
import { testConnection } from "@/app/lib/zoho";

export async function GET() {
  try {
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