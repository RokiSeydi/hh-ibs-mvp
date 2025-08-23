import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ReactConfetti from "react-confetti";

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
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [freeSessionIndex] = useState(() => {
    // Always make the yoga session free if it exists, otherwise random
    const yogaIndex = providers.findIndex(
      (p) =>
        p.title.toLowerCase().includes("yoga") ||
        p.description.toLowerCase().includes("yoga")
    );
    return yogaIndex >= 0
      ? yogaIndex
      : Math.floor(Math.random() * providers.length);
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

  // Handle reveal with confetti
  const handleReveal = useCallback(() => {
    setIsRevealed(true);
    setShowConfetti(true);
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={["#9333EA", "#2563EB", "#EC4899", "#8B5CF6"]}
          gravity={0.2}
        />
      )}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Personalized Care Plan
        </h2>
        <p className="text-gray-600 text-lg">
          {isRevealed
            ? `Congratulations! You've unlocked a free care gift 🎉`
            : `You've selected ${providers.length} amazing recommendations`}
        </p>
        {!isRevealed && (
          <motion.button
            onClick={handleReveal}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Reveal Your Gift
            </span>
          </motion.button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            className={`bg-white rounded-2xl p-6 shadow-xl transition-all duration-300 cursor-pointer group border ${
              isRevealed && index === freeSessionIndex
                ? "border-2 border-purple-500"
                : "border-gray-100"
            }`}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isRevealed ? 0 : 180,
              scale: isRevealed && index === freeSessionIndex ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`flex items-start space-x-4 ${
                !isRevealed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <div className="flex items-center justify-center">
                <div className="text-4xl">{provider.image}</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {provider.title}
                  </h3>
                  {isRevealed && index === freeSessionIndex && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full font-medium"
                    >
                      Thsi is on us!
                    </motion.span>
                  )}
                </div>
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
            {isRevealed && index === freeSessionIndex && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email to claim your free session"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
                  >
                    Claim Your Gift
                  </motion.button>
                </form>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={onStartOver}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
        >
          ← Start Over
        </button>
      </div>
    </div>
  );
};

export default SelectedRecommendations;
