import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { courses as dataset, Course } from "@/data/courses";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { useEffect, useState } from "react";
import { courseService } from "@/services/courseService";

const categories = ["All", "Beginner", "Intermediate", "Advanced", "Professional", "Specialized"];

const AllCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await courseService.getAll();
        setAllCourses(data);
      } catch {
        console.error("Failed to fetch courses");
      }
    };
    load();
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
              Our <span className="gradient-text">Training Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of cybersecurity courses designed to take you 
              from beginner to industry-ready professional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
                  
                  <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {course.duration}
                    </span>
                  </div>

                  <Link to={`/course/${course.id}`}>
                    <Button variant="hero-ghost" size="sm" className="w-full group/btn">
                      View Course
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

            {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllCourses;
