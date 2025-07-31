import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Calendar, Play, Users, Sparkles, Heart, X, Star, MapPin, Clock, PlayCircle } from "lucide-react";

// Helper functions for pricing
const getDiscountPercentage = (originalPrice: string): number => {
  const match = originalPrice.match(/\$(\d+)/);
  if (!match) return 25;
  
  const price = parseInt(match[1]);
  if (price <= 30) return 40;
  if (price <= 60) return 35;
  if (price <= 100) return 30;
  return 25;
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
  videoUrl?: string;
  socialCredential: string;
  whyRecommended: string;
}

const providers: Provider[] = [
  {
    id: 1,
    type: 'coach',
    title: 'Relationship Coach',
    name: 'Dr. Sarah Chen',
    description: 'Specializes in relationship transitions and emotional healing with 8+ years experience',
    rating: 4.9,
    location: '2.3 miles away',
    availability: 'Available today',
    price: '$120/session',
    specialties: ['Breakup Recovery', 'Communication', 'Self-Worth'],
    icon: Calendar,
    color: 'from-violet-500 to-purple-600',
    image: '👩‍⚕️',
    videoUrl: 'https://player.vimeo.com/video/947608166',
    socialCredential: 'TikTok\'s #1 Certified Relationship Coach',
    whyRecommended: 'Based on your responses about relationship challenges, Dr. Chen specializes in helping people navigate emotional transitions with proven communication techniques that 94% of her clients find effective within the first month.'
  },
  {
    id: 2,
    type: 'meditation',
    title: 'Pain Relief Meditation',
    name: 'Mindful Moments App',
    description: '15-minute guided sessions designed specifically for managing physical and emotional pain',
    rating: 4.8,
    location: 'Online',
    availability: 'Start immediately',
    price: 'Free trial',
    specialties: ['Pain Management', 'Stress Relief', 'Emotional Healing'],
    icon: Play,
    color: 'from-emerald-500 to-green-600',
    image: '🧘‍♀️',
    videoUrl: 'https://player.vimeo.com/video/947608205',
    socialCredential: 'As seen on TikTok - 2.3M followers',
    whyRecommended: 'Your stress levels indicate you would benefit from immediate relief techniques. This app uses neuroscience-backed meditation methods that show measurable stress reduction in 87% of users within 7 days, perfect for your on-the-go lifestyle.'
  },
  {
    id: 3,
    type: 'support',
    title: 'Support Group',
    name: 'Healing Hearts Circle',
    description: 'Safe space for people navigating relationship changes and emotional challenges',
    rating: 4.7,
    location: 'Downtown Community Center',
    availability: 'Tomorrow 7 PM',
    price: 'Free',
    specialties: ['Peer Support', 'Group Therapy', 'Shared Experiences'],
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    image: '👥',
    videoUrl: 'https://player.vimeo.com/video/947608244',
    socialCredential: 'Featured on Instagram - 500K healing community',
    whyRecommended: 'Research shows peer support groups increase emotional resilience by 73%. Since you mentioned feeling isolated, this group connects you with others sharing similar experiences, providing both validation and practical coping strategies.'
  },
  {
    id: 4,
    type: 'coach',
    title: 'Life Coach',
    name: 'Marcus Williams',
    description: 'Helps people rebuild confidence and create new life direction after major changes',
    rating: 4.9,
    location: '1.8 miles away',
    availability: 'Available this week',
    price: '$95/session',
    specialties: ['Life Transitions', 'Goal Setting', 'Confidence Building'],
    icon: Sparkles,
    color: 'from-orange-500 to-red-600',
    image: '👨‍💼',
    videoUrl: 'https://player.vimeo.com/video/947608286',
    socialCredential: 'LinkedIn Top Voice - Life Transformation',
    whyRecommended: 'Your assessment indicates readiness for major life changes but uncertainty about direction. Coaches like Marcus help 89% of clients establish clear goals within 4 weeks, using evidence-based techniques that match your action-oriented personality.'
  },
  {
    id: 5,
    type: 'selfcare',
    title: 'Spa & Wellness',
    name: 'Serenity Spa',
    description: 'Full-service wellness center offering massage therapy and relaxation treatments',
    rating: 4.6,
    location: '3.1 miles away',
    availability: 'Same day booking',
    price: '$80/treatment',
    specialties: ['Massage Therapy', 'Aromatherapy', 'Relaxation'],
    icon: Sparkles,
    color: 'from-pink-500 to-rose-600',
    image: '💆‍♀️',
    videoUrl: 'https://player.vimeo.com/video/947608320',
    socialCredential: 'YouTube Wellness Channel - 1.2M subscribers',
    whyRecommended: 'Your high stress levels and physical tension symptoms suggest you need hands-on therapeutic intervention. Clinical studies show massage therapy reduces cortisol levels by 31% and improves sleep quality, addressing both your stress and fatigue concerns.'
  },
  {
    id: 6,
    type: 'meditation',
    title: 'Breathing Coach',
    name: 'Breathe Easy Studio',
    description: 'Personal breathing sessions to help manage anxiety and emotional overwhelm',
    rating: 4.8,
    location: '1.2 miles away',
    availability: 'Available today',
    price: '$60/session',
    specialties: ['Anxiety Relief', 'Breathing Techniques', 'Stress Management'],
    icon: Play,
    color: 'from-teal-500 to-cyan-600',
    image: '🌬️',
    videoUrl: 'https://player.vimeo.com/video/947608350',
    socialCredential: 'TikTok Breathing Expert - 800K followers',
    whyRecommended: 'Your anxiety patterns show you need immediate, practical tools you can use anywhere. Controlled breathing techniques reduce anxiety symptoms by 60% within minutes and are scientifically proven to calm your nervous system faster than other methods.'
  },
  {
    id: 7,
    type: 'support',
    title: 'Online Support',
    name: 'Digital Wellness Community',
    description: '24/7 online support community with licensed counselors and peer support',
    rating: 4.5,
    location: 'Online',
    availability: 'Always available',
    price: '$29/month',
    specialties: ['24/7 Support', 'Crisis Help', 'Online Community'],
    icon: Users,
    color: 'from-indigo-500 to-blue-600',
    image: '💬',
    videoUrl: 'https://player.vimeo.com/video/947608380',
    socialCredential: 'Reddit Mental Health Community - 50K members',
    whyRecommended: 'Your schedule and preference for digital solutions make this ideal. Research shows 24/7 support access reduces crisis episodes by 45%, and the community model provides ongoing validation that matches your need for consistent emotional support.',
  },
  {
    id: 8,
    type: 'selfcare',
    title: 'Fitness & Movement',
    name: 'Feel Good Fitness',
    description: 'Gentle movement and yoga classes designed to boost mood and energy',
    rating: 4.7,
    location: '2.7 miles away',
    availability: 'Classes daily',
    price: '$25/class',
    specialties: ['Mood Boosting', 'Gentle Yoga', 'Dance Therapy'],
    icon: Sparkles,
    color: 'from-green-500 to-emerald-600',
    image: '🏃‍♀️',
    videoUrl: 'https://player.vimeo.com/video/947608410',
    socialCredential: 'Instagram Fitness Influencer - 900K followers',
    whyRecommended: 'Your low energy and mood concerns can be significantly improved through movement. Studies show gentle exercise increases endorphins by 200% and improves mental health outcomes in 91% of participants, perfect for rebuilding your physical and emotional strength.'
  }
];

interface SwipeCardsProps {
  onSelection: (selectedProviders: Provider[]) => void;
}

export default function SwipeCards({ onSelection }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProvider = providers[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && selectedProviders.length < 4) {
      setSelectedProviders(prev => [...prev, currentProvider]);
    }
    
    // Reset video state when switching cards
    setIsVideoPlaying(false);
    
    if (currentIndex < providers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // All cards swiped, trigger selection
      const finalSelection = direction === 'right' ? [...selectedProviders, currentProvider] : selectedProviders;
      onSelection(finalSelection);
    }
    setDragDirection(null);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleSwipe('left');
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 50) {
      setDragDirection('right');
    } else if (info.offset.x < -50) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  if (!currentProvider) {
    return null;
  }

  const IconComponent = currentProvider.icon;

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] perspective-1000">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} of {providers.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            Selected: {selectedProviders.length}/4
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / providers.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="relative">
        <AnimatePresence>
          {/* Next card (behind) */}
          {providers[currentIndex + 1] && (
            <motion.div
              key={`next-${currentIndex + 1}`}
              className="absolute inset-0 bg-white rounded-3xl shadow-lg border border-gray-100"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 0.95, y: 10 }}
              style={{ zIndex: 1 }}
            />
          )}

          {/* Current card */}
          <motion.div
            key={currentProvider.id}
            ref={cardRef}
            className={`relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100 ${
              dragDirection === 'right' ? 'ring-4 ring-green-400' : 
              dragDirection === 'left' ? 'ring-4 ring-red-400' : ''
            }`}
            style={{ zIndex: 2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{ 
              rotate: dragDirection === 'right' ? 15 : dragDirection === 'left' ? -15 : 0,
              scale: 1.05 
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              x: dragDirection === 'right' ? 300 : -300,
              rotate: dragDirection === 'right' ? 30 : -30,
              scale: 0.8
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Swipe indicators */}
            <div className={`absolute top-8 left-8 z-10 bg-green-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12 transition-opacity ${
              dragDirection === 'right' ? 'opacity-100' : 'opacity-0'
            }`}>
              <Heart className="h-5 w-5 inline mr-1" />
              LIKE
            </div>
            <div className={`absolute top-8 right-8 z-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 transition-opacity ${
              dragDirection === 'left' ? 'opacity-100' : 'opacity-0'
            }`}>
              <X className="h-5 w-5 inline mr-1" />
              PASS
            </div>

            {/* Card content */}
            <div className="p-8 h-full flex flex-col">
              {/* Video Section */}
              {currentProvider.videoUrl && (
                <div className="mb-6">
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video">
                    {!isVideoPlaying ? (
                      <div 
                        className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center cursor-pointer group"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        {/* Thumbnail with emoji */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 to-black/40">
                          <div className="text-4xl mb-4">{currentProvider.image}</div>
                        </div>
                        
                        {/* Play button overlay */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg group-hover:bg-white transition-colors">
                            <PlayCircle className="h-12 w-12 text-gray-700" />
                          </div>
                        </motion.div>
                        
                        {/* Preview text */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                            <p className="text-white text-sm font-medium">Watch preview of {currentProvider.name}</p>
                            <p className="text-white/80 text-xs">Tap to play</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <iframe
                          src={`${currentProvider.videoUrl}?autoplay=1&muted=1&controls=1`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={() => setIsVideoPlaying(false)}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Header with icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {!currentProvider.videoUrl && <div className="text-6xl">{currentProvider.image}</div>}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{currentProvider.title}</h3>
                    <h4 className="text-lg font-semibold text-gray-700">{currentProvider.name}</h4>
                  </div>
                </div>
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentProvider.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* Title and name - only show if no video */}
              {!currentProvider.videoUrl && (
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{currentProvider.title}</h3>
                  <h4 className="text-lg font-semibold text-gray-700">{currentProvider.name}</h4>
                </div>
              )}

              {/* Rating and location */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{currentProvider.rating}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{currentProvider.location}</span>
                </div>
              </div>

              {/* Social Credential Badge */}
              <div className="mb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
                  <span className="text-purple-700 text-xs font-medium">{currentProvider.socialCredential}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {currentProvider.description}
              </p>

              {/* Why Recommended Section */}
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="text-blue-800 font-semibold text-xs mb-1">Why we're suggesting this for you</h4>
                    <p className="text-blue-700 text-xs leading-relaxed">{currentProvider.whyRecommended}</p>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {currentProvider.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{currentProvider.availability}</span>
                </div>
                <div className="text-right">
                  {currentProvider.price.toLowerCase().includes('free') ? (
                    <div className="space-y-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                        Premium Access
                      </span>
                      <div className="text-lg font-bold text-blue-600">{getHoldingHealthPrice(currentProvider.price)}</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400 line-through">{currentProvider.price}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          {getDiscountPercentage(currentProvider.price)}% off
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{getHoldingHealthPrice(currentProvider.price)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-8 mt-8">
        <motion.button
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-red-200 hover:border-red-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('left')}
        >
          <X className="h-8 w-8 text-red-500" />
        </motion.button>
        
        <motion.button
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-200 hover:border-green-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('right')}
          disabled={selectedProviders.length >= 4}
        >
          <Heart className="h-8 w-8 text-green-500" />
        </motion.button>
      </div>

      {/* Helper text */}
      <p className="text-center text-gray-500 text-sm mt-4">
        Swipe right to add to your care plan • Swipe left to pass
      </p>
    </div>
  );
}