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
    const db = client.db("WaitlistDB");
    const collection = db.collection("waitlist");

    // Check if email already exists
    const existingEntry = await collection.findOne({ email: email.toLowerCase() });
    if (existingEntry) {
      return NextResponse.json(
        { error: "Email already registered for waitlist" },
        { status: 409 }
      );
    }

    // Save to database
    await collection.insertOne({
      email: email.toLowerCase(),
      createdAt: new Date(),
      source: "service-coming-soon",
    });

    // Send confirmation email to user
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Requip Waitlist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `You're on the waitlist for Requip Services!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706; text-align: center;">Welcome to the Requip Waitlist! 🎉</h2>
          
          <p>Hi there,</p>
          
          <p>Thank you for joining the waitlist for <strong>Requip Textile Machinery Services</strong>!</p>
          
          <div style="background: #fffbeb; border-left: 4px solid #d97706; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>What's next?</strong><br/>
              We'll notify you as soon as our services launch with exclusive early access and special offers.
            </p>
          </div>

          <p><strong>Expected Launch:</strong> February 2024</p>
          <p><strong>Services Include:</strong></p>
          <ul>
            <li>Professional Machine Maintenance</li>
            <li>Installation & Setup Support</li>
            <li>Technical Consultation</li>
            <li>Spare Parts & Accessories</li>
          </ul>

          <p>In the meantime, feel free to explore our current offerings at <a href="https://yourwebsite.com" style="color: #d97706;">our website</a>.</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"/>

          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br/>
            <strong>The Requip Team</strong><br/>
            Empowering textile manufacturers in tier 2 & 3 cities
          </p>
        </div>
      `,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: `"Requip Waitlist" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Waitlist Signup - ${email}`,
      html: `
        <h3>New Waitlist Signup</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> Service Coming Soon Page</p>
        <br/>
        <p>Total waitlist count can be checked in the database.</p>
      `,
    });

    return NextResponse.json({
      message: "Successfully added to waitlist! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Failed to process waitlist signup" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("WaitlistDB");
    const collection = db.collection("waitlist");

    // Get total waitlist count
    const count = await collection.countDocuments();

    return NextResponse.json({
      count: count,
    });
  } catch (err) {
    console.error("Waitlist count API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch waitlist count" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}