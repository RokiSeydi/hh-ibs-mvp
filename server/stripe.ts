import { config } from "dotenv";

// Load environment variables first, before any other imports
config({ path: ".env.local" });

import Stripe from "stripe";

const isDevelopment = process.env.NODE_ENV === "development";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// For testing/development without real Stripe keys
if (!stripeSecretKey && !isDevelopment) {
  throw new Error("STRIPE_SECRET_KEY is required in production");
}

// Only initialize Stripe if we have a real secret key
export const stripe =
  stripeSecretKey && stripeSecretKey.startsWith("sk_")
    ? new Stripe(stripeSecretKey, {
        apiVersion: "2025-07-30.basil",
      })
    : null;

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  // Ambassador: Free for 3 months, then £30/month (setup payment method but charge later)
  ambassador: {
    name: "Ambassador Access",
    freeTrialMonths: 3,
    regularPrice: 3000, // £30 in pence (what they pay after trial)
    interval: "month" as const,
    currency: "gbp",
    description: "Free access for 3 months by sharing your wellness journey, then £30/month",
    features: [
      "Free access for 3 months",
      "Share your wellness journey",
      "Full access to all providers",
      "Then £30/month after trial",
    ],
  },
  
  // Feedback: £15/month for 3 months, then £30/month
  feedback: {
    name: "Feedback Member",
    promoPrice: 1500, // £15 in pence
    promoMonths: 3,
    regularPrice: 3000, // £30 in pence (same as ambassador after promo)
    interval: "month" as const,
    currency: "gbp",
    description: "50% off for 3 months by providing feedback, then £30/month",
    features: [
      "£15/month for first 3 months",
      "Provide quick feedback after sessions",
      "Full access to all providers",
      "Then £30/month after discount period",
    ],
  },
  
  // Waitlist: Completely FREE (no payment required)
  waitlist: {
    name: "Waitlist Priority",
    price: 0, // FREE
    description: "Join our waitlist for the next cohort - completely free",
    features: [
      "Priority access to next cohort",
      "No payment required",
      "Referral rewards program",
      "Early notifications",
    ],
  },
  
  // Regular price (for after promotions - both ambassador and feedback convert to this)
  regular: {
    name: "Holding Health Membership", 
    price: 3000, // £30 in pence
    interval: "month" as const,
    currency: "gbp",
    description: "Full access to all providers, unlimited bookings",
    features: [
      "Unlimited access to all providers",
      "Priority booking",
      "Cancel anytime",
      "No hidden fees",
    ],
  },
} as const;

// Create or get existing Stripe products and prices
export async function ensureStripeProducts() {
  try {
    // If no real Stripe key, return mock data for development
    if (!stripe) {
      return {
        regularProductId: "prod_mock_regular",
        regularPriceId: "price_mock_regular",
        feedbackPromoProductId: "prod_mock_feedback",
        feedbackPromoPriceId: "price_mock_feedback",
      };
    }

    // Check if products already exist
    const products = await stripe.products.list({ limit: 10 });
    const prices = await stripe.prices.list({ limit: 10 });

    // Look for existing regular price (£30)
    let regularProduct = products.data.find(p => p.name === SUBSCRIPTION_PLANS.regular.name);
    let regularPrice = prices.data.find(p => 
      p.unit_amount === SUBSCRIPTION_PLANS.regular.price &&
      p.currency === SUBSCRIPTION_PLANS.regular.currency &&
      p.recurring?.interval === SUBSCRIPTION_PLANS.regular.interval
    );

    // Create regular product if it doesn't exist
    if (!regularProduct) {
      regularProduct = await stripe.products.create({
        name: SUBSCRIPTION_PLANS.regular.name,
        description: SUBSCRIPTION_PLANS.regular.description,
      });
    }

    // Create regular price if it doesn't exist
    if (!regularPrice) {
      regularPrice = await stripe.prices.create({
        product: regularProduct.id,
        unit_amount: SUBSCRIPTION_PLANS.regular.price,
        currency: SUBSCRIPTION_PLANS.regular.currency,
        recurring: {
          interval: SUBSCRIPTION_PLANS.regular.interval,
        },
      });
    }

    // Look for existing feedback promo price (£15)
    let feedbackPromoProduct = products.data.find(p => p.name === SUBSCRIPTION_PLANS.feedback.name);
    let feedbackPromoPrice = prices.data.find(p => 
      p.unit_amount === SUBSCRIPTION_PLANS.feedback.promoPrice &&
      p.currency === SUBSCRIPTION_PLANS.feedback.currency &&
      p.recurring?.interval === SUBSCRIPTION_PLANS.feedback.interval
    );

    // Create feedback promo product if it doesn't exist
    if (!feedbackPromoProduct) {
      feedbackPromoProduct = await stripe.products.create({
        name: SUBSCRIPTION_PLANS.feedback.name,
        description: SUBSCRIPTION_PLANS.feedback.description,
      });
    }

    // Create feedback promo price if it doesn't exist
    if (!feedbackPromoPrice) {
      feedbackPromoPrice = await stripe.prices.create({
        product: feedbackPromoProduct.id,
        unit_amount: SUBSCRIPTION_PLANS.feedback.promoPrice,
        currency: SUBSCRIPTION_PLANS.feedback.currency,
        recurring: {
          interval: SUBSCRIPTION_PLANS.feedback.interval,
        },
      });
    }

    return {
      regularProductId: regularProduct.id,
      regularPriceId: regularPrice.id,
      feedbackPromoProductId: feedbackPromoProduct.id,
      feedbackPromoPriceId: feedbackPromoPrice.id,
    };
  } catch (error) {
    console.error("Error ensuring Stripe products:", error);
    throw error;
  }
}

// Create ambassador subscription (setup payment method but don't charge for 3 months)
export async function createAmbassadorSubscription(customerId: string) {
  if (!stripe) {
    throw new Error("Stripe not initialized");
  }

  const { regularPriceId } = await ensureStripeProducts();
  
  // Create subscription with 3-month trial
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: regularPriceId }],
    trial_period_days: 90, // 3 months = ~90 days
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      type: 'ambassador',
    },
  });

  return subscription;
}

// Create feedback subscription (£15 for 3 months, then £30)
export async function createFeedbackSubscription(customerId: string) {
  if (!stripe) {
    throw new Error("Stripe not initialized");
  }

  const { feedbackPromoPriceId, regularPriceId } = await ensureStripeProducts();
  
  // Create subscription starting with promo price
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: feedbackPromoPriceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      type: 'feedback',
      promo_months_remaining: '3',
      regular_price_id: regularPriceId,
    },
  });

  return subscription;
}

// Handle waitlist signup (no payment required)
export async function createWaitlistEntry(email: string, name?: string) {
  // No Stripe needed for waitlist - just collect contact info
  // This could store in your database, send to email service, etc.
  return {
    type: 'waitlist',
    email,
    name,
    status: 'active',
    created: new Date().toISOString(),
  };
}

// Create a checkout session
export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string
) {
  try {
    // If no real Stripe key, return mock session for development
    if (!stripe) {
      const mockSessionId = "cs_mock_session_123";
      return {
        id: mockSessionId,
        url: successUrl.replace("{CHECKOUT_SESSION_ID}", mockSessionId),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      subscription_data: {
        metadata: {
          plan: "basic",
        },
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

// Create a customer portal session
export async function createPortalSession(
  customerId: string,
  returnUrl: string
) {
  try {
    // If no real Stripe key, return mock portal session for development
    if (!stripe) {
      return {
        id: "bps_mock_portal_123",
        url: returnUrl,
      };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    console.error("Error creating portal session:", error);
    throw error;
  }
}

// Get subscription status
export async function getSubscriptionStatus(customerId: string) {
  try {
    // If no real Stripe key, return mock subscription for development
    if (!stripe) {
      return {
        hasActiveSubscription: true,
        subscription: {
          id: "sub_mock_123",
          status: "active",
          current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        },
      };
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    return subscriptions.data[0] || null;
  } catch (error) {
    console.error("Error getting subscription status:", error);
    return null;
  }
}

// Handle webhook events
export function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "customer.subscription.created":
      console.log("Subscription created:", event.data.object);
      // Handle new subscription
      break;

    case "customer.subscription.updated":
      console.log("Subscription updated:", event.data.object);
      // Handle subscription changes
      break;

    case "customer.subscription.deleted":
      console.log("Subscription deleted:", event.data.object);
      // Handle subscription cancellation
      break;

    case "invoice.payment_succeeded":
      console.log("Payment succeeded:", event.data.object);
      // Handle successful payment
      break;

    case "invoice.payment_failed":
      console.log("Payment failed:", event.data.object);
      // Handle failed payment
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}
