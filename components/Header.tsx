"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 w-full h-20 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Stylish White Background with Patterns */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
        
        {/* Animated Floating Elements */}
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur-2xl opacity-40"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-2xl opacity-40"
          animate={{
            y: [0, 10, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Geometric Shapes */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 clip-path-polygon"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 clip-path-polygon rotate-180"></div>
      </div>

      {/* Enhanced Glass Effect on Scroll */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-50/20 to-blue-50/20 backdrop-blur-lg border-b border-cyan-100/50"
        animate={{
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-center justify-between w-full max-w-7xl px-6 relative z-10">
        {/* Left Navigation */}
        <nav className="flex items-center space-x-8 z-20">
          <a href="/" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Home</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
          <a href="/buy" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Buy</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
          <a href="/sell" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Sell</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
          <a href="/coming-soon" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Service</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
        </nav>

        {/* Center Logos - Same Animation System */}
        <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-auto">
          {/* Logo */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ 
              x: scrolled ? -620 : 0 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 80,
              damping: 20,
              mass: 1.5
            }}
            className="z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/emb.png" 
                alt="Logo" 
                width={60} 
                height={60}
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Text Logo */}
          <motion.div
            initial={{ x: 100 }}
            animate={{ 
              x: scrolled ? 645 : 0 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 80,
              damping: 20,
              mass: 1.5
            }}
            className="z-10 mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/name.png" 
                alt="Logo" 
                width={120} 
                height={80}
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Navigation */}
        <motion.nav 
          className="flex items-center space-x-8 z-20"
          initial={{ x: 0 }}
          animate={{ 
            x: scrolled ? -40 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 80,
            damping: 20,
            mass: 1.5
          }}
        >
          <a href="/about" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">About</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
          <a href="/coming-soon" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Blogs</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
          <a href="/contact" className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative">
            <span className="relative z-10">Contact</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          </a>
        </motion.nav>
      </div>

      {/* Add CSS for geometric shapes */}
      <style jsx>{`
        .clip-path-polygon {
          clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
        }
      `}</style>
    </motion.header>
  );
}