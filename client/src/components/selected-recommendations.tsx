import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Play,
  Users,
  Sparkles,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useLocation } from "wouter";
import { type Provider } from "../data/providers";

interface SelectedRecommendationsProps {
  providers: Provider[];
  onStartOver: () => void;
  onJoinWaitlist: () => Promise<void> | void;
  onBuyMembership: (type?: "ambassador" | "feedback" | "viral") => Promise<void> | void;
}

// Dynamic spots remaining calculation
const getDynamicSpotsRemaining = (): number => {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const hourOfDay = now.getHours();
  const minuteOfHour = now.getMinutes();

  // Base number that changes throughout the month (starts high, goes low)
  const baseSpots = Math.max(8, 26 - dayOfMonth * 0.8);

  // Add some variation based on time of day (lower during peak hours)
  const timeVariation = hourOfDay >= 9 && hourOfDay <= 17 ? -2 : 1;

  // Add small random-seeming variation based on minutes (but deterministic)
  const minuteVariation = Math.floor(minuteOfHour / 10) * 0.5;

  const finalSpots = Math.floor(baseSpots + timeVariation + minuteVariation);

  // Ensure we stay within realistic bounds
  return Math.max(5, Math.min(26, finalSpots));
};

// Helper functions for pricing
const getOriginalMarketPrice = (provider: Provider): number => {
  // Since everything is "Free with HH", we need to estimate what users would pay elsewhere
  // Based on provider type and quality indicators

  if (provider.type === "therapy") return 80; // Therapy sessions typically £60-100
  if (provider.type === "coach") return 60; // Coaching sessions typically £40-80
  if (provider.type === "wellness" && provider.title.includes("Massage"))
    return 70; // Massage £50-90
  if (provider.type === "wellness" && provider.title.includes("Sauna"))
    return 30; // Sauna day passes £20-40
  if (provider.type === "spiritual" && provider.title.includes("Reading"))
    return 45; // Tarot/astrology £30-60
  if (provider.type === "spiritual" && provider.title.includes("Faith"))
    return 50; // Spiritual guidance £40-60
  if (provider.type === "activity" && provider.title.includes("Pottery"))
    return 25; // Art classes £15-35
  if (provider.type === "activity" && provider.title.includes("Dinner"))
    return 15; // Social events £10-20
  if (provider.type === "activity" && provider.title.includes("Puppy"))
    return 15; // Animal therapy £10-20
  if (provider.type === "activity" && provider.title.includes("Smash"))
    return 20; // Rage rooms £15-25
  if (provider.type === "selfcare") return 35; // Beauty/self-care £25-45
  if (provider.type === "support") return 0; // Support materials often free
  if (provider.type === "wellness") return 20; // General wellness £15-30

  return 25; // Default fallback
};

const calculateTotalSavings = (
  providers: Provider[]
): { original: number; discounted: number; savings: number } => {
  let originalTotal = 0;
  const discountedTotal = 0; // Everything is free with HH

  providers.forEach((provider) => {
    // Use the actual retailPrice from the provider data
    const retailPriceString = provider.retailPrice;
    const retailPriceNumber = parseFloat(retailPriceString.replace("£", ""));
    originalTotal += retailPriceNumber;
  });

  return {
    original: originalTotal,
    discounted: discountedTotal,
    savings: originalTotal, // Full original total is the savings
  };
};

export default function SelectedRecommendations({
  providers,
  onStartOver,
  onJoinWaitlist,
  onBuyMembership,
}: SelectedRecommendationsProps) {
  const [, setLocation] = useLocation();
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const totalSavings = calculateTotalSavings(providers);
  const spotsRemaining = getDynamicSpotsRemaining();

  const handleMembershipClick = async (type: "ambassador" | "feedback" | "viral") => {
    setLoadingType(type);
    try {
      await onBuyMembership(type);
    } finally {
      setLoadingType(null);
    }
  };

  const handleWaitlistClick = async () => {
    setLoadingType("waitlist");
    try {
      await onJoinWaitlist();
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Personalized Care Plan
        </h2>
        <p className="text-gray-600 text-lg">
          Here are the {providers.length} recommendations you selected
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {providers.map((provider, index) => {
          return (
            <motion.div
              key={provider.id}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start space-x-4">
                {/* Emoji only */}
                <div className="flex items-center justify-center">
                  <div className="text-4xl">{provider.image}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {provider.title}
                    </h3>
                    <h4 className="text-base font-semibold text-gray-700">
                      {provider.name}
                    </h4>
                  </div>

                  {/* Rating and location */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">
                        {provider.socialCredential}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="text-xs">{provider.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                    {provider.description}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{provider.availability}</span>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                          Included with HH
                        </span>
                        <div className="text-sm font-bold text-blue-600">
                          {provider.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Savings Summary with Urgency */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center">
          <div className="bg-red-100 border border-red-200 rounded-lg px-3 py-2 mb-4 inline-block">
            <span className="text-red-700 font-semibold text-sm">
              🔥 Almost Sold Out - Only {spotsRemaining} Spots Remaining!
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Your Holding Health Savings
          </h3>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="text-center">
              <span className="text-sm text-gray-500">Original Total:</span>
              <p className="text-lg font-semibold text-gray-400 line-through">
                £{totalSavings.original}
              </p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Holding Health Price:
              </span>
              <p className="text-2xl font-bold text-green-600">
                £{totalSavings.discounted}
              </p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">You Save:</span>
              <p className="text-xl font-bold text-green-500">
                £{totalSavings.savings}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {/* Explanation section */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              How to Access Your £{totalSavings.savings} Care Plan
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your personalized recommendations are worth{" "}
              <strong>£{totalSavings.original}</strong> if you booked them
              individually. Choose how you'd like to access them through Holding
              Health:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="text-purple-600 font-semibold mb-2">
                🌟 Share Your Journey As An Ambassador
              </div>
              <p className="text-gray-600">
                Help others by sharing your wellness experience on social media
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="text-blue-600 font-semibold mb-2">
                💬 Give Feedback For Half Price
              </div>
              <p className="text-gray-600">
                Help us improve by sharing private feedback after your sessions
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="text-orange-600 font-semibold mb-2">
                ⏳ Wait for Next Cohort While on the Waitlist
              </div>
              <p className="text-gray-600">
                Join our waitlist and help us grow through referrals
              </p>
            </div>
          </div>
        </div>

        {/* Three Main Options */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Option 1: Ambassador Program */}
          <motion.div
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-purple-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMembershipClick("ambassador")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg font-bold mb-2">Ambassador Access</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-2xl font-bold">FREE</p>
                <p className="text-sm opacity-90">
                  Access your £{totalSavings.original} care plan
                </p>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Get full access to all {providers.length} of your
                recommendations by sharing your wellness journey online
              </p>
              {/* <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  You'll post 1-2 times/month about your wellness journey
                </p>
              </div> */}
              <motion.button
                className="w-full bg-white text-purple-600 py-2 px-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loadingType === "ambassador"}
              >
                {loadingType === "ambassador" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>I'm In! ✨</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Option 2: Feedback Program */}
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-blue-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMembershipClick("feedback")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">💙</div>
              <h3 className="text-lg font-bold mb-2">Feedback Member</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-sm opacity-75 line-through">
                  £{totalSavings.original}
                </p>
                <p className="text-2xl font-bold">£15/month</p>
                {/* <p className="text-sm opacity-90">97% discount on your plan</p> */}
              </div>
              <p className="text-sm opacity-90 mb-4">
                Access all {providers.length} of your recommendations for just
                £15/month by providing quick feedback after sessions
              </p>
              {/* <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  Quick 2-min feedback after each session
                </p>
              </div> */}
              <motion.button
                className="w-full bg-white text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loadingType === "feedback"}
              >
                {loadingType === "feedback" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Start VIP Access 💙</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Option 3: Waitlist + Referral */}
          <motion.div
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-orange-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWaitlistClick}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Waitlist Priority</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-2xl font-bold">FREE</p>
                <p className="text-sm opacity-90">
                  your £{totalSavings.original} plan reserved
                </p>
              </div>
              <p className="text-sm opacity-90 mb-4">
                We'll hold your {providers.length} recommendations and notify
                you when the next cohort opens. Refer 10 friends = free month!
              </p>
              {/* <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  Skip the queue + earn free months
                </p>
              </div> */}
              <motion.button
                className="w-full bg-white text-orange-600 py-2 px-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loadingType === "waitlist"}
              >
                {loadingType === "waitlist" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist 🎯</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Urgency Message */}
        <div className="text-center">
          <div className="inline-block bg-red-100 border border-red-200 rounded-lg px-4 py-2">
            <span className="text-red-700 font-semibold text-sm">
              🔥 Only {spotsRemaining} spots left this month across all
              programs!
            </span>
          </div>
        </div>

        {/* Secondary action */}
        <div className="flex justify-center">
          <motion.button
            onClick={onStartOver}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Start Over
          </motion.button>
        </div>
      </motion.div>

      {/* Encouraging message with urgency */}
      <motion.div
        className="text-center mt-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
          <p className="text-gray-700 font-medium mb-3">
            You've taken an important step towards feeling better. Remember,
            healing takes time and you're not alone in this journey. 💜
          </p>
        </div> */}

        {/* <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <p className="text-red-700 font-semibold text-sm">
            ⏰ Only {spotsRemaining} membership spots left this month! Secure
            your access to all these services before we're full.
          </p>
        </div> */}
      </motion.div>
    </div>
  );
}
