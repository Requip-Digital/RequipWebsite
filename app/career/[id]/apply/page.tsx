"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { jobs } from "@/data/jobs";
import Link from "next/link";
import Image from "next/image";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const job = jobs.find(j => j.id.toString() === jobId);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    resume: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile nav

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, resume: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });
    data.append("jobId", jobId);
    if (job?.title) data.append("jobTitle", job.title);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        router.push("/success");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
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
            <Link href="/" className="text-2xl font-bold text-blue-600 font-ethnocentric items-center">
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
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Home</Link>
            <Link href="/buy" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Buy</Link>
            <Link href="/sell" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Sell</Link>
            <Link href="/career" onClick={() => setMenuOpen(false)} className="block text-blue-600 font-semibold">Career</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Contact</Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 pt-32">
        {/* Added pt-32 to offset fixed header */}
        <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-8 sm:p-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Apply for {job?.title}</h1>
          <p className="text-gray-500 text-center mb-6">Fill in your details and attach your resume.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                name="experience"
                placeholder="Years of experience"
                value={form.experience}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <textarea
                name="skills"
                placeholder="Your skills"
                value={form.skills}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
              <label className="block w-full text-center px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                {form.resume ? form.resume.name : "Click to upload your resume (.pdf, .doc, .docx)"}
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
