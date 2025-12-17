import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Award, BookOpen, Calendar, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/data/courses";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { useState } from "react";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = getCourseById(id || "");
  const [selectedBatch, setSelectedBatch] = useState<string>("");

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
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
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
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{course.mode}</span>
                </div>
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
                src={course.image}
                alt={course.title}
                className="w-full rounded-2xl shadow-hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content - Curriculum & Instructor */}
            <div className="lg:col-span-2 space-y-12">
              {/* Curriculum */}
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

              {/* Instructor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Meet Your Instructor
                </h2>
                <div className="bg-card border border-border/50 rounded-2xl p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{course.instructor.name}</h3>
                      <p className="text-primary font-medium mb-2">{course.instructor.title}</p>
                      <p className="text-muted-foreground text-sm mb-4">{course.instructor.bio}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-muted-foreground">
                          <strong className="text-foreground">{course.instructor.experience}</strong> Experience
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.instructor.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar - Batches & Enrollment */}
            <div className="space-y-8">
              {/* Upcoming Batches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border/50 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Batches
                </h3>
                <div className="space-y-4 mb-6">
                  {course.batches.map((batch) => (
                    <label
                      key={batch.id}
                      className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedBatch === batch.id
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="batch"
                        value={batch.id}
                        checked={selectedBatch === batch.id}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-foreground">{batch.startDate}</span>
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                          {batch.mode}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{batch.timing}</p>
                      <p className="text-xs text-primary">{batch.seats} seats available</p>
                    </label>
                  ))}
                </div>

                <EnrollmentForm courseName={course.title} selectedBatch={selectedBatch} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
