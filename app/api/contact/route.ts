import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Create a new ratelimiter that allows 5 requests per 1 hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
})

export async function POST(req: Request) {
  try {
    // Get the IP address from the request headers
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1"
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          reset: reset
        },
        { status: 429 }
      )
    }

    const { firstName, lastName, email, phone, message, _honeypot } = await req.json()

    // Check honeypot field
    if (_honeypot) {
      return NextResponse.json(
        { message: "Success" }, // Fake success to not reveal it's a honeypot
        { status: 200 }
      )
    }

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 1000 characters" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: process.env.EMAIL_ACCESS_TOKEN,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Contact Submission</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 40px 0;">
      <tr>
        <td>
          <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <tr style="background-color: #3E82F8;">
              <td style="padding: 30px 40px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-family: 'Ethnocentric', sans-serif; font-size: 28px; letter-spacing: 1px;">REQUIP</h1>
                <p style="margin: 5px 0 0; font-size: 14px;">New Contact Form Submission</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px 40px; color: #333333;">
                <p style="margin: 0 0 15px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p style="margin: 0 0 15px;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 0 0 15px;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p style="margin: 0 0 10px;"><strong>Message:</strong></p>
                <p style="margin: 0 0 25px; background-color: #f0f4ff; padding: 15px; border-left: 4px solid #3E82F8; border-radius: 4px;">${message}</p>
                <p style="margin: 0; font-size: 12px; color: #999;">IP Address: ${ip}</p>
              </td>
            </tr>

            <tr>
              <td style="background-color: #fafafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #aaa;">
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} REQUIP. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
</html>`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
} 