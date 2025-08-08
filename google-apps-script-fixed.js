function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    // Debug logging
    console.log("Received POST request:", e);

    // Handle both parameter and postData
    let data = {};

    if (e && e.parameter) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        // Try to parse as form data
        const params = new URLSearchParams(e.postData.contents);
        data = Object.fromEntries(params);
      }
    } else {
      console.error("No data received in request");
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "No data received" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Get form data with fallbacks
    const timestamp = data.timestamp || new Date().toISOString();
    const firstName = data.firstName || "";
    const lastName = data.lastName || "";
    const email = data.email || "";
    const reason = data.reason || "";

    console.log("Parsed data:", {
      timestamp,
      firstName,
      lastName,
      email,
      reason,
    });

    // Add data to sheet
    sheet.appendRow([timestamp, firstName, lastName, email, reason]);

    // Optional: Send email notification (uncomment and replace with your email)
    // GmailApp.sendEmail('your-email@example.com',
    //   `New Holding Health Form Submission - ${firstName} ${lastName}`,
    //   `New submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nReason: ${reason}\nTime: ${timestamp}`
    // );

    // Return success response (Google Apps Script doesn't support setHeaders)
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error in doPost:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Test endpoint
  return ContentService.createTextOutput(
    "Holding Health Form Endpoint - Ready to receive submissions"
  ).setMimeType(ContentService.MimeType.TEXT);
}

// Test function you can run manually in the Apps Script editor
function testFunction() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    new Date().toISOString(),
    "Test",
    "User",
    "test@example.com",
    "just-curious",
  ]);
  console.log("Test data added successfully");
}
