"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Location = {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
};

const locations: Location[] = [
  { x: 68, y: 55 }, // Bengaluru (center)
  { x: 68, y: 45 }, // Surat
  { x: 66, y: 50 }, // Mumbai
  { x: 79, y: 44 }, // Shanghai
  { x: 77, y: 65 }, // Indonesia
  { x: 80, y: 50 }, // Hong Kong
  { x: 48, y: 35 }, // Paris
  { x: 51, y: 39 }, // Belgium
  { x: 51, y: 32 }, // Frankfurt
  { x: 25, y: 44 }, // New York
  { x: 15, y: 43 }, // Chicago
];

const center = locations[0]; // BLR is center

export default function WorldMapWithLoopingLines() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* 🗺 Background Map */}
      <Image
        src="/images/World_Map.png"
        alt="World Map"
        width={1200}
        height={600}
        className="w-full rounded-xl shadow-lg"
      />

      {/* 📍 Smaller Blinking Pins */}
      {locations.map((loc, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${loc.y}%`,
            left: `${loc.x}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full border border-white shadow"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        </div>
      ))}

      {/* 🌐 Static Curved Lines with Slow Blink */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {locations.slice(1).map((loc, i) => {
          const x1 = (loc.x / 100) * 1200;
          const y1 = (loc.y / 100) * 600;
          const x2 = (center.x / 100) * 1200;
          const y2 = (center.y / 100) * 600;

          // Quadratic curve control point
          const cx = (x1 + x2) / 2;
          const cy = (y1 + y2) / 2 - 50;

          const pathData = `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`;

          return (
            <motion.path
              key={i}
              d={pathData}
              stroke="#2563EB"
              strokeWidth="1.5"
              fill="none"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
