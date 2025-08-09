import { loadStripe } from "@stripe/stripe-js";

// This is your test publishable API key.
// In production, replace with your live publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51ABC123..." // Replace with your actual test key
);

export default stripePromise;

// Check if Apple Pay is available
export const isApplePayAvailable = async () => {
  const stripe = await stripePromise;
  if (!stripe) return false;
  
  return stripe.paymentRequest({
    country: 'GB',
    currency: 'gbp',
    total: { label: 'Test', amount: 100 },
    requestPayerName: true,
    requestPayerEmail: true,
  }).canMakePayment();
};

// Create payment request for Apple Pay / Google Pay
export const createPaymentRequest = async (amount: number, label: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe not loaded');

  return stripe.paymentRequest({
    country: 'GB',
    currency: 'gbp',
    total: {
      label: label,
      amount: amount, // amount in pence
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });
};

// Billing strategy helpers
export const createAmbassadorSetup = async (formData: any) => {
  // For ambassadors: Save card, charge later (month 4)
  // This would typically call your backend API
  try {
    const response = await fetch('/api/create-ambassador-setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        billingType: 'save-card-charge-later',
        freeMonths: 3,
        recurringAmount: 3000, // £30 in pence
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Ambassador setup failed:', error);
    throw error;
  }
};

export const createFeedbackSubscription = async (formData: any) => {
  // For feedback members: Charge £15 immediately, bump to £30 in month 4
  try {
    const response = await fetch('/api/create-feedback-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        billingType: 'immediate-charge-with-increase',
        initialAmount: 1500, // £15 in pence
        recurringAmount: 3000, // £30 in pence
        discountMonths: 3,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Feedback subscription failed:', error);
    throw error;
  }
};

export const createWaitlistEntry = async (formData: any) => {
  // For waitlist: No payment required
  try {
    const response = await fetch('/api/create-waitlist-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        billingType: 'no-payment',
        status: 'waitlist',
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Waitlist entry failed:', error);
    throw error;
  }
};
