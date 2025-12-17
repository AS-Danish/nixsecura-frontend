import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "Top 10 Cyber Security Threats to Watch in 2025",
    excerpt: "Stay ahead of emerging threats with our comprehensive analysis of the most dangerous cyber attacks targeting organizations this year.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    category: "Threat Intelligence",
    readTime: "8 min read",
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "How to Start Your Career in Ethical Hacking",
    excerpt: "A complete roadmap for beginners looking to break into the exciting world of penetration testing and ethical hacking.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    category: "Career Guide",
    readTime: "12 min read",
    date: "Dec 10, 2024",
  },
  {
    id: 3,
    title: "Understanding Zero Trust Architecture",
    excerpt: "Learn why Zero Trust has become the gold standard for enterprise security and how to implement it in your organization.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    category: "Security Architecture",
    readTime: "10 min read",
    date: "Dec 5, 2024",
  },
];

export const BlogsSection = () => {
  return (
    <section id="blogs" className="py-20 lg:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Blog</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3">
              Insights & <span className="gradient-text">Resources</span>
            </h2>
          </div>
          <Button variant="hero-ghost" className="w-fit group">
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-5">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{blog.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm pt-2">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
