import { NextRequest, NextResponse } from 'next/server';

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  recipientEmail: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message, and recipientEmail are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get SendLayer API key from environment
    const apiKey = process.env.SENDLAYER_API_KEY;
    if (!apiKey) {
      console.error('SENDLAYER_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Build email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      ${body.company ? `<p><strong>Company:</strong> ${escapeHtml(body.company)}</p>` : ''}
      ${body.budget ? `<p><strong>Budget Range:</strong> ${escapeHtml(body.budget)}</p>` : ''}
      <h3>Message:</h3>
      <p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
${body.company ? `Company: ${body.company}\n` : ''}${body.budget ? `Budget Range: ${body.budget}\n` : ''}
Message:
${body.message}
    `.trim();

    // Send email via SendLayer API (using correct PascalCase field names)
    const sendLayerResponse = await fetch('https://console.sendlayer.com/api/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        From: {
          email: body.email,
          name: body.name,
        },
        To: [
          {
            email: body.recipientEmail,
            name: 'Contact Form',
          },
        ],
        Subject: `Contact Form: Message from ${body.name}`,
        ContentType: 'HTML',
        HTMLContent: emailHtml,
        PlainContent: emailText,
        ReplyTo: {
          email: body.email,
          name: body.name,
        },
      }),
    });

    if (!sendLayerResponse.ok) {
      const errorData = await sendLayerResponse.json().catch(() => ({}));
      console.error('SendLayer API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
