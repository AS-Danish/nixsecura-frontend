import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { FacultySection } from "@/components/sections/FacultySection";
import { WorkshopsSection } from "@/components/sections/WorkshopsSection";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingCallback } from "@/components/FloatingCallback";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <FacultySection />
      <WorkshopsSection />
      <CertificateSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogsSection />
      <ContactSection />
      <Footer />
      <FloatingCallback />
    </main>
  );
};

export default Index;
