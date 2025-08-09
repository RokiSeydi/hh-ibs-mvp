import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Star, Users, Heart, CreditCard, Shield } from "lucide-react";
import { createAmbassadorSetup } from "../lib/stripe";
import ApplePayButton from "./apple-pay-button";

interface AmbassadorSignupProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function AmbassadorSignup({
  onBack,
  onComplete,
}: AmbassadorSignupProps) {
  const [currentStep, setCurrentStep] = useState<'application' | 'payment'>('application');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    socialHandle: "",
    platform: "",
    followerCount: "",
    contentStyle: "",
    whyAmbassador: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingName: "",
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use the new Stripe helper for ambassador setup
      await createAmbassadorSetup(formData);
      onComplete();
    } catch (error) {
      console.error("Card save failed:", error);
      alert("Failed to save payment method. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitalWalletSuccess = async (paymentMethod: any) => {
    setIsLoading(true);
    
    try {
      // Save the digital wallet payment method for future charging
      await createAmbassadorSetup({
        ...formData,
        paymentMethod: paymentMethod,
        paymentType: 'digital_wallet'
      });
      onComplete();
    } catch (error) {
      console.error("Digital wallet setup failed:", error);
      alert("Setup failed. Please try the card form below.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitalWalletError = (error: any) => {
    console.error("Digital wallet error:", error);
    alert("Setup failed. Please try the card form below.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={currentStep === 'application' ? onBack : () => setCurrentStep('application')} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentStep === 'application' ? 'Become an Ambassador' : 'Save Payment Method'}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentStep === 'application' 
                ? 'Join our community and get 3 months free!'
                : 'We\'ll save your card and charge when your free period ends'
              }
            </p>
          </div>
        </div>

        {currentStep === 'application' ? (
          <>
            <Card className="mb-6 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Star className="w-5 h-5 mr-2" />
                  Ambassador Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-pink-500" />
                    <span>3 months free access</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Exclusive ambassador community</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Early access to new features</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tell us about yourself</CardTitle>
                <CardDescription>
                  Help us understand your social presence and content style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Social Media Handle
                  </label>
                  <Input
                    placeholder="@yourusername"
                    value={formData.socialHandle}
                    onChange={(e) =>
                      setFormData({ ...formData, socialHandle: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Primary Platform
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    required
                  >
                    <option value="">Select platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Approximate Follower Count
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.followerCount}
                  onChange={(e) =>
                    setFormData({ ...formData, followerCount: e.target.value })
                  }
                  required
                >
                  <option value="">Select range</option>
                  <option value="under-1k">Under 1,000</option>
                  <option value="1k-5k">1,000 - 5,000</option>
                  <option value="5k-10k">5,000 - 10,000</option>
                  <option value="10k-50k">10,000 - 50,000</option>
                  <option value="50k-100k">50,000 - 100,000</option>
                  <option value="100k-plus">100,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Content Style/Niche
                </label>
                <Input
                  placeholder="e.g., wellness, lifestyle, mental health, spirituality..."
                  value={formData.contentStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, contentStyle: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Why do you want to become an ambassador?
                </label>
                <Textarea
                  placeholder="Tell us about your passion for wellness and how you'd like to help others..."
                  value={formData.whyAmbassador}
                  onChange={(e) =>
                    setFormData({ ...formData, whyAmbassador: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                Continue to Payment Setup
              </Button>
            </form>
          </CardContent>
        </Card>
        </>
        ) : (
          // Payment Step
          <>
            <Card className="mb-6 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Shield className="w-5 h-5 mr-2" />
                  Secure Payment Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-purple-700">
                  <p className="mb-2">✅ 3 months completely FREE</p>
                  <p className="mb-2">✅ No charges until month 4</p>
                  <p>✅ Cancel anytime during free period</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  We'll securely save your card and only charge £30/month starting in month 4
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Apple Pay / Google Pay Section */}
                <div className="mb-6">
                  <ApplePayButton
                    amount={0} // £0 for card saving
                    label="Save Payment for Ambassador Program"
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
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="Full name on card"
                      value={formData.billingName}
                      onChange={(e) => setFormData({ ...formData, billingName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      <h4 className="font-semibold text-green-800">Your Billing Schedule</h4>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Today: Card saved securely (£0 charged)</li>
                      <li>• Months 1-3: Completely FREE</li>
                      <li>• Month 4+: £30/month (cancel anytime)</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving Card..." : "Save Card & Complete Application"}
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
