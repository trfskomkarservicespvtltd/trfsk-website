import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Logger } from "@/app/lib/logger";
import { Database } from "@/app/lib/database";
import { createLead } from "@/app/lib/lead";
import { saveWebsiteLead } from "@/app/lib/zoho";
import { isRateLimited, getRateLimitRetryAfter } from "@/app/lib/ratelimit";

import { sendAutoReply } from "@/app/lib/mail";

const NewsletterSchema = z.object({
  email: z.email("Invalid email address"),
});

export async function POST(
  request: NextRequest
) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    const retryAfter = getRateLimitRetryAfter(ip);
    Logger.warning("NEWSLETTER", "RATE_LIMITED", `Rate limited IP: ${ip}`, { ip });
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && !origin.includes(host ?? "")) {
    Logger.warning("NEWSLETTER", "CSRF_BLOCKED", `Blocked cross-origin request`, { origin, ip });
    return NextResponse.json(
      { success: false, message: "Invalid request origin." },
      { status: 403 }
    );
  }

  try {

    const body = await request.json();

    const data = NewsletterSchema.parse(body);

    const lead = createLead({

      source: "NEWSLETTER",

      email: data.email,

      subject: "Newsletter Subscription",

      message:
        "User subscribed to the TRFSK Newsletter.",

    });

    Logger.info(

      "NEWSLETTER",

      "NEW_SUBSCRIBER",

      "Newsletter subscription received",

      lead

    );

    /*
    ==========================================
    Save Local Database
    ==========================================
    */

    await Database.saveLead(lead);

    /*
    ==========================================
    Save To Zoho CRM
    ==========================================
    */

    try {

      const zoho = await saveWebsiteLead({

        name: "Newsletter Subscriber",

        email: data.email,

        phone: "",

        company: "",

        subject: "Newsletter Subscription",

        message:
          "User subscribed to the TRFSK Newsletter.",

        source: "Newsletter",

      });

      console.log("=================================");
      console.log("ZOHO CRM");
      console.log(zoho);
      console.log("=================================");

    } catch (zohoError) {

      Logger.error(

        "ZOHO",

        "SAVE_FAILED",

        "Unable to save Newsletter subscriber into Zoho CRM",

        zohoError

      );

    }

    /*
    ==========================================
    Console Log
    ==========================================
    */

    console.log("=================================");
    console.log("NEW NEWSLETTER SUBSCRIBER");
    console.log("Lead ID :", lead.leadId);
    console.log("Time :", lead.createdAt);
    console.log("Email :", lead.email);
    console.log("Status :", lead.status);
    console.log("=================================");

    /*
    ==========================================
    Auto Reply
    ==========================================
    */

    await sendAutoReply({

      name: "Subscriber",

      email: data.email,

      phone: "",

      company: "",

      subject: "Newsletter Subscription",

      message:
        "Thank you for subscribing to the TRFSK Newsletter.",

    });

    Logger.success(

      "NEWSLETTER",

      "SUBSCRIBED",

      "Newsletter subscription completed",

      lead

    );

    return NextResponse.json(

      {

        success: true,

        leadId: lead.leadId,

        submittedAt: lead.createdAt,

        message:
          "Thank you for subscribing to our newsletter.",

      },

      {

        status: 200,

      }

    );

  } catch (error) {

    Logger.error(

      "NEWSLETTER",

      "API_ERROR",

      "Newsletter subscription failed",

      error

    );

    if (error instanceof z.ZodError) {

      return NextResponse.json(

        {

          success: false,

          errors: error.issues,

        },

        {

          status: 400,

        }

      );

    }

    return NextResponse.json(

      {

        success: false,

        message: "Unable to subscribe.",

      },

      {

        status: 500,

      }

    );

  }

}