import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialService, Testimonial } from "@/services/testimonialService";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAll();
        // Filter featured or take first 4
        const featured = data.filter(t => t.is_featured).length > 0 
          ? data.filter(t => t.is_featured).slice(0, 4)
          : data.slice(0, 4);
        setTestimonials(featured);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  const next = () => setCurrentIndex((prev) => testimonials.length > 0 ? (prev + 1) % testimonials.length : 0);
  const prev = () => setCurrentIndex((prev) => testimonials.length > 0 ? (prev - 1 + testimonials.length) % testimonials.length : 0);

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Success Stories from <span className="gradient-text">Our Alumni</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from professionals who transformed their careers with CyberShield.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-3xl p-8 lg:p-12 border border-border/50 shadow-soft overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Quote className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8 font-light break-words">
                  "{testimonials[currentIndex]?.testimonial || testimonials[currentIndex]?.course || 'Great experience!'}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonials[currentIndex]?.image ? (
                    <img
                      src={testimonials[currentIndex].image || '/placeholder.svg'}
                      alt={testimonials[currentIndex].name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20 flex-shrink-0">
                      <span className="text-primary font-semibold text-lg">
                        {testimonials[currentIndex]?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground truncate">{testimonials[currentIndex]?.name}</h4>
                    <p className="text-muted-foreground text-sm break-words">
                      {testimonials[currentIndex]?.position && testimonials[currentIndex]?.company
                        ? `${testimonials[currentIndex].position} at ${testimonials[currentIndex].company}`
                        : testimonials[currentIndex]?.course || 'Student'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              {/* Dots */}
              {testimonials.length > 0 && (
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={next}
                className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: "5,000+", label: "Students Trained" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "150+", label: "Partner Companies" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};