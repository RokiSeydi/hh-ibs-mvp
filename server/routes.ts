import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  trackFormSubmission,
  trackSwipeAction,
  trackTierSelection,
  trackAmbassadorApplication,
  trackFeedbackApplication,
  trackWaitlistSignup,
  trackPaymentSuccess,
} from "./analytics";
import {
  stripe,
  ensureStripeProducts,
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  handleWebhookEvent,
  SUBSCRIPTION_PLANS,
} from "./stripe";
import { raw } from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics routes for Google Sheets integration
  app.post("/api/analytics/form-submission", async (req, res) => {
    try {
      await trackFormSubmission(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Form submission tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/swipe-action", async (req, res) => {
    try {
      await trackSwipeAction(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Swipe action tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/tier-selection", async (req, res) => {
    try {
      await trackTierSelection(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Tier selection tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/ambassador-application", async (req, res) => {
    try {
      await trackAmbassadorApplication(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Ambassador application tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/feedback-application", async (req, res) => {
    try {
      await trackFeedbackApplication(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Feedback application tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/waitlist-signup", async (req, res) => {
    try {
      await trackWaitlistSignup(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Waitlist signup tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/payment-success", async (req, res) => {
    try {
      await trackPaymentSuccess(req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Payment success tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  // Stripe payment routes

  // Get subscription plans
  app.get("/api/stripe/plans", async (req, res) => {
    try {
      res.json({ plans: SUBSCRIPTION_PLANS });
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ error: "Failed to fetch plans" });
    }
  });

  // Get Stripe products and prices
  app.get("/api/stripe/products", async (req, res) => {
    try {
      const { productId, priceId } = await ensureStripeProducts();
      res.json({
        productId,
        priceId,
        plans: SUBSCRIPTION_PLANS,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create checkout session
  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    try {
      const { plan, customerEmail } = req.body;

      if (
        !plan ||
        !SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS]
      ) {
        return res.status(400).json({ error: "Invalid plan" });
      }

      // Ensure Stripe products exist
      const { priceId } = await ensureStripeProducts();

      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL || "https://your-domain.com"
          : "http://localhost:5173";

      const session = await createCheckoutSession(
        priceId,
        `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        `${baseUrl}/payment/cancelled`,
        customerEmail
      );

      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Create customer portal session
  app.post("/api/stripe/create-portal-session", async (req, res) => {
    try {
      const { customerId } = req.body;

      if (!customerId) {
        return res.status(400).json({ error: "Customer ID required" });
      }

      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL || "https://your-domain.com"
          : "http://localhost:5173";

      const session = await createPortalSession(
        customerId,
        `${baseUrl}/account`
      );

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating portal session:", error);
      res.status(500).json({ error: "Failed to create portal session" });
    }
  });

  // Get subscription status
  app.post("/api/stripe/subscription-status", async (req, res) => {
    try {
      const { customerId } = req.body;

      if (!customerId) {
        return res.status(400).json({ error: "Customer ID required" });
      }

      const subscription = await getSubscriptionStatus(customerId);

      res.json({
        hasActiveSubscription: !!subscription,
        subscription: subscription
          ? {
              id: subscription.id,
              status: subscription.status,
              current_period_end: (subscription as any).current_period_end,
              cancel_at_period_end: (subscription as any).cancel_at_period_end,
            }
          : null,
      });
    } catch (error) {
      console.error("Error getting subscription status:", error);
      res.status(500).json({ error: "Failed to get subscription status" });
    }
  });

  // Stripe webhooks
  app.post(
    "/api/stripe/webhook",
    raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        return res.status(400).send("Missing signature or webhook secret");
      }

      try {
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret
        );

        // Handle the event
        handleWebhookEvent(event);

        // Track payment success in analytics
        if (event.type === "checkout.session.completed") {
          const session = event.data.object as any;
          await trackPaymentSuccess({
            email: session.customer_email || "unknown@email.com",
            tier: "basic",
            paymentMethod: "card",
            amount: session.amount_total / 100,
            transactionId: session.id,
          });
        }

        res.json({ received: true });
      } catch (error) {
        console.error("Webhook error:", error);
        res.status(400).send(`Webhook Error: ${error}`);
      }
    }
  );

  // General page view and funnel tracking
  app.post("/api/analytics/page-view", async (req, res) => {
    try {
      // You can track page views in a separate sheet
      // For now, just log them
      console.log("Page view:", req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Page view tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  app.post("/api/analytics/conversion-funnel", async (req, res) => {
    try {
      // Track conversion funnel steps
      console.log("Conversion funnel step:", req.body);
      res.json({ success: true });
    } catch (error) {
      console.error("Conversion funnel tracking failed:", error);
      res.status(500).json({ error: "Tracking failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
