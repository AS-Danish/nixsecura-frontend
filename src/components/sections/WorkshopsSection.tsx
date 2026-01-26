import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { workshopService, Workshop } from "@/services/workshopService";

export const WorkshopsSection = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await workshopService.getAll();
        // Filter for upcoming/open workshops and take first 3
        const upcoming = data
          .filter(w => w.status === "upcoming" || w.status === "open")
          .slice(0, 3);
        setWorkshops(upcoming);
      } catch (error) {
        console.error("Failed to fetch workshops", error);
      }
    };
    fetchWorkshops();
  }, []);

  const displayedWorkshops = workshops;

  return (
    <section id="workshops" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
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
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Workshops</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Upcoming <span className="gradient-text">Live Training</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Accelerate your learning with our intensive, hands-on workshops led by industry experts.
          </p>
        </motion.div>

        {/* Workshops */}
        <div className="space-y-6">
          {displayedWorkshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                      {workshop.title}
                    </h3>
                    {workshop.status === "open" && (
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs font-semibold rounded">
                        Open
                      </span>
                    )}
                  </div>
                  {workshop.description && (
                    <p className="text-muted-foreground mb-4">
                      {workshop.description}
                    </p>
                  )}
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(workshop.date).toLocaleDateString()}
                    </div>
                    {workshop.start_time && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {workshop.start_time}
                      </div>
                    )}
                    {workshop.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {workshop.location}
                      </div>
                    )}
                    {workshop.max_participants && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        {workshop.registrations}/{workshop.max_participants} Seats
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  {workshop.status === "open" ? (
                    <Link to={`/workshop/${workshop.id}/register`}>
                      <Button variant="hero" className="w-full lg:w-auto group">
                        Register Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/workshop/${workshop.id}`}>
                      <Button variant="hero-ghost" className="w-full lg:w-auto group">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Workshops CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link to="/workshops">
            <Button variant="hero-ghost" size="lg">
              View All Workshops
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
