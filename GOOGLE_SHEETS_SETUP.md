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

    // Return success response
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
REACT_APP_GOOGLE_SHEET_URL=your_web_app_url_here
```

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

    GmailApp.sendEmail("your-email@example.com", subject, body);

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
```

Remember to replace `'your-email@example.com'` with your actual email address.
