export async function POST(request: Request) {
  try {
    console.log("Ambassador setup called:", {
      timestamp: new Date().toISOString(),
    });

    const body = await request.json();
    const { email, billingName, cardNumber, expiryDate, cvv, ...formData } =
      body;

    // Validate required fields
    if (!email || !billingName || !cardNumber || !expiryDate || !cvv) {
      return new Response(
        JSON.stringify({ error: "Missing required payment fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Additional validation for Safari compatibility
    const sanitizedCardNumber = String(cardNumber).replace(/\D/g, "");
    const sanitizedExpiryDate = String(expiryDate).replace(/\D/g, "");
    const sanitizedCvv = String(cvv).replace(/\D/g, "");

    if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 19) {
      return new Response(
        JSON.stringify({ error: "Invalid card number format" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (sanitizedExpiryDate.length !== 4) {
      return new Response(
        JSON.stringify({ error: "Invalid expiry date format" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (sanitizedCvv.length < 3 || sanitizedCvv.length > 4) {
      return new Response(JSON.stringify({ error: "Invalid CVV format" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // For now, simulate success without Stripe integration
    console.log("Ambassador setup completed:", {
      email: email,
      formData: formData,
    });

    return new Response(
      JSON.stringify({
        success: true,
        customerId: "demo_customer_" + Date.now(),
        message: "Ambassador setup completed successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Ambassador setup failed:", error);
    return new Response(
      JSON.stringify({
        error: "Ambassador setup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
