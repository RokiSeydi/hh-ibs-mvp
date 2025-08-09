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
