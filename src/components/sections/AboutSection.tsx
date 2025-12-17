import { motion } from "framer-motion";
import { Target, Users, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Empowering individuals with practical cyber security skills for the digital age.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from industry veterans with real-world experience in cyber defense.",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Our curriculum is aligned with global certification standards and employer needs.",
  },
  {
    icon: Zap,
    title: "Hands-On Learning",
    description: "Practical labs and real-world scenarios that prepare you for actual threats.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">About Us</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6 leading-tight">
              Shaping the Future of
              <span className="gradient-text block">Cyber Security Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              CyberShield Institute was founded with a singular vision: to bridge the gap between 
              academic knowledge and industry requirements. We combine cutting-edge curriculum 
              with hands-on training to produce job-ready cyber security professionals.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With both online and offline programs, we've trained over 5,000 professionals 
              who now protect organizations across the globe. Our commitment to excellence 
              has made us a trusted name in cyber security education.
            </p>
          </motion.div>

          {/* Right - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
