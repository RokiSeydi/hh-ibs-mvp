import { motion } from "framer-motion";
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
} from "lucide-react";
import { useLocation } from "wouter";
import { type Provider } from "../data/providers";

interface SelectedRecommendationsProps {
  providers: Provider[];
  onStartOver: () => void;
  onJoinWaitlist: () => void;
  onBuyMembership: (type?: "ambassador" | "feedback" | "viral") => void;
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
    const marketPrice = getOriginalMarketPrice(provider);
    originalTotal += marketPrice;
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
  const totalSavings = calculateTotalSavings(providers);
  const spotsRemaining = getDynamicSpotsRemaining();

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

                  {/* CTA buttons */}
                  <div className="flex space-x-2 mt-4">
                    <motion.button
                      onClick={() => onBuyMembership("ambassador")}
                      className={`flex-1 bg-gradient-to-r ${provider.color} text-white py-2 px-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Try it With Us</span>
                      <ArrowRight className="h-3 w-3" />
                    </motion.button>
                    <motion.button
                      onClick={onJoinWaitlist}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Users className="h-3 w-3" />
                      <span>Join Waitlist</span>
                    </motion.button>
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
        {/* Three Main Options */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Option 1: Ambassador Program */}
          <motion.div
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-purple-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBuyMembership("ambassador")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg font-bold mb-2">Become an Ambassador</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-2xl font-bold">FREE</p>
                <p className="text-sm opacity-90">for 3 months</p>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Share your HH journey online and get full access to everything -
                no membership fee!
              </p>
              <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  You'll post 1-2 times/month about your wellness journey
                </p>
              </div>
              <motion.button
                className="w-full bg-white text-purple-600 py-2 px-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I'm In! ✨
              </motion.button>
            </div>
          </motion.div>

          {/* Option 2: Feedback Program */}
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-blue-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBuyMembership("feedback")}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">💙</div>
              <h3 className="text-lg font-bold mb-2">VIP Feedback Member</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-sm opacity-75 line-through">£30/month</p>
                <p className="text-2xl font-bold">£15/month</p>
                <p className="text-sm opacity-90">first 3 months</p>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Pay half price and help us improve by sharing private feedback
                after sessions
              </p>
              <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  Quick 2-min feedback after each session
                </p>
              </div>
              <motion.button
                className="w-full bg-white text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start VIP Access 💙
              </motion.button>
            </div>
          </motion.div>

          {/* Option 3: Waitlist + Referral */}
          <motion.div
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-orange-400"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onJoinWaitlist}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Waitlist VIP</h3>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-2xl font-bold">FREE</p>
                <p className="text-sm opacity-90">guaranteed spot next drop</p>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Share with 10 friends who join the waitlist = free month when we
                open next!
              </p>
              <div className="bg-white/10 rounded-lg p-2 mb-3">
                <p className="text-xs font-semibold">
                  Skip the queue + earn free months
                </p>
              </div>
              <motion.button
                className="w-full bg-white text-orange-600 py-2 px-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist 🎯
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
