import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, createAmbassadorSubscription } from "../../server/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Ambassador setup called:", {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    const { email, billingName, cardNumber, expiryDate, cvv, ...formData } =
      req.body;

    // Validate required fields
    if (!email || !billingName || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    // Additional validation for Safari compatibility
    const sanitizedCardNumber = String(cardNumber).replace(/\D/g, "");
    const sanitizedExpiryDate = String(expiryDate).replace(/\D/g, "");
    const sanitizedCvv = String(cvv).replace(/\D/g, "");

    if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 19) {
      return res.status(400).json({ error: "Invalid card number format" });
    }

    if (sanitizedExpiryDate.length !== 4) {
      return res.status(400).json({ error: "Invalid expiry date format" });
    }

    if (sanitizedCvv.length < 3 || sanitizedCvv.length > 4) {
      return res.status(400).json({ error: "Invalid CVV format" });
    }

    // Create Stripe customer and ambassador subscription
    if (stripe) {
      // Create customer
      const customer = await stripe.customers.create({
        email,
        name: billingName,
        metadata: {
          type: 'ambassador',
        },
      });

      // Create ambassador subscription (3-month trial, then £30/month)
      const subscription = await createAmbassadorSubscription(customer.id);

      console.log("Ambassador setup completed with Stripe:", {
        customerId: customer.id,
        subscriptionId: subscription.id,
      });

      res.status(200).json({
        success: true,
        customerId: customer.id,
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        message: "Ambassador setup completed - 3 months free, then £30/month",
        trialEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } else {
      // Fallback for demo/development
      console.log("Ambassador setup completed (demo mode):", { email });

      res.status(200).json({
        success: true,
        customerId: "demo_customer_" + Date.now(),
        message: "Ambassador setup completed successfully (demo mode)",
      });
    }
  } catch (error) {
    console.error("Ambassador setup failed:", error);
    res.status(500).json({
      error: "Ambassador setup failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
