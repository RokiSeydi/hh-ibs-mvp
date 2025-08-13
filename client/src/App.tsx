import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing-page";
import CareAssistant from "@/pages/care-assistant";
import Confirmation from "@/pages/confirmation";
import SubscriptionPage from "@/pages/subscribe";
import PaymentSuccessPage from "@/pages/payment-success";
import StripeSuccessPage from "@/pages/stripe-success";
import PaymentCancelledPage from "@/pages/payment-cancelled";
import WalletTestPage from "@/pages/wallet-test";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/get-started" component={CareAssistant} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/subscribe" component={SubscriptionPage} />
      <Route path="/payment/success" component={StripeSuccessPage} />
      <Route path="/payment/cancelled" component={PaymentCancelledPage} />
      <Route path="/test-wallets" component={WalletTestPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
