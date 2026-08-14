import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Logger } from "@/app/lib/logger";
import { Database } from "@/app/lib/database";
import { createLead } from "@/app/lib/lead";
import { saveWebsiteLead } from "@/app/lib/zoho";

import {
  sendAutoReply,
  sendContactEmail,
} from "@/app/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  type: z.enum([
    "general",
    "partnership",
    "support",
  ]).optional(),
  message: z.string().min(10),
});

export async function POST(
  request: NextRequest
) {
  try {

    const body = await request.json();

    const validatedData =
      ContactSchema.parse(body);

    const lead = createLead({

      source: "CONTACT",

      name: validatedData.name,

      email: validatedData.email,

      phone: validatedData.phone,

      company: validatedData.company,

      subject: validatedData.subject,

      message: validatedData.message,

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

        name: validatedData.name,

        email: validatedData.email,

        phone: validatedData.phone,

        company: validatedData.company,

        subject: validatedData.subject,

        message: validatedData.message,

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

    await sendContactEmail(validatedData);

    await sendAutoReply(validatedData);

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

    Logger.error(

      "CONTACT",

      "API_ERROR",

      "Failed to process contact enquiry",

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