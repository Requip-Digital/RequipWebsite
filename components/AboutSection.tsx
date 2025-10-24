"use client";

import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface Value {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function AboutSection(): JSX.Element {
  const teamMembers: TeamMember[] = [
    {
      name: "Nikunj J",
      role: "CEO & Founder",
      bio: "Leader with 15+ years in textile industry innovation and business strategy."
    },
    {
      name: "Shubham K S",
      role: "Operations Lead",
      bio:"Operations maestro with deep expertise in supply chain and quality management."
    },
    {
      name: "Kenneth S",
      role: "Marketing Lead",
      bio: "Marketer specializing in vertical penetration and brand building for industrial sectors."
    },
    {
      name: "Manish R",
      role: "Business Solutions Engineer",
      bio: "Tech-head specializing in industrial automation and smart manufacturing solutions."
    }
  ];

  // SVG Icons for Company Values
  const companyValues: Value[] = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Trust",
      description: "Every machine verified, every deal handled with integrity and transparency."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality",
      description: "Rigorous inspection standards for new, used, and reconditioned machinery."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Seamless Service",
      description: "End-to-end support from inspection to installation and after-sales."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: "Global Reach",
      description: "Connecting with buyers and sellers across India and international markets."
    }
  ];

  // SVG Icons for Services
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
        </svg>
      ),
      title: "Machine Verification",
      description: "Rigorous inspection and quality assurance for every machine with detailed certification"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "End-to-End Support",
      description: "Complete support from installation to after-sales service and maintenance"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Finance Assistance",
      description: "Helping you secure the best financing options tailored to your business needs"
    }
  ];

  const stats = [
    { number: "100+", label: "Verified Machines" },
    { number: "10+", label: "Cities Across India" },
    { number: "24/7", label: "Support" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <>
      {/* Hero Section - Cyan to Blue Gradient */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B3B61] via-[#0B3B61] to-amber-600">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          
          {/* Animated Orbs - Cyan & Blue */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"
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

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80 font-medium">Trusted by Textile Manufacturers Across India</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            About{" "}
            <span className="text-amber-500">
              Us
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Weaving Machine Specialists – Redefining how the textile industry buys and sells machinery
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Updated Get Free Consultation Button with Gradient Box */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r to-[#0B3B61] from-amber-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0B3B61] hover:to-amber-600"
            >
              <span className="relative z-10">Get Instant Consultation</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <span className="relative z-10">Browse Inventory</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 text-lg flex flex-col items-center gap-2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-14 border-3 border-white/40 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-4 bg-white/70 rounded-full mt-3"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0B3B61] to-blue-600 bg-clip-text text-transparent mb-2 group-hover:from-[#0B3B61] group-hover:to-amber-600 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Requip – <span className="bg-gradient-to-r from-[#0B3B61] to-amber-600 bg-clip-text text-transparent">Weaving Machine Specialists</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Requip, we're redefining the way the textile industry buys and sells weaving machinery. 
                As specialists in new, used, and reconditioned weaving machines, we connect with buyers and sellers 
                across India and beyond through a platform built on trust, transparency, and verified quality.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our goal is simple — to make every transaction seamless and reliable. From machine inspection, 
                installation, and finance assistance to after-sales support, Requip ensures that every step of 
                the process adds real value to your business.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With a deep understanding of the textile sector, we're more than just a marketplace — we're your 
                trusted partner in machinery management. Every machine listed with us is carefully verified, every 
                deal is handled with integrity, and every client relationship is built to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Updated Explore Our Machinery Button with Gradient Box */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-[#0B3B61] to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-[#0B3B61]"
                >
                  Explore Our Machinery
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#0B3B61] text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#0B3B61] hover:text-white transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#0B3B61] to-[#0B3B61] rounded-2xl p-8 text-white h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center relative z-10">
                  {/* Factory Icon */}
                  <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-2">Our Philosophy</h3>
                  <p className="text-amber-500 text-xl font-semibold">Buy. Sell. Trust. Requip.</p>
                  <p className="text-white mt-4">Industrial Excellence Redefined</p>
                </div>
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-500 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="bg-gradient-to-r from-[#0B3B61] via-[#0B3B61] to-amber-600 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by our philosophy — Buy. Sell. Trust. Requip. — we continue to set new standards for service and dependability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-[#0B3B61] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900/5 to-cyan-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="bg-gradient-to-r text-[#0B3B61] bg-clip-text ">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your weaving machinery needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#0B3B61] to-[#134670] rounded-2xl p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-cyan-100 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Meet Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated team behind Requip's success in the weaving machinery industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#0B3B61] to-amber-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:20px_20px]"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Weaving Operations?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join textile manufacturers who trust Requip for their machinery needs. 
                Experience the difference of working with true weaving machine specialists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Updated Get Free Consultation Button with Gradient Box */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r to-amber-500 from-[#0B3B61] text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-[#0B3B61]"
                >
                  Get Free Consultation
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  Browse Our Inventory
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}