import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise =
  publishableKey && publishableKey.startsWith("pk_")
    ? loadStripe(publishableKey)
    : null;

interface SubscriptionPlan {
  name: string;
  price: number;
  interval: string;
  currency: string;
  description: string;
  features: string[];
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Record<string, SubscriptionPlan>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch subscription plans
    fetch("/api/stripe/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data.plans))
      .catch((err) => console.error("Failed to load plans:", err));
  }, []);

  const handleSubscribe = async (planKey: string) => {
    if (!stripePromise) {
      setError("Stripe is not properly configured");
      return;
    }

    setLoading(planKey);
    setError(null);

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planKey,
          customerEmail: null, // Could get from user state if logged in
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  if (Object.keys(plans).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="/logo.png"
                  alt="Holding Health Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Holding Health
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all our carefully vetted providers for one
            simple monthly fee.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <Card
              key={key}
              className="relative overflow-hidden border-2 border-blue-200"
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-100 text-blue-800">
                  Most Popular
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    £{(plan.price / 100).toFixed(2)}
                  </span>
                  <span className="text-gray-500">per {plan.interval}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(key)}
                  disabled={loading === key}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                >
                  {loading === key ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {stripePromise
                        ? "Get Started"
                        : "Demo Mode - Add Stripe Keys"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {!stripePromise && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Add your Stripe keys to .env.local to enable payments
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What you get with membership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💆</span>
              </div>
              <h3 className="font-semibold mb-2">Premium Wellness</h3>
              <p className="text-gray-600 text-sm">
                Access to top-rated spas, massage therapy, and wellness
                treatments
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold mb-2">Mental Health Support</h3>
              <p className="text-gray-600 text-sm">
                Therapy sessions, coaching calls, and mental health resources
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Creative Activities</h3>
              <p className="text-gray-600 text-sm">
                Art therapy, workshops, and unique experiences for personal
                growth
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your current billing
                period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How do I book appointments?
              </h3>
              <p className="text-gray-600">
                Once you're a member, you can browse providers and book
                appointments directly through our platform. We'll handle all the
                coordination.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What if I don't use my membership?
              </h3>
              <p className="text-gray-600">
                There's no pressure to use every service. Your membership gives
                you access whenever you need it, making healthcare stress-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
