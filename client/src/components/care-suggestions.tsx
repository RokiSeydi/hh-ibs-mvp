import { motion } from "framer-motion";
import { Calendar, Play, Users, Sparkles } from "lucide-react";

const suggestions = [
  {
    id: 1,
    title: "Book a session with a relationship coach",
    description: "We found someone near you with 5-star reviews and expertise in relationship transitions",
    icon: Calendar,
    color: "care-purple",
    action: "Available today",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Try guided pain meditation",
    description: "15-minute sessions designed specifically for managing physical and emotional pain",
    icon: Play,
    color: "care-green",
    action: "Start now",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Join a support group",
    description: "Connect with others who understand what you're going through in a safe space",
    icon: Users,
    color: "care-blue",
    action: "Next meeting: Tomorrow 7 PM",
    delay: 0.5,
  },
  {
    id: 4,
    title: "Plan some self-care activities",
    description: "Personalized wellness suggestions to help you feel better physically and emotionally",
    icon: Sparkles,
    color: "care-coral",
    action: "Get started",
    delay: 0.7,
  },
];

export default function CareSuggestions() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {suggestions.map((suggestion) => {
        const IconComponent = suggestion.icon;
        
        return (
          <motion.div
            key={suggestion.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: suggestion.delay }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent className={`h-7 w-7 ${suggestion.color}`} />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {suggestion.description}
                </p>
                <div className={`flex items-center ${suggestion.color} text-sm font-medium`}>
                  <IconComponent className="h-4 w-4 mr-1" />
                  {suggestion.action}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
