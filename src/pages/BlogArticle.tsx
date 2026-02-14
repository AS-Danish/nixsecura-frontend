import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/data/blogs";
import { blogService } from "@/services/blogService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { useState, useEffect } from "react";

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await blogService.getById(id);
        setPost(data);

        // Fetch all blogs to filter for related posts
        const allBlogs = await blogService.getAll();
        const related = allBlogs
          .filter((p) => p.id !== data.id && p.category === data.category)
          .slice(0, 2);
        setRelatedPosts(related);
      } catch (error) {
        console.error("Failed to fetch blog post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blogs">
            <Button>Browse All Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            className="w-full h-full object-cover opacity-10"
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
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src={post.image || '/placeholder.svg'}
              alt={post.title}
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
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-border/50">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-muted-foreground text-sm font-medium">Share:</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border/50 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-foreground mb-4">Related Articles</h4>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedPost.date}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogArticle;
