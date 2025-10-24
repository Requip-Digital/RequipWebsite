"use client";

import { motion } from "framer-motion";
import { Shield, Wrench, Package, Truck, Eye, FileText, Headphones, BadgeCheck } from "lucide-react";

export function WhyChooseSection() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "1-Year Warranty",
      description: "Complete peace of mind with our comprehensive warranty coverage on all reconditioned machines.",
      stats: "Full Coverage",
      colorClass: "blue"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Annual Free Maintenance",
      description: "Keep your machines running smoothly with our complimentary annual maintenance service.",
      stats: "Zero Cost",
      colorClass: "orange"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Genuine Spare Parts",
      description: "Access genuine spare parts to keep your machines running for years, and enjoy exclusive discounts as part of our commitment to long-term customer value.",
      stats: "Authentic Parts",
      colorClass: "green"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Installation",
      description: "Professional installation service included at no extra cost with every machine purchase.",
      stats: "No Hidden Costs",
      colorClass: "purple"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Complete Transparency",
      description: "Full disclosure of inspection and reconditioning process, genuine parts certification, and comprehensive quality reports.",
      stats: "Full Disclosure",
      colorClass: "cyan"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Detailed Machine Information",
      description: "Complete documentation and performance validation reports.",
      stats: "Full Documentation",
      colorClass: "red"
    }
  ];

  const getColorClasses = (colorClass: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        badgeBg: "bg-blue-500/10",
        badgeBorder: "border-blue-500/20",
        badgeText: "text-blue-400",
        dot: "bg-blue-500",
        hoverBorder: "hover:border-blue-500/50"
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-500",
        badgeBg: "bg-orange-500/10",
        badgeBorder: "border-orange-500/20",
        badgeText: "text-orange-400",
        dot: "bg-orange-500",
        hoverBorder: "hover:border-orange-500/50"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-500",
        badgeBg: "bg-green-500/10",
        badgeBorder: "border-green-500/20",
        badgeText: "text-green-400",
        dot: "bg-green-500",
        hoverBorder: "hover:border-green-500/50"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-500",
        badgeBg: "bg-purple-500/10",
        badgeBorder: "border-purple-500/20",
        badgeText: "text-purple-400",
        dot: "bg-purple-500",
        hoverBorder: "hover:border-purple-500/50"
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-500",
        badgeBg: "bg-cyan-500/10",
        badgeBorder: "border-cyan-500/20",
        badgeText: "text-cyan-400",
        dot: "bg-cyan-500",
        hoverBorder: "hover:border-cyan-500/50"
      },
      red: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-500",
        badgeBg: "bg-red-500/10",
        badgeBorder: "border-red-500/20",
        badgeText: "text-red-400",
        dot: "bg-red-500",
        hoverBorder: "hover:border-red-500/50"
      }
    };
    
    return colorMap[colorClass as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="choose" className="w-full py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-3"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-400 text-sm font-medium">WHY CHOOSE US</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Unmatched Quality <span className="text-amber-500">&</span> Service
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We don't just repair machines – we restore them to performance standards with genuine parts,
            comprehensive testing, and ironclad guarantees.
          </p>
        </motion.div>

        {/* Features Grid - UPDATED FOR EQUAL HEIGHT */}
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.colorClass);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                {/* Main Card - UPDATED: Added min-h and consistent padding */}
                <div className={`bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 ${colors.hoverBorder} transition-all duration-500 flex flex-col relative overflow-hidden flex-1 min-h-[320px]`}>
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${colors.border}`}>
                    <div className={colors.text}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 flex-1 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Stats Badge */}
                    <div className={`inline-flex items-center gap-2 ${colors.badgeBg} ${colors.badgeBorder} rounded-full px-4 py-2 mt-auto`}>
                      <div className={`w-1.5 h-1.5 ${colors.dot} rounded-full animate-pulse`}></div>
                      <span className={`${colors.badgeText} text-sm font-medium`}>
                        {feature.stats}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className={`absolute top-4 right-4 w-2 h-2 ${colors.dot} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200`}></div>
                  <div className={`absolute bottom-4 left-4 w-1.5 h-1.5 ${colors.dot} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300`}></div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 ${colors.bg.replace('10', '20')} rounded-3xl blur-xl group-hover:opacity-50 opacity-0 transition-opacity duration-500 -z-10`}></div>
              </motion.div>
            );
          })}

          {/* Full Width Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group relative md:col-span-2 lg:col-span-3 flex flex-col"
          >
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 flex flex-col relative overflow-hidden min-h-[200px]">
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 flex-1">
                {/* Icon Container */}
                <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                  <Headphones className="w-10 h-10 text-blue-500" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                    Post-Sales Support & Accountability
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 max-w-4xl">
                    Dedicated support team ensures your satisfaction long after purchase with ongoing assistance and accountability.
                  </p>
                  
                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-base font-medium">
                      Support Commitment
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300"></div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl group-hover:opacity-50 opacity-0 transition-opacity duration-500 -z-10"></div>
          </motion.div>
        </div>

        {/* Bottom CTA
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Requip Difference?
            </h3>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their industrial equipment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105">
                Get Started Today
                <BadgeCheck className="w-5 h-5" />
              </button>
              <button className="border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
                View Our Catalog
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}