import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { NewWaitlistEntry } from "@/types/supabase";

// Optimized regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-\(\)]{10,}$/;

// Response helpers for consistency
const createErrorResponse = (message: string, status: number) => 
  NextResponse.json({ error: message }, { status });

const createSuccessResponse = (message: string) => 
  NextResponse.json({ success: true, message });

export async function POST(req: Request) {
  try {
    // Early environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return createErrorResponse("Service temporarily unavailable. Please try again later.", 503);
    }

    const body = await req.json();
    const { email, phone }: { email?: string; phone?: string } = body;

    // Input validation
    if (!email?.trim() || !phone?.trim()) {
      return createErrorResponse("Email and phone are required", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = phone.trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return createErrorResponse("Please enter a valid email address", 400);
    }

    if (!PHONE_REGEX.test(normalizedPhone)) {
      return createErrorResponse("Please enter a valid phone number", 400);
    }

    // Check for existing entry and insert in a single transaction where possible
    const { data: existingEntry, error: selectError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (selectError) {
      console.error("Database select error:", selectError);
      return createErrorResponse("Failed to verify waitlist status. Please try again.", 500);
    }

    if (existingEntry) {
      return createErrorResponse("This email is already on the waitlist", 409);
    }

    // Insert new entry
    const newEntry: NewWaitlistEntry = {
      email: normalizedEmail,
      phone: normalizedPhone,
    };

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert(newEntry);

    if (insertError) {
      console.error("Database insert error:", insertError);
      return createErrorResponse("Failed to join waitlist. Please try again.", 500);
    }

    return createSuccessResponse("Successfully joined the waitlist!");

  } catch (error) {
    console.error("API error:", error);
    return createErrorResponse("Internal server error", 500);
  }
} 