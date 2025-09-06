import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Wrench,
  Package,
  Truck,
  Eye,
  FileText,
  Headphones,
  Award,
  Tag,
} from "lucide-react"

export function WhyChooseSection() {
  return (
    <section id="choose" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="secondary" className="px-3 py-1 text-blue-800">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unmatched Quality & Service</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We don't just repair machines – we restore them to original performance standards with genuine parts,
              comprehensive testing, and ironclad guarantees.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 grid-cols-1 md:grid-cols-3 grid-rows-2 lg:gap-8">
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <Shield className="h-10 w-15 text-blue-600" />
              <CardTitle>1-Year Warranty</CardTitle>
              <CardDescription>
                Complete peace of mind with our comprehensive warranty coverage on all reconditioned machines.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <Wrench className="h-10 w-15 text-blue-600" />
              <CardTitle>Annual Free Maintenance</CardTitle>
              <CardDescription>
                Keep your machines running smoothly with our complimentary annual maintenance service.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <Package className="h-10 w-15 text-blue-600" />
              <CardTitle>Genuine Spare Parts & Exclusive Discounts</CardTitle>
              <CardDescription>
                Access genuine spare parts to keep your machines running for years, and enjoy exclusive discounts as part of our commitment to long-term customer value.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <Truck className="h-10 w-15 text-blue-600" />
              <CardTitle>Free Installation</CardTitle>
              <CardDescription>
                Professional installation service included at no extra cost with every machine purchase.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <Eye className="h-10 w-15 text-blue-600" />
              <CardTitle>Complete Transparency</CardTitle>
              <CardDescription>
                Full disclosure of inspection and reconditioning process, genuine parts certification, and comprehensive quality
                reports.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="h-full">
              <FileText className="h-10 w-15 text-blue-600" />
              <CardTitle>Detailed Machine Information</CardTitle>
              <CardDescription>
                Complete documentation including parts authenticity certificates and performance validation reports.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="relative overflow-hidden h-full col-span-1 md:col-span-3">
            <CardHeader className="h-full flex flex-col items-center justify-center text-center">
              <Headphones className="h-10 w-15 text-blue-600" />
              <CardTitle>Post-Sales Support & Accountability</CardTitle>
              <CardDescription>
                Dedicated support team ensures your satisfaction long after purchase with ongoing assistance and accountability.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
} 