import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Application from "@/lib/models/Applications";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  await connectToDatabase();

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const experience = formData.get("experience") as string;
  const skills = formData.get("skills") as string;
  const jobId = formData.get("jobId") as string;
  const jobTitle = formData.get("jobTitle") as string; 
  const resume = formData.get("resume") as File | null;

  try {
    // Save to DB
    await Application.create({
      name,
      email,
      phone,
      experience,
      skills,
      jobId,
      jobTitle,
    });

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Attach resume if provided
    let attachments: any[] = [];
    if (resume) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: buffer,
        contentType: resume.type,
      });
    }

    // Email to admin/HR
    await transporter.sendMail({
      from: `"Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // HR/admin email
      subject: `New Application – ${jobTitle}`,
      html: `
        <h2>New Application Received</h2>
        <p>A candidate has applied for <strong>${jobTitle}</strong>.</p>
        <table border="1" cellspacing="0" cellpadding="6">
          <tr><th align="left">Name</th><td>${name}</td></tr>
          <tr><th align="left">Email</th><td>${email}</td></tr>
          <tr><th align="left">Phone</th><td>${phone}</td></tr>
          <tr><th align="left">Experience</th><td>${experience}</td></tr>
          <tr><th align="left">Skills</th><td>${skills}</td></tr>
          <tr><th align="left">Job Role</th><td>${jobTitle}</td></tr>
        </table>
        <p>The candidate's resume is attached.</p>
      `,
      attachments,
    });

    // Confirmation email to candidate
    await transporter.sendMail({
      from: `"Requip Careers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Job Application Has Been Received",
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> role at Requip.</p>
        <p>Our team has received your application and will review it carefully. We will get back to you within <strong>5-7 business days</strong> regarding the next steps.</p>
        <p>Here’s a summary of your application:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Experience:</strong> ${experience}</li>
          <li><strong>Skills:</strong> ${skills}</li>
          <li><strong>Job Role:</strong> ${jobTitle}</li>
        </ul>
        <p>We appreciate your interest in joining Requip and look forward to reviewing your application.</p>
        <p>— The Requip Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error submitting application:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
