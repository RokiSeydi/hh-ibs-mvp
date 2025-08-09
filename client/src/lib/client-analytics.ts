// Client-side analytics helper
// This sends data to Google Apps Script web app endpoint

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycby1G2Wb_7YPDFMk3Qks56kCKeKmdEPifj0X79BxaA2tb9vE4ZDWi2jDWwMgkO7gLKZi/exec";

export const analytics = {
  trackFormSubmission: async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    reason: string;
  }) => {
    console.log("🔍 Analytics: trackFormSubmission called", formData);
    try {
      const params = new URLSearchParams({
        eventType: "form_submission",
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        reason: formData.reason,
      });

      console.log("🚀 Analytics: Sending to", GOOGLE_SCRIPT_URL);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const result = await response.text();
      console.log("✅ Analytics: Response", result);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },

  trackLandingPageInteraction: async (interactionData: {
    action:
      | "hero_cta_click"
      | "learn_more_click"
      | "navigation_cta_click"
      | "footer_cta_click";
    location?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "landing_page_interaction",
        timestamp: new Date().toISOString(),
        action: interactionData.action,
        location: interactionData.location || "",
      });

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const result = await response.text();
      console.log("✅ Analytics: Landing page interaction tracked", result);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },

  trackSwipeAction: async (swipeData: {
    email: string;
    providerId: number;
    providerName: string;
    providerType: string;
    action: "swipe_left" | "swipe_right";
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "swipe_action",
        timestamp: new Date().toISOString(),
        email: swipeData.email,
        providerId: swipeData.providerId.toString(),
        providerName: swipeData.providerName,
        providerType: swipeData.providerType,
        action: swipeData.action,
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (error) {
      console.error("Analytics tracking failed:", error);
    }
  },

  trackTierSelection: async (tierData: {
    email: string;
    tier: "ambassador" | "feedback" | "waitlist";
    selectedProviders: any[];
  }) => {
    console.log("🔍 Analytics: trackTierSelection called", tierData);
    try {
      const params = new URLSearchParams({
        eventType: "tier_selection",
        timestamp: new Date().toISOString(),
        email: tierData.email,
        tier: tierData.tier,
        selectedProvidersCount: tierData.selectedProviders.length.toString(),
        providerNames: tierData.selectedProviders
          .map((p) => p.name || p)
          .join(", "),
      });

      console.log("🚀 Analytics: Sending tier selection to", GOOGLE_SCRIPT_URL);
      console.log("📦 Analytics: Payload", params.toString());

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      console.log("📡 Analytics: Response status", response.status);
      const result = await response.text();
      console.log("✅ Analytics: Tier selection response", result);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },

  trackAmbassadorApplication: async (appData: {
    email: string;
    socialHandle: string;
    platform: string;
    followerCount: string;
    contentStyle: string;
    whyAmbassador: string;
    paymentMethod?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "ambassador_application",
        timestamp: new Date().toISOString(),
        email: appData.email,
        socialHandle: appData.socialHandle,
        platform: appData.platform,
        followerCount: appData.followerCount,
        contentStyle: appData.contentStyle,
        whyAmbassador: appData.whyAmbassador,
        paymentMethod: appData.paymentMethod || "",
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (error) {
      console.error("Analytics tracking failed:", error);
    }
  },

  trackFeedbackApplication: async (appData: {
    email: string;
    experienceLevel: string;
    interests: string;
    feedbackStyle: string;
    availability: string;
    whyFeedback: string;
    paymentMethod?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "feedback_application",
        timestamp: new Date().toISOString(),
        email: appData.email,
        experienceLevel: appData.experienceLevel,
        interests: appData.interests,
        feedbackStyle: appData.feedbackStyle,
        availability: appData.availability,
        whyFeedback: appData.whyFeedback,
        paymentMethod: appData.paymentMethod || "",
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (error) {
      console.error("Analytics tracking failed:", error);
    }
  },

  trackWaitlistSignup: async (waitlistData: {
    email: string;
    referralCode?: string;
    referredBy?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "waitlist_signup",
        timestamp: new Date().toISOString(),
        email: waitlistData.email,
        referralCode: waitlistData.referralCode || "",
        referredBy: waitlistData.referredBy || "",
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (error) {
      console.error("Analytics tracking failed:", error);
    }
  },

  trackPaymentSuccess: async (paymentData: {
    email: string;
    tier: string;
    paymentMethod: string;
    amount: number;
    transactionId?: string;
  }) => {
    try {
      const params = new URLSearchParams({
        eventType: "payment_success",
        timestamp: new Date().toISOString(),
        email: paymentData.email,
        tier: paymentData.tier,
        paymentMethod: paymentData.paymentMethod,
        amount: paymentData.amount.toString(),
        transactionId: paymentData.transactionId || "",
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
    } catch (error) {
      console.error("Analytics tracking failed:", error);
    }
  },

  // Simplified tracking helpers
  trackConversionFunnel: async (funnelData: {
    email: string;
    step:
      | "form_start"
      | "form_complete"
      | "swipe_start"
      | "swipe_complete"
      | "tier_select"
      | "payment_start"
      | "payment_complete";
    metadata?: any;
  }) => {
    // This could be tracked as a separate event type or combined with existing events
    // For now, we'll just log it
    console.log("Conversion funnel step:", funnelData);
  },
};
