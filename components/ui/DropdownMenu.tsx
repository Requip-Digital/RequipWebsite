"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface SubItem {
  name: string
  href: string
}

interface Item {
  name: string
  href?: string
  children?: SubItem[] // ✅ nested dropdown support
}

interface CategoryDropdownProps {
  label: string
  items: Item[]
}

export function CategoryDropdown({ label, items }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        {/* 🔹 Trigger Button */}
        <DropdownMenu.Trigger
          className="flex items-center gap-1 px-2 py-1 text-sm font-medium hover:text-blue-600 transition focus:outline-none"
        >
          {label}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenu.Trigger>

        {/* 🔹 Dropdown Content */}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="center"
            sideOffset={6}
            className="z-50 mt-1 p-2 bg-white text-gray-900 shadow-xl rounded-xl min-w-[220px]"
          >
            {items.map((item) =>
              item.children ? (
                // ✅ Submenu
                <DropdownMenu.Sub key={item.name}>
                  <DropdownMenu.SubTrigger
                    className="flex items-center justify-between px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      className="z-50 p-2 bg-white text-gray-900 shadow-xl rounded-xl min-w-[200px]"
                    >
                      {item.children.map((sub) => (
                        <DropdownMenu.Item
                          key={sub.name}
                          asChild
                          className="rounded-md focus:outline-none focus:bg-gray-100"
                        >
                          <Link
                            href={sub.href}
                            className="block px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md"
                          >
                            {sub.name}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              ) : (
                // ✅ Simple Item
                <DropdownMenu.Item
                  key={item.name}
                  asChild
                  className="rounded-md focus:outline-none focus:bg-gray-100"
                >
                  <Link
                    href={item.href || "#"}
                    className="flex items-center justify-between px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md w-full transition"
                  >
                    {item.name}
                  </Link>
                </DropdownMenu.Item>
              )
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
