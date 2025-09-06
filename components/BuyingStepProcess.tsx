"use client";

import { ShoppingCart, FileText, CheckCircle, Package, Store, Truck } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  {
    title: "Browse Inventory",
    description: "Explore a wide range of verified pre-owned machines across categories.",
    icon: ShoppingCart,
  },
  {
    title: "Submit Your Request",
    description: "Fill in your requirements and connect with us.",
    icon: FileText,
  },
  {
    title: "Visit Our Display Centre",
    description: "See machines in person at our display centre before making a decision.",
    icon: Store,
  },
  {
    title: "Verify & Negotiate",
    description: "Check details, compare offers, and finalize the right deal.",
    icon: CheckCircle,
  },
  {
    title: "Secure Purchase",
    description: "Complete your purchase with secure payment & nationwide delivery.",
    icon: Package,
  },
  {
    title: "Free and Safe Installation",
    description: "From unboxing to setup, we provide free, secure installation for your machine with expert team.",
    icon: Truck,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

export default function StepByStepProcess() {
  return (
    <section className="relative py-10 px-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
        How Buying Works
      </h2>

      <motion.div
        className="relative flex flex-col gap-8" // ⬅ Increased from gap-5 → gap-8 (32px)
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* 🔹 Continuous vertical line */}
        <span className="absolute left-6 top-6 bottom-6 w-[2px] bg-blue-200"></span>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 relative"
            variants={stepVariants}
          >
            {/* Icon */}
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 shrink-0 relative z-10"
              variants={stepVariants}
            >
              <step.icon size={24} />
            </motion.div>

            {/* Step Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
