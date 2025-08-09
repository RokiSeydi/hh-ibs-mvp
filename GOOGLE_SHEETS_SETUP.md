# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for the intake form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add the following headers in row 1:
   - Column A: `timestamp`
   - Column B: `firstName`
   - Column C: `lastName`
   - Column D: `email`
   - Column E: `reason`

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Delete the default code and paste the following:

````javascript
```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();

    // Log the entire event object for debugging
    console.log("Event object received:", e ? "exists" : "null/undefined");

    // Safely handle the event object
    if (!e) {
      console.log("No event object received");
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "No event object received" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Handle both JSON and form-encoded data
    let params = {};

    // Log what we're working with
    console.log("e.postData exists:", !!e.postData);
    console.log("e.parameter exists:", !!e.parameter);

    // Check if we have postData (for POST requests)
    if (e.postData && e.postData.contents) {
      console.log("Processing postData contents");
      try {
        // Try to parse as JSON first
        params = JSON.parse(e.postData.contents);
        console.log("Parsed as JSON successfully");
      } catch (jsonError) {
        console.log("JSON parse failed, trying URL decode");
        // If JSON parsing fails, try to parse as URL-encoded data
        const contents = e.postData.contents;
        const pairs = contents.split('&');
        params = {};
        pairs.forEach(pair => {
          const [key, value] = pair.split('=');
          if (key && value) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        });
        console.log("Parsed as URL-encoded");
      }
    } else if (e.parameter) {
      // Fall back to e.parameter for form submissions
      params = e.parameter;
      console.log("Using e.parameter");
    } else {
      console.log("No data found, using empty params");
      // Don't throw an error, just use empty params for debugging
      params = {};
    }

    // Get the event type to determine which sheet tab to use
    const eventType = params.eventType || "form_submission";
    console.log("Event type:", eventType);

    switch(eventType) {
      case "form_submission":
        handleFormSubmission(sheet, params);
        break;
      case "swipe_action":
        handleSwipeAction(sheet, params);
        break;
      case "tier_selection":
        handleTierSelection(sheet, params);
        break;
      case "ambassador_application":
        handleAmbassadorApplication(sheet, params);
        break;
      case "feedback_application":
        handleFeedbackApplication(sheet, params);
        break;
      case "waitlist_signup":
        handleWaitlistSignup(sheet, params);
        break;
      case "payment_success":
        handlePaymentSuccess(sheet, params);
        break;
      default:
        // Fallback to original form submission
        handleFormSubmission(sheet, params);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        eventType: eventType,
        receivedParams: Object.keys(params).length
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}function handleFormSubmission(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Form Submissions",
    ["Timestamp", "First Name", "Last Name", "Email", "Reason"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.firstName || "",
    params.lastName || "",
    params.email || "",
    params.reason || ""
  ]);
}

function handleSwipeAction(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Swipe Actions",
    ["Timestamp", "Email", "Provider ID", "Provider Name", "Provider Type", "Action"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.providerId || "",
    params.providerName || "",
    params.providerType || "",
    params.action || ""
  ]);
}

function handleTierSelection(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Tier Selections",
    ["Timestamp", "Email", "Tier", "Selected Providers Count", "Provider Names"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.tier || "",
    params.selectedProvidersCount || "",
    params.providerNames || ""
  ]);
}

function handleAmbassadorApplication(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Ambassador Applications",
    ["Timestamp", "Email", "Social Handle", "Platform", "Follower Count", "Content Style", "Why Ambassador", "Payment Method"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.socialHandle || "",
    params.platform || "",
    params.followerCount || "",
    params.contentStyle || "",
    params.whyAmbassador || "",
    params.paymentMethod || ""
  ]);
}

function handleFeedbackApplication(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Feedback Applications",
    ["Timestamp", "Email", "Experience Level", "Interests", "Feedback Style", "Availability", "Why Feedback", "Payment Method"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.experienceLevel || "",
    params.interests || "",
    params.feedbackStyle || "",
    params.availability || "",
    params.whyFeedback || "",
    params.paymentMethod || ""
  ]);
}

function handleWaitlistSignup(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Waitlist Signups",
    ["Timestamp", "Email", "Referral Code", "Referred By"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.referralCode || "",
    params.referredBy || ""
  ]);
}

function handlePaymentSuccess(spreadsheet, params) {
  const sheet = getOrCreateSheet(spreadsheet, "Payment Success",
    ["Timestamp", "Email", "Tier", "Payment Method", "Amount", "Transaction ID"]);

  sheet.appendRow([
    params.timestamp || new Date().toISOString(),
    params.email || "",
    params.tier || "",
    params.paymentMethod || "",
    params.amount || "",
    params.transactionId || ""
  ]);
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(sheetName);
    // Add headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}
````

function doGet(e) {
// Optional: Handle GET requests for testing
return ContentService.createTextOutput(
"Form endpoint is working"
).setMimeType(ContentService.MimeType.TEXT);
}

```

3. Save the script (Ctrl+S or Cmd+S)

## Step 3: Deploy the Web App

1. Click on the "Deploy" button (top right)
2. Choose "New deployment"
3. Set the type to "Web app"
4. Configure the deployment:
   - Description: "Intake Form Handler"
   - Execute as: "Me"
   - Who has access: "Anyone" (important for form submissions)
5. Click "Deploy"
6. Copy the Web App URL that appears

## Step 4: Configure Your Environment

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Google Sheets Web App URL:

```

VITE_GOOGLE_SHEET_URL=your_web_app_url_here

````

3. Replace `your_web_app_url_here` with the URL from Step 3

## Step 5: Test the Integration

1. Restart your development server
2. Fill out and submit the intake form
3. Check your Google Sheet to see if the data appears

## Security Considerations

- The Google Apps Script runs with your permissions
- Form submissions will be logged with timestamps
- Consider adding validation and rate limiting for production use
- You may want to set up email notifications for new submissions

## Troubleshooting

- If submissions aren't working, check the browser console for errors
- Make sure the Web App is deployed with "Anyone" access
- Verify the environment variable is correctly set
- Test the Web App URL directly in your browser (should show "Form endpoint is working")

## Optional: Email Notifications

To get email notifications when someone submits the form, add this to your Apps Script:

```javascript
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

    // Send email notification
    const subject = `New Holding Health Form Submission - ${firstName} ${lastName}`;
    const body = `
New form submission received:

Name: ${firstName} ${lastName}
Email: ${email}
Reason: ${reason}
Timestamp: ${timestamp}

View all submissions: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `;

    GmailApp.sendEmail("info@weatholdinghealth.com", subject, body);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
````

Remember to replace `'your-email@example.com'` with your actual email address.
