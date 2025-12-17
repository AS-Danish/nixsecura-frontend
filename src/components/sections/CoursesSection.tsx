import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Ethical Hacking & Penetration Testing",
    description: "Master the art of identifying vulnerabilities and securing systems against real-world cyber threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    category: "Advanced",
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    description: "Build a strong foundation in network defense, firewall configuration, and intrusion detection systems.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "Beginner",
  },
  {
    id: 3,
    title: "Cyber Security Analyst Program",
    description: "Comprehensive training to become a certified security analyst with hands-on SOC experience.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    category: "Professional",
  },
  {
    id: 4,
    title: "Cloud Security Architecture",
    description: "Learn to secure cloud environments across AWS, Azure, and GCP with industry best practices.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "Advanced",
  },
  {
    id: 5,
    title: "Digital Forensics & Incident Response",
    description: "Develop skills in investigating cyber crimes and responding to security incidents effectively.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    category: "Specialized",
  },
  {
    id: 6,
    title: "Web Application Security",
    description: "Protect web applications from OWASP Top 10 vulnerabilities and secure the modern web stack.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    category: "Intermediate",
  },
];

export const CoursesSection = () => {
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
          {courses.map((course, index) => (
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
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {course.description}
                </p>
                <Button 
                  variant="hero-ghost" 
                  size="sm" 
                  className="w-full group/btn"
                >
                  View Course
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
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
          <Button variant="hero" size="lg">
            Explore All Courses
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
