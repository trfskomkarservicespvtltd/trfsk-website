import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  sendAutoReply,
  sendContactEmail,
} from "@/app/lib/mail";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = ContactSchema.parse(body);

    await sendContactEmail(validatedData);

    await sendAutoReply({
      name: validatedData.name,
      email: validatedData.email,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

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
          "Something went wrong while sending your message.",
      },
      {
        status: 500,
      }
    );
  }
}