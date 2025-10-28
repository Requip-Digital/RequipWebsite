"use client";

import { motion } from "framer-motion";
import { Search, CheckCircle, Truck, Wrench, TestTube, ClipboardCheck } from "lucide-react";

interface ProcessStep {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export function HowWeWorkSection(): JSX.Element {
  // WhatsApp navigation function
  const handleWhatsAppClick = () => {
    // Replace with your actual phone number (with country code, without +)
    const phoneNumber = "919972860913"; // Example: 91 for India, then your number
    
    // Your pre-filled message
    const message = "Hello! I visited your website and I'm interested in learning more about your textile machinery services and process.";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  const steps: ProcessStep[] = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "35-Point Inspection",
      description: "Product-specific checklists ensure thorough evaluation against unique specs and manufacturer standards.",
      features: ["Visual inspection", "Performance testing", "Component analysis", "Quality grading"],
      color: "blue"
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Test Runs",
      description: "Extensive performance validation, including electrical & mechanical test runs, to ensure like-new quality standards.",
      features: ["Electrical testing", "Mechanical validation", "Performance metrics", "Safety checks"],
      color: "amber"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Display Centers",
      description: "Experience our fully operational machines firsthand at our certified display facilities.",
      features: ["Live demonstrations", "Hands-on experience", "Expert guidance", "Facility tours"],
      color: "orange"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Installation",
      description: "Professional setup and commissioning to ensure seamless integration into your production line.",
      features: ["Professional setup", "System integration", "Commissioning"],
      color: "purple"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Ongoing Support",
      description: "Dedicated support team ensures sustained peak performance with genuine parts and expert service.",
      features: ["Technical support", "Genuine parts", "Maintenance services", "Performance monitoring"],
      color: "cyan"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Complete documentation and certification provided for every machine, ensuring full transparency.",
      features: ["Quality certification", "Documentation", "Performance reports", "Warranty coverage"],
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        hoverBorder: "hover:border-blue-500/50",
        gradient: "from-blue-500/5 to-blue-600/5"
      },
      amber: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-500",
        hoverBorder: "hover:border-amber-500/50",
        gradient: "from-amber-500/5 to-amber-600/5"
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-500",
        hoverBorder: "hover:border-orange-500/50",
        gradient: "from-orange-500/5 to-orange-600/5"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-500",
        hoverBorder: "hover:border-purple-500/50",
        gradient: "from-purple-500/5 to-purple-600/5"
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-500",
        hoverBorder: "hover:border-cyan-500/50",
        gradient: "from-cyan-500/5 to-cyan-600/5"
      },
      red: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-500",
        hoverBorder: "hover:border-red-500/50",
        gradient: "from-red-500/5 to-red-600/5"
      }
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="process" className="w-full py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-3"
          >
            <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
            <span className="text-amber-400 text-sm font-medium">OUR PROCESS</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            How We <span className="text-amber-400">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our rigorous reconditioning process ensures every machine meets
            original manufacturer standards with certified components and
            validated performance.
          </p>
        </motion.div>

        {/* Process Steps Grid - WITH UNIFORM BULLET POINT CONTAINER */}
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center z-20">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Main Card - UNIFORM HEIGHT WITH CONSISTENT BULLET POINT CONTAINER */}
                <div className={`bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 ${colors.hoverBorder} transition-all duration-500 flex flex-col relative overflow-hidden h-full`}>
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${colors.border}`}>
                    <div className={colors.text}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                    
                    {/* UNIFORM BULLET POINT CONTAINER - Same height for all */}
                    <div className="mt-auto pt-4 border-t border-gray-700/50">
                      <div className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${colors.bg.replace('10', '30')} ${colors.text.replace('text-', 'bg-')}`}></div>
                            <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                </div>

                {/* Connecting Line (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-amber-500/30 z-10"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start?
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Contact us today to discuss your equipment needs and get a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                Get in touch
                <ClipboardCheck className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}