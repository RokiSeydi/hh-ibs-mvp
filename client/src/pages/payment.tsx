import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Shield, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import stripePromise from "@/lib/stripe";

interface PaymentPageProps {
  onBack: () => void;
  onSuccess: () => void;
  totalSavings: number;
  selectedProviders: any[];
}

export default function PaymentPage({
  onBack,
  onSuccess,
  totalSavings,
  selectedProviders,
}: PaymentPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // For MVP, we'll use a simple form + Stripe Checkout redirect
  // This removes ALL friction while still being secure
  const handlePayment = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you'd call your backend to create a Stripe Checkout session
      // For now, let's simulate the payment flow

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll redirect to success immediately
      // In production, this would redirect to Stripe Checkout
      onSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const membershipPrice = 29; // £29/month for MVP

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">💳</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Holding Health
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Get unlimited access to all wellness services + we'll book
            everything for you
          </p>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6" />
                <h2 className="text-xl font-bold">What You Get Today</h2>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>
                    Access to all {selectedProviders.length} services you
                    selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>We book and manage all your appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Unlimited access to 100+ other wellness services</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Cancel anytime, no contracts</span>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold mb-1">
                  Save £{totalSavings} Today
                </div>
                <div className="text-sm opacity-90">
                  Your selected services would cost £
                  {totalSavings + membershipPrice} elsewhere
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Complete Your Membership
              </h3>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll send your booking confirmations here
                </p>
              </div>

              {/* Pricing Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>Holding Health Membership</span>
                  <span className="font-semibold">
                    £{membershipPrice}/month
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Services you selected (market value)</span>
                  <span>£{totalSavings + membershipPrice}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-bold text-green-600">
                    <span>You Save Today</span>
                    <span>£{totalSavings}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay £${membershipPrice}/month - Start Today`
                )}
              </Button>

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Secured by Stripe • Cancel anytime</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>When do I get charged?</strong>
                  <p className="text-gray-600">
                    Today, then monthly. Cancel anytime.
                  </p>
                </div>
                <div>
                  <strong>How do bookings work?</strong>
                  <p className="text-gray-600">
                    We handle everything! You'll get confirmation emails within
                    24 hours.
                  </p>
                </div>
                <div>
                  <strong>What if I don't like a service?</strong>
                  <p className="text-gray-600">
                    No worries! Try something else or we'll help you find
                    alternatives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to recommendations
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
