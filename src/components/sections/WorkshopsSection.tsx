import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { workshopService, Workshop } from "@/services/workshopService";
import { normalizeImageUrl } from "@/utils/imageUtils";
import { Badge } from "@/components/ui/badge";
export const WorkshopsSection = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await workshopService.getAll();
        // Take latest 4 workshops regardless of status
        const latest = data.slice(0, 4);
        setWorkshops(latest);
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
            <Link to={workshop.status === "open" ? `/workshop/${workshop.id}/register` : `/workshop/${workshop.id}`} key={workshop.id}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image - Added this section */}
                  <div className="lg:w-1/3 h-48 lg:h-auto relative overflow-hidden">
                    <img
                      src={normalizeImageUrl(workshop.image)}
                      alt={workshop.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${workshop.status === 'upcoming' ? 'bg-blue-500' :
                        workshop.status === 'open' ? 'bg-green-500' :
                          workshop.status === 'completed' ? 'bg-gray-500' :
                            'bg-red-500'
                        }`}>
                        {workshop.status === 'upcoming' ? 'Upcoming' :
                          workshop.status === 'open' ? 'Open' :
                            workshop.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {workshop.title}
                      </h3>
                    </div>

                    {workshop.description && (
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {workshop.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm mt-auto">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date(workshop.date).toLocaleDateString()}
                      </div>
                      {workshop.start_time && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          {workshop.start_time.slice(0, 5)}
                        </div>
                      )}
                      {workshop.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          {workshop.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Arrow */}
                  <div className="hidden lg:flex items-center pr-8 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            </Link>
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
