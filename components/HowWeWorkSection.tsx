"use client"

import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface Step {
  num: string
  title: string
  desc: string
}

const steps: Step[] = [
  { num: "1", title: "35-Point Inspection", desc: "Eight-point, product-specific checklists ensure thorough evaluation against unique specs and manufacturer standards." },
  { num: "2", title: "Test Runs", desc: "Extensive performance validation, including electrical & mechanical test runs, to ensure like-new quality standards." },
  { num: "3", title: "Display Centers", desc: "Experience our fully operational machines firsthand at our certified display facilities." },
  { num: "4", title: "Installation", desc: "Professional setup and commissioning to ensure seamless integration into your production line." },
  { num: "5", title: "Ongoing Support", desc: "Dedicated support team ensures sustained peak performance with genuine parts and expert service." },
]

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end 80%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-12 md:py-20 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_2px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_2px,transparent_1px)] bg-[size:80px_80px] bg-black/5"
    >
      {/* Header */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800">
            Our Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-gray-900">
            How We Work
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-lg mx-auto">
            Our rigorous reconditioning process ensures every machine meets
            original manufacturer standards with certified components and
            validated performance.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative container mx-auto mt-12 px-4 md:px-6">
        {/* Animated Center Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500 origin-top transform -translate-x-1/2"
        />

        <div className="flex flex-col space-y-12 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row items-center md:items-center"
            >
              {/* Number Circle */}
              <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-semibold shadow-md absolute left-1/2 transform -translate-x-1/2">
                {step.num}
              </div>

              {/* Card */}
              <div
                className={`mt-10 md:mt-0 md:w-1/2 p-4 md:p-5 rounded-xl shadow-lg bg-white ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
                }`}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
