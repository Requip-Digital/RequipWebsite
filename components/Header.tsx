"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { useState } from "react"
import Image from 'next/image';

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false)
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState({
    textile: false
  })

  const toggleMobileSubmenu = (submenu: keyof typeof openMobileSubmenus) => {
    setOpenMobileSubmenus(prev => ({
      ...prev,
      [submenu]: !prev[submenu]
    }))
  }

  const handleNavClick = () => {
    setIsSheetOpen(false)
  }

  return (
    <header className="sticky top-0 z-[999] w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-dashed border-gray-300">
      <div className="container mx-auto flex h-12 md:h-16 items-center justify-between relative px-4">
 
        
        {/* Logo (Left) */}
        <div className="flex items-center gap-2 flex-shrink-0">
         <Image
            src="/images/BrandLogo.png" 
            alt="Requip Logo"
            width={35}
            height={35}
            className="object-contain"
            priority
          />
          <Link href="/" className="text-lg md:text-2xl font-bold text-blue-600 font-ethnocentric flex items-center">
            REQUIP
          </Link>
        </div>


        {/* Desktop Menu (Center) */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
          <Link href="#home" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>

          {/* Industrial Machines Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
              Industrial Machines
              <ChevronDown size={16} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="center"
                sideOffset={12}
                className="z-[1000] w-64 bg-white shadow-2xl rounded-lg p-3 border 
                  animate-in fade-in-0 zoom-in-95"
              >
                {/* Textile Machinery */}
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer">
                    Textile Machinery <ChevronRight size={16} className="text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      sideOffset={8}
                      className="z-[1000] w-56 bg-white shadow-lg rounded-lg p-2 border"
                    >
                      {["Weaving"].map((item) => (
                        <DropdownMenu.Item asChild key={item}>
                          <Link
                            href={`/category/textile/${item.toLowerCase()}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                          >
                            {item}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>

                {/* Packing Machinery
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer">
                    Packing Machinery <ChevronRight size={16} className="text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      sideOffset={8}
                      className="z-[1000] w-56 bg-white shadow-lg rounded-lg p-2 border"
                    >
                      {["Food", "Beverage", "Industrial"].map((item) => (
                        <DropdownMenu.Item asChild key={item}>
                          <Link
                            href={`/category/packing/${item.toLowerCase()}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                          >
                            {item} Packing
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub> */}
                

                {/* Machine Tools
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer">
                    Machine Tools <ChevronRight size={16} className="text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      sideOffset={8}
                      className="z-[1000] w-56 bg-white shadow-lg rounded-lg p-2 border"
                    >
                      {["CNC", "Lathe", "Milling"].map((item) => (
                        <DropdownMenu.Item asChild key={item}>
                          <Link
                            href={`/category/tools/${item.toLowerCase()}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                          >
                            {item} Machines
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub> */}

                {/* Embossing Machinery */}
                {/* <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer">
                    Embossing Machinery <ChevronRight size={16} className="text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      sideOffset={8}
                      className="z-[1000] w-56 bg-white shadow-lg rounded-lg p-2 border"
                    >
                      {["Leather", "Paper", "Fabric"].map((item) => (
                        <DropdownMenu.Item asChild key={item}>
                          <Link
                            href={`/category/embossing/${item.toLowerCase()}`}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                          >
                            {item}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>  */}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Link href="#choose" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Why Choose Us
          </Link>
          <Link href="#process" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Our Process
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Contact Us
          </Link>
          <Link href="/career" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Careers
          </Link>
        </nav>

        {/* Buy & Sell (Right side - Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/buy" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow hover:bg-blue-700 transition">
            Buy
          </Link>
          <Link href="/sell" className="px-4 py-2 rounded-lg bg-yellow-400 text-blue-900 font-semibold text-sm shadow hover:bg-yellow-300 transition">
            Sell
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-lg font-bold text-blue-600">Requip</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="#home" className="text-sm font-medium hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                  Home
                </Link>

                {/* Mobile Industrial Machines Accordion - Matching Desktop Structure */}
                <div>
                  <button
                    onClick={() => setOpenMobileDropdown(!openMobileDropdown)}
                    className="w-full flex justify-between items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Industrial Machines
                    <ChevronDown className={`h-4 w-4 transition-transform ${openMobileDropdown ? "rotate-180" : ""}`} />
                  </button>

                  {openMobileDropdown && (
                    <div className="mt-2 ml-3 space-y-2">
                      {/* Textile Machinery */}
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu('textile')}
                          className="w-full flex justify-between items-center text-sm font-semibold text-gray-800 hover:text-blue-600 py-2"
                        >
                          Textile Machinery
                          <ChevronRight className={`h-4 w-4 transition-transform ${openMobileSubmenus.textile ? "rotate-90" : ""}`} />
                        </button>
                        {openMobileSubmenus.textile && (
                          <div className="ml-3 space-y-1">
                            {["Weaving"].map((item) => (
                              <Link
                                key={item}
                                href={`/category/textile/${item.toLowerCase()}`}
                                className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                                onClick={handleNavClick}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Additional machinery categories can be uncommented here following the same pattern */}
                    </div>
                  )}
                </div>

                <Link href="#choose" className="text-sm font-medium hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                  Why Choose Us
                </Link>
                <Link href="#process" className="text-sm font-medium hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                  Our Process
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                  Contact Us
                </Link>
                <Link href="/career" className="text-sm font-medium hover:text-blue-600 transition-colors" onClick={handleNavClick}>
                  Careers
                </Link>
                <div className="flex gap-3 mt-6">
                  <Link href="/buy" className="flex-1 text-center px-3 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition" onClick={handleNavClick}>
                    Buy
                  </Link>
                  <Link href="/sell" className="flex-1 text-center px-3 py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold text-sm hover:bg-yellow-300 transition" onClick={handleNavClick}>
                    Sell
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}