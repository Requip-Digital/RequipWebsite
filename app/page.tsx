import  Header   from "@/components/Header"
import ParallaxLayout from "@/components/ParallaxLayout"
import { HeroSection } from "@/components/HeroSection"
import { WhyChooseSection } from "@/components/WhyChooseSection"
import { HowWeWorkSection }  from "@/components/HowWeWorkSection"
import  ContactSection   from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { ScrollAnimation } from "@/components/ScrollAnimation"


export default function RequipLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 -my-8"> {/* Negative margin to reduce gaps */}
        <HeroSection />
        <HowWeWorkSection />
        <WhyChooseSection /> 
        <ContactSection />
       </main>
        <Footer />
    </div>
  )
}
