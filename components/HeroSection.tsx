import { Button } from "@/components/ui/button"
import { MapPin, Shield } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Next Production Ready Weaving Machine
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We offer fully operational weaving machines restored to like-new performance standards. With
                operations across India and China, we ensure every machine meets original manufacturer specifications
                using only genuine and high-grade compatible components.
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
              src="https://images.unsplash.com/photo-1522753004031-df14a39b2248"
              width={600}
              height={400}
              alt="Industrial weaving machines"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 