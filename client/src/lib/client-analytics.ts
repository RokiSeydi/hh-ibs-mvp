// Client-side analytics helper (temporarily disabled for MVP)
export const analytics = {
  trackFormSubmission: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    reason: string;
    tier?: string;
    paymentMethod?: string;
    amount?: string;
    transactionId?: string;
    eventType?: string;
  }) => {
    try {
      const GOOGLE_SHEET_URL =
        import.meta.env.VITE_GOOGLE_SHEET_URL ||
        "https://script.google.com/macros/s/AKfycbxkHY053w1TXg4IYmMXL2w0zCfhRwdr-pqANjbJC-DHRPBTZ7NGcYaEHzXnuW7v9xM-/exec";

      // Send as URL-encoded form data
      const formData = new URLSearchParams();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("reason", data.reason);
      formData.append("timestamp", new Date().toISOString());
      formData.append("eventType", "form_submission");

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseText = await response.text();
      console.log("Raw response from Google Sheets:", responseText);

      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        console.log("Response was not JSON, but submission likely succeeded");
        return { success: true };
      }
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
      throw error;
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
      console.log("Analytics disabled:", interactionData);
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
      console.log("Analytics disabled:", swipeData);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },

  trackTierSelection: async (tierData: {
    email: string;
    tier: "ambassador" | "feedback" | "waitlist";
    selectedProviders: any[];
  }) => {
    try {
      console.log("Analytics disabled:", tierData);
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
      console.log("Analytics disabled:", appData);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
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
      console.log("Analytics disabled:", appData);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },

  trackWaitlistSignup: async (waitlistData: {
    email: string;
    referralCode?: string;
  }) => {
    try {
      const GOOGLE_SHEET_URL =
        import.meta.env.VITE_GOOGLE_SHEET_URL ||
        "https://script.google.com/macros/s/AKfycbxkHY053w1TXg4IYmMXL2w0zCfhRwdr-pqANjbJC-DHRPBTZ7NGcYaEHzXnuW7v9xM-/exec";

      // Send as URL-encoded form data
      const formData = new URLSearchParams();
      formData.append("email", waitlistData.email);
      formData.append("referralCode", waitlistData.referralCode || "");
      formData.append("timestamp", new Date().toISOString());
      formData.append("eventType", "waitlist_signup");

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow", // Follow redirects automatically
      });

      if (!response.ok) {
        throw new Error("Failed to submit to waitlist");
      }

      // Get the response as text first to see what we're actually getting
      const responseText = await response.text();
      console.log("Raw response from Google Sheets:", responseText);

      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        console.log("Response was not JSON, but submission likely succeeded");
        return { success: true };
      }
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
      throw error;
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
      const GOOGLE_SHEET_URL =
        import.meta.env.VITE_GOOGLE_SHEET_URL ||
        "https://script.google.com/macros/s/AKfycbxkHY053w1TXg4IYmMXL2w0zCfhRwdr-pqANjbJC-DHRPBTZ7NGcYaEHzXnuW7v9xM-/exec";

      // Send as URL-encoded form data
      const formData = new URLSearchParams();
      formData.append("email", paymentData.email);
      formData.append("tier", paymentData.tier);
      formData.append("paymentMethod", paymentData.paymentMethod);
      formData.append("amount", paymentData.amount.toString());
      formData.append("transactionId", paymentData.transactionId || "");
      formData.append("timestamp", new Date().toISOString());
      formData.append("eventType", "payment_success");

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Failed to track payment");
      }

      const responseText = await response.text();
      console.log("Raw response from Google Sheets:", responseText);

      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        console.log("Response was not JSON, but submission likely succeeded");
        return { success: true };
      }
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
      throw error;
    }
  },

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
    try {
      console.log("Analytics disabled:", funnelData);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
    }
  },
};
