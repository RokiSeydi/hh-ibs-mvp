import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createWaitlistEntry } from "../../server/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Waitlist signup called:", {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    const { email, name } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Create waitlist entry (no payment required)
    const waitlistEntry = await createWaitlistEntry(email, name);

    console.log("Waitlist signup completed:", {
      email: waitlistEntry.email,
      name: waitlistEntry.name,
    });

    res.status(200).json({
      success: true,
      waitlistId: `waitlist_${Date.now()}`,
      email: waitlistEntry.email,
      name: waitlistEntry.name,
      message: "Successfully joined the waitlist! We'll notify you when the next cohort opens.",
      status: "active",
      position: Math.floor(Math.random() * 100) + 1, // Mock position for demo
    });
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    res.status(500).json({
      error: "Waitlist signup failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
