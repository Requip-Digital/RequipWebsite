'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  parallax?: boolean
  speed?: number
  fullInitialOpacity?: boolean
}

export function ScrollAnimation({ 
  children, 
  className = "",
  parallax = true,
  speed = 0.2,
  fullInitialOpacity = false
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  
  // Create a more pronounced opacity effect for the current section
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.1, 1, 1, 1, 0.1]
  )
  
  // Add a smoother scale effect with more keyframes
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0.98, 0.99, 1, 1, 1, 1, 1, 1, 1, 0.99, 0.98]
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: fullInitialOpacity ? 1 : 0.1, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        y: parallax ? y : 0,
        opacity: parallax ? opacity : 1,
        scale: parallax ? scale : 1
      }}
      className={`transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
} 