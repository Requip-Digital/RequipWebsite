"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircleMore, MapPin, Send, Clock, Building, ChevronLeft, ChevronRight } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Phone",
      details: "+91 9972860913",
      description: "Mon to Sat 9am to 8pm",
      color: "blue",
      href: "tel:+919972860913"
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email",
      details: "enquiry@requip.in",
      description: "Send us your query anytime!",
      color: "green",
      href: "mailto:enquiry@requip.in"
    },
    {
      icon: <MessageCircleMore className="w-7 h-7" />,
      title: "WhatsApp",
      details: "+91 9972860913",
      description: "Quick chat support",
      color: "orange",
      href: "https://wa.me/919972860913"
    }
  ];

  const locations = [
    {
      icon: <Building className="w-7 h-7" />,
      title: "Head Office",
      address: "1st Floor, L1WS6A, #10, 14th Main 5th Sector HSR Layout Bengaluru, Karnataka, India - 560102",
      color: "purple"
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Requip Innovation Centre",
      address: "Bhiwandi, Thane District, Maharashtra - 421302, Post -Lonad, Survey No. 59/2/3/A.",
      color: "cyan"
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Surat Office",
      address: "58-59, Avadh Market, Saroli, Surat, Gujarat - 395010",
      color: "cyan"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Machine Purchase",
    "Service & Maintenance",
    "Spare Parts",
    "Technical Support",
    "Partnership"
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, locations.length]);

  const nextLocation = () => {
    setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
  };

  const prevLocation = () => {
    setCurrentLocationIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  const goToLocation = (index: number) => {
    setCurrentLocationIndex(index);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        hoverBorder: "hover:border-blue-500/50"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-500",
        hoverBorder: "hover:border-green-500/50"
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-500",
        hoverBorder: "hover:border-orange-500/50"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-500",
        hoverBorder: "hover:border-purple-500/50"
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-500",
        hoverBorder: "hover:border-cyan-500/50"
      }
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="contact" className="w-full py-20 relative overflow-hidden">
      {/* Background - Matching your other sections */}
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
          className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-3"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-400 text-sm font-medium">GET IN TOUCH</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Contact <span className="text-amber-500">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your operations? Reach out to us for expert guidance on industrial machinery solutions.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-6"
            >
              {contactMethods.map((method, index) => {
                const colors = getColorClasses(method.color);
                return (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? "_blank" : undefined}
                    rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group relative bg-gray-800/30 backdrop-blur-xl rounded-3xl p-7 border border-gray-700/50 ${colors.hoverBorder} transition-all duration-500 flex items-center gap-6`}
                  >
                    {/* Icon Container */}
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colors.border}`}>
                      <div className={colors.text}>
                        {method.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p className="text-blue-400 font-semibold mb-2 text-base">
                        {method.details}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {method.description}
                      </p>
                    </div>

                    {/* Corner Accents */}
                    <div className={`absolute top-4 right-4 w-2 h-2 ${colors.text} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200`}></div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Locations Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Carousel Container */}
              <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl p-7 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                {/* Navigation Arrows */}
                <button
                  onClick={prevLocation}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextLocation}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Carousel Slides */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLocationIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <LocationCard location={locations[currentLocationIndex]} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {locations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToLocation(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentLocationIndex 
                          ? 'bg-purple-500 w-8' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Location Counter - Increased Size */}
                <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">
                    {currentLocationIndex + 1} / {locations.length}
                  </span>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-xl group-hover:opacity-50 opacity-0 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form (Adjusted for equal height) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative h-full"
          >
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                  Send us a Message
                </h3>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors"
                    >
                      <option value="" className="text-gray-400">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject} className="text-gray-900">{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 mt-auto"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl group-hover:opacity-50 opacity-0 transition-opacity duration-500 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Location Card Component 
const LocationCard = ({ location }: { location: any }) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        hoverBorder: "hover:border-blue-500/50"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-500",
        hoverBorder: "hover:border-green-500/50"
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-500",
        hoverBorder: "hover:border-orange-500/50"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-500",
        hoverBorder: "hover:border-purple-500/50"
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-500",
        hoverBorder: "hover:border-cyan-500/50"
      }
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colors = getColorClasses(location.color);

  return (
    <div className="flex items-center gap-6">
      {/* Icon Container */}
      <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center ${colors.border}`}>
        <div className={colors.text}>
          {location.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2">
          {location.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {location.address}
        </p>
      </div>
    </div>
  );
};