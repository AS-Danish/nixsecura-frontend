import { motion } from "framer-motion";
import { Award, Shield, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { certificateService, Certificate } from "@/services/certificateService";

const iconMap: { [key: string]: typeof Trophy } = {
  Trophy,
  Award,
  Star,
  Shield,
};

export const CertificateSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await certificateService.getAll();
        // Filter featured or take first 4
        const featured = data.filter(c => c.is_featured).length > 0
          ? data.filter(c => c.is_featured).slice(0, 4)
          : data.slice(0, 4);
        setCertificates(featured);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      }
    };
    fetchCertificates();
  }, []);
  return (
    <section id="certificate" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Recognition</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Awards & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our commitment to excellence has been recognized by leading industry bodies and government organizations.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => {
            const Icon = iconMap[Object.keys(iconMap)[index % Object.keys(iconMap).length]] || Trophy;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border/50 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-500 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Year Badge */}
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  {cert.year}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-muted-foreground text-sm">
                  {cert.issuer}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">Recognized and trusted by</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["NASSCOM", "CII", "DSCI", "ISACA", "EC-Council"].map((org) => (
              <span key={org} className="text-foreground font-semibold text-lg tracking-wide">
                {org}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
