import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("Test API called:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(200).json({
      success: true,
      message: "Test endpoint working",
      method: req.method,
      timestamp: new Date().toISOString(),
      body: req.body,
      url: req.url,
    });
  } catch (error) {
    console.error("Test endpoint failed:", error);
    res.status(500).json({
      error: "Test endpoint failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
