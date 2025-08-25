import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, referralCode } = req.body;
    const GOOGLE_SHEET_URL = process.env.VITE_GOOGLE_SHEET_URL;

    if (!GOOGLE_SHEET_URL) {
      throw new Error("Google Sheet URL not configured");
    }

    // Forward the request to Google Apps Script
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        email,
        referralCode,
        eventType: "waitlist_signup",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Waitlist proxy error:", error);
    return res.status(500).json({ error: "Failed to submit to waitlist" });
  }
}
