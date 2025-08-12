import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  Calendar,
  Play,
  Users,
  Sparkles,
  Heart,
  X,
  Star,
  MapPin,
  Clock,
  PlayCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { providersByReason, type Provider } from "../data/providers";
import { TikTokEmbed } from "./tiktok-embed";
import { InstagramEmbed } from "./instagram-embed";
import { analytics } from "../lib/client-analytics";

interface SwipeCardsProps {
  onSelection: (selectedProviders: Provider[]) => void;
  userReason: string;
  userEmail?: string;
}

export default function SwipeCards({
  onSelection,
  userReason,
  userEmail,
}: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get providers based on user's reason
  const providers =
    providersByReason[userReason as keyof typeof providersByReason] ||
    providersByReason["going-through-something"];
  const currentProvider = providers[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    let newSelectedProviders = selectedProviders;

    // Track swipe action asynchronously (don't wait for it)
    if (userEmail) {
      analytics
        .trackSwipeAction({
          email: userEmail,
          providerId: currentProvider.id,
          providerName: currentProvider.name,
          providerType: currentProvider.type,
          action: direction === "left" ? "swipe_left" : "swipe_right",
        })
        .catch((error) => {
          console.error("Analytics tracking failed:", error);
        });
    }

    if (direction === "right" && selectedProviders.length < 4) {
      newSelectedProviders = [...selectedProviders, currentProvider];
      setSelectedProviders(newSelectedProviders);
    }

    // Reset video and recommendation states when switching cards
    setIsVideoPlaying(false);
    setIsRecommendationOpen(false);

    // If we've reached 4 selections, allow user to proceed immediately
    if (newSelectedProviders.length >= 4) {
      // Don't automatically trigger - let user choose to continue
      setDragDirection(null);
      return;
    }

    if (currentIndex < providers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All cards swiped, trigger selection with current selections
      onSelection(newSelectedProviders);
    }
    setDragDirection(null);
  };

  const handleContinueToDashboard = () => {
    onSelection(selectedProviders);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 80;
    const velocity = info.velocity.x;

    // Consider both distance and velocity for more natural feel
    if (info.offset.x > threshold || velocity > 500) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold || velocity < -500) {
      handleSwipe("left");
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const threshold = 30;
    if (info.offset.x > threshold) {
      setDragDirection("right");
    } else if (info.offset.x < -threshold) {
      setDragDirection("left");
    } else {
      setDragDirection(null);
    }
  };

  if (!currentProvider) {
    return null;
  }

  const IconComponent = currentProvider.icon;

  return (
    <div className="relative w-full max-w-sm mx-auto h-[700px] perspective-1000">
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
            style={{
              width: `${((currentIndex + 1) / providers.length) * 100}%`,
            }}
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
              dragDirection === "right"
                ? "ring-4 ring-green-400"
                : dragDirection === "left"
                ? "ring-4 ring-red-400"
                : ""
            }`}
            style={{ zIndex: 2 }}
            drag="x"
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{
              rotate:
                dragDirection === "right"
                  ? 8
                  : dragDirection === "left"
                  ? -8
                  : 0,
              scale: 1.01,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              x:
                dragDirection === "right"
                  ? 400
                  : dragDirection === "left"
                  ? -400
                  : 0,
              rotate:
                dragDirection === "right"
                  ? 20
                  : dragDirection === "left"
                  ? -20
                  : 0,
              scale: 0.8,
              transition: {
                duration: 0.6,
                ease: "easeOut",
              },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {/* Swipe indicators */}
            <motion.div
              className="absolute top-8 left-8 z-10 bg-green-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: dragDirection === "right" ? 1 : 0,
                scale: dragDirection === "right" ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Heart className="h-5 w-5 inline mr-1" />
              LIKE
            </motion.div>
            <motion.div
              className="absolute top-8 right-8 z-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: dragDirection === "left" ? 1 : 0,
                scale: dragDirection === "left" ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <X className="h-5 w-5 inline mr-1" />
              PASS
            </motion.div>

            {/* Card content */}
            <div className="p-6 h-full flex flex-col">
              {/* 1. Media block (video or image placeholder) */}
              <div className="relative mb-4 h-48 bg-gray-100 rounded-xl overflow-hidden">
                {currentProvider.imageUrl && currentProvider.videoUrl ? (
                  // Show image with play button overlay when both are available
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => {
                      if (currentProvider.videoUrl) {
                        window.open(currentProvider.videoUrl, "_blank");
                      }
                    }}
                  >
                    <img
                      src={currentProvider.imageUrl}
                      alt={currentProvider.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-center">
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          ▶
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentProvider.imageUrl ? (
                  <img
                    src={currentProvider.imageUrl}
                    alt={currentProvider.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails to load
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                ) : currentProvider.videoUrl ? (
                  currentProvider.videoUrl.includes("tiktok.com") ? (
                    <div className="w-full h-full">
                      <TikTokEmbed
                        url={currentProvider.videoUrl}
                        className="w-full h-full"
                      />
                    </div>
                  ) : currentProvider.videoUrl.includes("instagram.com") ? (
                    <div className="w-full h-full">
                      <InstagramEmbed
                        url={currentProvider.videoUrl}
                        className="w-full h-full"
                      />
                    </div>
                  ) : currentProvider.videoUrl.includes("vimeo.com") ? (
                    <iframe
                      src={currentProvider.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="Provider video"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                        Video Preview
                      </div>
                    </div>
                  )
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${currentProvider.color} flex items-center justify-center`}
                  >
                    <IconComponent className="h-20 w-20 text-white" />
                  </div>
                )}

                {/* Hidden fallback gradient (shown if image fails to load) */}
                {currentProvider.imageUrl && (
                  <div
                    className={`hidden w-full h-full bg-gradient-to-br ${currentProvider.color} flex items-center justify-center absolute inset-0`}
                  >
                    <IconComponent className="h-20 w-20 text-white" />
                  </div>
                )}
              </div>

              {/* 2. Name + title + 1-liner */}
              <div className="mb-4">
                <h3 className="font-bold text-xl text-gray-900 mb-1">
                  {currentProvider.name}
                </h3>
                <p className="text-purple-600 font-semibold text-lg mb-2">
                  {currentProvider.title}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {currentProvider.description}
                </p>
              </div>

              {/* 3. HH suggestion label ("Why you're seeing this") */}
              <div className="mb-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-purple-700 mb-1">
                        Why you're seeing this
                      </p>
                      <p className="text-xs text-purple-600 leading-relaxed">
                        {currentProvider.whyRecommended}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Social proof row */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      {/* <span className="text-sm font-semibold text-gray-700 ml-1">
                        {currentProvider.rating}
                      </span> */}
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-600">
                      {currentProvider.socialCredential}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Price + countdown or availability */}
              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {currentProvider.price}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {currentProvider.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Remove-the-fear reassurance */}
              <div className="mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blue-500" />
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">
                        Holding Health Guarantee:
                      </span>{" "}
                      Not satisfied? We will refund your free treatment.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Action buttons - Now inside the card */}
              <div className="mt-auto">
                <div className="flex items-center justify-between space-x-4">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Show Continue button if 4 selections reached */}
      {selectedProviders.length >= 4 && (
        <div className="mt-8 text-center">
          <motion.button
            onClick={handleContinueToDashboard}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Your Care Dashboard →
          </motion.button>
          <p className="text-gray-600 text-sm mt-4">
            You've selected {selectedProviders.length} care options. Ready to
            see your personalized plan!
          </p>
        </div>
      )}
    </div>
  );
}
