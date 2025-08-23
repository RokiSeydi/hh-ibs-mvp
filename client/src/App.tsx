import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from '@vercel/analytics/react';
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing-page";
import CareAssistant from "@/pages/care-assistant";
import Confirmation from "@/pages/confirmation";
import SubscriptionPage from "@/pages/subscribe";
import PaymentSuccessPage from "@/pages/payment-success";
import StripeSuccessPage from "@/pages/stripe-success";
import PaymentCancelledPage from "@/pages/payment-cancelled";
import WalletTestPage from "@/pages/wallet-test";
import ApplePayDebugPage from "@/pages/apple-pay-debug";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/get-started" component={CareAssistant} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/subscribe" component={SubscriptionPage} />
      <Route path="/payment/success" component={StripeSuccessPage} />
      <Route path="/payment/cancelled" component={PaymentCancelledPage} />
      <Route path="/wallet-test" component={WalletTestPage} />
      <Route path="/apple-pay-debug" component={ApplePayDebugPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default App;
