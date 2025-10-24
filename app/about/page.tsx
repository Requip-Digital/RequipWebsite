"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}