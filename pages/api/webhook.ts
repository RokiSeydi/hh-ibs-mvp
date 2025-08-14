import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "../../server/stripe";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    res.status(400).json({ error: "Webhook secret not configured" });
    return;
  }

  if (!stripe) {
    console.error("Stripe not initialized");
    res.status(500).json({ error: "Stripe not available" });
    return;
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  try {
    console.log("Webhook received:", event.type);

    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  console.log("Trial ending for subscription:", subscription.id);
  // Add your logic here
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Payment succeeded for invoice:", invoice.id);
  // Add your logic here
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Payment failed for invoice:", invoice.id);
  // Add your logic here
}
