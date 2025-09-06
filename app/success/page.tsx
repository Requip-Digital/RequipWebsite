"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const message =
    type === "sell"
      ? "Your sell request has been submitted successfully. We’ll get back to you shortly."
      : type === "buy"
      ? "Your buy request has been submitted successfully. We’ll get back to you shortly."
      : type === "contact"
      ? "Thank you for contacting us! We have received your message and will respond shortly."
      : "Your submission has been received successfully.";

  const heading =
    type === "sell"
      ? "Sell Request Submitted!"
      : type === "buy"
      ? "Buy Request Submitted!"
      : type === "contact"
      ? "Message Sent!"
      : "Success!";

  const backLink = type === "contact" ? "/contact" : "/";

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-blue-700 mb-3">{heading}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          href={backLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {type === "contact" ? "Back to Contact" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}
