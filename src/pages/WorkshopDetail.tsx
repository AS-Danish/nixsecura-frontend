import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowLeft, User, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { workshops } from "@/data/workshops";

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workshop = workshops.find(w => w.id === id);

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workshop Not Found</h1>
          <Button onClick={() => navigate("/workshops")}>Back to Workshops</Button>
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
                {workshop.category}
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
                  <span>{workshop.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{workshop.seats} Seats Available</span>
                </div>
              </div>

              {workshop.registrationOpen ? (
                <Link to={`/workshop/${workshop.id}/register`}>
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Register Now
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="xl" disabled className="w-full sm:w-auto">
                  Registration Coming Soon
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={workshop.image || '/placeholder.svg'}
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

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Topics Covered */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topics.map((topic, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Workshop Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{workshop.instructor}</h4>
                      <p className="text-sm text-muted-foreground">Senior Security Expert</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Industry expert with 10+ years of experience in cybersecurity and hands-on training.
                  </p>
                </CardContent>
              </Card>

              {/* Certificate Card */}
              <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-primary" />
                    <h4 className="font-semibold text-foreground">Certificate Included</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive a certificate of completion after attending this workshop.
                  </p>
                </CardContent>
              </Card>

              {/* Register Card */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 text-center">
                  {workshop.registrationOpen ? (
                    <Link to={`/workshop/${workshop.id}/register`}>
                      <Button variant="hero" className="w-full">
                        Register Now
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkshopDetail;
