import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (in production, use a database)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add to subscribers
    subscribers.add(email);

    // TODO: In production, send to email service (Resend, Mailchimp, etc.)
    console.log(`New subscriber: ${email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to our newsletter' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
