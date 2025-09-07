"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center 
      bg-[linear-gradient(to_right,rgba(0,0,0,0.25)_2px,transparent_1px),
      linear-gradient(to_bottom,rgba(0,0,0,0.25)_2px,transparent_1px)] 
      bg-[size:80px_80px] bg-black/5 overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6 md:px-12 z-10">
        
        {/* ---------- LEFT CONTENT ---------- */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onAnimationComplete={() => setHasAnimated(true)}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug md:leading-tight text-gray-900"
          >
            One Stop Solution for {" "}
            <span> used </span>
            <span className="text-blue-600">Industrial Machines</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 max-w-lg"
          >
            Fully operational used industrial machines reconditioned
            to like-new performance. Backed by genuine components,
            certified processes, and nationwide support.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8"
              asChild
            >
              <Link href="/">Get Started</Link>
            </Button>
            <Link href="/buy" passHref>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-8"
              >
                View Inventory
              </Button>
            </Link>
          </motion.div>

          {/* Location & Warranty */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-col sm:flex-row gap-6 text-gray-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Mumbai, Bengaluru & Surat Operations
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              1-Year Warranty
            </div>
          </motion.div>
        </div>

        {/* ---------- RIGHT IMAGE (Centered & Styled) ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <Image
            src="/images/HeroSectionPic.jpg"
            alt="Industrial Machinery"
            width={700}
            height={550}
            priority
            className="rounded-2xl shadow-lg object-cover w-full h-auto max-w-lg md:max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}