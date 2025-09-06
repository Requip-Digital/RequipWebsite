import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const mongoUri = process.env.MONGODB_URI as string;
const client = new MongoClient(mongoUri);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    
    await client.connect();
    const db = client.db("ContactMessagesDB");
    await db.collection("contactMessages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   
    await transporter.sendMail({
      from: `"Requip Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    
    await transporter.sendMail({
      from: `"Requip Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your query!`,
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting <strong>Requip</strong>.</p>
        <p>We have received your query and our team will get back to you within <strong>24 hours</strong>.</p>
        <br/>
        <p style="color: #555;">Your Message:</p>
        <blockquote style="border-left: 3px solid #007bff; margin: 0; padding-left: 10px; color: #333;">
          ${message}
        </blockquote>
        <br/>
        <p>Regards,<br/>Team Requip</p>
      `,
    });

    return NextResponse.json({
      message: "Message saved & emails sent successfully!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
