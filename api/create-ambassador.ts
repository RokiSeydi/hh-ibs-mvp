import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email, billingName, cardNumber, expiryDate, cvv } = req.body;

    // Basic validation
    if (!email || !billingName || !cardNumber || !expiryDate || !cvv) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Safari-compatible validation
    const sanitizedCardNumber = String(cardNumber).replace(/\D/g, '');
    const sanitizedExpiryDate = String(expiryDate).replace(/\D/g, '');
    const sanitizedCvv = String(cvv).replace(/\D/g, '');

    if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 19) {
      res.status(400).json({ error: 'Invalid card number' });
      return;
    }

    if (sanitizedExpiryDate.length !== 4) {
      res.status(400).json({ error: 'Invalid expiry date' });
      return;
    }

    if (sanitizedCvv.length < 3 || sanitizedCvv.length > 4) {
      res.status(400).json({ error: 'Invalid CVV' });
      return;
    }

    // Success response for demo
    res.status(200).json({
      success: true,
      customerId: 'demo_customer_' + Date.now(),
      message: 'Ambassador setup completed successfully'
    });

  } catch (error) {
    console.error('Ambassador setup error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
