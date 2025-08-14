import { VercelRequest, VercelResponse } from "@vercel/node";
import { createWaitlistEntry } from "../server/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { email, name } = req.body;

    // Basic validation
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Create waitlist entry (no payment required)
    const waitlistEntry = await createWaitlistEntry(email, name);

    res.status(200).json({
      success: true,
      waitlistId: `waitlist_${Date.now()}`,
      email: waitlistEntry.email,
      message: "Successfully joined the waitlist! We'll notify you when the next cohort opens.",
      status: "active",
      position: Math.floor(Math.random() * 100) + 1, // Mock position for demo
    });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
