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
import WaitlistSignup from "@/components/waitlist-signup";

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
              <img
                src="/logo.png"
                alt="Holding Health Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <Link href="/get-started">
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
                onClick={() => handleCTAClick("navigation_cta_click")}
              >
                Find Your Care
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
              🫂 Designed with Asian women in mind
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your IBS-friendly
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                care companion
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sensitive to both your gut and your culture. <br />
              A care package that understands Asian dietary needs, <br />
              family dynamics, and modern lifestyle. <br />
              Find relief that fits you.
              <br /> ...in less than 2 minutes.
            </p>
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
                    onClick={() =>
                      handleCTAClick("hero_cta_click", "hero-primary")
                    }
                  >
                    Start your journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Waitlist Signup */}
              <div className="w-full max-w-md">
                <WaitlistSignup variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Care that speaks your language
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized support for your IBS journey, mindful of Asian
              dietary needs and cultural wellness practices. <br /> Backed by
              our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Diet and Nutrition */}
            <motion.div
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🥢
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Asian-friendly diet plans
                  </h3>
                  <p className="text-sm text-gray-500">
                    IBS-safe versions of your favorite Asian dishes
                  </p>
                </div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 mb-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Low FODMAP Asian recipes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cultural ingredient substitutes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Family-friendly meal plans
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Holistic Wellness */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🌿
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Mind-body balance</h3>
                  <p className="text-sm text-gray-500">
                    Blend of Eastern wisdom and modern science
                  </p>
                </div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 mb-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    TCM-informed approaches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Gut-brain connection support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Stress management techniques
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Community Support */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  🤝
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community support</h3>
                  <p className="text-sm text-gray-500">
                    Connect with others who understand
                  </p>
                </div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 mb-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Culturally sensitive support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Peer connection groups
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Expert-led discussions
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              You're not alone
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600">500+ community members</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Expert-verified content</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                <span className="text-gray-600">Culturally informed care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of Asian women finding relief and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => handleCTAClick("footer_cta_click")}
              >
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
