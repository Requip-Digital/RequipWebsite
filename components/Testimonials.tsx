"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

type Language = "english" | "hindi" | "marathi" | "gujarati" | "tamil" | "kannada"

interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  text: Record<Language, string>
}

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechWave India",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: {
      english: "Creative minds who deliver stunning results every time.",
      hindi: "रचनात्मक दिमाग जो हर बार शानदार परिणाम देते हैं।",
      marathi: "सर्जनशील विचारवंत जे प्रत्येक वेळी उत्कृष्ट परिणाम देतात.",
      gujarati: "સર્જનાત્મક મગજ જે દર વખતે શ્રેષ્ઠ પરિણામ આપે છે.",
      tamil: "எங்கள் தேவைகளைப் புரிந்து சிறப்பான முடிவுகளை வழங்குவோர்.",
      kannada: "ಅದ್ಭುತ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುವ ಸೃಜನಶೀಲ ಮನಸ್ಸುಗಳು.",
    },
  },
  {
    name: "Priya Iyer",
    role: "Marketing Head, BrightFuture",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    text: {
      english: "Their designs brought our vision to life beautifully.",
      hindi: "उनके डिज़ाइनों ने हमारे विज़न को खूबसूरती से जीवंत बना दिया।",
      marathi: "त्यांच्या डिझाइनने आमच्या कल्पनेला सुंदरतेने जीवंत केले.",
      gujarati: "તેમની ડિઝાઇનોએ અમારા વિઝનને સુંદર રીતે જીવંત બનાવ્યું.",
      tamil: "அவர்களின் வடிவமைப்புகள் எங்கள் கனவுகளை உயிர்ப்பித்தன.",
      kannada: "ಅವರ ವಿನ್ಯಾಸಗಳು ನಮ್ಮ ದೃಷ್ಟಿಯನ್ನು ಜೀವಂತಗೊಳಿಸಿತು.",
    },
  },
  {
    name: "Amit Patel",
    role: "Founder, NextGen Solutions",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: {
      english: "A reliable partner with artistic flair.",
      hindi: "कलात्मक प्रतिभा वाला एक विश्वसनीय साथी।",
      marathi: "कलात्मक शैली असलेला विश्वासार्ह भागीदार.",
      gujarati: "કલાકારી કૌશલ્ય ધરાવતા વિશ્વસનીય ભાગીદાર.",
      tamil: "கலைநயம் கொண்ட நம்பகமான கூட்டாளி.",
      kannada: "ಕಲಾತ್ಮಕ ಸ್ಪರ್ಶ ಹೊಂದಿರುವ ವಿಶ್ವಾಸಾರ್ಹ ಸಹಭಾಗಿ.",
    },
  },
]

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [currentLang, setCurrentLang] = useState<Language>("english")

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getIndex = (pos: number) =>
    (index + pos + testimonials.length) % testimonials.length

  return (
    <section className="w-full py-16 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        What our clients say about us
      </h2>

      {/* Language Buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {(["english","hindi","marathi","gujarati","tamil","kannada"] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setCurrentLang(lang)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
              currentLang === lang
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 overflow-visible">
        {[-1, 0, 1].map((pos) => {
          const t = testimonials[getIndex(pos)]
          const isCenter = pos === 0
          return (
            <motion.div
              key={t.name}
              className="relative flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white"
              animate={{
                scale: isCenter ? 1.1 : 0.9,
                opacity: isCenter ? 1 : 0.6,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                minWidth: isCenter ? "340px" : "280px",
                zIndex: isCenter ? 10 : 1,
              }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 border-2 border-blue-400"
              />
              <p className="text-gray-700 italic text-center mb-4">
                “{t.text[currentLang]}”
              </p>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <h4 className="font-semibold text-lg">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
