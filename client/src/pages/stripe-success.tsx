import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Loader2, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session ID from URL params if this is a real Stripe redirect
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get("session_id");

    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      // You could verify the session with your backend here
    }

    setLoading(false);
  }, []);

  if (loading && sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="/logo.png"
                  alt="Holding Health Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-block"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome to Holding Health! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-600 mb-2"
          >
            Your membership is now active!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-lg text-gray-500"
          >
            You now have unlimited access to all our providers.
          </motion.p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="mb-8 border-green-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-center">
                What happens next?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Check your email
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We've sent you a welcome email with your receipt and next
                      steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Start booking
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Browse all available services and start booking your first
                      appointments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Enjoy unlimited access
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your membership covers all provider costs. No hidden fees.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link href="/get-started">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold w-full sm:w-auto">
              Browse Providers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
          >
            View Account
          </Button>
        </motion.div>

        {sessionId && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Transaction ID: {sessionId.substring(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
