"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Application Submitted!</h1>
      <p className="text-gray-700 mb-6">
        Thank you for applying. Our team will review your application and get back to you soon.
      </p>
      <Link
        href="/career"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Back to Careers
      </Link>
    </div>
  );
}
