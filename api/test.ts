import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Test endpoint called with:', req.body);
    
    res.json({ 
      success: true, 
      message: 'Test endpoint working',
      timestamp: new Date().toISOString(),
      body: req.body
    });
  } catch (error) {
    console.error("Test endpoint failed:", error);
    res.status(500).json({ 
      error: "Test endpoint failed",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
