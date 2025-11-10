const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

/**
 * Lambda handler for contact form submissions
 * Sends email via AWS SES
 */
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Please provide name, email, and message' 
        })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid email address',
          message: 'Please provide a valid email address'
        })
      };
    }

    // Send email via SES
    const params = {
      Source: process.env.CONTACT_EMAIL,
      Destination: {
        ToAddresses: [process.env.CONTACT_EMAIL]
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${name} - ${process.env.DOMAIN_NAME}`
        },
        Body: {
          Text: {
            Data: `
New Contact Form Submission from ${process.env.DOMAIN_NAME}

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent via the contact form on ${process.env.DOMAIN_NAME}
            `.trim()
          },
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #667eea; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #667eea; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">From:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
    <div class="footer">
      This message was sent via the contact form on ${process.env.DOMAIN_NAME}
    </div>
  </div>
</body>
</html>
            `.trim()
          }
        }
      },
      ReplyToAddresses: [email]
    };

    const command = new SendEmailCommand(params);
    await ses.send(command);

    console.log('Email sent successfully to:', process.env.CONTACT_EMAIL);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to send message',
        message: 'An error occurred while sending your message. Please try again or email me directly at me@mrandall.me'
      })
    };
  }
};

