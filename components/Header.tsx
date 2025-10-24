"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", id: "home" },
    { href: "/buy", label: "Buy", id: "buy" },
    { href: "/sell", label: "Sell", id: "sell" },
    { href: "/service", label: "Service", id: "service" },
    { href: "/about", label: "About", id: "about" },
    { href: "/blogs", label: "Blogs", id: "blogs" },
    { href: "/contact", label: "Contact", id: "contact" },
  ];

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

      <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-8 z-20">
          {navItems.slice(0, 4).map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative"
              onClick={handleNavClick}
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button - Visible only on mobile */}
        <div className="lg:hidden flex items-center">
          <motion.button
            className="flex flex-col w-6 h-6 justify-center items-center space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-gray-700 rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gray-700 rounded-full"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gray-700 rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
            />
          </motion.button>
        </div>

        {/* Center Logos - Different behavior for mobile vs desktop */}
        <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 w-auto">
          {/* Logo - Always visible */}
          <motion.div
            initial={{ x: isMobile ? 0 : -100 }}
            animate={{ 
              x: (scrolled && !isMobile) ? -620 : 0 
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
                width={isMobile ? 50 : 60} 
                height={isMobile ? 50 : 60}
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Text Logo - Always visible on all devices */}
          <motion.div
            initial={{ x: isMobile ? 0 : 100 }}
            animate={{ 
              x: (scrolled && !isMobile) ? 645 : 0 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 80,
              damping: 20,
              mass: 1.5
            }}
            className="z-10 mt-4 ml-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/name.png" 
                alt="Logo" 
                width={isMobile ? 90 : 120} 
                height={isMobile ? 30 : 80}
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Right Navigation - Hidden on mobile */}
        <motion.nav 
          className="hidden lg:flex items-center space-x-8 z-20"
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
          {navItems.slice(4).map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className="text-gray-700 hover:text-[#F59E0B] transition-all duration-300 font-medium group relative"
              onClick={handleNavClick}
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
            </a>
          ))}
        </motion.nav>

        {/* Placeholder for mobile to balance layout */}
        <div className="lg:hidden w-6"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl z-40 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-6 py-8">
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      className="text-gray-700 hover:text-[#F59E0B] text-lg font-medium py-2 border-b border-gray-100 transition-all duration-300 group"
                      onClick={handleNavClick}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add CSS for geometric shapes */}
      <style jsx>{`
        .clip-path-polygon {
          clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
        }
      `}</style>
    </motion.header>
  );
}