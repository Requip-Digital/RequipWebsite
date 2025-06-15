import { Badge } from "@/components/ui/badge"

export function HowWeWorkSection() {
  return (
    <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
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
  )
} 