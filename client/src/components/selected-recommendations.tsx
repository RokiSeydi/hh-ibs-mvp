import { motion } from "framer-motion";
import { Calendar, Play, Users, Sparkles, Star, MapPin, Clock, ArrowRight } from "lucide-react";

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

export default function SelectedRecommendations({ providers, onStartOver }: SelectedRecommendationsProps) {
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
                    <span className="text-sm font-bold text-gray-800">{provider.price}</span>
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
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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