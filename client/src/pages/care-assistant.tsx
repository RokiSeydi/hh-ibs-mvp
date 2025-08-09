import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import SwipeCards from "../components/swipe-cards";
import SelectedRecommendations from "../components/selected-recommendations";
import IntakeForm from "../components/intake-form";
import ThankYou from "./thank-you";
import PaymentPage from "./payment";
import ProgramSuccess from "./program-success";
import AmbassadorSignup from "../components/ambassador-signup";
import FeedbackSignup from "../components/feedback-signup";
import { type Provider } from "../data/providers";

interface IntakeFormData {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
}

const getResponseMessage = (reason: string): string => {
  const messages = {
    "going-through-something":
      "We're sorry you're going through a tough time, but we got you. Let's find some support. 💔",
    "just-curious":
      "Love that you're exploring! Let's see what catches your eye. 👀",
    "spiritual-glow-up":
      "Yes! Ready to level up your spiritual game? Let's glow together! 🧘🏾✨",
    "here-for-chicken":
      "Haha, we appreciate the honesty! Let's see what we can find (spoiler: no actual chicken, but lots of good vibes) 😂",
  };

  return (
    messages[reason as keyof typeof messages] ||
    "We're here to support you. Let's find what you need! 💜"
  );
};

export default function CareAssistant() {
  const [formData, setFormData] = useState<IntakeFormData | null>(null);
  const [currentStep, setCurrentStep] = useState<
    | "input"
    | "response"
    | "swiping"
    | "results"
    | "thank-you"
    | "payment"
    | "payment-success"
    | "ambassador-signup"
    | "feedback-signup"
  >("input");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [programType, setProgramType] = useState<
    "ambassador" | "feedback" | "payment" | "waitlist"
  >("payment");

  const handleFormSubmit = async (data: IntakeFormData) => {
    setFormData(data);
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentStep("response");

    // After 2 seconds, show swiping interface
    setTimeout(() => {
      setCurrentStep("swiping");
      setIsSubmitting(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // This function is no longer needed with the form
  };

  const handleProviderSelection = (providers: Provider[]) => {
    setSelectedProviders(providers);
    setCurrentStep("results");
  };

  const handleStartOver = () => {
    setFormData(null);
    setCurrentStep("input");
    setSelectedProviders([]);
    setIsSubmitting(false);
  };

  const handleJoinWaitlist = () => {
    setProgramType("waitlist");
    setCurrentStep("thank-you");
  };

  const handleBackFromThankYou = () => {
    setCurrentStep("results");
  };

  const handleBuyMembership = (type?: "ambassador" | "feedback" | "viral") => {
    if (type === "ambassador") {
      setProgramType("ambassador");
      setCurrentStep("ambassador-signup");
    } else if (type === "feedback") {
      setProgramType("feedback");
      setCurrentStep("feedback-signup");
    } else {
      setProgramType("payment");
      setCurrentStep("payment");
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentStep("payment-success");
  };

  const handleAmbassadorSignupComplete = () => {
    setCurrentStep("payment-success");
  };

  const handleFeedbackSignupComplete = () => {
    setCurrentStep("payment-success");
  };

  const handleBackFromPayment = () => {
    setCurrentStep("results");
  };

  const handleBackFromSignup = () => {
    setCurrentStep("results");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 px-4">
      {/* Header */}
      <motion.div
        className={`text-center mb-8 transition-all duration-500 ${
          currentStep === "swiping" ? "blur-sm opacity-30" : ""
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: currentStep === "swiping" ? 0.3 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Holding Health
          </h1>
        </div>
        <p className="text-gray-600 font-light">
          supporting your life through chronic conditions
        </p>
      </motion.div>

      {/* Input Section */}
      <AnimatePresence>
        {currentStep === "input" && (
          <IntakeForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        )}
      </AnimatePresence>

      {/* Response Message */}
      <AnimatePresence>
        {currentStep === "response" && formData && (
          <motion.div
            className="w-full max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.3, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-[var(--care-purple)] to-[var(--care-blue)] text-white p-6 rounded-2xl shadow-lg text-center">
              <Heart className="h-6 w-6 mx-auto mb-3 fill-current" />
              <p className="text-lg font-medium">
                Hey {formData.firstName}! {getResponseMessage(formData.reason)}
              </p>
              <div className="mt-4">
                <div className="inline-flex items-center space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Cards Interface */}
      <AnimatePresence>
        {currentStep === "swiping" && (
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-2xl font-semibold text-gray-800 text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Perfect Care Match
            </motion.h2>
            <SwipeCards
              onSelection={handleProviderSelection}
              userReason={formData?.reason || "going-through-something"}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Recommendations */}
      <AnimatePresence>
        {currentStep === "results" && (
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SelectedRecommendations
              providers={selectedProviders}
              onStartOver={handleStartOver}
              onJoinWaitlist={handleJoinWaitlist}
              onBuyMembership={handleBuyMembership}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Page */}
      <AnimatePresence>
        {currentStep === "thank-you" && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ThankYou onBack={handleBackFromThankYou} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Page */}
      <AnimatePresence>
        {currentStep === "payment" && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentPage
              onBack={handleBackFromPayment}
              onSuccess={handlePaymentSuccess}
              totalSavings={selectedProviders.reduce((total, provider) => {
                // Simple calculation - in real app this would match SelectedRecommendations logic
                const basePrice =
                  provider.type === "therapy"
                    ? 80
                    : provider.type === "coach"
                    ? 60
                    : provider.type === "wellness"
                    ? 50
                    : 25;
                return total + basePrice;
              }, 0)}
              selectedProviders={selectedProviders}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambassador Signup Page */}
      <AnimatePresence>
        {currentStep === "ambassador-signup" && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AmbassadorSignup
              onBack={handleBackFromSignup}
              onComplete={handleAmbassadorSignupComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Signup Page */}
      <AnimatePresence>
        {currentStep === "feedback-signup" && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackSignup
              onBack={handleBackFromSignup}
              onComplete={handleFeedbackSignupComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Success Page */}
      <AnimatePresence>
        {currentStep === "payment-success" && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProgramSuccess
              onStartOver={handleStartOver}
              selectedProviders={selectedProviders}
              programType={programType}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
