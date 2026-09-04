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

const ContactSchema = z.object({
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
    Logger.warning("CONTACT", "RATE_LIMITED", `Rate limited IP: ${ip}`, { ip });
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    Logger.warning("CONTACT", "CSRF_BLOCKED", `Blocked cross-origin request`, { origin, ip });
    return NextResponse.json(
      { success: false, message: "Invalid request origin." },
      { status: 403 }
    );
  }
  try {

    const body = await request.json();

    const validatedData =
      ContactSchema.parse(body);

    if (validatedData.website && validatedData.website.length > 0) {
      Logger.warning("CONTACT", "HONEYPOT_TRIGGERED", "Bot detected via honeypot", { ip });
      return NextResponse.json({ success: true, message: "Submitted." });
    }

    const safeMessage = isSafeText(validatedData.message) ? sanitizeText(validatedData.message) : "";
    if (!safeMessage || safeMessage.length < 10) {
      Logger.warning("CONTACT", "UNSAFE_INPUT", "Rejected unsafe input", { ip });
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

      source: "CONTACT",

      name: sanitizedData.name,

      email: validatedData.email,

      phone: validatedData.phone,

      company: sanitizedData.company,

      subject: sanitizedData.subject,

      message: sanitizedData.message,

    });

    Logger.info(

      "CONTACT",

      "NEW_ENQUIRY",

      "New contact enquiry received",

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

        subject: sanitizedData.subject,

        message: sanitizedData.message,

        source: "Website Contact",

      });

      console.log("=================================");
      console.log("ZOHO CRM");
      console.log(zoho);
      console.log("=================================");

    } catch (zohoError) {

      Logger.error(

        "ZOHO",

        "SAVE_FAILED",

        "Unable to save lead into Zoho CRM",

        zohoError

      );

    }

    /*
    ==========================================
    Console Log
    ==========================================
    */

    console.log("=================================");
    console.log("NEW WEBSITE ENQUIRY");
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

    try {
      await sendContactEmail(sanitizedData);
      Logger.info("CONTACT", "ADMIN_EMAIL_SENT", "Admin notification sent successfully", lead);
    } catch (emailError) {
      Logger.error(
        "CONTACT",
        "ADMIN_EMAIL_FAILED",
        "Failed to send admin email notification",
        emailError
      );
      throw new Error(`Admin email failed: ${emailError instanceof Error ? emailError.message : String(emailError)}`);
    }

    try {
      await sendAutoReply(sanitizedData);
      Logger.info("CONTACT", "USER_EMAIL_SENT", "Auto-reply sent to user successfully", lead);
    } catch (emailError) {
      Logger.error(
        "CONTACT",
        "USER_EMAIL_FAILED",
        "Failed to send auto-reply email to user",
        emailError
      );
      throw new Error(`User email failed: ${emailError instanceof Error ? emailError.message : String(emailError)}`);
    }

    Logger.success(

      "CONTACT",

      "EMAIL_SENT",

      "Contact enquiry processed successfully",

      lead

    );

    return NextResponse.json({

      success: true,

      leadId: lead.leadId,

      message:
        "Thank you! Your enquiry has been received successfully.",

      submittedAt: lead.createdAt,

    });

  } catch (error) {

    const errorMsg = error instanceof Error ? error.message : String(error);
    
    Logger.error(

      "CONTACT",

      "API_ERROR",

      `Failed to process contact enquiry: ${errorMsg}`,

      error

    );

    if (error instanceof z.ZodError) {

      return NextResponse.json(

        {

          success: false,

          message: "Validation failed",

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
          "Unable to process your request. Please contact us directly at care@trfskomkar.com",

      },

      {

        status: 500,

      }

    );

  }

}