import { motion } from "framer-motion";
import { CheckCircle, Calendar, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentSuccessProps {
  onStartOver: () => void;
  selectedProviders: any[];
}

export default function PaymentSuccess({
  onStartOver,
  selectedProviders,
}: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
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
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Holding Health! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Payment successful! We're already working on booking your services.
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                What happens next?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Booking confirmations (Next 24 hours)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We'll email you confirmation details for all{" "}
                      {selectedProviders.length} services you selected.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Calendar reminders</h3>
                    <p className="text-gray-600 text-sm">
                      You'll get calendar invites and gentle reminders before
                      each appointment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ongoing support</h3>
                    <p className="text-gray-600 text-sm">
                      Need to reschedule or try something new? Just reply to any
                      email and we'll sort it out.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Your Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Selected Services</h2>
              <div className="grid gap-3">
                {selectedProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl">{provider.image}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        {provider.title}
                      </h3>
                      <p className="text-xs text-gray-600">{provider.name}</p>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      ✓ Included
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">
                  Check Your Email
                </h3>
              </div>
              <p className="text-blue-800 text-sm">
                We've sent a welcome email with your membership details and next
                steps. If you don't see it in a few minutes, check your spam
                folder!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center space-y-4"
        >
          <Button
            onClick={onStartOver}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3"
          >
            Explore More Services
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>

          <p className="text-sm text-gray-500">
            Want to add more services? You can always come back and browse our
            full catalog.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
