import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Check environment variables
    const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
    const hasPublishableKey = !!process.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const hasWebhookSecret = !!process.env.STRIPE_WEBHOOK_SECRET;
    const testMode = process.env.STRIPE_TEST_MODE;
    
    // Check if Stripe key format is valid
    const stripeKeyFormat = process.env.STRIPE_SECRET_KEY 
      ? process.env.STRIPE_SECRET_KEY.substring(0, 8) + "..."
      : "missing";

    res.status(200).json({
      success: true,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasStripeSecretKey: hasStripeKey,
        hasPublishableKey: hasPublishableKey,
        hasWebhookSecret: hasWebhookSecret,
        stripeTestMode: testMode,
        stripeKeyFormat: stripeKeyFormat,
      },
      message: "Debug info retrieved successfully",
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    res.status(500).json({
      error: "Debug failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
