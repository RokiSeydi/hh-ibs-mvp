import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  console.log("Test endpoint called:", {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  res.status(200).json({
    message: "Hello from pages/api/test!",
    timestamp: new Date().toISOString(),
    method: req.method,
  });
}
