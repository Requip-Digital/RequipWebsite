"use client"

import { motion } from "framer-motion"

type CubesProps = {
  cubeSize?: number
  faceColor?: string
  borderStyle?: string
  shadow?: string
  autoAnimate?: boolean
}

export default function Cubes({
  cubeSize = 40,
  faceColor = "#1e3a8a", // Tailwind blue-900
  borderStyle = "1px solid rgba(255,255,255,0.08)",
  shadow = "0 0 6px rgba(0,0,0,.3)",
  autoAnimate = true,
}: CubesProps) {
  // Calculate grid size
  const cols = Math.ceil(typeof window !== "undefined" ? window.innerWidth / cubeSize : 20)
  const rows = Math.ceil(typeof window !== "undefined" ? window.innerHeight / cubeSize : 15)
  const cubes = Array.from({ length: cols * rows })

  return (
    <div
      className="absolute inset-0 grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cubeSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cubeSize}px)`,
      }}
    >
      {cubes.map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: cubeSize,
            height: cubeSize,
            background: faceColor,
            border: borderStyle,
            boxShadow: shadow,
          }}
          animate={
            autoAnimate
              ? {
                  rotateY: [0, 360],
                  rotateX: [0, 360],
                  opacity: [0.5, 1, 0.5],
                }
              : {}
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.01,
          }}
        />
      ))}
    </div>
  )
}
