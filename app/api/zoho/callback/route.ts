import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization code not found.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://accounts.zoho.in/oauth/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id:
            process.env.ZOHO_CLIENT_ID!,
          client_secret:
            process.env.ZOHO_CLIENT_SECRET!,
          redirect_uri:
            process.env.ZOHO_REDIRECT_URI!,
          code,
        }),
      }
    );

    const token = await response.json();

    console.log("======================================");
    console.log("ZOHO TOKEN RESPONSE");
    console.log(token);
    console.log("======================================");

    return NextResponse.json({
      success: true,
      token,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "OAuth callback failed.",
      },
      {
        status: 500,
      }
    );

  }
}