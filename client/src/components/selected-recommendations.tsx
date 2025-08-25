import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ReactConfetti from "react-confetti";
import { analytics } from "../lib/client-analytics";
import { useLocation } from "wouter";

interface Provider {
  id: number;
  title: string;
  description: string;
  location: string;
  availability: string;
  image: string;
  whyRecommended: string;
}

interface SelectedRecommendationsProps {
  providers: Provider[];
  onStartOver: () => void;
}

const SelectedRecommendations: React.FC<SelectedRecommendationsProps> = ({
  providers,
  onStartOver,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [freeSessionIndex] = useState(() => {
    // Randomly select an activity to be free
    return Math.floor(Math.random() * providers.length);
  });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add warning when leaving page during submission
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        const message =
          "Your submission is still processing. Are you sure you want to leave?";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitting]);

  // Handle reveal with confetti
  const handleReveal = useCallback(() => {
    setIsRevealed(true);
    setShowConfetti(true);
    // Stop confetti after 12 seconds for a longer celebration
    setTimeout(() => {
      setShowConfetti(false);
    }, 12000);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          recycle={true}
          colors={["#9333EA", "#2563EB", "#EC4899", "#8B5CF6"]}
          gravity={0.07}
          wind={0.08}
          initialVelocityX={20}
          initialVelocityY={-5}
          friction={0.97}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
          opacity={0.8}
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              ctx.lineTo(
                10 * Math.cos((2 * Math.PI * i) / 6),
                10 * Math.sin((2 * Math.PI * i) / 6)
              );
            }
            ctx.closePath();
            ctx.fill();
          }}
        />
      )}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Proud of you ✨
        </h2>
        <p className="text-gray-600 text-lg mb-2">
          {isRevealed
            ? `🎉 Congratulations! We have already paid for this care, so you get to enjoy it fully.`
            : `This is what it feels like to choose the care that’s right for you.`}
          {/* : `We've carefully selected ${providers.length} recommendations perfect for your needs`} */}
        </p>
        {!isRevealed && (
          <>
            <p className="text-purple-600 text-sm mb-4">
              But hey — actions speak louder than cards, so we’ve got a little
              something for you...
            </p>
            <motion.button
              onClick={handleReveal}
              className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Click here to see what it is 👀
              </span>
            </motion.button>
          </>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            className={`bg-white rounded-2xl p-6 shadow-xl transition-all duration-300 relative ${
              isRevealed && index === freeSessionIndex
                ? "border-2 border-purple-500 shadow-2xl"
                : isRevealed
                ? "opacity-50 filter blur-[2px]"
                : "border border-gray-100"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isRevealed && index === freeSessionIndex ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center">
                <div className="text-4xl">{provider.image}</div>
              </div>
              <div className="flex-1">
                {isRevealed && index === freeSessionIndex && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full font-medium mb-2"
                  >
                    UH LALA! THIS ONE IS ON US!! 🤩
                  </motion.span>
                )}
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {provider.title}
                </h3>
                <p className="text-gray-600 mb-2">{provider.description}</p>
                <div className="text-xs text-gray-400 mb-1">
                  {provider.location} • {provider.availability}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  <span className="font-semibold">Why:</span>{" "}
                  {provider.whyRecommended}
                </div>
              </div>
            </div>
            {isRevealed && index === freeSessionIndex && !emailSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    try {
                      console.log("Starting form submission...");
                      const startTime = Date.now();

                      // Track both form submission and payment in one request
                      // Show success message as soon as the request is sent
                      setEmailSubmitted(true);
                      setShowFeedback(true);

                      const result = await analytics.trackFormSubmission({
                        firstName: "",
                        lastName: "",
                        email: email,
                        reason: `Claimed free session for ${provider.title}`,
                        // Add payment tracking data
                        tier: "free_session",
                        paymentMethod: "voucher",
                        amount: "0",
                        transactionId: `voucher_${Date.now()}`,
                        eventType: "voucher_claim",
                      });

                      console.log(
                        `Form submission took ${Date.now() - startTime}ms`
                      );

                      // If submission failed, revert the UI state
                      if (!result?.success) {
                        setEmailSubmitted(false);
                        setShowFeedback(false);
                        throw new Error("Form submission failed");
                      }
                    } catch (error) {
                      console.error("Failed to process voucher:", error);
                      // Show error message to user
                      alert(
                        "There was a problem saving your email. Please try again!"
                      );
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to claim your gift"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send it already 😭"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
            {isRevealed && index === freeSessionIndex && emailSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-gray-100 text-center"
              >
                <p className="text-green-600 font-medium">
                  ✨ Thanks for claiming your free session!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  We'll reach out within 24 hours with your voucher details!
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg text-center"
        >
          <h3 className="text-lg font-semibold mb-4">
            How was your experience?
          </h3>
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600"
            >
              Thanks for your feedback! 🙏
            </motion.p>
          )}
        </motion.div>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            onStartOver();
            window.location.href = "/";
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default SelectedRecommendations;
