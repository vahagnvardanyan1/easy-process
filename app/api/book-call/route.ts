import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type BookCallRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  preferredDate?: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as BookCallRequest;

    // Validate required fields
    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format the date if provided
    const formattedDate = body.preferredDate
      ? new Date(body.preferredDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Not specified";

    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    // Send email notification using Resend (only when configured)
    if (resendApiKey && notificationEmail) {
      try {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: notificationEmail,
          subject: `New Consultation Request: ${body.service}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                  .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                  .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
                  .label { font-weight: 600; color: #667eea; margin-bottom: 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                  .value { color: #333; font-size: 16px; }
                  .footer { margin-top: 30px; text-align: center; color: #6c757d; font-size: 14px; }
                  .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; margin-top: 10px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 28px;">📞 New Consultation Request</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone is interested in your services!</p>
                  </div>
                  
                  <div class="content">
                    <div class="field">
                      <div class="label">Client Name</div>
                      <div class="value">${body.name}</div>
                    </div>
                    
                    <div class="field">
                      <div class="label">Email Address</div>
                      <div class="value"><a href="mailto:${body.email}" style="color: #667eea; text-decoration: none;">${body.email}</a></div>
                    </div>
                    
                    ${
                      body.phone
                        ? `
                    <div class="field">
                      <div class="label">Phone Number</div>
                      <div class="value"><a href="tel:${body.phone}" style="color: #667eea; text-decoration: none;">${body.phone}</a></div>
                    </div>
                    `
                        : ""
                    }
                    
                    ${
                      body.company
                        ? `
                    <div class="field">
                      <div class="label">Company</div>
                      <div class="value">${body.company}</div>
                    </div>
                    `
                        : ""
                    }
                    
                    <div class="field">
                      <div class="label">Service Interested In</div>
                      <div class="value"><strong>${body.service}</strong></div>
                    </div>
                    
                    <div class="field">
                      <div class="label">Preferred Call Date</div>
                      <div class="value">${formattedDate}</div>
                    </div>
                    
                    ${
                      body.message
                        ? `
                    <div class="field">
                      <div class="label">Message</div>
                      <div class="message-box">${body.message.replace(/\n/g, "<br>")}</div>
                    </div>
                    `
                        : ""
                    }
                    
                    <div class="footer">
                      <p>Received on ${new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log("✅ Email notification sent successfully");
      } catch (emailError) {
        console.error("❌ Error sending email:", emailError);
        // Continue even if email fails - don't block the request
      }
    } else {
      console.warn("⚠️ Email not configured. Set RESEND_API_KEY and NOTIFICATION_EMAIL in .env.local");
      console.log("📞 New call booking request:", {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        message: body.message,
        preferredDate: body.preferredDate,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Call request received successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing call booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

