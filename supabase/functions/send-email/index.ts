import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'purchase_confirmation' | 'product_delivery' | 'welcome';
  purchaseId?: string;
  userEmail?: string;
  userName?: string;
  productDetails?: {
    title: string;
    price: number;
    downloadUrl?: string;
  };
}

const createEmailTemplate = (type: string, data: any) => {
  const baseStyle = `
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 20px;
      }
      .email-content {
        background: white;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 10px;
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        color: #2d3748;
        margin-bottom: 15px;
      }
      .subtitle {
        color: #718096;
        font-size: 16px;
        line-height: 1.6;
      }
      .product-card {
        background: #f7fafc;
        border-radius: 12px;
        padding: 24px;
        margin: 24px 0;
        border-left: 4px solid #667eea;
      }
      .product-title {
        font-size: 20px;
        font-weight: bold;
        color: #2d3748;
        margin-bottom: 8px;
      }
      .product-price {
        font-size: 24px;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 16px;
      }
      .download-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
        color: #718096;
        font-size: 14px;
      }
    </style>
  `;

  switch (type) {
    case 'purchase_confirmation':
      return `
        ${baseStyle}
        <div class="email-container">
          <div class="email-content">
            <div class="header">
              <div class="logo">AI Rules Marketplace</div>
              <h1 class="title">🎉 Purchase Confirmed!</h1>
              <p class="subtitle">Thank you for your purchase. Your AI rules are ready for download.</p>
            </div>
            
            <div class="product-card">
              <div class="product-title">${data.productTitle}</div>
              <div class="product-price">$${(data.price / 100).toFixed(2)}</div>
              <p>Your premium AI rules package is now available for download.</p>
              ${data.downloadUrl ? `<a href="${data.downloadUrl}" class="download-button">Download Now</a>` : ''}
            </div>
            
            <div style="background: #e6fffa; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <strong>What's included:</strong>
              <ul style="margin: 8px 0; padding-left: 20px;">
                <li>Premium AI rules and prompts</li>
                <li>Implementation templates</li>
                <li>Usage guidelines</li>
                <li>Future updates</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Need help? Contact us at support@airules.com</p>
              <p>© 2024 AI Rules Marketplace. All rights reserved.</p>
            </div>
          </div>
        </div>
      `;
      
    case 'product_delivery':
      return `
        ${baseStyle}
        <div class="email-container">
          <div class="email-content">
            <div class="header">
              <div class="logo">AI Rules Marketplace</div>
              <h1 class="title">📦 Your AI Rules Are Ready!</h1>
              <p class="subtitle">Download your premium AI rules package and start building amazing applications.</p>
            </div>
            
            <div class="product-card">
              <div class="product-title">${data.productTitle}</div>
              <p>Click the button below to access your premium AI rules:</p>
              <a href="${data.downloadUrl}" class="download-button">Access Your Rules</a>
            </div>
            
            <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <strong>🔐 Important:</strong> This download link is unique to your purchase and expires in 30 days. Save your files locally.
            </div>
            
            <div class="footer">
              <p>Happy building! 🚀</p>
              <p>© 2024 AI Rules Marketplace. All rights reserved.</p>
            </div>
          </div>
        </div>
      `;
      
    case 'welcome':
      return `
        ${baseStyle}
        <div class="email-container">
          <div class="email-content">
            <div class="header">
              <div class="logo">AI Rules Marketplace</div>
              <h1 class="title">Welcome to AI Rules!</h1>
              <p class="subtitle">Hello ${data.userName}, you've joined the premier marketplace for AI development rules and templates.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <h2 style="color: #2d3748; margin-bottom: 16px;">🚀 Get Started</h2>
              <p style="color: #718096; margin-bottom: 20px;">Explore our collection of premium AI rules for Cursor, Claude, and more.</p>
              <a href="https://your-marketplace.com/categories" class="download-button">Browse Collection</a>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 30px 0;">
              <div style="background: #f0fff4; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
                <strong>Fast Setup</strong>
                <p style="font-size: 14px; color: #718096; margin: 4px 0;">Get up and running in minutes</p>
              </div>
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 8px;">🎯</div>
                <strong>Premium Quality</strong>
                <p style="font-size: 14px; color: #718096; margin: 4px 0;">Hand-crafted by experts</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Questions? We're here to help at support@airules.com</p>
              <p>© 2024 AI Rules Marketplace. All rights reserved.</p>
            </div>
          </div>
        </div>
      `;
      
    default:
      return '';
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { type, purchaseId, userEmail, userName, productDetails }: EmailRequest = await req.json();
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    let emailData: any = {};
    let subject = "";
    let toEmail = userEmail;

    // Get purchase and product details if purchaseId provided
    if (purchaseId) {
      const { data: purchase, error: purchaseError } = await supabaseClient
        .from("purchases")
        .select(`
          *,
          products(title, price, description, file_url)
        `)
        .eq("id", purchaseId)
        .single();

      if (purchaseError || !purchase) {
        throw new Error("Purchase not found");
      }

      // Get user email from auth if not provided
      if (!toEmail) {
        const { data: userData } = await supabaseClient.auth.admin.getUserById(purchase.user_id);
        toEmail = userData.user?.email;
      }

      emailData = {
        productTitle: purchase.products.title,
        price: purchase.products.price,
        downloadUrl: purchase.products.file_url,
        userName: userName || "Valued Customer"
      };
    } else if (productDetails) {
      emailData = {
        productTitle: productDetails.title,
        price: productDetails.price,
        downloadUrl: productDetails.downloadUrl,
        userName: userName || "Valued Customer"
      };
    } else {
      emailData = {
        userName: userName || "Valued Customer"
      };
    }

    // Set subject based on email type
    switch (type) {
      case 'purchase_confirmation':
        subject = `🎉 Purchase Confirmed: ${emailData.productTitle}`;
        break;
      case 'product_delivery':
        subject = `📦 Your AI Rules Are Ready: ${emailData.productTitle}`;
        break;
      case 'welcome':
        subject = `Welcome to AI Rules Marketplace, ${emailData.userName}!`;
        break;
      default:
        subject = "AI Rules Marketplace";
    }

    const htmlContent = createEmailTemplate(type, emailData);

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AI Rules Marketplace <noreply@your-domain.com>",
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResult.id,
        message: "Email sent successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});