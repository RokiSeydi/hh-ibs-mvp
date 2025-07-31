import { motion } from "framer-motion";
import { Calendar, Play, Users, Sparkles, ArrowRight } from "lucide-react";

const suggestions = [
  {
    id: 1,
    title: "Book a session with a relationship coach",
    description: "We found someone near you with 5-star reviews and expertise in relationship transitions",
    icon: Calendar,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    action: "Available today",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Try guided pain meditation",
    description: "15-minute sessions designed specifically for managing physical and emotional pain",
    icon: Play,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    action: "Start now",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Join a support group",
    description: "Connect with others who understand what you're going through in a safe space",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    action: "Next meeting: Tomorrow 7 PM",
    delay: 0.5,
  },
  {
    id: 4,
    title: "Plan some self-care activities",
    description: "Personalized wellness suggestions to help you feel better physically and emotionally",
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    action: "Get started",
    delay: 0.7,
  },
];

export default function CareSuggestions() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {suggestions.map((suggestion) => {
        const IconComponent = suggestion.icon;
        
        return (
          <motion.div
            key={suggestion.id}
            className={`relative overflow-hidden rounded-3xl ${suggestion.bgColor} p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-white/50`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: suggestion.delay, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{
              background: `linear-gradient(135deg, ${suggestion.bgColor.includes('violet') ? 'rgba(139, 92, 246, 0.05)' : suggestion.bgColor.includes('emerald') ? 'rgba(16, 185, 129, 0.05)' : suggestion.bgColor.includes('blue') ? 'rgba(59, 130, 246, 0.05)' : 'rgba(236, 72, 153, 0.05)'} 0%, rgba(255, 255, 255, 0.9) 100%)`,
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Floating background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative z-10">
              {/* Icon with gradient background */}
              <motion.div 
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${suggestion.color} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconComponent className="h-10 w-10 text-white" />
              </motion.div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {suggestion.description}
                </p>
                
                {/* Action button */}
                <motion.div 
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${suggestion.color} text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{suggestion.action}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ borderRadius: 'inherit' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}