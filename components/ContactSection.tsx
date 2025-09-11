"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, Mail, MessageCircleMore, MapPinIcon } from "lucide-react"
import WorldMapWithPins from "./WorldMapWithPins"

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Contact Us
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Reach out to us through the channels below or visit our display centers.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-1 lg:gap-12">
          {/* Right Column - Contact Info & Location */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us directly through any of these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Phone */}
                <a
                  href="tel:+918062178569"
                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 9972860913</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:enquiry@requip.in"
                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">enquiry@requip.in</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919972860913" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <MessageCircleMore className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+91 80621 78569</p>
                  </div>
                </a>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Visit our display center to see our machines in person.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Head Office</p>
                    <p className="text-sm text-muted-foreground">
                      1st Floor, L1WS6A, #10, 14th Main 5th Sector HSR Layout Bengaluru, Karnataka, India - 560102
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Requip Innovation Centre</p>
                    <p className="text-sm text-muted-foreground">
                      Bhiwandi, Thane District, Maharashtra - 421302, Post -Lonad, Survey No. 59/2/3/A.
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <WorldMapWithPins/>
              
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
