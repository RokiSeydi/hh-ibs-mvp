import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, billingName, cardNumber, expiryDate, cvv, ...formData } = req.body;

    // Validate required fields
    if (!email || !billingName || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    // Additional validation for Safari compatibility
    const sanitizedCardNumber = String(cardNumber).replace(/\D/g, '');
    const sanitizedExpiryDate = String(expiryDate).replace(/\D/g, '');
    const sanitizedCvv = String(cvv).replace(/\D/g, '');

    if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 19) {
      return res.status(400).json({ error: "Invalid card number format" });
    }

    if (sanitizedExpiryDate.length !== 4) {
      return res.status(400).json({ error: "Invalid expiry date format" });
    }

    if (sanitizedCvv.length < 3 || sanitizedCvv.length > 4) {
      return res.status(400).json({ error: "Invalid CVV format" });
    }

    // For now, simulate success without Stripe integration
    console.log('Ambassador setup completed:', {
      email: email,
      formData: formData
    });

    res.json({ 
      success: true, 
      customerId: 'demo_customer_' + Date.now(),
      message: 'Ambassador setup completed successfully'
    });
  } catch (error) {
    console.error("Ambassador setup failed:", error);
    res.status(500).json({ 
      error: "Ambassador setup failed",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
