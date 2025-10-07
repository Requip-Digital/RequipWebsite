"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(5);

  // Countdown + redirect logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6 text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Image
          src="/images/BrandLogo.png"
          alt="Requip Logo"
          width={150}
          height={45}
          priority
        />
      </div>

      {/* Main content */}
      <div className="max-w-md">
        <h1 className="text-[100px] font-extrabold text-blue-600 mb-2 leading-none">404</h1>
        <h2 className="text-2xl font-semibold mb-4">That’s an error.</h2>
        <p className="text-gray-600 mb-2">
          The requested URL <span className="font-mono text-blue-600">{pathname}</span>{" "}
          was not found on this server.
        </p>
        <p className="text-gray-500 mb-8">
          Redirecting you to the homepage in{" "}
          <span className="font-semibold text-blue-600">{secondsLeft}</span> seconds...
        </p>

        {/* Home button (manual option) */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          Go to Homepage Now
        </button>
      </div>

      {/* Illustration
      <div className="mt-10 opacity-90">
        <Image
          src="/images/broken-robot.png"
          alt="Broken robot"
          width={260}
          height={180}
          priority
        />
      </div> */}

      {/* Footer */}
      <p className="mt-12 text-sm text-gray-400">
        Powered by <span className="text-blue-600 font-semibold">Requip</span>
      </p>
    </main>
  );
}
