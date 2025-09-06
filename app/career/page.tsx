"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/Footer";

// Modal component for job details
const JobModal = ({ job, onClose }: { job: any; onClose: () => void }) => {
  if (!job) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-lg w-full bg-white rounded-2xl p-6 shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold">{job.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {job.team} • {job.location} • {job.type}
        </p>
        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
          {job.summary}
        </p>
        <div className="mt-6 flex justify-end">
          <a
            href={`mailto:admin@requip.in?subject=Application for ${encodeURIComponent(job.title)}`}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Apply Now
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  postedAt: string;
};

const SAMPLE_JOBS: Job[] = [
  {
    id: "1",
    title: "Lead Marketing Manager",
    team: "Marketing",
    location: "Onsite — Bengaluru",
    type: "Full-time",
    summary:
      "We’re hiring a Lead Marketing Manager to drive our overall marketing strategy, lead campaigns, and grow brand presence. The role involves managing a team, executing high-impact campaigns, and collaborating with cross-functional teams to achieve measurable business results.",
    postedAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Sales B2B",
    team: "Sales",
    location: "India",
    type: "Full-time",
    summary:
      "We’re hiring a B2B Sales Manager to drive business growth by acquiring and managing corporate clients. The role involves identifying new opportunities, building strong client relationships, negotiating deals, and collaborating with internal teams to deliver tailored solutions that meet client needs and achieve revenue targets.",
    postedAt: "2025-09-30T10:00:00Z",
  },
  {
    id: "3",
    title: "Sourcing Manager",
    team: "Operations",
    location: "Hybrid — Mumbai",
    type: "Full-time",
    summary:
      "We’re hiring a Sourcing Manager to develop and manage supplier relationships, negotiate contracts, and ensure cost-effective procurement of high-quality materials/services. The role involves identifying reliable vendors, optimizing supply chain efficiency, and collaborating with internal teams to meet business goals.",
    postedAt: "2025-09-28T10:00:00Z",
  },
  {
    id: "4",
    title: "Growth Marketing Manager",
    team: "Growth",
    location: "Remote",
    type: "Contract",
    summary: "Run experiments, own acquisition channels and optimise conversion funnels.",
    postedAt: "2025-09-25T10:00:00Z",
  },
];

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
  ];

  for (let i = intervals.length - 1; i >= 0; i--) {
    const [secs, label] = intervals[i];
    if (seconds >= secs) {
      const count = Math.floor(seconds / secs);
      return `Posted ${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Posted just now";
}

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const teams = useMemo(
    () => ["All", ...Array.from(new Set(SAMPLE_JOBS.map((j) => j.team)))],
    []
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(SAMPLE_JOBS.map((j) => j.type)))],
    []
  );

  const filtered = useMemo(() => {
    return SAMPLE_JOBS.filter((job) => {
      if (teamFilter !== "All" && job.team !== teamFilter) return false;
      if (typeFilter !== "All" && job.type !== typeFilter) return false;
      if (query.trim() === "") return true;
      const q = query.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      );
    });
  }, [query, teamFilter, typeFilter]);

  return (
    <>
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

          <nav className="hidden md:flex gap-6 text-gray-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/buy" className="hover:text-blue-600">Buy</Link>
            <Link href="/sell" className="hover:text-blue-600">Sell</Link>
            <Link href="/career" className="text-blue-600 font-semibold">Careers</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
            <Link href="/career" onClick={() => setMenuOpen(false)} className="block text-blue-600 font-semibold">Careers</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Contact</Link>
          </div>
        )}
      </header>

      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20 px-6 lg:px-20">
        {/* Hero Section */}
        <header className="max-w-6xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12 text-white shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent"
              aria-hidden
            />
            <div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Careers at Requip</h1>
                <p className="mt-3 text-lg md:text-xl max-w-xl">
                  We're building online platform that make industrial buying and selling effortless. Join our team — mission-first, product-focused.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#jobs" className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium shadow-sm backdrop-blur">View open roles</a>
                  <a href="#values" className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm font-medium">Our values</a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="h-44 rounded-xl bg-white/10 p-6 flex items-center justify-center">
                  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="8" width="172" height="96" rx="12" stroke="white" strokeOpacity="0.9" strokeWidth="2" />
                    <circle cx="36" cy="44" r="6" fill="white" />
                    <rect x="56" y="36" width="92" height="8" rx="4" fill="white" />
                    <rect x="56" y="56" width="60" height="8" rx="4" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <main className="max-w-6xl mx-auto">
          <section id="jobs" className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, location, or keyword"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="mt-3 flex gap-3 md:mt-0">
                <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                  {teams.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Job Grid */}
          <section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full rounded-xl border border-dashed border-gray-200 bg-white/60 p-8 text-center">
                    <p className="text-gray-600">No roles match your search. Try broadening filters.</p>
                  </motion.div>
                ) : (
                  filtered.map((job) => (
                    <motion.article
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setSelectedJob(job)}
                      className="cursor-pointer rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{job.team} • {job.location}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{job.type}</span>
                      </div>
                      <p className="mt-4 text-sm text-gray-600 line-clamp-3">{job.summary}</p>
                      <div className="mt-6 text-sm text-gray-500">{timeAgo(job.postedAt)}</div>
                    </motion.article>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Values Section */}
          <section id="values" className="mt-12 rounded-2xl bg-white p-8 shadow">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold">Our values</h2>
                <p className="mt-2 text-gray-600">We ship fast, treat teammates with compassion, and keep customers at the center of every decision.</p>
                <ul className="mt-4 space-y-2">
                  <li className="text-sm">• Builders-first — we prefer shipping and iterating</li>
                  <li className="text-sm">• Be kind, be direct</li>
                  <li className="text-sm">• Data-informed, not data-blinded</li>
                </ul>
              </div>
              <div className="flex items-center justify-end">
                <a href="#apply" className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow">See all openings</a>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>

      <Footer />
    </>
  );
}
