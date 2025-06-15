import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Wrench,
  Package,
  Settings,
  Eye,
  FileText,
  Headphones,
  MapPinIcon,
  Truck,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RequipLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Premium Weaving Machines, Production-Ready
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    REQUIP delivers fully operational weaving machines restored to like-new performance standards. With
                    operations across India and China, we ensure every machine meets original manufacturer
                    specifications using only genuine and high-grade compatible components.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg">
                    View Our Inventory
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>India & China Operations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>1-Year Warranty</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1522753004031-df14a39b2248?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={600}
                  height={400}
                  alt="Industrial weaving machines"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose REQUIP */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Why Choose REQUIP
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unmatched Quality & Service</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We don't just repair machines – we restore them to original performance standards with genuine parts,
                  comprehensive testing, and ironclad guarantees.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Shield className="h-10 w-15 text-blue-600" />
                  <CardTitle>1-Year Warranty</CardTitle>
                  <CardDescription>
                    Complete peace of mind with our comprehensive warranty coverage on all reconditioned machines.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Wrench className="h-10 w-15 text-blue-600" />
                  <CardTitle>Annual Free Maintenance</CardTitle>
                  <CardDescription>
                    Keep your machines running smoothly with our complimentary annual maintenance service.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Package className="h-10 w-15 text-blue-600" />
                  <CardTitle>Spare Parts Availability</CardTitle>
                  <CardDescription>
                    Access to genuine spare parts ensures your machines stay operational for years to come.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Truck className="h-10 w-15 text-blue-600" />
                  <CardTitle>Free Installation</CardTitle>
                  <CardDescription>
                    Professional installation service included at no extra cost with every machine purchase.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Eye className="h-10 w-15 text-blue-600" />
                  <CardTitle>Complete Transparency</CardTitle>
                  <CardDescription>
                    Full disclosure of restoration process, genuine parts certification, and comprehensive quality
                    reports.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <FileText className="h-10 w-15 text-blue-600" />
                  <CardTitle>Detailed Machine Information</CardTitle>
                  <CardDescription>
                    Complete documentation including parts authenticity certificates and performance validation reports.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="relative overflow-hidden lg:col-span-3">
                <CardHeader className="text-center">
                  <Headphones className="h-10 w-15 text-blue-600 mx-auto" />
                  <CardTitle>Post-Sales Support & Accountability</CardTitle>
                  <CardDescription>
                    Dedicated support team ensures your satisfaction long after purchase with ongoing assistance and
                    accountability.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Our Process
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How We Work</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our rigorous restoration process ensures every machine meets original manufacturer standards with
                  certified components and validated performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-5 lg:gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">35-Point Inspection</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive 8-criterion evaluation against original manufacturer specifications and performance
                    benchmarks.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Test Runs</h3>
                  <p className="text-sm text-muted-foreground">
                    Extensive performance validation and quality certification to ensure like-new operational standards.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Display Centers</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience our fully operational machines firsthand at our certified display facilities.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional setup and commissioning to ensure seamless integration into your production line.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white font-bold text-xl">
                  5
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Ongoing Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated support team ensures sustained peak performance with genuine parts and expert service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Contact Us
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact our team today to discuss your weaving machine needs and get a personalized quote.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us directly through any of these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@requip.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Our Locations</CardTitle>
                    <CardDescription>Visit our display centers to see our machines in person.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">India Office</p>
                        <p className="text-sm text-muted-foreground">123 Industrial Area, Mumbai, Maharashtra 400001</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">China Office</p>
                        <p className="text-sm text-muted-foreground">
                          456 Manufacturing District, Guangzhou, Guangdong 510000
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-blue-600">REQUIP</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Delivering production-ready weaving machines restored to original performance standards with genuine
                components and comprehensive support across India and China.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#home" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-foreground">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Warranty Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} REQUIP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
