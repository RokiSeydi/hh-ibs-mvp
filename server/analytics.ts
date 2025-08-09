import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "google-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Single Google Sheet ID from environment variables
const MAIN_SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Helper function to append data to a specific sheet tab
const appendToSheet = async (tabName: string, values: any[][]) => {
  if (!MAIN_SHEET_ID) {
    console.warn("Google Sheet ID not configured");
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: MAIN_SHEET_ID,
      range: `${tabName}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values },
    });
  } catch (error) {
    console.error(`Failed to append to Google Sheet tab "${tabName}":`, error);
  }
};

// Analytics tracking functions
export const trackFormSubmission = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
}) => {
  const values = [
    [
      new Date().toISOString(),
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.reason,
    ],
  ];

  await appendToSheet("Form Submissions", values);
};

export const trackSwipeAction = async (swipeData: {
  email: string;
  providerId: number;
  providerName: string;
  providerType: string;
  action: "swipe_left" | "swipe_right";
}) => {
  const values = [
    [
      new Date().toISOString(),
      swipeData.email,
      swipeData.providerId,
      swipeData.providerName,
      swipeData.providerType,
      swipeData.action,
    ],
  ];

  await appendToSheet("Swipe Actions", values);
};

export const trackTierSelection = async (tierData: {
  email: string;
  tier: "ambassador" | "feedback" | "waitlist";
  selectedProviders: any[];
}) => {
  const values = [
    [
      new Date().toISOString(),
      tierData.email,
      tierData.tier,
      tierData.selectedProviders.length,
      tierData.selectedProviders.map((p) => p.name || p).join(", "),
    ],
  ];

  await appendToSheet("Tier Selections", values);
};

export const trackAmbassadorApplication = async (appData: {
  email: string;
  socialHandle: string;
  platform: string;
  followerCount: string;
  contentStyle: string;
  whyAmbassador: string;
  paymentMethod?: string;
}) => {
  const values = [
    [
      new Date().toISOString(),
      appData.email,
      appData.socialHandle,
      appData.platform,
      appData.followerCount,
      appData.contentStyle,
      appData.whyAmbassador,
      appData.paymentMethod || "",
    ],
  ];

  await appendToSheet("Ambassador Applications", values);
};

export const trackFeedbackApplication = async (appData: {
  email: string;
  experienceLevel: string;
  interests: string;
  feedbackStyle: string;
  availability: string;
  whyFeedback: string;
  paymentMethod?: string;
}) => {
  const values = [
    [
      new Date().toISOString(),
      appData.email,
      appData.experienceLevel,
      appData.interests,
      appData.feedbackStyle,
      appData.availability,
      appData.whyFeedback,
      appData.paymentMethod || "",
    ],
  ];

  await appendToSheet("Feedback Applications", values);
};

export const trackWaitlistSignup = async (waitlistData: {
  email: string;
  referralCode?: string;
  referredBy?: string;
}) => {
  const values = [
    [
      new Date().toISOString(),
      waitlistData.email,
      waitlistData.referralCode || "",
      waitlistData.referredBy || "",
    ],
  ];

  await appendToSheet("Waitlist Signups", values);
};

export const trackPaymentSuccess = async (paymentData: {
  email: string;
  tier: string;
  paymentMethod: string;
  amount: number;
  transactionId?: string;
}) => {
  const values = [
    [
      new Date().toISOString(),
      paymentData.email,
      paymentData.tier,
      paymentData.paymentMethod,
      paymentData.amount,
      paymentData.transactionId || "",
    ],
  ];

  await appendToSheet("Payment Success", values);
};
