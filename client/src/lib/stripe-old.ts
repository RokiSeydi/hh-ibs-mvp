import { loadStripe } from "@stripe/stripe-js";

// This is your test publishable API key.
// In production, replace with your live publishable key
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Only load Stripe if we have a real publishable key
const stripePromise =
  publishableKey && publishableKey.startsWith("pk_")
    ? loadStripe(publishableKey)
    : null;

export default stripePromise;

// Check if Apple Pay is available
export const isApplePayAvailable = async () => {
  const stripe = await stripePromise;
  if (!stripe) return false;

  try {
    const paymentRequest = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: { label: "Test", amount: 100 },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const result = await paymentRequest.canMakePayment();
    return result && result.applePay;
  } catch (error) {
    console.log("Apple Pay check failed:", error);
    return false;
  }
};

// Check if Google Pay is available
export const isGooglePayAvailable = async () => {
  const stripe = await stripePromise;
  if (!stripe) return false;

  try {
    const paymentRequest = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: { label: "Test", amount: 100 },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const result = await paymentRequest.canMakePayment();
    return result && result.googlePay;
  } catch (error) {
    console.log("Google Pay check failed:", error);
    return false;
  }
};

// Check if any digital wallet is available
export const isDigitalWalletAvailable = async () => {
  const stripe = await stripePromise;
  if (!stripe) return false;

  try {
    const paymentRequest = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: { label: "Test", amount: 100 },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const result = await paymentRequest.canMakePayment();
    return !!result;
  } catch (error) {
    console.log("Digital wallet check failed:", error);
    return false;
  }
};

// Create payment request for Apple Pay / Google Pay
export const createPaymentRequest = async (amount: number, label: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error("Stripe not loaded");

  return stripe.paymentRequest({
    country: "GB",
    currency: "gbp",
    total: {
      label: label,
      amount: amount, // amount in pence
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });
};

// Billing strategy helpers
// API function for ambassador setup
export async function createAmbassadorSetup(formData: any) {
  try {
    const response = await fetch('/api/create-ambassador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Setup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Ambassador setup failed:', error);
    throw error;
  }
}

// API function for feedback subscription
export async function createFeedbackSubscription(formData: any) {
  try {
    const response = await fetch('/api/create-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Subscription failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Feedback subscription failed:', error);
    throw error;
  }
}

export const createFeedbackSubscription = async (formData: any) => {
  // For feedback members: Charge £15 immediately, bump to £30 in month 4
  try {
    const response = await fetch("/api/create-feedback-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        billingType: "immediate-charge-with-increase",
        initialAmount: 1500, // £15 in pence
        recurringAmount: 3000, // £30 in pence
        discountMonths: 3,
      }),
    });

    // Handle Safari-specific response parsing
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails (Safari issue), throw a generic error
        throw new Error(`HTTP ${response.status}: Failed to process payment`);
      }
      throw new Error(errorData.error || errorData.details || 'Payment processing failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Feedback subscription failed:", error);
    // Re-throw with a cleaner error message for Safari
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Payment processing failed. Please try again.');
    }
  }
};

export const createWaitlistEntry = async (formData: any) => {
  // For waitlist: No payment required
  try {
    const response = await fetch("/api/create-waitlist-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        billingType: "no-payment",
        status: "waitlist",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Waitlist entry failed:", error);
    throw error;
  }
};
