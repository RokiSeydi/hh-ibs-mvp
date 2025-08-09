import { google } from "googleapis";

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "your-sheet-id-here";
const GOOGLE_CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
  : null;

// Initialize Google Sheets API
const getGoogleSheetsInstance = async () => {
  if (!GOOGLE_CREDENTIALS) {
    console.warn("Google Sheets credentials not configured");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

// Analytics tracking functions
export const trackFormSubmission = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  timestamp?: string;
}) => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    const values = [
      [
        new Date().toISOString(),
        "form_submission",
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.reason,
        "", // provider_id
        "", // action
        "", // tier
        "", // payment_method
        "", // metadata
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log("Form submission tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking form submission:", error);
  }
};

export const trackSwipeAction = async (swipeData: {
  email: string;
  providerId: number;
  providerName: string;
  providerType: string;
  action: "swipe_left" | "swipe_right";
  metadata?: any;
}) => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    const values = [
      [
        new Date().toISOString(),
        "swipe_action",
        "", // firstName
        "", // lastName
        swipeData.email,
        "", // reason
        swipeData.providerId,
        swipeData.action,
        "", // tier
        "", // payment_method
        JSON.stringify({
          providerName: swipeData.providerName,
          providerType: swipeData.providerType,
          ...swipeData.metadata,
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log("Swipe action tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking swipe action:", error);
  }
};

export const trackTierSelection = async (tierData: {
  email: string;
  tier: "ambassador" | "feedback" | "waitlist";
  selectedProviders: any[];
}) => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    const values = [
      [
        new Date().toISOString(),
        "tier_selection",
        "", // firstName
        "", // lastName
        tierData.email,
        "", // reason
        "", // provider_id
        "tier_selected",
        tierData.tier,
        "", // payment_method
        JSON.stringify({
          selectedProviders: tierData.selectedProviders.map((p) => ({
            id: p.id,
            name: p.name,
            type: p.type,
          })),
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log("Tier selection tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking tier selection:", error);
  }
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
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    // Track to main actions sheet
    const mainValues = [
      [
        new Date().toISOString(),
        "ambassador_application",
        "", // firstName
        "", // lastName
        appData.email,
        "", // reason
        "", // provider_id
        "application_submitted",
        "ambassador",
        appData.paymentMethod || "",
        JSON.stringify({
          socialHandle: appData.socialHandle,
          platform: appData.platform,
          followerCount: appData.followerCount,
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { mainValues },
    });

    // Track detailed application to dedicated sheet
    const detailedValues = [
      [
        new Date().toISOString(),
        appData.email,
        appData.socialHandle,
        appData.platform,
        appData.followerCount,
        appData.contentStyle,
        appData.whyAmbassador,
        appData.paymentMethod || "",
        "pending", // status
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Ambassador_Applications!A:I",
      valueInputOption: "RAW",
      requestBody: { values: detailedValues },
    });

    console.log("Ambassador application tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking ambassador application:", error);
  }
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
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    // Track to main actions sheet
    const mainValues = [
      [
        new Date().toISOString(),
        "feedback_application",
        "", // firstName
        "", // lastName
        appData.email,
        "", // reason
        "", // provider_id
        "application_submitted",
        "feedback",
        appData.paymentMethod || "",
        JSON.stringify({
          experienceLevel: appData.experienceLevel,
          interests: appData.interests,
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values: mainValues },
    });

    // Track detailed application to dedicated sheet
    const detailedValues = [
      [
        new Date().toISOString(),
        appData.email,
        appData.experienceLevel,
        appData.interests,
        appData.feedbackStyle,
        appData.availability,
        appData.whyFeedback,
        appData.paymentMethod || "",
        "active", // status
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Feedback_Members!A:I",
      valueInputOption: "RAW",
      requestBody: { values: detailedValues },
    });

    console.log("Feedback application tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking feedback application:", error);
  }
};

export const trackWaitlistSignup = async (waitlistData: {
  email: string;
  referralCode?: string;
  referredBy?: string;
}) => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    const values = [
      [
        new Date().toISOString(),
        "waitlist_signup",
        "", // firstName
        "", // lastName
        waitlistData.email,
        "", // reason
        "", // provider_id
        "waitlist_joined",
        "waitlist",
        "", // payment_method
        JSON.stringify({
          referralCode: waitlistData.referralCode,
          referredBy: waitlistData.referredBy,
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log("Waitlist signup tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking waitlist signup:", error);
  }
};

export const trackPaymentSuccess = async (paymentData: {
  email: string;
  tier: string;
  paymentMethod: string;
  amount: number;
  transactionId?: string;
}) => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    const values = [
      [
        new Date().toISOString(),
        "payment_success",
        "", // firstName
        "", // lastName
        paymentData.email,
        "", // reason
        "", // provider_id
        "payment_completed",
        paymentData.tier,
        paymentData.paymentMethod,
        JSON.stringify({
          amount: paymentData.amount,
          transactionId: paymentData.transactionId,
        }),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "User_Actions!A:K",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log("Payment success tracked to Google Sheets");
  } catch (error) {
    console.error("Error tracking payment success:", error);
  }
};

// Utility function to create sheet headers if needed
export const initializeSheets = async () => {
  try {
    const sheets = await getGoogleSheetsInstance();
    if (!sheets) return;

    // Headers for main actions sheet
    const mainHeaders = [
      "Timestamp",
      "Event_Type",
      "First_Name",
      "Last_Name",
      "Email",
      "Reason",
      "Provider_ID",
      "Action",
      "Tier",
      "Payment_Method",
      "Metadata",
    ];

    // Headers for ambassador applications
    const ambassadorHeaders = [
      "Timestamp",
      "Email",
      "Social_Handle",
      "Platform",
      "Follower_Count",
      "Content_Style",
      "Why_Ambassador",
      "Payment_Method",
      "Status",
    ];

    // Headers for feedback members
    const feedbackHeaders = [
      "Timestamp",
      "Email",
      "Experience_Level",
      "Interests",
      "Feedback_Style",
      "Availability",
      "Why_Feedback",
      "Payment_Method",
      "Status",
    ];

    console.log("Google Sheets analytics initialized");
  } catch (error) {
    console.error("Error initializing sheets:", error);
  }
};
