"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowRight, Send, Clock, Users, Building, MessageCircle } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Simple tracking service
class TrackingService {
  async trackWhatsAppClick(source: string, message: string = '') {
    const eventData = {
      event: 'whatsapp_click',
      source,
      message_preview: message.substring(0, 100),
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    console.log('📱 WhatsApp Click:', eventData);

    // Send to your tracking API
    try {
      await fetch('/api/Whatsapp/track-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      // Silent fail - don't interrupt user experience
      console.log('✅ WhatsApp click recorded locally');
    }
  }

  generateWhatsAppURL(phoneNumber: string, message: string, source: string): string {
    // Track the click in background
    this.trackWhatsAppClick(source, message);

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }
}

export const tracking = new TrackingService();

// Fixed particle positions to avoid hydration errors
const fixedParticles = [
  { top: '10%', left: '15%', color: 'blue', delay: 0 },
  { top: '25%', left: '80%', color: 'orange', delay: 0.5 },
  { top: '40%', left: '5%', color: 'green', delay: 1 },
  { top: '55%', left: '60%', color: 'purple', delay: 1.5 },
  { top: '70%', left: '25%', color: 'blue', delay: 2 },
  { top: '85%', left: '75%', color: 'orange', delay: 2.5 },
  { top: '15%', left: '45%', color: 'green', delay: 3 },
  { top: '35%', left: '95%', color: 'purple', delay: 3.5 },
  { top: '65%', left: '10%', color: 'blue', delay: 4 },
  { top: '45%', left: '35%', color: 'orange', delay: 4.5 },
  { top: '75%', left: '50%', color: 'green', delay: 5 },
  { top: '20%', left: '65%', color: 'purple', delay: 5.5 },
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); 
  const formRef = useRef<HTMLFormElement>(null);

  // Set client-side flag to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        toast.success("Message sent successfully!");
        router.push("/success?type=contact");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  // Handle WhatsApp click with basic tracking
  const handleWhatsAppClick = (source: string, predefinedMessage?: string) => {
    const phoneNumber = "919972860913"; // Direct number
    const message = predefinedMessage || "Hello! I'm interested in learning more about your machines and services.";
    
    const url = tracking.generateWhatsAppURL(phoneNumber, message, source);
    window.open(url, '_blank');
  };

  // Enhanced contact information with click handlers
  const contactInfo = [
    {
      icon: Mail,
      href: "mailto:enquiry@requip.com",
      title: "Email",
      detail: "enquiry@requip.com",
      description: "We'll respond within 24 hours",
      color: "blue",
      action: "Send Email",
      type: "email" as const
    },
    {
      icon: MessageCircle,
      onClick: () => handleWhatsAppClick("contact_page_whatsapp_button"),
      title: "WhatsApp",
      detail: "+91 9972860913",
      description: "Quick chat response",
      color: "green",
      action: "Chat on WhatsApp",
      type: "whatsapp" as const
    },
    {
      icon: Phone,
      href: "tel:+919972860913",
      title: "Phone",
      detail: "+91 9972860913",
      description: "Monday-Saturday, 9AM-6PM",
      color: "green",
      action: "Call Now",
      type: "phone" as const
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Synerge+Workspace+1st+Floor+L1WS6A+10+14th+Main+5th+Sector+HSR+Layout+Bengaluru+Karnataka+560102",
      title: "Office",
      detail: "Synerge Workspace, 1st Floor, L1WS6A, #10, 14th Main 5th Sector HSR Layout Bengaluru, Karnataka 560102",
      description: "Visit our office",
      color: "orange",
      action: "Get Directions",
      type: "map" as const
    }
  ];

  // Company stats
  const companyStats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Building, value: "100+", label: "Machines Deployed" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  // Handle contact item click
  const handleContactClick = (item: any, index: number) => {
    setSelectedContact(index);
    
    if (item.type === 'whatsapp' && item.onClick) {
      item.onClick();
    }
  };

  return (
    <>
      <Header/>

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
        
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Main Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black"></div>
          
          {/* Additional Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3B61] via-[#0B3B61] to-amber-600/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/5 via-transparent to-orange-900/5"></div>
          
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
          
          {/* Dynamic Gradient Orbs */}
          <motion.div 
            className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-b from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-40 right-32 w-96 h-96 bg-gradient-to-b from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Fixed Floating Particles - No random values */}
        {isClient && fixedParticles.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${particle.color}-500 rounded-full`}
            style={{
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Contact Card */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Enhanced Header Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm font-medium">Get in Touch</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white">
                Let's Talk 
                <motion.span 
                  className="block text-amber-500"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Machines
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Ready to transform your industrial operations? Reach out and let's discuss how we can help you achieve excellence.
              </motion.p>

              {/* Quick WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12"
              >
                <motion.button
                  onClick={() => handleWhatsAppClick("contact_page_quick_button")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-green-600/25 flex items-center justify-center gap-3 mx-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Chat instantly on WhatsApp</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Company Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {companyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-xl mb-3 border border-gray-700/50">
                      <stat.icon className="text-amber-500 w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Content */}
            <div className="grid lg:grid-cols-2 gap-10 items-start mb-8">
              {/* Left Column - Enhanced Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-600/30">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                          selectedContact === index ? 'ring-2 ring-amber-500' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.type === 'whatsapp' ? (
                          // WhatsApp with onClick and tracking
                          <div
                            onClick={() => handleContactClick(item, index)}
                            className="flex items-start gap-4 p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
                          >
                            <div className={`p-3 bg-${item.color}-500/10 rounded-xl group-hover:bg-${item.color}-500/20 transition-colors flex-shrink-0`}>
                              <item.icon className={`text-${item.color}-400 w-6 h-6`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                                  {item.action}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                              {item.description && (
                                <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          // Other contact methods with href
                          <a
                            href={item.href}
                            target={item.href.includes('maps.google.com') ? "_blank" : "_self"}
                            rel={item.href.includes('maps.google.com') ? "noopener noreferrer" : ""}
                            className="flex items-start gap-4 p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
                            onMouseEnter={() => setSelectedContact(index)}
                            onMouseLeave={() => setSelectedContact(null)}
                          >
                            <div className={`p-3 bg-${item.color}-500/10 rounded-xl group-hover:bg-${item.color}-500/20 transition-colors flex-shrink-0`}>
                              <item.icon className={`text-${item.color}-400 w-6 h-6`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                                  {item.action}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                              {item.description && (
                                <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Response Info */}
                  <motion.div 
                    className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="text-amber-400 text-sm font-medium">Quick Response Guaranteed</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">We typically respond to all inquiries within 2 hours during business days.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Enhanced Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-gray-800/40 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you soon.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter your full name"
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email address"
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="Your company name"
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="Your phone number"
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      {...register("message")}
                      placeholder="Tell us about your machines, requirements, or any specific inquiry..."
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-sm"
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <span className={`text-sm ${
                        watchedFields.message?.length >= 10 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {watchedFields.message?.length || 0}/10
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    whileHover={{ scale: isValid ? 1.02 : 1 }}
                    whileTap={{ scale: isValid ? 0.98 : 1 }}
                    className="w-full bg-[#0B3B61] hover:bg-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 transform shadow-2xl shadow-blue-600/25 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-400 text-sm">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with minimal top margin */}
      <div className="mt-0">
        <Footer />
      </div>
    </>
  );
}