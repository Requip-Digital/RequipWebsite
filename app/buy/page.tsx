"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BuyMachineForm from "@/components/BuyMachineForm";
import { Footer } from "@/components/Footer";
import StepByStepProcess from "@/components/BuyingStepProcess";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

interface Logo {
  src: string;
  alt: string;
}

interface Stat {
  number: string;
  label: string;
}

interface Feature {
  icon: string;
  text: string;
}

export default function BuyPage(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY: number = window.scrollY;
      const triggerPoint: number = 100;
      const panelAppearPoint: number = 200;
      const panelFullPoint: number = 500;
      
      setScrolled(scrollY > triggerPoint);
      
      // Check if we're over dark sections (hero and CTA)
      const heroSection: HTMLElement | null = document.getElementById('hero-section');
      const ctaSection: HTMLElement | null = document.getElementById('cta-section');
      
      let isOverHero: boolean = false;
      let isOverCTA: boolean = false;
      
      if (heroSection) {
        const heroRect: DOMRect = heroSection.getBoundingClientRect();
        isOverHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
      }
      
      if (ctaSection) {
        const ctaRect: DOMRect = ctaSection.getBoundingClientRect();
        isOverCTA = ctaRect.bottom > 0 && ctaRect.top < window.innerHeight;
      }
      
      setIsDarkBackground(isOverHero || isOverCTA);
      
      if (scrollY < panelAppearPoint) {
        setScrollProgress(0);
      } else if (scrollY > panelFullPoint) {
        setScrollProgress(1);
      } else {
        setScrollProgress((scrollY - panelAppearPoint) / (panelFullPoint - panelAppearPoint));
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainHeaderOpacity: number = Math.max(0, 1 - scrollProgress);
  const panelOpacity: number = scrollProgress;
  const panelScale: number = 0.9 + (scrollProgress * 0.1);

  // Dynamic text color based on background
  const textColor: string = isDarkBackground ? "text-white" : "text-gray-800";
  const hoverColor: string = isDarkBackground ? "hover:text-gray-300" : "hover:text-gray-600";
  const headerBackground: string = isDarkBackground 
    ? "bg-black/40 backdrop-blur-md border-white/10" 
    : "bg-white/90 backdrop-blur-md border-gray-200/50";

  const logos: Logo[] = [
    { src: "/images/ToyotaLogo.png", alt: "Toyota" },
    { src: "/images/PicanolLogo.png", alt: "Picanol" },
    { src: "/images/TsudokomaLogo.png", alt: "Tsudokoma" },
    { src: "/images/SometLogo.png", alt: "Somet" },
    { src: "/images/VamatexLogo.png", alt: "Vamatex" },
    { src: "/images/ItemaLogo.png", alt: "Itema" },
  ];

  // Handle WhatsApp navigation for free consultation
  const handleFreeConsultation = () => {
    const phoneNumber = "919972860913"; // Your WhatsApp number
    const message = "Hello! I'm interested in getting a free consultation for textile machinery.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  // Handle navigation to coming soon page
  const handleBrowseInventory = () => {
    router.push('/coming-soon');
  };

  // Handle CTA section buttons
  const handleGetStartedToday = () => {
    const phoneNumber = "919972860913";
    const message = "Hello! I'm ready to get started with textile machinery. Please guide me.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const handleContactSales = () => {
    const phoneNumber = "919972860913";
    const message = "Hello! I'd like to speak with your sales team about textile machinery.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* ===== Use Header Component ===== */}
      <Header />

      {/* ===== Main Content ===== */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20">
        {/* EPIC Full-Screen Hero Section - Mobile Optimized */}
        <section id="hero-section" className="relative w-full min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B3B61] via-[#0B3B61] to-amber-500">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            
            {/* Massive Animated Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-48 h-48 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-2xl lg:blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 lg:w-80 lg:h-80 bg-purple-500/10 rounded-full blur-2xl lg:blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 bg-cyan-400/5 rounded-full blur-2xl lg:blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>

          {/* Main Content - Centered Single Column */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Enhanced Badge - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 mb-4 lg:mb-6 -mt-16 lg:-mt-32"
              >
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs lg:text-sm text-white/80 font-medium">Verified Machines, Always</span>
              </motion.div>

              {/* Epic Main Heading - Mobile Optimized */}
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold text-white leading-tight"
                >
                  Elevate Your{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    Production
                  </span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/80 leading-tight"
                >
                  With Premium Machinery
                </motion.h2>
              </div>

              {/* Enhanced Description - Mobile Optimized */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-base lg:text-xl text-white/70 leading-relaxed max-w-3xl mb-4 lg:mb-6 px-4 lg:px-0"
              >
                Discover world-class textile machinery from leading global manufacturers. 
                <span className="text-cyan-300 font-semibold"> Guaranteed quality</span>, 
                comprehensive support, and competitive pricing for businesses of all sizes.
              </motion.p>

              {/* Enhanced CTA Buttons - Stack on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center w-full max-w-sm lg:max-w-none px-4 lg:px-0"
              >
                <motion.button 
                  onClick={handleFreeConsultation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-amber-500 to-[#0B3B61] text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-semibold shadow-2xl overflow-hidden text-sm lg:text-base w-full sm:w-auto"
                >
                  <span className="relative z-10">Get Free Consultation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B3B61] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                <motion.button 
                  onClick={handleBrowseInventory}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 text-sm lg:text-base w-full sm:w-auto"
                >
                  <span className="relative z-10">Browse Inventory</span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator with Down Arrow - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 lg:bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/80 text-sm lg:text-lg flex flex-col items-center gap-2 lg:gap-3"
            >
              <span className="font-semibold">Get Quotation</span> 
              
              {/* Arrow and dot container */}
              <div className="flex flex-col items-center gap-1 lg:gap-2">
                {/* Downward Arrow */}
                <motion.svg
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="w-4 h-4 lg:w-6 lg:h-6 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>

                {/* Dot animation - Smaller on mobile */}
                <div className="w-6 h-10 lg:w-8 lg:h-14 border-2 lg:border-3 border-white/40 rounded-full flex justify-center"> 
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-3 lg:w-2 lg:h-4 bg-white/70 rounded-full mt-2 lg:mt-3"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ORIGINAL CONTENT SECTIONS - Mobile Optimized */}
        
        {/* Content Section - Stack on Mobile */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 lg:px-6 pb-12 lg:pb-16 mt-12 lg:mt-20 relative z-20">
          {/* Left Column - Brands & Process */}
          <div className="lg:flex-1 space-y-6 lg:space-y-8">
            {/* Brands Marquee - Mobile Optimized */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-xl lg:shadow-2xl border border-white/20"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6 text-center">
                Brands We Deal in 
              </h3>
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6 lg:gap-12"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  {[...logos, ...logos].map((logo: Logo, i: number) => (
                    <div key={`${logo.alt}-${i}`} className="flex-shrink-0">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={80}
                        height={40}
                        className="h-8 lg:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Process Steps - Mobile Optimized */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl lg:shadow-2xl border border-white/20"
            >
              <StepByStepProcess />
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:flex-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-xl lg:shadow-2xl border border-white/20">
              <BuyMachineForm />
            </div>
          </motion.div>
        </div>

        {/* CTA Section - Mobile Optimized */}
        <section id="cta-section" className="bg-gradient-to-r from-[#0B3B61] via-[#0B3B61] to-amber-600 rounded-2xl lg:rounded-3xl mx-4 lg:mx-6 my-12 lg:my-16 p-6 lg:p-12 text-center text-white shadow-xl lg:shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base lg:text-xl text-blue-100 mb-6 lg:mb-8">
              Join thousands of satisfied customers who trust us for their textile machinery needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <motion.button 
                onClick={handleGetStartedToday}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-amber-600 px-6 py-2.5 lg:px-8 lg:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg text-sm lg:text-base w-full sm:w-auto"
              >
                Get Started Today
              </motion.button>
              <motion.button 
                onClick={handleContactSales}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 py-2.5 lg:px-8 lg:py-3 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm lg:text-base w-full sm:w-auto"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}