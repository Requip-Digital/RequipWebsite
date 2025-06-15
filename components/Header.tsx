import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600 font-ethnocentric">REQUIP</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="#choose" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Why Choose Us
          </Link>
          <Link href="#process" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Our Process
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact Us
          </Link>
        </nav>

        <Link href="#contact">
          <Button className="bg-blue-600 hover:bg-blue-700">Buy or Sell Machines</Button>
        </Link>
      </div>
    </header>
  )
} 