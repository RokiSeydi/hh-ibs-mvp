import { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe, createAmbassadorSubscription } from "../server/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { email, billingName, cardNumber, expiryDate, cvv } = req.body;

    // Basic validation
    if (!email || !billingName || !cardNumber || !expiryDate || !cvv) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Safari-compatible validation
    const sanitizedCardNumber = String(cardNumber).replace(/\D/g, "");
    const sanitizedExpiryDate = String(expiryDate).replace(/\D/g, "");
    const sanitizedCvv = String(cvv).replace(/\D/g, "");

    if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 19) {
      res.status(400).json({ error: "Invalid card number" });
      return;
    }

    if (sanitizedExpiryDate.length !== 4) {
      res.status(400).json({ error: "Invalid expiry date" });
      return;
    }

    if (sanitizedCvv.length < 3 || sanitizedCvv.length > 4) {
      res.status(400).json({ error: "Invalid CVV" });
      return;
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

      res.status(200).json({
        success: true,
        customerId: customer.id,
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        message: "Ambassador setup completed - 3 months free, then £30/month",
        trialEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      });
    } else {
      // Fallback for demo/development
      res.status(200).json({
        success: true,
        customerId: "demo_customer_" + Date.now(),
        message: "Ambassador setup completed successfully (demo mode)",
      });
    }
  } catch (error) {
    console.error("Ambassador setup error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
