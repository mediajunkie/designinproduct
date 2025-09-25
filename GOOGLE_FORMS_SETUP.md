# Google Forms Setup Guide

## Step 1: Create the Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these exact fields (in this order):

   - **Email** (Short answer, optional)
   - **First Name** (Short answer, required)
   - **Last Name** (Short answer, required)
   - **Best email for Slack invitation** (Short answer, required)
   - **LinkedIn profile or personal website** (Short answer, optional)
   - **How did you hear about us?** (Short answer, optional)
   - **Why do you want to join our community?** (Paragraph, required)
   - **What are you currently struggling with?** (Paragraph, optional)

## Step 2: Get the Form Submission URL

1. In your Google Form, click the **Send** button
2. Click the **Link** tab (🔗)
3. Copy the form URL (it will look like: `https://docs.google.com/forms/d/[FORM_ID]/viewform`)
4. Change `viewform` to `formResponse` at the end
5. Your submission URL should look like: `https://docs.google.com/forms/d/e/[FORM_ID]/formResponse`

## Step 3: Get Field Entry IDs

1. In your Google Form, click **Preview** (👁️ icon)
2. Right-click on the page and select **View Source** or **Inspect Element**
3. Search for `entry.` in the source code
4. Find the entry IDs for each field (they look like `entry.123456789`)

You'll need to map these to your form fields:
- Email → `entry.[ID]`
- First Name → `entry.[ID]`
- Last Name → `entry.[ID]`
- Slack Email → `entry.[ID]`
- LinkedIn → `entry.[ID]`
- Referral → `entry.[ID]`
- Reason → `entry.[ID]`
- Struggles → `entry.[ID]`

## Step 4: Update the HTML Form

In `community.html`, replace the placeholders:

1. Replace `[FORM_ID]` with your actual form ID
2. Replace each `[FIELD_ID]` with the corresponding entry ID

Example:
```html
<!-- Before -->
<form action="https://docs.google.com/forms/d/e/[FORM_ID]/formResponse" method="POST">
<input name="entry.[EMAIL_FIELD_ID]" ...>

<!-- After -->
<form action="https://docs.google.com/forms/d/e/1FAIpQLSe.../formResponse" method="POST">
<input name="entry.123456789" ...>
```

## Step 5: Test the Form

1. Fill out your form on the website
2. Check if the submission appears in your Google Form responses
3. Check the Google Sheet (automatically created) for the data

## Optional: Customize Google Form Settings

- **Settings → Responses → Collect email addresses**: Turn OFF (we're collecting it manually)
- **Settings → Responses → Limit to 1 response**: Turn OFF
- **Settings → Presentation → Show progress bar**: Your choice
- **Settings → Presentation → Confirmation message**: Customize if desired

## Troubleshooting

If the form doesn't work:
1. Double-check the form action URL
2. Verify all entry IDs are correct
3. Make sure field names match exactly
4. Test by submitting the actual Google Form first

The form will redirect users to `community-thank-you.html` after successful submission.