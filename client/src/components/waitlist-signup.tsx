import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { analytics } from "@/lib/client-analytics";

interface WaitlistSignupProps {
  variant?: "hero" | "inline";
  className?: string;
}

export default function WaitlistSignup({
  variant = "inline",
  className = "",
}: WaitlistSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use existing analytics system for waitlist signup
      await analytics.trackWaitlistSignup({
        email: email,
        referralCode: variant === "hero" ? "hero_section" : "waitlist_section",
      });

      setIsSubmitted(true);
      setEmail("");

      toast({
        title: "You're on the waitlist! 🎉",
        description: "We'll notify you as soon as we launch.",
      });
    } catch (error) {
      console.error("Waitlist signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && variant === "inline") {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">
          Thanks! You're on the waitlist.
        </span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`max-w-md mx-auto ${className}`}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Input
              type="email"
              placeholder="join the waitlist"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-36 py-6 text-lg"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "let's go!"
              )}
            </Button>
          </div>
        </form>
        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">You're on the waitlist!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              We'll notify you as soon as we launch.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Inline variant (for buttons)
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 items-center ${className}`}
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
          disabled={isSubmitting}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
      </Button>
    </form>
  );
}
