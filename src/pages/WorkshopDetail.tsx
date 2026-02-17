import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { workshopService, Workshop } from "@/services/workshopService";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/utils/imageUtils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

const WorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await workshopService.getById(id);
        setWorkshop(data);
      } catch (error) {
        console.error("Failed to fetch workshop details", error);
        toast({
          title: "Error",
          description: "Failed to load workshop details.",
          variant: "destructive",
        });
        navigate("/workshops");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!workshop) {
    return null; // Handle not found in useEffect
  }

  const images = workshop.images && workshop.images.length > 0
    ? workshop.images.map(img => normalizeImageUrl(img.image_path))
    : [normalizeImageUrl(workshop.image || "")];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* Hero Section with Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-primary/20 bg-muted/20 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={workshop.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === idx ? "bg-primary" : "bg-white/50 hover:bg-white/80"
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 right-4 space-x-2">
                <Badge className={`${workshop.status === 'upcoming' ? 'bg-blue-500' :
                    workshop.status === 'open' ? 'bg-green-500' :
                      workshop.status === 'completed' ? 'bg-gray-500' :
                        'bg-red-500'
                  }`}>
                  {workshop.status === 'upcoming' ? 'Upcoming' :
                    workshop.status === 'open' ? 'Registration Open' :
                      workshop.status === 'completed' ? 'Completed' :
                        'Cancelled'}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                {workshop.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{new Date(workshop.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>
                    {workshop.start_time ? workshop.start_time.slice(0, 5) : 'TBA'} - {workshop.end_time ? workshop.end_time.slice(0, 5) : 'TBA'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{workshop.location || 'Online'}</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {workshop.description}
              </p>

              {workshop.max_participants && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                  <Users className="w-4 h-4" />
                  <span>
                    {Math.max(0, workshop.max_participants - (workshop.registrations || 0))} spots remaining
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkshopDetail;
