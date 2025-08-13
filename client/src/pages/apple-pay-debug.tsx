import { useState, useEffect } from "react";
import stripePromise from "../lib/stripe";

// Type declarations for browser APIs
declare global {
  interface Window {
    ApplePaySession?: any;
    google?: any;
  }
}

export default function ApplePayDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [stripeStatus, setStripeStatus] = useState<string>("Loading...");

  useEffect(() => {
    const checkEverything = async () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isHTTPS: window.location.protocol === 'https:',
        url: window.location.href,
        platform: navigator.platform,
        language: navigator.language,
      };

      // Check if we're on a supported device
      const userAgent = navigator.userAgent.toLowerCase();
      info.isIOS = /iphone|ipad|ipod/.test(userAgent);
      info.isMac = /macintosh/.test(userAgent);
      info.isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      info.isChrome = /chrome/.test(userAgent);
      info.isAndroid = /android/.test(userAgent);

      // Check Apple Pay API availability
      if (window.ApplePaySession) {
        info.applePaySessionAvailable = true;
        info.applePayVersion = window.ApplePaySession.version;
        info.canMakePayments = window.ApplePaySession.canMakePayments();
        
        try {
          info.canMakePaymentsWithActiveCard = await window.ApplePaySession.canMakePaymentsWithActiveCard('merchant.com.example');
        } catch (e) {
          info.canMakePaymentsWithActiveCard = `Error: ${e}`;
        }
      } else {
        info.applePaySessionAvailable = false;
      }

      // Check Google Pay API
      if (window.google?.payments?.api) {
        info.googlePayAvailable = true;
      } else {
        info.googlePayAvailable = false;
      }

      // Check Stripe
      try {
        const stripe = await stripePromise;
        if (stripe) {
          setStripeStatus("✅ Stripe loaded successfully");
          
          // Test Payment Request
          const pr = stripe.paymentRequest({
            country: "GB",
            currency: "gbp",
            total: {
              label: "Test Payment",
              amount: 1000,
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });

          const canMakePayment = await pr.canMakePayment();
          info.stripeCanMakePayment = canMakePayment;
          
          if (canMakePayment) {
            info.supportedMethods = {
              applePay: canMakePayment.applePay || false,
              googlePay: canMakePayment.googlePay || false,
            };
          }
        } else {
          setStripeStatus("❌ Stripe failed to load");
          info.stripeError = "Stripe instance is null";
        }
      } catch (error) {
        setStripeStatus(`❌ Stripe error: ${error}`);
        info.stripeError = error;
      }

      setDebugInfo(info);
    };

    checkEverything();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Apple Pay Debug Information</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Stripe Status</h2>
        <p className="font-mono text-sm">{stripeStatus}</p>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <pre className="text-xs overflow-auto bg-gray-50 p-4 rounded">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Quick Diagnosis:</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• <strong>HTTPS Required:</strong> {debugInfo.isHTTPS ? '✅ Yes' : '❌ No (Apple Pay needs HTTPS)'}</li>
          <li>• <strong>Apple Device:</strong> {debugInfo.isIOS || debugInfo.isMac ? '✅ Yes' : '❌ No'}</li>
          <li>• <strong>Safari Browser:</strong> {debugInfo.isSafari ? '✅ Yes' : '❌ No (Apple Pay needs Safari)'}</li>
          <li>• <strong>Apple Pay API:</strong> {debugInfo.applePaySessionAvailable ? '✅ Available' : '❌ Not Available'}</li>
          <li>• <strong>Stripe Loaded:</strong> {stripeStatus.includes('✅') ? '✅ Yes' : '❌ No'}</li>
        </ul>
      </div>

      <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Testing Apple Pay:</h3>
        <p className="text-yellow-700 text-sm">
          To test Apple Pay properly, you need:
          <br />• Deploy to HTTPS (Vercel, Netlify, etc.)
          <br />• Use Safari on iPhone/iPad or Safari on Mac with Touch ID
          <br />• Have a card added to Apple Wallet
        </p>
      </div>
    </div>
  );
}
