import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface IntakeFormData {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
}

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  isSubmitting?: boolean;
}

const reasonOptions = [
  {
    value: "going-through-something",
    label: "Life is life-ing 🫠",
    emoji: "🫠",
  },
  {
    value: "just-curious",
    label: "What's everyone doing lately? 👀",
    emoji: "👀",
  },
  {
    value: "spiritual-glow-up",
    label: "Main character reset ✨",
    emoji: "✨",
  },
  {
    value: "here-for-chicken",
    label: "Let's build my health team 🤩",
    emoji: "🤩",
  },
];

export default function IntakeForm({
  onSubmit,
  isSubmitting = false,
}: IntakeFormProps) {
  const { toast } = useToast();
  const [isSubmittingToSheet, setIsSubmittingToSheet] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IntakeFormData>({
    mode: "onChange",
  });

  const submitToGoogleSheet = async (data: IntakeFormData) => {
    const GOOGLE_SHEET_URL =
      import.meta.env.VITE_GOOGLE_SHEET_URL ||
      "https://script.google.com/macros/s/AKfycbxkHY053w1TXg4IYmMXL2w0zCfhRwdr-pqANjbJC-DHRPBTZ7NGcYaEHzXnuW7v9xM-/exec";

    try {
      // Method 1: Send as URL-encoded form data (works better with Google Apps Script)
      const formData = new URLSearchParams();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("reason", data.reason);
      formData.append("timestamp", new Date().toISOString());

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow", // Follow redirects automatically
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the response as text first to see what we're actually getting
      const responseText = await response.text();
      console.log("Raw response from Google Sheets:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
        console.log("Parsed Google Sheets response:", result);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        console.log(
          "Response was not valid JSON. This might be an HTML redirect page."
        );
        throw new Error(
          "Invalid response from Google Sheets - got HTML instead of JSON"
        );
      }

      if (!result.success) {
        throw new Error(result.error || "Unknown error from Google Sheets");
      }

      return true;
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (data: IntakeFormData) => {
    setIsSubmittingToSheet(true);

    try {
      // Submit to Google Sheets
      await submitToGoogleSheet(data);

      // toast({
      //   title: "Thank you! 💜",
      //   description:
      //     "We've received your information and will be in touch soon.",
      // });

      // Call the parent onSubmit function
      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Oops! Something went wrong 😔",
        description: `Please try again or contact us directly. Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingToSheet(false);
    }
  };

  const isFormSubmitting = isSubmitting || isSubmittingToSheet;

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8"
        style={{ boxShadow: "0 4px 20px rgba(139, 127, 207, 0.08)" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Tell us about yourself
          </h2>
          {/* <p className="text-gray-600">
            Help us provide you with the best care recommendations
          </p> */}
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 1, message: "First name is required" },
                })}
                placeholder="Your first name"
                className="transition-all duration-300 focus:scale-[1.02]"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 1, message: "Last name is required" },
                })}
                placeholder="Your last name"
                className="transition-all duration-300 focus:scale-[1.02]"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="your.email@example.com"
              className="transition-all duration-300 focus:scale-[1.02]"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Reason for Visit */}
          <div className="space-y-4">
            <Label className="text-gray-700 font-medium">
              What brings you here today? *
            </Label>
            <Controller
              name="reason"
              control={control}
              rules={{ required: "Please select a reason" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  {reasonOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="text-purple-600"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-gray-700 font-medium"
                      >
                        {option.label}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            className="pt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={!isValid || isFormSubmitting}
              className="w-full bg-gradient-to-r from-[var(--care-purple)] to-[var(--care-blue)] text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isFormSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Getting your matches ready...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Get My Matches
                </>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            We respect your privacy. Your information is secure and will only be
            used to provide you with personalized care recommendations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
