"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // <-- import router

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // <-- initialize router

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        toast.success("Message saved successfully!");
        router.push("/success?type=contact"); // <-- redirect to success page
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/BrandLogo.png" 
              alt="Requip Logo"
              width={35}
              height={35}
              className="object-contain"
              priority
            />
            <Link href="/" className="text-2xl font-bold text-blue-600 font-ethnocentric items-center">
              Requip
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-gray-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/buy" className="hover:text-blue-600">Buy</Link>
            <Link href="/sell" className="hover:text-blue-600">Sell</Link>
            <Link href="/career" className="hover:text-blue-600">Career</Link>
            <Link href="/contact" className="text-blue-600 font-semibold">Contact</Link>
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Home</Link>
            <Link href="/buy" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Buy</Link>
            <Link href="/sell" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Sell</Link>
            <Link href="/career" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Career</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-blue-600 font-semibold">Contact</Link>
          </div>
        )}
      </header>

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 pt-28 bg-[#EDF3F9] overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-b from-blue-200/60 to-transparent transform -skew-x-12">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to-right,rgba(59,130,246,0.4)_0px,rgba(59,130,246,0.4)_2px,transparent_2px,transparent_8px)]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-full bg-gradient-to-t from-blue-200/60 to-transparent transform skew-x-12">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to-right,rgba(59,130,246,0.4)_0px,rgba(59,130,246,0.4)_2px,transparent_2px,transparent_8px)]"></div>
        </div>

        {/* Contact Card */}
        <div className="relative grid md:grid-cols-2 gap-10 max-w-5xl w-full bg-white/90 rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">Have questions or want to work with us? Fill out the form and we’ll get back to you.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-blue-600 w-6 h-6" />
                <span className="text-gray-700">enquiry@requip.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-blue-600 w-6 h-6" />
                <span className="text-gray-700">+91 8062178569</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-600 h-10 w-10" />
                <span className="text-gray-700">
                  Synerge Workspace, 1st Floor, L1WS6A, #10, 14th Main 5th Sector HSR Layout Bengaluru, Karnataka 560102.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your Name"
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Your Email"
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                {...register("message")}
                placeholder="Write your message..."
                className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
