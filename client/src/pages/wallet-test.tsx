import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplePayButton from "@/components/apple-pay-button";
import { CheckCircle, X } from "lucide-react";

export default function DigitalWalletTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const handleSuccess = (paymentMethod: any) => {
    addResult(`✅ Success: ${paymentMethod.type} - ${paymentMethod.id}`);
    console.log("Payment method:", paymentMethod);
  };

  const handleError = (error: any) => {
    addResult(`❌ Error: ${error.message || "Unknown error"}`);
    console.error("Payment error:", error);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Digital Wallet Test Page</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Test Payment (£29.99)</h3>
              <ApplePayButton
                amount={2999}
                label="Test Payment"
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Test Card Setup (£0.00)</h3>
              <ApplePayButton
                amount={0}
                label="Card Setup Test"
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Test Results</CardTitle>
            <button
              onClick={clearResults}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500">No tests run yet</p>
              ) : (
                testResults.map((result, index) => (
                  <div
                    key={index}
                    className="text-sm font-mono bg-gray-50 p-2 rounded"
                  >
                    {result}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Device & Browser Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>User Agent:</strong>
              <p className="mt-1 font-mono text-xs break-all">
                {navigator.userAgent}
              </p>
            </div>
            <div>
              <strong>Platform:</strong> {navigator.platform}
              <br />
              <strong>Language:</strong> {navigator.language}
              <br />
              <strong>Cookies Enabled:</strong>{" "}
              {navigator.cookieEnabled ? "Yes" : "No"}
              <br />
              <strong>Online:</strong> {navigator.onLine ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Behavior */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Expected Behavior by Device/Browser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-600">
                ✅ Should Show Apple Pay:
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>iPhone/iPad in Safari</li>
                <li>Mac with Touch ID in Safari</li>
                <li>Mac with paired iPhone/Apple Watch in Safari</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600">
                ✅ Should Show Google Pay:
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Android devices in Chrome</li>
                <li>Chrome on any desktop (if Google Pay is set up)</li>
                <li>Edge/Safari on desktop (limited support)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-600">
                ❌ Won't Show Digital Wallets:
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Firefox (limited support)</li>
                <li>Private/Incognito mode (often disabled)</li>
                <li>Devices without wallet setup</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
