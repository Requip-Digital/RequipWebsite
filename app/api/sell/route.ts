import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import SellRequest from "@/lib/models/SellRequest";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // 1️⃣ Save to DB
    const newSellRequest = await SellRequest.create(data);

    // 2️⃣ Setup mail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3️⃣ Send email to Admin
    await transporter.sendMail({
      from: `"Requip" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "📩 New Sell Machine Request",
      html: `
        <h2>New Sell Request Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Brand:</strong> ${data.brand ?? "N/A"}</p>
        <p><strong>Model:</strong> ${data.model ?? "N/A"}</p>
        <p><strong>Technology:</strong> ${data.technology ?? "N/A"}</p>
        <p><strong>Width:</strong> ${data.width ?? "N/A"}</p>
        <p><strong>Shedding System:</strong> ${data.sheddingSystem ?? "N/A"}</p>
        <p><strong>Additional Info:</strong> ${data.additionalInfo ?? "N/A"}</p>
        <p><em>Received on: ${new Date().toLocaleString()}</em></p>
      `,
    });

    // 4️⃣ Send confirmation email to User
    await transporter.sendMail({
      from: `"Requip" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Your Sell Request Has Been Received",
      html: `
        <p>Hi <strong>${data.name}</strong>,</p>
        <p>Thank you for submitting your machine selling request through Requip.</p>
        <p>Our team will review your submission and connect you with interested buyers within <strong>24 hours</strong>.</p>
        <p>Here’s a summary of your request:</p>
        <ul>
          <li><strong>Brand:</strong> ${data.brand ?? "N/A"}</li>
          <li><strong>Model:</strong> ${data.model ?? "N/A"}</li>
          <li><strong>Technology:</strong> ${data.technology ?? "N/A"}</li>
          <li><strong>Width:</strong> ${data.width ?? "N/A"}</li>
          <li><strong>Shedding System:</strong> ${data.sheddingSystem ?? "N/A"}</li>
        </ul>
        <p>We’ll be in touch soon!</p>
        <p>— The Requip Team</p>
      `,
    });

    return NextResponse.json({ success: true, data: newSellRequest });
  } catch (error) {
    console.error("[/api/sell] error:", error);
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
