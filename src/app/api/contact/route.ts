import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected request body type
type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  bedsNeeded: string;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.bedsNeeded) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a Nodemailer transporter configured for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Using the Gmail service preset
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // App password if 2FA is enabled
      },
      tls: {
        rejectUnauthorized: false // Sometimes needed for Gmail
      }
    });

    // Prepare email content with styling
    const mailOptions = {
      from: `"Northwood Estates MHC" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission - ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0369a1; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><strong>Beds Needed:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${data.bedsNeeded} Bedroom${data.bedsNeeded !== '1' ? 's' : ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Message:</strong></td>
              <td style="padding: 8px;">${data.message || 'No message provided'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>This email was sent from the Northwood Estates MHC contact form.</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 