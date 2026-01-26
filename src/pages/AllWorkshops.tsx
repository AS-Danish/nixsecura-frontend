import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { workshops } from "@/data/workshops";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { useState } from "react";

const AllWorkshops = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "registration-open">("all");

  const filteredWorkshops = workshops.filter((workshop) => {
    if (filter === "upcoming") return workshop.isUpcoming;
    if (filter === "registration-open") return workshop.registrationOpen;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Live <span className="gradient-text">Workshops & Training</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Accelerate your learning with intensive, hands-on workshops led by industry experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {[
              { value: "all", label: "All Workshops" },
              { value: "upcoming", label: "Upcoming" },
              { value: "registration-open", label: "Registration Open" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-6">
            {filteredWorkshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="relative h-48 lg:h-auto">
                    <img
                      src={workshop.image || '/placeholder.svg'}
                      alt={workshop.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    {workshop.registrationOpen && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Registration Open
                      </span>
                    )}
                    {!workshop.registrationOpen && workshop.isUpcoming && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                      {workshop.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {workshop.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {workshop.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {workshop.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        {workshop.seats} Seats
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {workshop.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                      {workshop.topics.length > 4 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          +{workshop.topics.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      {workshop.registrationOpen ? (
                        <Link to={`/workshop/${workshop.id}/register`}>
                          <Button variant="hero" className="group">
                            Register Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/workshop/${workshop.id}`}>
                          <Button variant="hero-ghost" className="group">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No workshops found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllWorkshops;
