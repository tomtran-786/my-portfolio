import TeachingNavbar from "@/app/components/teaching/TeachingNavbar";
import HeroSection from "@/app/components/teaching/HeroSection";
import CoursesSection from "@/app/components/teaching/CoursesSection";
import AboutSection from "@/app/components/teaching/AboutSection";
import TestimonialsSection from "@/app/components/teaching/TestimonialsSection";
import CTASection from "@/app/components/teaching/CTASection";
import TeachingGoToTop from "@/app/components/teaching/TeachingGoToTop";

export default function TeachingPage() {
  return (
    <main style={{ padding: "1.5rem 1rem" }}>
      <TeachingNavbar />
      <HeroSection />
      <CoursesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <TeachingGoToTop />
    </main>
  );
}
