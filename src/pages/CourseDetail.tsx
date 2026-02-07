import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { useEffect, useState } from "react";
import { courseService } from "@/services/courseService";
import { Course } from "@/data/courses";

import { EnrollmentModal } from "@/components/EnrollmentModal";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const data = await courseService.getById(id);
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.image || '/placeholder.svg'}
            alt={course.title}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== '/placeholder.svg') {
                target.src = '/placeholder.svg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                {course.category}
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {course.title}
              </h1>
              <div
                className="prose prose-sm max-w-none text-muted-foreground mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                {course.mode && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{course.mode}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {course.highlights.map((highlight, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border/50 rounded-lg text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src={course.image || '/placeholder.svg'}
                alt={course.title}
                className="w-full rounded-2xl shadow-hero"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/placeholder.svg') {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Curriculum */}
            <div className="lg:col-span-2 space-y-12">
              {/* Curriculum */}
              {course.curriculum.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Course Curriculum
                  </h2>
                  <div className="space-y-4">
                    {course.curriculum.map((module, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{module.module}</h3>
                          <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {module.duration}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sticky Enroll Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-6">
                    Enroll now to kickstart your journey in cybersecurity with this comprehensive course.
                  </p>

                  <div className="space-y-4">
                    <Button
                      variant="hero"
                      className="w-full h-12 text-lg"
                      onClick={() => setEnrollModalOpen(true)}
                    >
                      Enroll Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      * Limited seats available for the upcoming batch
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        defaultCourseId={id}
      />

      <Footer />
    </div >
  );
};

export default CourseDetail;
