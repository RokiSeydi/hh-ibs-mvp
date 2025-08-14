import { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "../server/stripe";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, stripe-signature");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

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

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
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

// Handle when ambassador trial is about to end
async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  try {
    console.log("Trial ending for subscription:", subscription.id);

    // Check if this is an ambassador subscription
    if (subscription.metadata?.type === 'ambassador') {
      // Send notification email to customer about upcoming charge
      const customer = await stripe!.customers.retrieve(subscription.customer as string);
      
      console.log("Ambassador trial ending - will start charging £30/month:", {
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        email: (customer as Stripe.Customer).email,
      });

      // You could integrate with an email service here to notify the customer
      // Example: await sendEmail(customer.email, 'trial-ending', { amount: '£30' });
    }
  } catch (error) {
    console.error("Error handling trial will end:", error);
  }
}

// Handle successful payments
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription;
    if (!subscriptionId) return;
    
    const subscription = await stripe!.subscriptions.retrieve(subscriptionId);
    
    console.log("Payment succeeded:", {
      subscriptionId: subscription.id,
      amount: invoice.amount_paid / 100, // Convert from pence to pounds
      customerEmail: invoice.customer_email,
    });

    // Check if this is a feedback subscription that needs to be upgraded after 3 payments
    if (subscription.metadata?.type === 'feedback') {
      const promoMonthsRemaining = parseInt(subscription.metadata.promo_months_remaining || '0');
      
      if (promoMonthsRemaining > 1) {
        // Decrement promo months
        await stripe!.subscriptions.update(subscription.id, {
          metadata: {
            ...subscription.metadata,
            promo_months_remaining: (promoMonthsRemaining - 1).toString(),
          },
        });
        
        console.log(`Feedback promo: ${promoMonthsRemaining - 1} months remaining`);
      } else if (promoMonthsRemaining === 1) {
        // Time to upgrade to regular price
        await upgradeFeedbackToRegularPrice(subscription);
      }
    }
  } catch (error) {
    console.error("Error handling payment succeeded:", error);
  }
}

// Handle failed payments
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    console.log("Payment failed:", {
      subscriptionId: (invoice as any).subscription,
      amount: invoice.amount_due / 100,
      customerEmail: invoice.customer_email,
      attemptCount: invoice.attempt_count,
    });

    // You could implement retry logic or send dunning emails here
    // Example: await sendEmail(invoice.customer_email, 'payment-failed', { amount: invoice.amount_due / 100 });
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    console.log("Subscription updated:", {
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    });
  } catch (error) {
    console.error("Error handling subscription updated:", error);
  }
}

// Upgrade feedback subscription from £15 to £30
async function upgradeFeedbackToRegularPrice(subscription: Stripe.Subscription) {
  try {
    const regularPriceId = subscription.metadata?.regular_price_id;
    
    if (!regularPriceId) {
      console.error("No regular price ID found in subscription metadata");
      return;
    }

    // Update the subscription to use the regular price
    await stripe!.subscriptions.update(subscription.id, {
      items: [{
        id: subscription.items.data[0].id,
        price: regularPriceId,
      }],
      metadata: {
        ...subscription.metadata,
        type: 'regular',
        upgraded_from: 'feedback',
        upgraded_at: new Date().toISOString(),
      },
    });

    console.log("Upgraded feedback subscription to regular price:", {
      subscriptionId: subscription.id,
      newPrice: '£30/month',
    });

    // Send notification to customer about price change
    const customer = await stripe!.customers.retrieve(subscription.customer as string);
    console.log("Feedback subscription upgraded - now £30/month:", {
      customerId: subscription.customer,
      email: (customer as Stripe.Customer).email,
    });

  } catch (error) {
    console.error("Error upgrading feedback subscription:", error);
  }
}
