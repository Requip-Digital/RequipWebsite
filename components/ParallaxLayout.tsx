"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ParallaxLayoutProps {
  children: ReactNode
}

export default function ParallaxLayout({ children }: ParallaxLayoutProps) {
  const shapes = [
    { size: 16, color: "bg-blue-400", top: "10%", left: "5%", opacity: 0.3 },
    { size: 12, color: "bg-purple-400", top: "25%", left: "65%", opacity: 0.25 },
    { size: 20, color: "bg-pink-400", top: "50%", left: "25%", opacity: 0.2 },
    { size: 10, color: "bg-green-300", top: "65%", left: "33%", opacity: 0.3 },
    { size: 24, color: "bg-yellow-300", top: "33%", left: "20%", opacity: 0.2 },
    { size: 14, color: "bg-red-400", top: "75%", left: "75%", opacity: 0.25 },
    { size: 18, color: "bg-indigo-300", top: "16%", left: "80%", opacity: 0.2 },
    { size: 12, color: "bg-teal-400", top: "50%", left: "60%", opacity: 0.25 },
  ]

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gray-50">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.color} rounded-full`}
          style={{
            width: `${shape.size}rem`,
            height: `${shape.size}rem`,
            top: shape.top,
            left: shape.left,
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            opacity: [0, shape.opacity, 0], // fades almost invisible
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 1,
          }}
        />
      ))}

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
