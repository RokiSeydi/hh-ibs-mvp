import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Heart, Users, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analytics } from "../lib/client-analytics";

// Simple referral tracking (for demo purposes)
interface ReferralStats {
  count: number;
  spotsLeft: number;
  progressPercentage: number;
  isComplete: boolean;
}

interface ThankYouProps {
  onBack: () => void;
  userEmail?: string;
}

export default function ThankYou({ onBack, userEmail }: ThankYouProps) {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [stats, setStats] = useState<ReferralStats>({
    count: 0,
    spotsLeft: 10,
    progressPercentage: 0,
    isComplete: false,
  });

  useEffect(() => {
    // Generate referral code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralCode(code);

    // Create share URL
    const currentUrl = window.location.origin;
    setShareUrl(`${currentUrl}?ref=${code}`);

    // Load or initialize referral data
    const savedCount = localStorage.getItem(`referral_${code}`);
    const count = savedCount ? parseInt(savedCount) : 0;
    setStats({
      count,
      spotsLeft: Math.max(0, 10 - count),
      progressPercentage: (count / 10) * 100,
      isComplete: count >= 10,
    });

    // Track waitlist signup
    if (userEmail) {
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref");

      analytics.trackWaitlistSignup({
        email: userEmail,
        referralCode: code,
        referredBy: referralCode || undefined,
      });
    }
  }, [userEmail]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: string) => {
    const text =
      "Match with the care you need — we’ll cover the cost 🫶 Join Holding Health.";

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(shareUrl)}`,
      instagram: shareUrl,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        text + " " + shareUrl
      )}`,
      messages: `sms:?body=${encodeURIComponent(text + " " + shareUrl)}`,
    };

    if (platform === "instagram") {
      copyToClipboard();
      alert("Link copied! Share it in your Instagram story or DMs 💕");
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">💖</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You're in! Thank you 🥹
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            We'll let you know the moment spots open. But here's how you can
            skip the line...
          </p>
        </motion.div>

        {/* Referral Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6" />
                <h2 className="text-xl font-bold">
                  Skip the Waitlist Challenge
                </h2>
              </div>

              <p className="mb-4 opacity-90">
                Get 10 friends to join and we'll save you a guaranteed spot for
                the next drop!
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>{stats.count}/10 friends joined</span>
                  <span>{stats.spotsLeft} more to go!</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    className="bg-white h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.progressPercentage}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </div>

              {stats.isComplete ? (
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <Sparkles className="h-5 w-5 mx-auto mb-2" />
                  <p className="font-semibold">
                    🎉 Congratulations! You've secured your spot!
                  </p>
                </div>
              ) : (
                <div className="text-sm opacity-90">
                  💡 <strong>Pro tip:</strong> Share in your group chats,
                  Instagram stories, or with friends who need some (free) care
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sharing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share your link
              </h3>

              {/* Referral Code Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Your referral code:
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-mono font-bold text-purple-600">
                    {referralCode}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={() => shareOnSocial("whatsapp")}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  WhatsApp
                </Button>
                <Button
                  onClick={() => shareOnSocial("messages")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Messages
                </Button>
                <Button
                  onClick={() => shareOnSocial("twitter")}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Twitter
                </Button>
                <Button
                  onClick={() => shareOnSocial("instagram")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                Why we're asking you to share
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  We’re creating a new kind of healthcare — free, tailored,
                  built by you.
                </p>
                <p>Because you know you best.</p>
                <p>And the waitlist’s growing.</p>
                <p>Pull up</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            ← Back to recommendations
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
