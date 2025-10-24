import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const mongoUri = process.env.MONGODB_URI as string;
const client = new MongoClient(mongoUri);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db("BlogNewsletterDB");
    const collection = db.collection("subscribers");

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed to blog updates" },
        { status: 409 }
      );
    }

    // Save to database
    await collection.insertOne({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source: "blog-page",
      categories: ["all"], // Default to all categories
      status: "active"
    });

    // Send welcome email to subscriber
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: `"Requip Blog" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to Requip Textile Machinery Insights! 📚`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2; text-align: center;">Welcome to Requip Blog Updates! 🎉</h2>
          
          <p>Hi there,</p>
          
          <p>Thank you for subscribing to <strong>Requip Textile Machinery Insights</strong>! You'll now receive:</p>
          
          <div style="background: #ecfeff; border-left: 4px solid #0891b2; padding: 16px; margin: 20px 0;">
            <ul style="margin: 0; color: #0e7490;">
              <li>Latest articles on textile machinery</li>
              <li>Maintenance tips and best practices</li>
              <li>Industry trends and innovations</li>
              <li>Investment guides for manufacturers</li>
              <li>Exclusive insights for tier 2 & 3 cities</li>
            </ul>
          </div>

          <p><strong>What to expect:</strong></p>
          <ul>
            <li>Weekly expert articles</li>
            <li>Monthly industry roundups</li>
            <li>Special offers for subscribers</li>
            <li>Early access to new content</li>
          </ul>

          <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #0369a1;">
              <strong>Next Article Coming Soon:</strong><br/>
              "Advanced Automation in Textile Manufacturing: What You Need to Know"
            </p>
          </div>

          <p>In the meantime, you can <a href="https://yourwebsite.com/blog" style="color: #0891b2;">browse our existing articles</a>.</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"/>

          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Best regards,<br/>
            <strong>The Requip Editorial Team</strong><br/>
            Empowering textile manufacturers with knowledge
          </p>
        </div>
      `,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: `"Requip Blog" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Blog Subscriber - ${email}`,
      html: `
        <h3>New Blog Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> Blog Page Newsletter</p>
        <br/>
        <p>Total blog subscribers can be checked in the database.</p>
      `,
    });

    return NextResponse.json({
      message: "Successfully subscribed to blog updates! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Blog newsletter API error:", err);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("BlogNewsletterDB");
    const collection = db.collection("subscribers");

    // Get total subscriber count
    const count = await collection.countDocuments({ status: "active" });

    return NextResponse.json({
      count: count,
    });
  } catch (err) {
    console.error("Blog subscriber count API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch subscriber count" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}