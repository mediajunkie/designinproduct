# Consultation Form Setup Guide

## Step 1: Create the Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields (ALL OPTIONAL):

   - **First Name** (Short answer, optional)
   - **Last Name** (Short answer, optional)
   - **Email** (Short answer, optional)
   - **LinkedIn profile or personal website** (Short answer, optional)
   - **Company Name** (Short answer, optional)
   - **Company Website** (Short answer, optional)
   - **Product Team Size** (Multiple choice, optional)
     - Just me
     - 2-5 people
     - 6-10 people
     - 11-25 people
     - 26-50 people
     - 50+ people
   - **What are you currently struggling with?** (Paragraph, optional)

## Step 2: Configure Google Form Settings

**IMPORTANT:** Make sure these settings are correct:
- **Settings → General → Restrict to users in [domain]**: Turn OFF
- **Settings → General → Collect email addresses**: Turn OFF
- **Settings → Presentation → Show progress bar**: Optional
- **Settings → Presentation → Confirmation message**: Customize if desired

## Step 3: Get the Form Submission URL and Field IDs

1. Click **Send** → **Link** tab (🔗)
2. Copy the form URL
3. Click **Get pre-filled link** (⋮ menu → Get pre-filled link)
4. Fill each field with test data:
   - First Name: `TEST_FIRST`
   - Last Name: `TEST_LAST`
   - Email: `TEST_EMAIL`
   - LinkedIn: `TEST_LINKEDIN`
   - Company Name: `TEST_COMPANY`
   - Company Website: `TEST_WEBSITE`
   - Product Team Size: Select any option
   - Current Struggles: `TEST_STRUGGLES`
5. Click **Get Link** and copy the URL
6. Extract the entry IDs from the URL

## Step 4: Update consultation.html

Replace the placeholders in `consultation.html`:

1. Replace `[CONSULTATION_FORM_ID]` with your form ID
2. Replace each `[FIELD_ID]` with the corresponding entry ID:
   - `[FIRST_NAME_ID]` → `entry.XXXXXXXXX`
   - `[LAST_NAME_ID]` → `entry.XXXXXXXXX`
   - `[EMAIL_ID]` → `entry.XXXXXXXXX`
   - `[LINKEDIN_ID]` → `entry.XXXXXXXXX`
   - `[COMPANY_ID]` → `entry.XXXXXXXXX`
   - `[COMPANY_WEBSITE_ID]` → `entry.XXXXXXXXX`
   - `[TEAM_SIZE_ID]` → `entry.XXXXXXXXX`
   - `[STRUGGLES_ID]` → `entry.XXXXXXXXX`

## Step 5: Test the Form

1. Open `consultation.html` on your live site
2. Fill out and submit the form
3. Check Google Forms Responses tab
4. Check the automatically created Google Sheet

## Step 6: Update the Contact Page

Change the link in `contact.html`:
```html
<!-- Old -->
<a href="https://designinproduct.typeform.com/to/Wki7yGT4">Yes, I want in. Let's talk.</a>

<!-- New -->
<a href="consultation.html">Yes, I want in. Let's talk.</a>
```

## Troubleshooting

- Make sure the form is not restricted to your domain
- Verify all entry IDs are correct
- Test the actual Google Form first to ensure it's working