import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowLeft, User, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { useEffect, useState } from "react";
import { workshopService, Workshop } from "@/services/workshopService";
import { normalizeImageUrl } from "@/utils/imageUtils";

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const data = await workshopService.getById(id);
          setWorkshop(data);
        }
      } catch {
        setWorkshop(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (!workshop && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workshop Not Found</h1>
          <Button onClick={() => navigate("/workshops")}>Back to Workshops</Button>
        </div>
      </div>
    );
  }

  if (loading || !workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading Workshop...</h1>
        </div>
      </div>
    );
  }
  const topics = [
    "Introduction to " + workshop.title,
    "Hands-on Lab Sessions",
    "Real-world Case Studies",
    "Industry Best Practices",
    "Tools & Techniques Demo",
    "Q&A with Expert Instructor"
  ];

  const requirements = [
    "Basic understanding of cybersecurity concepts",
    "Laptop with internet connection",
    "Enthusiasm to learn",
    "No prior experience required for beginner workshops"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                {workshop.status === "open" ? "Registration Open" : workshop.status === "upcoming" ? "Upcoming" : workshop.status}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {workshop.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {workshop.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{(workshop.start_time || workshop.end_time) ? `${workshop.start_time || ''}${workshop.start_time && workshop.end_time ? ' - ' : ''}${workshop.end_time || ''}` : 'Time TBA'}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{workshop.max_participants ? `${workshop.max_participants} Seats Available` : 'Seats TBA'}</span>
                </div>
              </div>

              {/* Registration temporarily hidden */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={normalizeImageUrl(workshop.image) || '/placeholder.svg'}
                  alt={workshop.title}
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/placeholder.svg') {
                      target.src = '/placeholder.svg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      <Footer />
    </div>
  );
};

export default WorkshopDetail;
