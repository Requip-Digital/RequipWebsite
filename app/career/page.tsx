"use client";

import Link from "next/link";
import { jobs } from "@/data/jobs";
import { useState } from "react";
import { Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function CareersPage() {
  const [filter, setFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/BrandLogo.png"
              alt="Requip Logo"
              width={35}
              height={35}
              className="object-contain"
              priority
            />
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 font-ethnocentric items-center"
            >
              Requip
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-gray-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/buy" className="hover:text-blue-600">Buy</Link>
            <Link href="/sell" className="hover:text-blue-600">Sell</Link>
            <Link href="/career" className="text-blue-600 font-semibold">Careers</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="/buy"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Buy
            </Link>
            <Link
              href="/sell"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Sell
            </Link>
            <Link
              href="/career"
              onClick={() => setMenuOpen(false)}
              className="block text-blue-600 font-semibold"
            >
              Career
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow mt-24">
        {/* Hero / heading */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Explore exciting opportunities and build your career with us.
            </p>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs by title..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Job cards */}
          <ul className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map(job => (
              <li
                key={job.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1 text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {job.location} · {job.type}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/career/${job.id}/apply`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
                  >
                    Apply Now
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No jobs found matching your search.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
