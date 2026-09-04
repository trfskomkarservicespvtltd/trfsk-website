import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/app/lib/mail";

export async function GET(request: NextRequest) {
  try {
    // Verify SMTP connection
    await transporter.verify();
    
    return NextResponse.json({
      status: "ok",
      message: "SMTP connection successful",
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        configured: !!process.env.SMTP_HOST && !!process.env.SMTP_USER,
      },
    });
  } catch (error) {
    console.error("SMTP Check Error:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: "SMTP connection failed",
        error: error instanceof Error ? error.message : String(error),
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          configured: !!process.env.SMTP_HOST && !!process.env.SMTP_USER,
        },
      },
      { status: 500 }
    );
  }
}
