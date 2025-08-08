function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    // Get form data
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    const firstName = e.parameter.firstName || "";
    const lastName = e.parameter.lastName || "";
    const email = e.parameter.email || "";
    const reason = e.parameter.reason || "";

    // Add data to sheet
    sheet.appendRow([timestamp, firstName, lastName, email, reason]);

    // Optional: Send email notification (replace with your email)
    // GmailApp.sendEmail('your-email@example.com',
    //   `New Holding Health Form Submission - ${firstName} ${lastName}`,
    //   `New submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nReason: ${reason}\nTime: ${timestamp}`
    // );

    // Return success response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      });
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      });
  }
}

function doGet(e) {
  // Handle preflight OPTIONS requests
  return ContentService.createTextOutput(
    "Holding Health Form Endpoint - Ready to receive submissions"
  )
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput("").setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
}
