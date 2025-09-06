// components/JobCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  postedAt: string;
};

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

export default function JobCard({ job }: { job: Job }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
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

      <div className="mt-4">
        <Link
          href={`/career/apply/${job.id}`}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Apply Now
        </Link>
      </div>
    </motion.article>
  );
}
