import { motion } from "framer-motion";
import { Award, Code, Shield, Users, Server, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { facultyService, Faculty } from "@/services/facultyService";

const labFeatures = [
  {
    icon: Server,
    title: "Industry-Grade Lab Infrastructure",
    description: "Access to enterprise-level security tools and environments used by Fortune 500 companies.",
  },
  {
    icon: Code,
    title: "Real Vulnerable Systems",
    description: "Practice on intentionally vulnerable applications and networks in a safe environment.",
  },
  {
    icon: Shield,
    title: "Live Threat Simulations",
    description: "Experience real-world attack scenarios with our advanced threat simulation platform.",
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Adaptive learning paths that adjust to your skill level and progress.",
  },
];

export const FacultySection = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await facultyService.getAll();
        // Take first 4 active faculty
        setFaculty(data.filter(f => f.is_active).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch faculty", error);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <section id="faculty" className="py-20 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Experts</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Learn from <span className="gradient-text">Industry Veterans</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our faculty brings decades of combined experience from leading security firms, 
            ensuring you learn skills that matter in the real world.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {faculty.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
            >
              <div className="relative mb-5">
                <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-primary font-semibold text-2xl">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                {member.experience && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {member.experience}
                  </motion.div>
                )}
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.specialization}</p>
                {member.experience && (
                  <p className="text-xs text-muted-foreground mb-4">{member.experience}</p>
                )}
                {(member.qualifications && member.qualifications.length > 0) && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.qualifications.slice(0, 3).map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lab Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Practical Labs That <span className="gradient-text">Mirror Reality</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our state-of-the-art labs are designed to give you hands-on experience 
              with the same tools and scenarios you'll encounter in your career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl p-8 border border-border/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Industry Experts" },
              { value: "100+", label: "Lab Scenarios" },
              { value: "24/7", label: "Lab Access" },
              { value: "1:10", label: "Mentor Ratio" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg">
            Meet Our Full Team
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
