import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Heart,
  Users,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "wouter";
import { analytics } from "@/lib/client-analytics";
import { motion } from "framer-motion";

export default function LandingPage() {
  const handleCTAClick = (
    action: "hero_cta_click" | "navigation_cta_click" | "footer_cta_click",
    location?: string
  ) => {
    analytics.trackLandingPageInteraction({ action, location });
  };

  const handleLearnMoreClick = () => {
    analytics.trackLandingPageInteraction({ action: "learn_more_click" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Holding Health
              </span>
            </div>
            <Link href="/get-started">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleCTAClick("navigation_cta_click")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              🚀 Launching Soon - Join the Waitlist
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Build the care you need,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                for free.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              They say, “without good health, there is no happiness.” <br /> We
              say, good health is whatever makes you feel good, and should be
              free for all. <br /> From nails, therapy, and fitness to
              nutrition, fun activities, and soon even medical care — you build
              the care that works for you, and we cover the cost. <br /> As
              simple as that.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                  onClick={() =>
                    handleCTAClick("hero_cta_click", "hero-primary")
                  }
                >
                  Try it
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
                onClick={handleLearnMoreClick}
              >
                Join the Waitlist
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span>Join 1,000+ early adopters</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1">4.9/5 from beta users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Not a boring booking app. Not the NHS. Not overpriced private
              care.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We’re a new way to get care that fits your life. Built for the
              TikTok generation, for Gen Z and millennials who live online and
              expect things fast, easy, and personal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  We cover the cost
                </h3>
                <p className="text-gray-600">
                  Your membership unlocks care without the price stress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-600">
                  Swipe, match, done. No endless scrolling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Cultural + credible
                </h3>
                <p className="text-gray-600">
                  Providers who get you — from certified healthcare pros to
                  viral creators.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Always there</h3>
                <p className="text-gray-600">
                  Through the breakups, the big wins, the bad days, and the
                  glow-ups.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Real providers. Real experiences. All free to try with your
              membership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Swipe</h3>
              <p className="text-gray-600">
                Pick your vibe — life is lifing, you’re curious, you’re
                levelling up your health, or you just want to try something new.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Match</h3>
              <p className="text-gray-600">
                Get personalised care matches — from social media-famous
                providers to hidden gems, from healthcare pros to wellness
                treats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy</h3>
              <p className="text-gray-600">
                Buy our membership and your picks are free. Or join our waitlist
                for free/half-price membership by sharing about us online or
                privately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Real providers. Real experiences.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From TikTok-famous coaches to hidden gem wellness experiences - all covered by your membership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Relationship Coach */}
            <motion.div 
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🧠
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Relationship Coach</h3>
                  <p className="text-sm text-gray-500">200k TikTok followers</p>
                </div>
              </div>
              <div className="bg-black rounded-xl aspect-[9/16] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <p className="text-sm font-medium">"Breakup recovery in your pocket."</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2">
                      ▶
                    </div>
                    <p className="text-xs">TikTok Preview</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">1-on-1 sessions, group workshops, and 24/7 chat support</p>
            </motion.div>

            {/* PT for Chronic Conditions */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🏋️
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Adaptive Fitness PT</h3>
                  <p className="text-sm text-gray-500">Chronic conditions specialist</p>
                </div>
              </div>
              <div className="bg-black rounded-xl aspect-[9/16] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <p className="text-sm font-medium">"Workouts that work with your body, not against it."</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2">
                      ▶
                    </div>
                    <p className="text-xs">IG Reel Preview</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Personalized programs for chronic pain, fatigue, and mobility</p>
            </motion.div>

            {/* Hand Painting Workshop */}
            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🎨
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Art Therapy Workshop</h3>
                  <p className="text-sm text-gray-500">Local creative studio</p>
                </div>
              </div>
              <div className="bg-black rounded-xl aspect-[9/16] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <p className="text-sm font-medium">"Switch off, create, and unwind."</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2">
                      ▶
                    </div>
                    <p className="text-xs">Video Preview</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Weekly sessions, materials included, small groups</p>
            </motion.div>

            {/* Butterfly Garden */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🦋
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Butterfly Garden Visit</h3>
                  <p className="text-sm text-gray-500">Nature therapy experience</p>
                </div>
              </div>
              <div className="bg-black rounded-xl aspect-[9/16] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <p className="text-sm font-medium">"Your Sunday escape."</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2">
                      ▶
                    </div>
                    <p className="text-xs">Experience Preview</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Guided tours, meditation sessions, photography workshops</p>
            </motion.div>

            {/* Thai Massage */}
            <motion.div 
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  💆
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Thai Back Massage</h3>
                  <p className="text-sm text-gray-500">Certified wellness center</p>
                </div>
              </div>
              <div className="bg-black rounded-xl aspect-[9/16] mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <p className="text-sm font-medium">"Relaxation, fully covered."</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2">
                      ▶
                    </div>
                    <p className="text-xs">Clinic Preview</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">60-90 min sessions, flexible booking, luxury setting</p>
            </motion.div>

            {/* CTA Card */}
            <motion.div 
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Ready to discover your matches?</h3>
              <p className="mb-6 opacity-90 text-sm">Join thousands already building their perfect care routine</p>
              <Link href="/get-started">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full" onClick={() => handleCTAClick("footer_cta_click", "provider-showcase")}>
                  Start Swiping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Holding Health</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Connecting you with trusted healthcare providers for a
                personalized health journey.
              </p>
              <div className="text-sm text-gray-500">
                © 2025 Holding Health. All rights reserved.
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Providers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
