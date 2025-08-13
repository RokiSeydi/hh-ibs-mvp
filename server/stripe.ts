import { config } from "dotenv";

// Load environment variables first, before any other imports
config({ path: '.env.local' });

import Stripe from "stripe";

const isDevelopment = process.env.NODE_ENV === "development";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// For testing/development without real Stripe keys
if (!stripeSecretKey && !isDevelopment) {
  throw new Error("STRIPE_SECRET_KEY is required in production");
}

// Only initialize Stripe if we have a real secret key
export const stripe = stripeSecretKey && stripeSecretKey.startsWith('sk_')
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-07-30.basil",
    })
  : null;

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Holding Health Membership",
    price: 2999, // £29.99 in pence
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
        productId: "prod_mock_basic",
        priceId: "price_mock_basic",
      };
    }

    // Check if products already exist
    const products = await stripe.products.list();
    const existingProduct = products.data.find(
      (p) => p.metadata.plan === "basic"
    );

    let productId: string;

    if (existingProduct) {
      productId = existingProduct.id;
    } else {
      // Create the product
      const product = await stripe.products.create({
        name: SUBSCRIPTION_PLANS.basic.name,
        description: SUBSCRIPTION_PLANS.basic.description,
        metadata: {
          plan: "basic",
        },
      });
      productId = product.id;
    }

    // Check if price exists
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    const existingPrice = prices.data.find(
      (p) =>
        p.unit_amount === SUBSCRIPTION_PLANS.basic.price &&
        p.currency === SUBSCRIPTION_PLANS.basic.currency &&
        p.recurring?.interval === SUBSCRIPTION_PLANS.basic.interval
    );

    if (existingPrice) {
      return { productId, priceId: existingPrice.id };
    }

    // Create the price
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: SUBSCRIPTION_PLANS.basic.price,
      currency: SUBSCRIPTION_PLANS.basic.currency,
      recurring: {
        interval: SUBSCRIPTION_PLANS.basic.interval,
      },
    });

    return { productId, priceId: price.id };
  } catch (error) {
    console.error("Error ensuring Stripe products:", error);
    throw error;
  }
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
