
// Google Sheets Configuration
// Replace these with your actual values

export const GOOGLE_SHEETS_CONFIG = {
  // Your Google Sheets ID (from the URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
  GOOGLE_SHEETS_ID: 'your-google-sheets-id-here',
  
  // Service Account Email (from your Google Cloud Console)
  GOOGLE_CLIENT_EMAIL: 'your-service-account@your-project.iam.gserviceaccount.com',
  
  // Private Key (from your service account JSON file)
  GOOGLE_PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----
your-private-key-here
-----END PRIVATE KEY-----`
};

// Instructions to set up Google Sheets integration:
// 1. Go to Google Cloud Console
// 2. Create a new project or select existing
// 3. Enable Google Sheets API
// 4. Create service account credentials
// 5. Download the JSON file and extract the values above
// 6. Share your Google Sheet with the service account email
// 7. Replace the values above with your actual credentials
