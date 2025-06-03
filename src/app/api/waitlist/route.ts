import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { NewWaitlistEntry } from "@/types/supabase";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone validation regex (basic international format)
const PHONE_REGEX = /^\+?[\d\s\-\(\)]{10,}$/;

export async function POST(req: Request) {
  try {
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { email, phone }: { email?: string; phone?: string } = body;

    // Validation
    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email.toLowerCase())
      .single();

    if (existingEntry) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    // Insert new entry
    const newEntry: NewWaitlistEntry = {
      email: email.toLowerCase(),
      phone: phone.trim(),
    };

    const { error } = await supabase
      .from("waitlist")
      .insert(newEntry);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Successfully joined the waitlist!" 
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 