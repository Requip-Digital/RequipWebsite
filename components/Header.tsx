import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-12 md:h-16 items-center justify-between">
        <div className="absolute right-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Requip</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
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
                <Link href="#contact">
                  <Button className="w-full bg-blue-600 mt-8 hover:bg-blue-700">Buy or Sell Machines</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-full text-center md:w-auto md:text-left">
          <span className="text-lg md:text-2xl font-bold text-blue-600 font-ethnocentric">REQUIP</span>
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

        <div className="hidden md:flex items-center">
          <Link href="#contact">
            <Button className="bg-blue-600 hover:bg-blue-700">Buy or Sell Machines</Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 