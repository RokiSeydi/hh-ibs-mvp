import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");
export default stripePromise;

// API function for ambassador setup
export async function createAmbassadorSetup(formData: any) {
  try {
    const response = await fetch("/api/create-ambassador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Setup failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Ambassador setup failed:", error);
    throw error;
  }
}

// API function for feedback subscription
export async function createFeedbackSubscription(formData: any) {
  try {
    const response = await fetch("/api/create-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Subscription failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Feedback subscription failed:", error);
    throw error;
  }
}
