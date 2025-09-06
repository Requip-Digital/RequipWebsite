import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BuyRequest from "@/lib/models/BuyRequest";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    
    const newBuyRequest = await BuyRequest.create(data);

   
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    
    await transporter.sendMail({
      from: `"Requip" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Buy Machine Request",
      html: `
        <h2>New Buy Request Received</h2>
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

    
    await transporter.sendMail({
      from: `"Requip" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Your Buy Request Has Been Received",
      html: `
        <p>Hi <strong>${data.name}</strong>,</p>
        <p>Thank you for submitting your request to buy a machine through Requip.</p>
        <p>Our team will review your request and get back to you within <strong>24 hours</strong> with the best available options.</p>
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

    return NextResponse.json({ success: true, data: newBuyRequest });
  } catch (error) {
    console.error("[/api/buy] error:", error);
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
