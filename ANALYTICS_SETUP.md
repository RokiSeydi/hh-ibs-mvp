# Google Sheets Analytics Setup (Single Sheet)

## Step 1: Create Google Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "Service Account"
5. Download the JSON credentials file
6. Rename it to `google-credentials.json` and place it in your `server/` folder
7. Add `google-credentials.json` to your `.gitignore` file

## Step 2: Create ONE Google Sheet with Multiple Tabs

Create **one Google Sheet** and add these tabs (use the exact names):

### Tab 1: "Form Submissions"

Headers: Timestamp | First Name | Last Name | Email | Reason

### Tab 2: "Swipe Actions"

Headers: Timestamp | Email | Provider ID | Provider Name | Provider Type | Action

### Tab 3: "Tier Selections"

Headers: Timestamp | Email | Tier | Selected Providers Count | Provider Names

### Tab 4: "Ambassador Applications"

Headers: Timestamp | Email | Social Handle | Platform | Follower Count | Content Style | Why Ambassador | Payment Method

### Tab 5: "Feedback Applications"

Headers: Timestamp | Email | Experience Level | Interests | Feedback Style | Availability | Why Feedback | Payment Method

### Tab 6: "Waitlist Signups"

Headers: Timestamp | Email | Referral Code | Referred By

### Tab 7: "Payment Success"

Headers: Timestamp | Email | Tier | Payment Method | Amount | Transaction ID

## Step 3: Share with Service Account

1. Copy the service account email from your `google-credentials.json` file
2. Share your Google Sheet with this email address (Editor permissions)

## Step 4: Update Environment Variables

Add to your `.env` file:

```
GOOGLE_SHEET_ID=your_single_sheet_id_here
```

## Sheet ID

You can find the sheet ID in the URL:
`https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## Step 5: Test Analytics

Run your app and test the analytics by going through the user flow. Check each tab in your Google Sheet to see if data is being recorded.

## ✅ Much Simpler!

This approach uses **one Google Sheet** with multiple tabs instead of 7 separate sheets. All your analytics data will be organized in one place!
