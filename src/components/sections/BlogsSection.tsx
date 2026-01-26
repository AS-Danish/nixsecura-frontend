import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogs";
import { blogService } from "@/services/blogService";
import { useState, useEffect } from "react";

export const BlogsSection = () => {
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll();
        setDisplayedBlogs(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

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
          <Link to="/blogs">
            <Button variant="hero-ghost" className="w-fit group">
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${blog.id}`}>
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={blog.image || '/placeholder.svg'}
                    alt={blog.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/placeholder.svg') {
                        target.src = '/placeholder.svg';
                      }
                    }}
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
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
