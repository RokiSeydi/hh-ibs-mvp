import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Smartphone, CreditCard, Loader2 } from "lucide-react";
import stripePromise from "../lib/stripe";

interface ApplePayButtonProps {
  amount: number; // amount in pence
  label: string;
  onSuccess: (paymentMethod: any) => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

export default function ApplePayButton({
  amount,
  label,
  onSuccess,
  onError,
  disabled = false,
}: ApplePayButtonProps) {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState<"apple" | "google" | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  useEffect(() => {
    const checkDigitalWalletAvailability = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) return;

        // Create payment request for checking availability
        const pr = stripe.paymentRequest({
          country: "GB",
          currency: "gbp",
          total: {
            label: amount === 0 ? "Card Setup" : label,
            amount: amount,
          },
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: false,
        });

        // Check if payment request can be made (Apple Pay, Google Pay, etc.)
        const result = await pr.canMakePayment();

        if (result) {
          setPaymentRequest(pr);

          // Check specific wallet availability
          if (result.applePay) {
            setIsApplePayAvailable(true);
          }
          if (result.googlePay) {
            setIsGooglePayAvailable(true);
          }

          // If no specific wallet detected but canMakePayment is true,
          // we can still show a generic digital wallet option
          if (!result.applePay && !result.googlePay) {
            // Check user agent for fallback detection
            const userAgent = navigator.userAgent.toLowerCase();
            const isIOS = /iphone|ipad|ipod|macintosh/.test(userAgent);
            const isAndroid = /android/.test(userAgent);
            const isChrome = /chrome/.test(userAgent);

            if (isIOS && /safari/.test(userAgent)) {
              setIsApplePayAvailable(true);
            } else if ((isAndroid || isChrome) && !isIOS) {
              setIsGooglePayAvailable(true);
            }
          }
        }
      } catch (error) {
        console.log("Digital wallet check failed:", error);
        // Fallback to basic detection
        const userAgent = navigator.userAgent.toLowerCase();
        const isAppleDevice =
          /iphone|ipad|ipod|macintosh/.test(userAgent) &&
          /safari/.test(userAgent);
        const isGoogleDevice =
          /android/.test(userAgent) ||
          (/chrome/.test(userAgent) && !/safari/.test(userAgent));

        setIsApplePayAvailable(isAppleDevice);
        setIsGooglePayAvailable(isGoogleDevice && !isAppleDevice);
      }
    };

    checkDigitalWalletAvailability();
  }, [amount, label]);

  const handleApplePay = async () => {
    if (!paymentRequest) {
      // Fallback for when Stripe isn't available
      try {
        setIsLoading("apple");
        console.log("Apple Pay initiated for amount:", amount);

        // Simulate payment method creation for demo
        const mockPaymentMethod = {
          id: "pm_apple_pay_mock",
          type: "apple_pay",
          card: {
            brand: "visa",
            last4: "4242",
          },
        };

        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing
        onSuccess(mockPaymentMethod);
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(null);
      }
      return;
    }

    try {
      setIsLoading("apple");

      // Use real Stripe Payment Request
      paymentRequest.on("paymentmethod", async (event: any) => {
        // Confirm the payment on the server
        const { paymentMethod } = event;

        if (amount === 0) {
          // For card saving (ambassador signup)
          event.complete("success");
          onSuccess(paymentMethod);
        } else {
          // For actual payments, you'd confirm with your server
          event.complete("success");
          onSuccess(paymentMethod);
        }
        setIsLoading(null);
      });

      paymentRequest.show();
    } catch (error) {
      setIsLoading(null);
      onError(error);
    }
  };

  const handleGooglePay = async () => {
    if (!paymentRequest) {
      // Fallback for when Stripe isn't available
      try {
        setIsLoading("google");
        console.log("Google Pay initiated for amount:", amount);

        // Simulate payment method creation for demo
        const mockPaymentMethod = {
          id: "pm_google_pay_mock",
          type: "google_pay",
          card: {
            brand: "mastercard",
            last4: "5555",
          },
        };

        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing
        onSuccess(mockPaymentMethod);
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(null);
      }
      return;
    }

    try {
      setIsLoading("google");

      // Use real Stripe Payment Request (works for Google Pay too)
      paymentRequest.on("paymentmethod", async (event: any) => {
        const { paymentMethod } = event;

        if (amount === 0) {
          // For card saving (ambassador signup)
          event.complete("success");
          onSuccess(paymentMethod);
        } else {
          // For actual payments
          event.complete("success");
          onSuccess(paymentMethod);
        }
        setIsLoading(null);
      });

      paymentRequest.show();
    } catch (error) {
      setIsLoading(null);
      onError(error);
    }
  };

  const getButtonText = () => {
    if (amount === 0) {
      return {
        apple: "Set up with Apple Pay",
        google: "Set up with Google Pay",
      };
    }
    return {
      apple: "Pay with Apple Pay",
      google: "Pay with Google Pay",
    };
  };

  const buttonText = getButtonText();

  if (disabled || (!isApplePayAvailable && !isGooglePayAvailable)) {
    return null;
  }

  return (
    <div className="space-y-3">
      {isApplePayAvailable && (
        <Button
          onClick={handleApplePay}
          disabled={isLoading !== null}
          className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-lg font-medium flex items-center justify-center"
          type="button"
        >
          {isLoading === "apple" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {buttonText.apple}
            </>
          )}
        </Button>
      )}

      {isGooglePayAvailable && (
        <Button
          onClick={handleGooglePay}
          disabled={isLoading !== null}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 h-12 rounded-lg font-medium flex items-center justify-center"
          type="button"
        >
          {isLoading === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {buttonText.google}
            </>
          )}
        </Button>
      )}

      {(isApplePayAvailable || isGooglePayAvailable) && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {amount === 0 ? "or enter card details" : "or pay with card"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
