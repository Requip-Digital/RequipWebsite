"use client";

import { useState, useEffect, cloneElement } from "react"; // Added cloneElement import
import { motion, Variants } from "framer-motion";
import { 
  ListCheck, 
  Wallet, 
  History, 
  RefreshCw, 
  Headphones, 
  ArrowRight, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle
} from "lucide-react";

// Components
import SellMachineForm from "@/components/SellMachineForm";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

// Constants
const BENEFITS = [
  { 
    icon: <ListCheck className="w-8 h-8" />, 
    label: "Detailed Inspection",
    description: "35-point quality check for maximum value",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    icon: <Wallet className="w-8 h-8" />, 
    label: "Best Pricing Discovery",
    description: "Competitive offers",
    gradient: "from-amber-500 to-orange-500"
  },
  { 
    icon: <History className="w-8 h-8" />, 
    label: "Faster Conversion",
    description: "Sell your equipment quick",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    icon: <RefreshCw className="w-8 h-8" />, 
    label: "Easy Exchange",
    description: "Upgrade to newer models seamlessly",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    icon: <Headphones className="w-8 h-8" />, 
    label: "24/7 Support",
    description: "Dedicated account manager throughout",
    gradient: "from-red-500 to-rose-500"
  },
];

const STATS = [
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <Zap className="w-5 h-5" />,
    colorClass: "text-blue-400",
    description: "Happy sellers nationwide"
  },
  {
    value: "84H",
    label: "Average Sale Time",
    icon: <Clock className="w-5 h-5" />,
    colorClass: "text-amber-400",
    description: "Quick transaction process"
  },
  {
    value: "100+",
    label: "Machines Sold",
    icon: <Shield className="w-5 h-5" />,
    colorClass: "text-green-400",
    description: "Trusted by manufacturers"
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Submit Details",
    description: "Fill our simple form with your machinery details"
  },
  {
    step: "02",
    title: "Verified Offer",
    description: "Receive competitive offer from our team"
  },
  {
    step: "03",
    title: "Schedule Inspection",
    description: "Free verification by our expert team"
  },
  {
    step: "04",
    title: "Receive Payment",
    description: "After successful inspection"
  }
];

// Fixed positions for floating elements to avoid hydration mismatch
const FIXED_POSITIONS = [
  { top: "20%", left: "10%" },
  { top: "60%", left: "85%" },
  { top: "40%", left: "5%" },
  { top: "80%", left: "90%" },
  { top: "30%", left: "95%" },
  { top: "70%", left: "15%" },
  { top: "10%", left: "50%" },
  { top: "90%", left: "70%" }
];

// Animation Variants
const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function SellPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const redirectToWhatsApp = () => {
    const phoneNumber = "919972860913";
    const message = "Hi, I'm interested in selling my machinery and would like to get more information.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 -right-10 w-80 h-80 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
    </div>
  );

  const FloatingElements = () => (
    <>
      {FIXED_POSITIONS.map((position, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${
            ['blue', 'amber', 'cyan', 'purple'][i % 4]
          }-400 rounded-full opacity-40`}
          style={{
            top: position.top,
            left: position.left,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );

  const StatsSection = () => (
    <motion.div 
      className="hidden md:grid grid-cols-3 gap-4 mb-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={CONTAINER_VARIANTS}
    >
      {STATS.map((stat, index) => (
        <motion.div
          key={index}
          variants={CARD_VARIANTS}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-white/10 ${stat.colorClass}`}>
              {stat.icon}
            </div>
            <div className={`text-2xl font-bold ${stat.colorClass}`}>
              {stat.value}
            </div>
          </div>
          <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
          <div className="text-xs text-gray-400">{stat.description}</div>
        </motion.div>
      ))}
    </motion.div>
  );

  const HeroSection = () => (
    <div className="relative py-12 md:py-20 px-6 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8"
        >
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-300 text-xs md:text-sm font-semibold">
            🚀 Get Top Value for Your Equipment
          </span>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
        >
          Sell Your{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Machinery
          </span>
          <br />
          The Smart Way
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Maximize your returns with India's most trusted machinery marketplace. 
          Get competitive offers, secure transactions, and expert guidance throughout the selling process.
        </motion.p>

        {/* Stats - Now hidden on mobile */}
        <StatsSection />

        {/* Key Features */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {["No Hidden Fees", "Seamless Transactions", "Free Inspection", "Verified Buyers"].map((feature, index) => (
            <div key={index} className="flex items-center gap-1 md:gap-2 bg-white/5 rounded-lg px-2 md:px-4 py-1.5 md:py-3 border border-white/10 text-xs md:text-sm">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
              <span className="text-white font-medium">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={redirectToWhatsApp}
            className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span>Get Instant Valuation</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );

  const ProcessSection = () => (
    <div className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Simple <span className="text-amber-500">4-Step</span> Process
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            Sell your machinery quickly and securely with our streamlined process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                {step.step}
              </div>
              <h3 className="text-white font-semibold text-base md:text-lg mb-2 md:mb-3">{step.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const FormSection = () => (
    <div className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Get Your <span className="text-amber-500">Best Offer</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300">
            Fill in your machinery details 
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10 shadow-2xl overflow-hidden">
            {/* Form Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            
            {/* Glowing Effects */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <SellMachineForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const BenefitsSection = () => (
    <div className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Why Choose <span className="text-amber-500">Requip</span>?
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            We've revolutionized machinery selling with transparent processes and competitive pricing
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              variants={CARD_VARIANTS}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${benefit.gradient} shadow-lg flex-shrink-0`}>
                  {cloneElement(benefit.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{benefit.label}</h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  const FinalCTASection = () => (
    <div className="py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl md:rounded-3xl p-6 md:p-12 backdrop-blur-lg"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Get the Best Value?
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join satisfied sellers who've maximized their returns with Requip
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button 
              onClick={redirectToWhatsApp}
              className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-amber-500/25"
            >
              <span>Start Selling Today</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-gray-600 hover:border-amber-500 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:bg-white/5 backdrop-blur-sm text-sm md:text-base">
              <div className="text-left">
                <div className="font-semibold">Call Us Now</div>
                <div className="text-xs md:text-sm text-gray-400">+91 99728 60913</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <Header />

      {/* Main Content */}
      <div className="relative min-h-screen bg-gray-900 overflow-hidden">
        <BackgroundElements />
        
        {/* Only render floating elements on client side to avoid hydration mismatch */}
        {isClient && <FloatingElements />}
        
        <div className="relative z-10">
          {/* Hero Section - Added proper spacing for fixed header */}
          <section id="hero" className="scroll-mt-20">
            <HeroSection />
          </section>

          {/* Process Section */}
          <section id="process" className="scroll-mt-20">
            <ProcessSection />
          </section>

          {/* Form Section */}
          <section id="form" className="scroll-mt-20">
            <FormSection />
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="scroll-mt-20">
            <BenefitsSection />
          </section>

          {/* Final CTA */}
          <section id="cta" className="scroll-mt-20">
            <FinalCTASection />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}