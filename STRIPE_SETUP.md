# Stripe Integration Setup Guide

Your Stripe payment integration has been successfully implemented! Here's what you need to do to complete the setup.

## 🚀 What's Been Implemented

### Backend (Server)

- ✅ Stripe configuration with subscription plans
- ✅ API endpoints for checkout sessions, customer portal, and webhooks
- ✅ £29.99/month subscription plan
- ✅ Webhook handling for payment events

### Frontend (Client)

- ✅ Updated payment page with real Stripe integration
- ✅ Subscription page with plan display
- ✅ Payment success and cancellation pages
- ✅ Stripe Checkout redirect flow

## 🔧 Setup Instructions

### 1. Create Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete your account setup
3. Go to your Stripe Dashboard

### 2. Get Your API Keys

1. In your Stripe Dashboard, go to **Developers** → **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3. Set Up Environment Variables

Create a `.env` file in your project root and add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. Set Up Webhooks (For Production)

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://yourdomain.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy the webhook signing secret to your `.env` file

### 5. Update Product Details

In `/server/stripe.ts`, you can modify the subscription plan:

```typescript
export const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Holding Health Membership",
    price: 2999, // £29.99 in pence
    currency: "gbp",
    interval: "month",
    description: "Unlimited access to all healthcare providers",
  },
};
```

## 🧪 Testing

### Test with Stripe Test Cards

Use these test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Test Flow

1. Start the development server: `npm run dev`
2. Go to `/subscribe` to test the subscription flow
3. Go to `/get-started` and complete the flow to test the integrated payment
4. Use test card numbers for payments

## 📱 User Flow

### Subscription Flow

1. User visits `/subscribe`
2. Clicks "Get Started" → Redirects to Stripe Checkout
3. Completes payment → Redirects to `/payment/success`
4. Success page confirms membership activation

### Integrated Flow

1. User completes care assessment at `/get-started`
2. Proceeds to payment page
3. Clicks "Subscribe Now" → Redirects to Stripe Checkout
4. Completes payment → Redirects to `/payment/success`

## 🔄 Key Routes

- `/subscribe` - Standalone subscription page
- `/payment/success` - Payment success confirmation
- `/payment/cancelled` - Payment cancellation page
- `/api/stripe/plans` - Get available subscription plans
- `/api/stripe/create-checkout-session` - Create payment session
- `/api/stripe/webhook` - Handle Stripe webhook events

## 💡 Next Steps

1. **Set up your Stripe account and get API keys**
2. **Create your `.env` file with the keys**
3. **Test the payment flow with test cards**
4. **Set up webhooks for production**
5. **Customize the subscription plan if needed**

## 🛠 Customization

### Adding More Plans

You can add multiple subscription tiers by extending the `SUBSCRIPTION_PLANS` object in `/server/stripe.ts`.

### Customizing Success Page

The success page at `/client/src/pages/stripe-success.tsx` can be customized with your branding and next steps.

### Analytics

Payment events are automatically tracked in your analytics system via the webhook handler.

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use test keys for development, live keys only for production
- Webhook endpoints should validate the signature for security
- All prices are stored in the smallest currency unit (pence for GBP)

Your Stripe integration is now ready! Just add your API keys and start testing. 🎉
