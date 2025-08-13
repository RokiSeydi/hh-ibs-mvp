import { XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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

      {/* Cancelled Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            No worries! Your payment was cancelled and no charges were made.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              What would you like to do?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Try again</h3>
                  <p className="text-gray-600 text-sm">
                    Go back to complete your subscription and start accessing
                    our providers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Browse more providers</h3>
                  <p className="text-gray-600 text-sm">
                    Continue exploring our services and customize your care
                    plan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Join our waitlist</h3>
                  <p className="text-gray-600 text-sm">
                    Get notified about special offers and updates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/payment">
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Try Payment Again
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/get-started">
            <Button variant="outline" className="px-8 py-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Providers
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at hello@holdinghealth.com
          </p>
        </div>
      </div>
    </div>
  );
}
