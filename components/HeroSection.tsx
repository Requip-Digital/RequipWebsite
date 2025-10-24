"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    setShowDialog(true);
  };

  const handleOptionSelect = (option: 'buy' | 'sell') => {
    setShowDialog(false);
    if (option === 'buy') {
      router.push('/buy');
    } else {
      router.push('/sell');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* =============================== */}
      {/* LAYER 1: ANIMATED BACKGROUND IMAGE */}
      {/* =============================== */}
      <div className="absolute inset-0">
        {/* Main Background Image - Full Size with proper containment */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: "url('/images/herosection3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* =============================== */}
        {/* LAYER 2: ANIMATED GRADIENT OVERLAY */}
        {/* =============================== */}
        {/* Dark gradient on left side for text readability */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Bright gradient from center to right side */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-l from-white/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        
        {/* Additional gradient for smoother transition */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/30 to-transparent w-2/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </div>
      
      {/* =============================== */}
      {/* LAYER 3: MAIN CONTENT */}
      {/* =============================== */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* SUB-LAYER 3.1: Left Content Column - Improved spacing */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 mt-10 lg:mt-0"
          >
            <div className="pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
              >
                <motion.div 
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-blue-400 text-sm font-medium">Trusted by 50+ Industries</span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-white">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Industrial
                </motion.span>
                <motion.span 
                  className="block text-blue-500"
                  initial={{ opacity: 0, scale: 0.9, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  Excellence
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  Redefined
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Transforming industrial operations with cutting-edge technology 
                and innovative solutions for the modern era.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pb-8 lg:pb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            >
              <motion.button 
                onClick={handleGetStarted}
                className="group bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-600/25"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  Get Started
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                >
                  <ArrowRight className="w-5 h-5 transition-transform" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* SUB-LAYER 3.2: Right Content Column (Empty but Animated) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative lg:block flex items-center justify-center"
          >
            {/* Floating elements for visual interest */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-20"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-amber-500 rounded-full opacity-20"
              animate={{ 
                y: [0, 15, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        </div>
      </div>

      {/* =============================== */}
      {/* LAYER 4: ANIMATED SCROLL INDICATOR */}
      {/* =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center space-y-3">
          <motion.span 
            className="text-sm text-gray-400 font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            DISCOVER MORE
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center backdrop-blur-sm bg-black/20"
          >
            <motion.div 
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* =============================== */}
      {/* LAYER 5: MODAL DIALOG (Conditional) */}
      {/* =============================== */}
      {showDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-md"
          >
            <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
                <p className="text-gray-300">Choose your path to industrial excellence</p>
              </motion.div>
              
              <div className="space-y-4">
                <motion.button
                  onClick={() => handleOptionSelect('buy')}
                  whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#0B3B61] hover:bg-[#1685df] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-between transition-all duration-300 border border-blue-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-blue-300" />
                    </motion.div>
                    <div className="text-left">
                      <div className="font-semibold">Buy Machines</div>
                      <div className="text-sm text-blue-200">Find the perfect equipment</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() => handleOptionSelect('sell')}
                  whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-between transition-all duration-300 border border-amber-500/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-amber-300" />
                    </motion.div>
                    <div className="text-left">
                      <div className="font-semibold">Sell Machines</div>
                      <div className="text-sm text-amber-200">List your equipment</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.button
                onClick={() => setShowDialog(false)}
                className="w-full mt-6 py-3 text-gray-400 hover:text-white transition-colors font-medium rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}