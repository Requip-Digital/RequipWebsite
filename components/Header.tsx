import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">REQUIP</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        <Button className="bg-blue-600 hover:bg-blue-700">Buy or Sell Machines</Button>
      </div>
    </header>
  )
} 