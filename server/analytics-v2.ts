import { google } from "googleapis";
import path from "path";

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "google-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Sheet IDs from environment variables
const SHEET_IDS = {
  FORM_SUBMISSIONS: process.env.GOOGLE_SHEETS_FORM_SUBMISSIONS_ID,
  SWIPE_ACTIONS: process.env.GOOGLE_SHEETS_SWIPE_ACTIONS_ID,
  TIER_SELECTIONS: process.env.GOOGLE_SHEETS_TIER_SELECTIONS_ID,
  AMBASSADOR_APPS: process.env.GOOGLE_SHEETS_AMBASSADOR_APPS_ID,
  FEEDBACK_APPS: process.env.GOOGLE_SHEETS_FEEDBACK_APPS_ID,
  WAITLIST_SIGNUPS: process.env.GOOGLE_SHEETS_WAITLIST_SIGNUPS_ID,
  PAYMENT_SUCCESS: process.env.GOOGLE_SHEETS_PAYMENT_SUCCESS_ID,
} as const;

// Helper function to append data to a sheet
const appendToSheet = async (sheetId: string | undefined, values: any[][]) => {
  if (!sheetId) {
    console.warn("Sheet ID not configured");
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:Z",
      valueInputOption: "RAW",
      requestBody: { values },
    });
  } catch (error) {
    console.error("Failed to append to Google Sheet:", error);
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

  await appendToSheet(SHEET_IDS.FORM_SUBMISSIONS, values);
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

  await appendToSheet(SHEET_IDS.SWIPE_ACTIONS, values);
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

  await appendToSheet(SHEET_IDS.TIER_SELECTIONS, values);
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

  await appendToSheet(SHEET_IDS.AMBASSADOR_APPS, values);
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

  await appendToSheet(SHEET_IDS.FEEDBACK_APPS, values);
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

  await appendToSheet(SHEET_IDS.WAITLIST_SIGNUPS, values);
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

  await appendToSheet(SHEET_IDS.PAYMENT_SUCCESS, values);
};
