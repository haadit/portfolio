# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Follow the OAuth flow to connect your Gmail account
5. Note down the **Service ID** (e.g., `service_xyz123`)

## Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** `New Portfolio Contact from {{from_name}}`

**Content:**
```
Hello Aditya,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and note the **Template ID** (e.g., `template_abc456`)

## Step 4: Get Public Key
1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (looks like `user_abc123xyz`)
3. **IMPORTANT**: This is NOT the same as User ID - make sure you copy the Public Key

## Step 5: Update Environment Variables
Update your `.env` file with the actual values:

```env
VITE_EMAILJS_SERVICE_ID=service_xyz123
VITE_EMAILJS_TEMPLATE_ID=template_abc456
VITE_EMAILJS_PUBLIC_KEY=user_def789
```

## Step 6: Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check the browser console for any error messages
4. Check your email inbox for the test message

## Common Issues & Solutions

### 400 Error Causes:
- **Invalid Service ID**: Double-check the service ID matches exactly
- **Invalid Template ID**: Ensure template ID is correct
- **Invalid Public Key**: Verify the public key from your account settings
- **Template Variables**: Make sure template uses `{{from_name}}`, `{{from_email}}`, `{{message}}`
- **CORS Issues**: EmailJS should handle this automatically

### Debugging:
- Check browser console for detailed error messages
- Verify all environment variables are loaded correctly
- Test with a simple template first
- Ensure Gmail service is properly connected and active

## Free Tier Limits
- 200 emails per month
- Rate limit: 50 emails per hour
- Upgrade to paid plan for higher limits if needed
