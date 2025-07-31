import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CareSuggestions from "@/components/care-suggestions";

export default function CareAssistant() {
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState<"input" | "response" | "suggestions">("input");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep("response");
    
    // After 2 seconds, show suggestions
    setTimeout(() => {
      setCurrentStep("suggestions");
      setIsSubmitting(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 px-4">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="h-8 w-8 care-coral mr-3 fill-current" />
          </motion.div>
          <h1 className="text-3xl font-semibold text-gray-800">Care Assistant</h1>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
          >
            <Heart className="h-8 w-8 care-coral ml-3 fill-current" />
          </motion.div>
        </div>
        <p className="text-gray-600 font-light">We're here to support you through anything 💜</p>
      </motion.div>

      {/* Input Section */}
      <AnimatePresence>
        {currentStep === "input" && (
          <motion.div 
            className="w-full max-w-2xl mb-8"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... we're here to listen and help 💙"
                className="w-full p-6 text-lg bg-white rounded-2xl shadow-lg border-0 focus:outline-none focus:ring-0 resize-none h-32 transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02]"
                style={{ boxShadow: "0 4px 20px rgba(139, 127, 207, 0.08)" }}
              />
              <Button 
                onClick={handleSubmit}
                disabled={!userInput.trim() || isSubmitting}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-[var(--care-purple)] to-[var(--care-blue)] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response Message */}
      <AnimatePresence>
        {currentStep === "response" && (
          <motion.div 
            className="w-full max-w-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.8, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-[var(--care-purple)] to-[var(--care-blue)] text-white p-6 rounded-2xl shadow-lg text-center">
              <Heart className="h-6 w-6 mx-auto mb-3 fill-current" />
              <p className="text-lg font-medium">Girl, I feel you. Sorry to hear that but we got you, here's what we recommend</p>
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

      {/* Care Suggestions */}
      <AnimatePresence>
        {currentStep === "suggestions" && (
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
              Personalized Care Recommendations
            </motion.h2>
            <CareSuggestions />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p>Remember: You're not alone, and it's okay to ask for help 💜</p>
      </motion.div>
    </div>
  );
}
