// Client-side analytics helper (temporarily disabled for MVP)
export const analytics = {
  trackFormSubmission: async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    reason: string;
  }) => {
    try {
      console.log("Analytics disabled:", formData);
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
      // Track the event using Vercel Analytics
      const eventData = {
        name: 'waitlist_signup',
        email: waitlistData.email,
        referralCode: waitlistData.referralCode,
        timestamp: new Date().toISOString()
      };
      
      // Log to console for debugging
      console.log("📊 Tracking waitlist signup:", eventData);
      
      // Send to Vercel Analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('event', eventData);
      }
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
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
      console.log("Analytics disabled:", paymentData);
    } catch (error) {
      console.error("❌ Analytics tracking failed:", error);
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
  }
};
