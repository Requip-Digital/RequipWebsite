"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import BuyMachineForm from "@/components/BuyMachineForm";
import { Footer } from "@/components/Footer";
import StepByStepProcess from "@/components/BuyingStepProcess";
import PageBanner from "@/components/BannerPage";
import Image from 'next/image';

export default function BuyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logos = [
    { src: "/images/ToyotaLogo.png", alt: "Toyota" },
    { src: "/images/PicanolLogo.png", alt: "Picanol" },
    { src: "/images/TsudokomaLogo.png", alt: "Tsudokoma" },
    { src: "/images/SometLogo.png", alt: "Somet" },
    { src: "/images/VamatexLogo.png", alt: "Vamatex" },
    { src: "/images/ItemaLogo.png", alt: "Itema" },
  ];

  return (
    <>
      {/* ===== Header ===== */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/BrandLogo.png" 
              alt="Requip Logo"
              width={35}
              height={35}
              className="object-contain"
              priority
            />
            <Link href="/" className="text-lg md:text-2xl font-bold text-blue-600 font-ethnocentric items-center">
                REQUIP
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-gray-700">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/buy" className="text-blue-600 font-semibold">Buy</a>
            <a href="/sell" className="hover:text-blue-600">Sell</a>
            <Link href="/career" className="hover:text-blue-600">Career</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-inner px-6 pb-4 flex flex-col gap-4">
            <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</a>
            <a href="/buy" onClick={() => setMenuOpen(false)} className="text-blue-600 font-semibold">Buy</a>
            <a href="/sell" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Sell</a>
            <a href="/career" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Career</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Contact</a>
          </div>
        )}
      </header>

      {/* ===== Banner Section ===== */}
      <div className="pt-16">
        <PageBanner title="" image="/images/horizonatalPic.jpg" />
      </div>

      {/* ===== Main Content ===== */}
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-6 py-16">

          {/* Buy Form - wider */}
          <div className="order-1 md:order-2 flex-[1.5] bg-white p-8 rounded-2xl shadow-lg">
            <BuyMachineForm />
          </div>

          {/* Left Column - narrower + compact */}
          <div className="order-2 md:order-1 flex-[1] bg-white flex flex-col items-center justify-start rounded-2xl p-4 gap-4 border-2 max-w-md">
            {/* Brand Logos */}
            <div className="w-full overflow-hidden">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                We deal in top Brands
              </h3>
              <motion.div
                className="flex gap-12"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "linear",
                }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <img
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 sm:h-10 object-contain flex-shrink-0"
                  />
                ))}
              </motion.div>
            </div>

            {/* Step Process - smaller text */}
            <div className="w-full text-sm">
              <StepByStepProcess />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
