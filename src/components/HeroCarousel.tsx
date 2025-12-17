import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import heroMentoring from "@/assets/hero-mentoring.jpg";

const slides = [
  {
    id: 1,
    headline: "Learn Cyber Security",
    headlineAccent: "the Way Attacks Actually Happen",
    subline: "Real-world threat scenarios. Hands-on labs. No theory without practice.",
    image: heroPerson1,
    alt: "Cyber security professional analyzing threat patterns",
  },
  {
    id: 2,
    headline: "Train with Tools",
    headlineAccent: "Used by Real Security Teams",
    subline: "Industry-standard platforms. The same environments professionals work in daily.",
    image: heroLab,
    alt: "Modern cyber security training lab environment",
  },
  {
    id: 3,
    headline: "From Beginner to Job-Ready,",
    headlineAccent: "Without the Noise",
    subline: "Expert mentorship. Certification-aligned curriculum. Clear career outcomes.",
    image: heroMentoring,
    alt: "Expert instructor guiding students through security concepts",
  },
];

const SLIDE_DURATION = 6000;

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-play with progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return prev;
        }
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);

    const slideTimer = setInterval(nextSlide, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideTimer);
    };
  }, [nextSlide, currentSlide]);

  // Text animation variants
  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
    },
  };

  // Image animation variants
  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(6px)",
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Reactive background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at ${30 + currentSlide * 20}% ${40 + currentSlide * 10}%, hsl(var(--primary) / 0.08) 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.05) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-28 lg:pt-36 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[calc(100vh-10rem)]">
          
          {/* Left Content - Text Carousel */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="space-y-6"
              >
                {/* Headline with controlled asymmetry */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                  <span className="block">{slides[currentSlide].headline}</span>
                  <span className="block gradient-text mt-1">
                    {slides[currentSlide].headlineAccent}
                  </span>
                </h1>

                {/* Subline - crisp clarifier */}
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md font-light tracking-wide">
                  {slides[currentSlide].subline}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Static CTA - stays while content changes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Button variant="hero" size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              <Button variant="hero-ghost" size="xl" className="group">
                <Download className="w-5 h-5" />
                Download Curriculum
              </Button>
            </motion.div>

            {/* Progress indicators - thin lines */}
            <div className="flex gap-3 mt-14">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative h-[3px] flex-1 max-w-16 bg-muted-foreground/15 rounded-full overflow-hidden"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="lg:col-span-7 xl:col-span-7 relative">
            {/* Asymmetric image container */}
            <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-hero">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Cinematic depth overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-foreground/5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating cyber elements with independent motion */}
              <motion.div
                className="absolute -top-3 -left-3 w-16 h-16 lg:w-20 lg:h-20 bg-card rounded-2xl shadow-soft flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -right-2 w-14 h-14 lg:w-16 lg:h-16 bg-card rounded-xl shadow-soft flex items-center justify-center"
                animate={{
                  y: [0, 6, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg className="w-7 h-7 lg:w-8 lg:h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </motion.div>

              {/* Subtle data particles overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -100],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Trust signal - subtle, not badge-like */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-6 left-8 lg:left-12 flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="w-8 h-[1px] bg-muted-foreground/30" />
              <span className="font-medium tracking-wide">Trusted by 5,000+ professionals</span>
            </motion.div>
          </div>
        </div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { value: "5,000+", label: "Students Trained" },
                { value: "95%", label: "Placement Rate" },
                { value: "50+", label: "Expert Instructors" },
                { value: "100+", label: "Lab Scenarios" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="text-center"
                >
                  <motion.div 
                    className="text-2xl lg:text-3xl font-bold gradient-text mb-1"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
