# Google Sheets Waitlist Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet called "Holding Health Waitlist"
3. In the first row, add these headers:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to `Extensions` → `Apps Script`
2. Replace the default code with the script below
3. Save the project (give it a name like "Waitlist Handler")

```javascript
// Google Apps Script code for handling waitlist signups
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Add a new row with the data
    sheet.appendRow([data.email, data.timestamp, data.source]);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testFunction() {
  const testData = {
    email: "test@example.com",
    timestamp: new Date().toISOString(),
    source: "test",
  };

  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([testData.email, testData.timestamp, testData.source]);
}
```

## Step 3: Deploy the Script

1. Click `Deploy` → `New deployment`
2. Click the gear icon next to "Type" and select `Web app`
3. Set these options:
   - Description: "Waitlist Handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click `Deploy`
5. **Copy the Web App URL** - you'll need this for the next step

## Step 4: Update the React Component

In `/client/src/components/waitlist-signup.tsx`, replace this line:

```javascript
"https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

With your actual Web App URL from step 3.

## Step 5: Test the Integration

1. Build and run your app
2. Try submitting an email through the waitlist form
3. Check your Google Sheet to see if the data appears

## Security Notes

- The Google Apps Script runs with your permissions
- Anyone can submit to this endpoint, so consider adding validation
- For production, you might want to add rate limiting or CAPTCHA

## Optional Enhancements

- Add email validation in the Apps Script
- Send confirmation emails using Gmail API
- Add duplicate email checking
- Export data periodically for backup
