import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courseService } from "@/services/courseService";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm, sanitizeInput, ValidationError } from "@/utils/validation";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["1st floor, Nixsecura services, above Sodhi ENT hospital, opp. Dwarka Grand Hotel, New Usmanpura, Chhatrapati Sambhajinagar, Maharashtra 431005"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 7558302153"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["nixsecura@gmail.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 10AM - 5PM", "Sunday: Closed"],
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    course: "", // Stores course ID
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getList();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Sanitize inputs
    const sanitizedName = sanitizeInput(formState.name);
    const sanitizedEmail = sanitizeInput(formState.email);
    const sanitizedPhone = sanitizeInput(formState.phone);
    const sanitizedMessage = sanitizeInput(formState.message);

    // Validate
    const validationErrors = validateContactForm(sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedMessage);

    if (validationErrors.length > 0) {
      const newErrors: Record<string, string> = {};
      validationErrors.forEach((error) => {
        newErrors[error.field] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwfBJfwzlbvR5sQGalTHi8gmMgELvfHcgBAzBaIbFzFpBesit3TqS721m2erZMMMB_ULA/exec";

      // Find course name if selected
      const selectedCourse = courses.find(c => c.id.toString() === formState.course);
      const courseName = selectedCourse ? selectedCourse.title : "";

      const payload = {
        timestamp: new Date().toISOString(),
        fullName: sanitizedName,
        email: sanitizedEmail,
        contactNumber: sanitizedPhone,
        courseName: courseName,
        message: sanitizedMessage,
        source: "Contact Form",
        type: "Contact Us"
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormState({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Contact Us</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            Start Your <span className="gradient-text">Cyber Security Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? Our admissions team is here to guide you through the enrollment process.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border/50 shadow-soft">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"} focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground`}
                      placeholder="Your  Name"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"} focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground`}
                      placeholder="youremail@example.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"} focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground`}
                      placeholder="Your Phone Number"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Interested Course</label>
                    <select
                      value={formState.course}
                      onChange={(e) => setFormState({ ...formState, course: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"} focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground`}
                    placeholder="Tell us about your goals..."
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="relative h-64 lg:h-80 rounded-3xl overflow-hidden border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.3111413826787!2d75.32475927468451!3d19.86907952659811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb99c4b9777b59%3A0x6ffbb5e6deabcf66!2sNixsecura%20Services!5e0!3m2!1sen!2sin!4v1771403239219!5m2!1sen!2sin"
                className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nixsecura Services Location"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
