import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { courses as dataset, Course } from "@/data/courses";
import { useEffect, useState } from "react";
import { courseService } from "@/services/courseService";

export const CoursesSection = () => {
  const [merged, setMerged] = useState<Course[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await courseService.getAll();
        setMerged(data);
      } catch {
        console.error("Failed to fetch courses");
      }
    };
    load();
  }, []);
  const latestSix = merged.slice(0, 6);
  return (
    <section id="courses" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Courses</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Industry-Ready <span className="gradient-text">Training Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From foundational concepts to advanced specializations, find the perfect course 
            to accelerate your cyber security career.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestSix.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image || '/placeholder.svg'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/placeholder.svg') {
                      target.src = '/placeholder.svg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                  {course.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
                
                {/* Course Meta */}
                <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {course.duration}
                  </span>
                </div>

                <Link to={`/course/${course.id}`}>
                  <Button 
                    variant="hero-ghost" 
                    size="sm" 
                    className="w-full group/btn"
                  >
                    View Course
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button variant="hero" size="lg">
              Explore All Courses
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
