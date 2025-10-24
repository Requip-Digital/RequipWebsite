"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface WaitlistResponse {
  message?: string;
  error?: string;
}

export default function ServiceComingSoon(): JSX.Element {
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 6, minutes: 30, seconds: 0 });
  const [email, setEmail] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [waitlistCount, setWaitlistCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { days, hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    // Animate progress bar from 0 to 75%
    const progressTimer = setTimeout(() => {
      setProgress(75);
    }, 100);

    // Fetch waitlist count
    fetchWaitlistCount();

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  const fetchWaitlistCount = async (): Promise<void> => {
    try {
      const response = await fetch('/api/waitlist');
      const data = await response.json();
      if (response.ok) {
        setWaitlistCount(data.count);
      }
    } catch (error) {
      console.error('Failed to fetch waitlist count:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: WaitlistResponse = await response.json();

      if (response.ok) {
        setMessage(data.message || "Successfully added to waitlist!");
        setEmail("");
        // Refresh the count
        fetchWaitlistCount();
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300 rounded-full -translate-y-36 translate-x-36 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 rounded-full translate-y-36 -translate-x-36 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Brand */}
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Coming Soon</span>
          </h1>

          <p className="text-lg text-gray-600 mb-2 text-center">
            We're building exceptional textile machinery services for textile manufacturers.
          </p>

          {/* Waitlist Count */}
          <div className="text-center mb-6">
            <p className="text-amber-500 font-semibold">
              Many manufacturers already waiting
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-8">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg p-3 shadow-lg shadow-amber-500/25">
                  <div className="text-xl font-bold">{value.toString().padStart(2, '0')}</div>
                </div>
                <div className="text-xs text-gray-600 mt-1 capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Development Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ 
                  duration: 2, 
                  delay: 0.5,
                  ease: "easeOut"
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full shadow-md shadow-amber-500/25 relative"
              >
                <motion.div
                  className="absolute top-0 right-0 w-4 h-3 bg-white/30 rounded-r-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Waitlist Signup */}
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl p-6 mb-6 border border-amber-200/50">
            <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Join Waitlist for Early Access</h3>
            
            {message && (
              <div className={`text-center mb-4 p-3 rounded-lg ${
                message.includes("Successfully") 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>enquiry@requip.com</span>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}