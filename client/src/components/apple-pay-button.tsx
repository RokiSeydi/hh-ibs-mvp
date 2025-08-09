import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Smartphone, CreditCard } from "lucide-react";

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
  disabled = false 
}: ApplePayButtonProps) {
  const [isAppleDevice, setIsAppleDevice] = useState(false);
  const [isAndroidDevice, setIsAndroidDevice] = useState(false);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    setIsAppleDevice(isIOS);
    setIsAndroidDevice(isAndroid);
  }, []);

  const handleApplePay = async () => {
    try {
      // In a real implementation, this would use Apple Pay JS API
      // For now, we'll simulate the process
      console.log('Apple Pay initiated for amount:', amount);
      
      // Simulate payment method creation
      const mockPaymentMethod = {
        id: 'pm_apple_pay_mock',
        type: 'apple_pay',
        card: {
          brand: 'visa',
          last4: '4242'
        }
      };
      
      onSuccess(mockPaymentMethod);
    } catch (error) {
      onError(error);
    }
  };

  const handleGooglePay = async () => {
    try {
      // In a real implementation, this would use Google Pay API
      // For now, we'll simulate the process
      console.log('Google Pay initiated for amount:', amount);
      
      // Simulate payment method creation
      const mockPaymentMethod = {
        id: 'pm_google_pay_mock',
        type: 'google_pay',
        card: {
          brand: 'mastercard',
          last4: '5555'
        }
      };
      
      onSuccess(mockPaymentMethod);
    } catch (error) {
      onError(error);
    }
  };

  const getButtonText = () => {
    if (amount === 0) {
      return {
        apple: 'Set up with Apple Pay',
        google: 'Set up with Google Pay'
      };
    }
    return {
      apple: 'Pay with Apple Pay',
      google: 'Pay with Google Pay'
    };
  };

  const buttonText = getButtonText();

  if (disabled) return null;

  return (
    <div className="space-y-3">
      {isAppleDevice && (
        <Button
          onClick={handleApplePay}
          className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-lg font-medium"
          type="button"
        >
          <Smartphone className="w-5 h-5 mr-2" />
          {buttonText.apple}
        </Button>
      )}
      
      {isAndroidDevice && (
        <Button
          onClick={handleGooglePay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium"
          type="button"
        >
          <Smartphone className="w-5 h-5 mr-2" />
          {buttonText.google}
        </Button>
      )}
      
      {(isAppleDevice || isAndroidDevice) && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {amount === 0 ? 'or enter card details' : 'or pay with card'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
