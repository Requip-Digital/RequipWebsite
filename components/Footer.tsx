import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 relative z-20">
      {/* full width background */}
      <div className="px-4 md:px-6 py-12">
        {/* constrain only content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-blue-500 font-ethnocentric">REQUIP</span>
              </div>
              <p className="text-sm leading-relaxed">
                Delivering production-ready used and reconditioned industrial machines restored to original performance standards with genuine
                components and comprehensive support across India.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#home" className="hover:text-white">Home</Link></li>
                <li><Link href="#choose" className="hover:text-white">Why Choose Us</Link></li>
                <li><Link href="#process" className="hover:text-white">Our Process</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                {/* <li><Link href="#" className="hover:text-white">Warranty Terms</Link></li> */}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/profile.php?id=61578906664291" className="hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                {/* <Link href="#" className="hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link> */}
                <Link href="https://www.linkedin.com/company/requip-digital-private-limited/about/" className="hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                {/* <Link href="#" className="hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link> */}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} REQUIP. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
