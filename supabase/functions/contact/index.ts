import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "npm:zod@3.25.76";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://brewm.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const isAllowed = ALLOWED_ORIGINS.some(
    (allowed) => origin === allowed || origin.endsWith(".lovable.app")
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per hour per IP

// In-memory rate limit store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Check rate limit for an IP
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  cleanupRateLimitStore();
  
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetTime: record.resetTime };
}

// Get client IP from request headers
function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  const cfConnectingIP = req.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return "unknown";
}

// Server-side validation schema with strict limits
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(5000, { message: "Message must be less than 5000 characters" }),
});

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);
    
    console.log(`Contact form request from IP: ${clientIP.substring(0, 8)}*** - Remaining: ${rateLimit.remaining}`);
    
    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      console.log(`Rate limit exceeded for IP: ${clientIP.substring(0, 8)}***`);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many requests. Please try again later.",
          retryAfter: retryAfterSeconds
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": retryAfterSeconds.toString()
          } 
        }
      );
    }

    const body = await req.json();
    console.log("Contact form submission received");

    // Validate input with zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      
      console.log("Validation failed:", errors);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Validation failed", 
          details: errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { name, email, message } = validationResult.data;

    // Initialize Supabase client with service role for database insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store submission in database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        message,
        ip_address: clientIP !== "unknown" ? clientIP : null,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      // Don't expose database errors to user, but still acknowledge the message
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Thank you for your message! I'll get back to you soon." 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Contact submission stored successfully for:", email.split("@")[0] + "@***");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An unexpected error occurred. Please try again." 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);
