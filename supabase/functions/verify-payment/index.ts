import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { sessionId } = await req.json();

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Create Supabase service client
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Update purchase status based on payment status
    if (session.payment_status === "paid") {
      const { error } = await supabaseService
        .from("purchases")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", sessionId);

      if (error) {
        throw error;
      }

      // Increment download count for the product
      const productId = session.metadata?.product_id;
      if (productId) {
        await supabaseService.rpc('increment_downloads', {
          product_id: productId
        });
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          status: "completed",
          product_id: productId 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Update to failed status
      await supabaseService
        .from("purchases")
        .update({
          status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", sessionId);

      return new Response(
        JSON.stringify({ 
          success: false, 
          status: "failed" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});