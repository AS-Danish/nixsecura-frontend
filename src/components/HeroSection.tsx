import { motion } from "framer-motion";
import { Users, Award, BookOpen, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "./HeroCarousel";

const trustSignals = [
  { icon: Users, label: "5,000+ Students", value: "Trained" },
  { icon: Award, label: "Industry-Expert", value: "Mentors" },
  { icon: BookOpen, label: "Certifications", value: "Aligned" },
];

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-24 lg:pt-32 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="trust-badge">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Online + Offline Courses Available
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Build Real-World{" "}
              <span className="gradient-text">Cyber Security</span>{" "}
              Skills That Companies Trust
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Industry-aligned curriculum with hands-on labs, expert mentorship, 
              and certifications designed to make you job-ready for the evolving 
              threat landscape.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button variant="hero" size="xl" className="group">
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-ghost" size="xl" className="group">
                <Download className="w-5 h-5" />
                Download Curriculum
              </Button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 lg:gap-8"
            >
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <signal.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {signal.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {signal.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <HeroCarousel />
            
            {/* Floating cyber elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-card rounded-2xl shadow-medium flex items-center justify-center animate-float"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -right-2 w-16 h-16 bg-card rounded-xl shadow-medium flex items-center justify-center animate-float-delayed"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
