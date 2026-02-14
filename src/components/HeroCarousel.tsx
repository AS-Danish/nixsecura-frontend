import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import heroMentoring from "@/assets/hero-mentoring.jpg";

const slides = [
  {
    id: 1,
    category: "BEST ONLINE COURSES",
    headline: "The Best Cyber Security Learning Platform",
    subline: "\"The Gateway to Mastering Cybersecurity Defense\"",
    image: heroPerson1,
  },
  {
    id: 2,
    category: "BEST ONLINE COURSES",
    headline: "Get Educated Online From Your Home",
    subline: "\"Guard the Future with Expert Cybersecurity Training\"",
    image: heroLab,
  },
  {
    id: 3,
    category: "BEST ONLINE COURSES",
    headline: "Advance Your Career in Cyber Security",
    subline: "\"Practical Skills for Real-World Threats\"",
    image: heroMentoring,
  },
];

const SLIDE_DURATION = 6000;

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Auto-play
  useEffect(() => {
    const slideTimer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(slideTimer);
  }, [nextSlide]);

  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden font-sans bg-[#0F172A]">
      {/* Background Image Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Detailed Overlay Gradient matching the screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-transparent/40" />

          {/* Additional blue tint overlay for that "Cyber" feel */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="container relative z-10 h-full flex flex-col justify-center px-4 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-[#00D2D3] font-bold tracking-wider text-sm md:text-base uppercase mb-2">
                {slides[currentSlide].category}
              </h3>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                {slides[currentSlide].headline}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 font-light italic mb-8">
                {slides[currentSlide].subline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/25 border-none"
                >
                  Read More
                </Button>

                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-100 text-[#0F172A] rounded-none px-8 py-6 text-base font-bold border-none"
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls - Right Side Vertical */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 border border-gray-400/50 hover:border-white text-gray-400 hover:text-white flex items-center justify-center transition-all bg-black/20 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 border border-gray-400/50 hover:border-white text-gray-400 hover:text-white flex items-center justify-center transition-all bg-black/20 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>


    </section>
  );
};

