import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { WhyChooseSection } from "@/components/WhyChooseSection"
import { HowWeWorkSection } from "@/components/HowWeWorkSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { ScrollAnimation } from "@/components/ScrollAnimation"

export default function RequipLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ScrollAnimation speed={0.1} fullInitialOpacity>
          <HeroSection />
        </ScrollAnimation>
        <ScrollAnimation speed={0.15}>
          <WhyChooseSection />
        </ScrollAnimation>
        <ScrollAnimation speed={0.2}>
          <HowWeWorkSection />
        </ScrollAnimation>
        <ScrollAnimation speed={0.25}>
          <ContactSection />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  )
}
