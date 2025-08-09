import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  CheckCircle,
  Star,
  Users,
  Heart,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { type Provider } from "../data/providers";

interface ProgramSuccessProps {
  onStartOver: () => void;
  selectedProviders: Provider[];
  programType?: "ambassador" | "feedback" | "payment" | "waitlist";
}

export default function ProgramSuccess({
  onStartOver,
  selectedProviders,
  programType = "payment",
}: ProgramSuccessProps) {
  const getSuccessMessage = () => {
    switch (programType) {
      case "ambassador":
        return {
          title: "Welcome to the Ambassador Program! ✨",
          subtitle: "Your application has been submitted successfully",
          description:
            "We'll review your application and get back to you within 48 hours. If approved, you'll receive your 3-month free access credentials and ambassador resources.",
          icon: <Star className="w-12 h-12 text-purple-500" />,
          color: "from-purple-500 to-pink-500",
        };
      case "feedback":
        return {
          title: "Welcome to HH Feedback Program! 💙",
          subtitle: "You're now part of our exclusive feedback community",
          description:
            "Your HH reviewer pricing (£15/month for 3 months) is active! We'll reach out soon with your first feedback opportunity and access credentials.",
          icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
          color: "from-blue-500 to-cyan-500",
        };
      case "waitlist":
        return {
          title: "You're on the List! 🎉",
          subtitle: "Welcome to the exclusive waitlist",
          description:
            "Share with 10 friends to guarantee your spot in the next drop. You'll receive updates on your referral progress and be the first to know when we launch.",
          icon: <Users className="w-12 h-12 text-orange-500" />,
          color: "from-orange-500 to-red-500",
        };
      default:
        return {
          title: "Welcome to the Community! 🎉",
          subtitle: "Your membership is now active",
          description:
            "You now have access to our full network of verified wellness providers. Check your email for next steps and booking instructions.",
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          color: "from-green-500 to-emerald-500",
        };
    }
  };

  const message = getSuccessMessage();

  const getNextSteps = () => {
    switch (programType) {
      case "ambassador":
        return [
          "Check your email for application status updates",
          "Prepare your content calendar for when you're approved",
        ];
      case "feedback":
        return [
          "Look out for your VIP access credentials",
          "Expect your first feedback request within a week",
        ];
      case "waitlist":
        return [
          "Share your referral link with friends and family",
          "Track your progress in the thank you page",
        ];
      default:
        return [
          "Check your email for booking instructions",
          "Book your first session within 7 days",
        ];
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            {message.icon}
          </motion.div>
          <h1
            className={`text-3xl font-bold mt-4 bg-gradient-to-r ${message.color} bg-clip-text text-transparent`}
          >
            {message.title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{message.subtitle}</p>
          <p className="text-gray-600 mt-4 max-w-lg mx-auto">
            {message.description}
          </p>
        </div>

        <Card className="mb-8 text-left">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Your Selected Providers
            </CardTitle>
            <CardDescription>
              Ready to connect with these amazing professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {selectedProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {provider.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {provider.type}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    ⭐ Verified
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-left">
              {getNextSteps().map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          {programType === "ambassador" || programType === "feedback" ? (
            <p className="text-sm text-gray-500">
              Questions? Email us at info@weatholdinghealth.com
            </p>
          ) : null}

          <Button
            onClick={onStartOver}
            variant="outline"
            className="mx-auto block"
          >
            Start a New Search
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
