import { Button } from "@/components/ui/button"
import { MapPin, Shield } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-center lg:text-left">
                Your Next Production Ready Weaving Machine
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl text-center lg:text-left mx-auto lg:mx-0">
                We offer fully operational used weaving machines restored to like-new performance standards. With operations
                across India, we ensure every machine meets original manufacturer specifications using only
                genuine and high-grade compatible components.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Our Inventory
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Mumbai & Surat Operations</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-md lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1522753004031-df14a39b2248"
                width={600}
                height={400}
                alt="Industrial weaving machines"
                className="w-full h-auto aspect-video rounded-xl object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}