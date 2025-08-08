// Test version of Google Apps Script - copy this to your Google Apps Script project

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: "Google Apps Script is working!",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log("Full request object:", JSON.stringify(e));

    const sheet = SpreadsheetApp.getActiveSheet();

    // Handle form data from URLSearchParams
    let data = {};

    if (e && e.parameter) {
      data = e.parameter;
      console.log("Using e.parameter:", data);
    } else if (e && e.postData && e.postData.contents) {
      console.log("Raw postData.contents:", e.postData.contents);

      // Parse URLSearchParams format
      const params = new URLSearchParams(e.postData.contents);
      data = Object.fromEntries(params);
      console.log("Parsed from URLSearchParams:", data);
    } else {
      console.error("No data found in request");
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "No data received",
          debug: {
            hasParameter: !!e.parameter,
            hasPostData: !!e.postData,
            postDataType: e.postData ? typeof e.postData.contents : "none",
          },
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Extract the form fields
    const timestamp = data.timestamp || new Date().toISOString();
    const firstName = data.firstName || "";
    const lastName = data.lastName || "";
    const email = data.email || "";
    const reason = data.reason || "";

    console.log("Extracted data:", {
      timestamp,
      firstName,
      lastName,
      email,
      reason,
    });

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "First Name",
        "Last Name",
        "Email",
        "Reason",
      ]);
    }

    // Add the data to the sheet
    sheet.appendRow([timestamp, firstName, lastName, email, reason]);

    console.log("Data successfully added to sheet");

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
        data: { timestamp, firstName, lastName, email, reason },
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error in doPost:", error.toString());

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Error saving data",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
