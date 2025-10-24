// app/blog/page.tsx
"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

export default function BlogPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20">
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}