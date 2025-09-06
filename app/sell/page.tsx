"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import SellMachineForm from "@/components/SellMachineForm";
import { Footer } from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { ListCheck, Wallet, History, RefreshCw, Headphones } from "lucide-react";
import PageBanner from "@/components/BannerPage";
import Image from "next/image";
import Link from "next/link";

export default function SellPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const benefits = [
    { icon: <ListCheck className="w-10 h-10 text-blue-600" />, label: "Detailed Inspection" },
    { icon: <Wallet className="w-10 h-10 text-blue-600" />, label: "Best Pricing Discovery" },
    { icon: <History className="w-10 h-10 text-blue-600" />, label: "Faster Conversion" },
    { icon: <RefreshCw className="w-10 h-10 text-blue-600" />, label: "Exchange" },
    { icon: <Headphones className="w-10 h-10 text-blue-600" />, label: "24/7 Support" },
  ];

  // Variants for parent (stagger children animations)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between cards
      },
    },
  };

  // Variants for each card
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as any } 
    },
  };

  return (
    <>
      {/* ===== Header ===== */}
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
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/buy" className="hover:text-blue-600">Buy</a>
            <a href="/sell" className="text-blue-600 font-semibold">Sell</a>
            <a href="/career" className="hover:text-blue-600">Career</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
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
          <div className="md:hidden bg-white shadow-inner px-6 pb-4 flex flex-col gap-4">
            <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</a>
            <a href="/buy" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Buy</a>
            <a href="/sell" onClick={() => setMenuOpen(false)} className="text-blue-600 font-semibold">Sell</a>
            <a href="/career" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Career</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Contact</a>
          </div>
        )}
      </header>

      <div className="pt-16"> 
        <PageBanner title="" image="/images/horizonatalPic.jpg" />
      </div>

      {/* ===== Main Content ===== */}
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between pt-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-6 py-16">
          
          {/* Form Section */}
          <div className="order-1 md:order-2 flex-[2]">
            <SellMachineForm />
          </div>

          {/* Benefits Section with Animation */}
          <motion.div
            className="order-2 md:order-1 bg-blue-50 flex-1 flex flex-col items-center justify-start rounded-2xl p-8 gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Why Sell on Requip?
            </h2>
            <p className="text-gray-700 text-center">
              Sell smarter, reach further, and re-equip your business. Our platform ensures secure transactions and faster buyer connections.
            </p>

            <motion.ul className="w-full space-y-6 mt-4">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  {b.icon}
                  <span className="text-gray-800 font-medium">{b.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* <Testimonials /> */}
        <Footer />
      </main>
    </>
  );
}
