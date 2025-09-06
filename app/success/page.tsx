"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const message =
    type === "sell"
      ? "Your sell request has been submitted successfully."
      : type === "buy"
      ? "Your buy request has been submitted successfully."
      : type === "contact"
      ? "Thank you for contacting us! We’ll respond shortly."
      : type === "career"
      ? "Thank you for applying. We’ll review your application soon."
      : "Thank you for applying. We’ll review your application soon. Your submission has been received successfully.";

  const heading =
    type === "sell"
      ? "Sell Request Submitted!"
      : type === "buy"
      ? "Buy Request Submitted!"
      : type === "contact"
      ? "Message Sent!"
      : type === "career"
      ? "Application Submitted!"
      : " Application Submitted!";

  const backLink =
    type === "contact"
      ? "/contact"
      : type === "career"
      ? "/career"
      : "/";

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-3">{heading}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          href={backLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {backLink === "/contact" ? "Back to Contact" : backLink === "/career" ? "Back to Careers" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}
