import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Logger } from "@/app/lib/logger";
import { Database } from "@/app/lib/database";
import { createLead } from "@/app/lib/lead";
import { saveWebsiteLead } from "@/app/lib/zoho";
import { isRateLimited, getRateLimitRetryAfter } from "@/app/lib/ratelimit";
import { sanitizeText, isSafeText } from "@/app/lib/sanitize";

import {
  sendAutoReply,
  sendContactEmail,
} from "@/app/lib/mail";

const PartnershipSchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  email: z.email("Invalid email").max(254),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  subject: z.string().max(300).optional(),
  type: z.enum([
    "general",
    "partnership",
    "support",
  ]).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export async function POST(
  request: NextRequest
) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    const retryAfter = getRateLimitRetryAfter(ip);
    Logger.warning("PARTNERSHIP", "RATE_LIMITED", `Rate limited IP: ${ip}`, { ip });
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    Logger.warning("PARTNERSHIP", "CSRF_BLOCKED", `Blocked cross-origin request`, { origin, ip });
    return NextResponse.json(
      { success: false, message: "Invalid request origin." },
      { status: 403 }
    );
  }

  try {

    const body = await request.json();

    const validatedData =
      PartnershipSchema.parse(body);

    if (validatedData.website && validatedData.website.length > 0) {
      Logger.warning("PARTNERSHIP", "HONEYPOT_TRIGGERED", "Bot detected via honeypot", { ip });
      return NextResponse.json({ success: true, message: "Submitted." });
    }

    const safeMessage = isSafeText(validatedData.message) ? sanitizeText(validatedData.message) : "";
    if (!safeMessage || safeMessage.length < 10) {
      Logger.warning("PARTNERSHIP", "UNSAFE_INPUT", "Rejected unsafe input", { ip });
      return NextResponse.json(
        { success: false, message: "Invalid input content." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      ...validatedData,
      name: sanitizeText(validatedData.name),
      company: validatedData.company ? sanitizeText(validatedData.company) : undefined,
      subject: validatedData.subject ? sanitizeText(validatedData.subject) : undefined,
      message: safeMessage,
    };

    const lead = createLead({

      source: "PARTNERSHIP",

      name: sanitizedData.name,

      email: validatedData.email,

      phone: validatedData.phone,

      company: sanitizedData.company,

      subject:
        sanitizedData.subject ||
        "Partnership Enquiry",

      message: sanitizedData.message,

    });

    Logger.info(

      "PARTNERSHIP",

      "NEW_PARTNERSHIP",

      "New partnership enquiry received",

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

        name: sanitizedData.name,

        email: validatedData.email,

        phone: validatedData.phone,

        company: sanitizedData.company,

        subject:
          sanitizedData.subject ||
          "Partnership Enquiry",

        message: sanitizedData.message,

        source: "Partnership",

      });

      console.log("=================================");
      console.log("ZOHO PARTNERSHIP");
      console.log(zoho);
      console.log("=================================");

    } catch (zohoError) {

      Logger.error(

        "ZOHO",

        "PARTNERSHIP_SAVE_FAILED",

        "Unable to save Partnership Lead into Zoho CRM",

        zohoError

      );

    }

    /*
    ==========================================
    Console
    ==========================================
    */

    console.log("=================================");
    console.log("NEW PARTNERSHIP ENQUIRY");
    console.log("Lead ID :", lead.leadId);
    console.log("Time :", lead.createdAt);
    console.log("Name :", lead.name);
    console.log("Email :", lead.email);
    console.log("Status :", lead.status);
    console.log("=================================");

    /*
    ==========================================
    Emails
    ==========================================
    */

    await sendContactEmail(sanitizedData);

    await sendAutoReply(sanitizedData);

    Logger.success(

      "PARTNERSHIP",

      "EMAIL_SENT",

      "Partnership enquiry processed successfully",

      lead

    );

    return NextResponse.json({

      success: true,

      leadId: lead.leadId,

      submittedAt: lead.createdAt,

      message:
        "Thank you. Your partnership enquiry has been received successfully.",

    });

  } catch (error) {

    Logger.error(

      "PARTNERSHIP",

      "API_ERROR",

      "Failed to process partnership enquiry",

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

        message:
          "Unable to process your request.",

      },

      {

        status: 500,

      }

    );

  }

}