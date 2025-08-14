import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ArrowLeft,
  MessageCircle,
  Loader2,
  Star,
  DollarSign,
  CreditCard,
  Shield,
} from "lucide-react";
import { createFeedbackSubscription } from "../lib/stripe";
import { analytics } from "../lib/client-analytics";
import ApplePayButton from "./apple-pay-button";

interface FeedbackSignupProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function FeedbackSignup({
  onBack,
  onComplete,
}: FeedbackSignupProps) {
  const [currentStep, setCurrentStep] = useState<"application" | "payment">(
    "application"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    experienceLevel: "",
    interests: "",
    feedbackStyle: "",
    availability: "",
    whyFeedback: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingName: "",
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track feedback application
    await analytics.trackFeedbackApplication({
      email: formData.email,
      experienceLevel: formData.experienceLevel,
      interests: formData.interests,
      feedbackStyle: formData.feedbackStyle,
      availability: formData.availability,
      whyFeedback: formData.whyFeedback,
    });

    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate and format card data for Safari compatibility
      const cardNumber = formData.cardNumber.replace(/\s/g, ''); // Remove spaces
      const expiryDate = formData.expiryDate.replace(/\D/g, ''); // Keep only digits
      const cvv = formData.cvv.replace(/\D/g, ''); // Keep only digits

      // Basic validation
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        throw new Error('Invalid card number length');
      }
      if (expiryDate.length !== 4) {
        throw new Error('Invalid expiry date format');
      }
      if (cvv.length < 3 || cvv.length > 4) {
        throw new Error('Invalid CVV length');
      }

      // Log for mobile debugging
      console.log('Mobile payment attempt:', {
        userAgent: navigator.userAgent,
        formData: { ...formData, cardNumber: '****', cvv: '***' },
        timestamp: new Date().toISOString(),
        browser: navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'
      });

      // Create sanitized form data
      const sanitizedFormData = {
        ...formData,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        billingName: formData.billingName.trim(),
        email: formData.email.trim().toLowerCase(),
      };

      // Use the new Stripe helper for feedback subscription
      await createFeedbackSubscription(sanitizedFormData);

      // Track payment success
      await analytics.trackPaymentSuccess({
        email: formData.email,
        tier: "feedback",
        paymentMethod: "card_charge",
        amount: 15, // £15 for feedback tier
        transactionId: "feedback_subscription",
      });

      onComplete();
    } catch (error) {
      console.error("Payment failed:", error);
      console.error("Mobile error details:", {
        error: error,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // More user-friendly error messages
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('Invalid card') || errorMessage.includes('pattern')) {
        alert("Please check your card details and try again.");
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert("Payment failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitalWalletSuccess = async (paymentMethod: any) => {
    setIsLoading(true);

    try {
      // Process the digital wallet payment
      await createFeedbackSubscription({
        ...formData,
        paymentMethod: paymentMethod,
        paymentType: "digital_wallet",
      });
      onComplete();
    } catch (error) {
      console.error("Digital wallet payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitalWalletError = (error: any) => {
    console.error("Digital wallet error:", error);
    alert("Payment failed. Please try the card form below.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={
              currentStep === "application"
                ? onBack
                : () => setCurrentStep("application")
            }
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {currentStep === "application"
                ? "VIP Feedback Member"
                : "Complete Your Subscription"}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentStep === "application"
                ? "Help us improve and save 50% for 3 months!"
                : "Start your discounted membership at £15/month"}
            </p>
          </div>
        </div>

        {currentStep === "application" ? (
          <>
            <Card className="mb-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Star className="w-5 h-5 mr-2" />
                  VIP Member Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    <span>50% off for 3 months</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Direct feedback channel</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Shape the future of the platform</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Join our VIP Feedback Program</CardTitle>
                <CardDescription>
                  We value your insights and want to create the best experience
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Experience with wellness platforms
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceLevel: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">
                        New to wellness platforms
                      </option>
                      <option value="some">
                        Some experience with wellness apps
                      </option>
                      <option value="experienced">
                        Very experienced with wellness platforms
                      </option>
                      <option value="professional">
                        Work in wellness/healthcare industry
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Primary wellness interests
                    </label>
                    <Input
                      placeholder="e.g., therapy, meditation, fitness, nutrition, spiritual guidance..."
                      value={formData.interests}
                      onChange={(e) =>
                        setFormData({ ...formData, interests: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred feedback style
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.feedbackStyle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          feedbackStyle: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">
                        How would you like to provide feedback?
                      </option>
                      <option value="surveys">
                        Quick surveys after sessions
                      </option>
                      <option value="interviews">
                        Monthly video interviews
                      </option>
                      <option value="written">Detailed written feedback</option>
                      <option value="mixed">Mix of all methods</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time availability for feedback
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">How much time can you dedicate?</option>
                      <option value="5-10-min">
                        5-10 minutes after each session
                      </option>
                      <option value="15-30-min">15-30 minutes weekly</option>
                      <option value="30-60-min">30-60 minutes monthly</option>
                      <option value="flexible">
                        Flexible based on the request
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Why are you interested in providing feedback?
                    </label>
                    <Textarea
                      placeholder="Tell us what motivates you to help improve wellness platforms..."
                      value={formData.whyFeedback}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whyFeedback: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Your VIP Pricing
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 line-through">
                          Regular: £30/month
                        </p>
                        <p className="text-xl font-bold text-blue-700">
                          VIP: £15/month
                        </p>
                        <p className="text-xs text-blue-600">
                          For the first 3 months
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          You save £45!
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      "Continue to Payment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          // Payment Step
          <>
            <Card className="mb-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Your VIP Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-700">
                  <p className="mb-2">
                    ✅ £15/month for first 3 months (50% off)
                  </p>
                  <p className="mb-2">
                    ✅ Automatically increases to £30/month in month 4
                  </p>
                  <p>✅ Cancel anytime</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complete Your Subscription</CardTitle>
                <CardDescription>
                  Your first payment of £15 will be charged today
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Apple Pay / Google Pay Section */}
                <div className="mb-6">
                  <ApplePayButton
                    amount={1500} // £15 in pence
                    label="VIP Feedback Membership"
                    onSuccess={handleDigitalWalletSuccess}
                    onError={handleDigitalWalletError}
                    disabled={isLoading}
                  />
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Full name on card"
                      value={formData.billingName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          billingName: e.target.value,
                        })
                      }
                      required
                      autoComplete="cc-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        // Format card number with spaces for better UX
                        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                        value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add spaces every 4 digits
                        if (value.length <= 19) { // Max length with spaces
                          setFormData({ ...formData, cardNumber: value });
                        }
                      }}
                      required
                      autoComplete="cc-number"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          // Format expiry date
                          let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          if (value.length <= 5) {
                            setFormData({ ...formData, expiryDate: value });
                          }
                        }}
                        required
                        autoComplete="cc-exp"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => {
                          // Only allow numeric input
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            setFormData({ ...formData, cvv: value });
                          }
                        }}
                        required
                        autoComplete="cc-csc"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">
                        Your Billing Schedule
                      </h4>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Today: £15 charged (discounted rate)</li>
                      <li>• Months 2-3: £15/month</li>
                      <li>• Month 4+: £30/month (regular rate)</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing Payment...
                      </div>
                    ) : (
                      "Complete Subscription - £15"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </motion.div>
    </div>
  );
}
