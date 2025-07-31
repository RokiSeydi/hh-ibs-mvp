import { motion } from "framer-motion";
import { Calendar, Play, Users, Sparkles, Star, MapPin, Clock, ArrowRight, ShoppingCart } from "lucide-react";

interface Provider {
  id: number;
  type: 'coach' | 'meditation' | 'support' | 'selfcare';
  title: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  availability: string;
  price: string;
  specialties: string[];
  icon: any;
  color: string;
  image: string;
}

interface SelectedRecommendationsProps {
  providers: Provider[];
  onStartOver: () => void;
}

// Helper functions for pricing
const getDiscountPercentage = (originalPrice: string): number => {
  // Extract numeric value from price string
  const match = originalPrice.match(/\$(\d+)/);
  if (!match) return 25; // Default discount
  
  const price = parseInt(match[1]);
  if (price <= 30) return 40; // Higher discount for lower prices
  if (price <= 60) return 35;
  if (price <= 100) return 30;
  return 25; // Lower discount for higher prices
};

const getHoldingHealthPrice = (originalPrice: string): string => {
  // Handle free services
  if (originalPrice.toLowerCase().includes('free')) {
    return 'Free trial with Holding Health';
  }
  
  const match = originalPrice.match(/\$(\d+)/);
  if (!match) return originalPrice;
  
  const price = parseInt(match[1]);
  const discount = getDiscountPercentage(originalPrice);
  const discountedPrice = Math.round(price * (1 - discount / 100));
  
  if (originalPrice.includes('month')) return `$${discountedPrice}/month`;
  if (originalPrice.includes('session')) return `$${discountedPrice}/session`;
  if (originalPrice.includes('treatment')) return `$${discountedPrice}/treatment`;
  if (originalPrice.includes('class')) return `$${discountedPrice}/class`;
  
  return `$${discountedPrice}`;
};

const calculateTotalSavings = (providers: Provider[]): { original: number, discounted: number, savings: number } => {
  let originalTotal = 0;
  let discountedTotal = 0;
  
  providers.forEach(provider => {
    const match = provider.price.match(/\$(\d+)/);
    if (match) {
      const price = parseInt(match[1]);
      const discount = getDiscountPercentage(provider.price);
      const discountedPrice = Math.round(price * (1 - discount / 100));
      
      originalTotal += price;
      discountedTotal += discountedPrice;
    }
  });
  
  return {
    original: originalTotal,
    discounted: discountedTotal,
    savings: originalTotal - discountedTotal
  };
};

export default function SelectedRecommendations({ providers, onStartOver }: SelectedRecommendationsProps) {
  const totalSavings = calculateTotalSavings(providers);
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Personalized Care Plan</h2>
        <p className="text-gray-600 text-lg">Here are the {providers.length} recommendations you selected</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {providers.map((provider, index) => {
          const IconComponent = provider.icon;
          
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
                {/* Icon and emoji */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-3xl">{provider.image}</div>
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${provider.color} flex items-center justify-center shadow-md`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{provider.title}</h3>
                    <h4 className="text-base font-semibold text-gray-700">{provider.name}</h4>
                  </div>

                  {/* Rating and location */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{provider.rating}</span>
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
                      {provider.price.toLowerCase().includes('free') ? (
                        <div className="space-y-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                            Premium Access
                          </span>
                          <div className="text-sm font-bold text-blue-600">{getHoldingHealthPrice(provider.price)}</div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400 line-through">{provider.price}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                              {getDiscountPercentage(provider.price)}% off
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-600">{getHoldingHealthPrice(provider.price)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book now button */}
                  <motion.button
                    className={`w-full mt-4 bg-gradient-to-r ${provider.color} text-white py-2 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Savings Summary */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Your Holding Health Savings</h3>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="text-center">
              <span className="text-sm text-gray-500">Original Total:</span>
              <p className="text-lg font-semibold text-gray-400 line-through">${totalSavings.original}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">Holding Health Price:</span>
              <p className="text-2xl font-bold text-green-600">${totalSavings.discounted}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500">You Save:</span>
              <p className="text-xl font-bold text-green-500">${totalSavings.savings}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="flex justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={onStartOver}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Over
        </motion.button>
        
        <motion.button
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Book It All - Save ${totalSavings.savings}</span>
        </motion.button>
        
        <motion.button
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save My Plan
        </motion.button>
      </motion.div>

      {/* Encouraging message */}
      <motion.div
        className="text-center mt-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-700 font-medium">
          You've taken an important step towards feeling better. Remember, healing takes time and you're not alone in this journey. 💜
        </p>
      </motion.div>
    </div>
  );
}