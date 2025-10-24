"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 relative z-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        {/* Changed gradient line from blue-to-purple to amber-500 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
      </div>

      <div className="relative z-10 px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid gap-12 lg:grid-cols-4 mb-12">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-amber-500 font-avenir">Requip</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Delivering production-ready used and reconditioned industrial machines 
                restored to original performance standards with genuine components 
                and comprehensive support across India.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>+91 9972860913</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>enquiry@requip.in</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Bengaluru, Karnataka</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/#choose", label: "Why Choose Us" },
                  { href: "/#process", label: "Our Process" },
                  { href: "/contact", label: "Contact Us" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">Our Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  Machine Reconditioning
                </li>
                <li className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  Annual Maintenance
                </li>
                <li className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  Genuine Spare Parts
                </li>
                <li className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  Installation Services
                </li>
                <li className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  Technical Support
                </li>
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
              <p className="text-sm text-gray-400">
                Follow us on social media for updates and industry insights.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { 
                    href: "https://www.facebook.com/profile.php?id=61578906664291", 
                    icon: <Facebook className="h-5 w-5" />,
                    color: "hover:text-amber-400"
                  },
                  { 
                    href: "https://www.linkedin.com/company/requip-digital-private-limited/about/", 
                    icon: <Linkedin className="h-5 w-5" />,
                    color: "hover:text-amber-400"
                  },
                  { 
                    href: "#", 
                    icon: <Twitter className="h-5 w-5" />,
                    color: "hover:text-amber-400"
                  },
                  { 
                    href: "#", 
                    icon: <Instagram className="h-5 w-5" />,
                    color: "hover:text-amber-400"
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 text-gray-400 ${social.color} transition-all duration-300 backdrop-blur-sm hover:border-amber-400/30`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-white">Stay Updated</h5>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  />
                  <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors duration-300">
                    Join
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Legal & Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-sm text-gray-400">
                &copy; {currentYear} REQUIP. All rights reserved.
              </p>

              {/* Legal Links */}
              <div className="flex gap-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>

              {/* Made With Love */}
              <p className="text-sm text-gray-500">
                Buy. Sell. Trust. Requip
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-500 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-8 left-8 w-1 h-1 bg-amber-500 rounded-full opacity-30"></div>
      <div className="absolute bottom-16 left-1/4 w-1 h-1 bg-amber-500 rounded-full opacity-40"></div>
    </footer>
  );
}