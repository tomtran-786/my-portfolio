import Cursor from "@/app/components/Cursor";
import TeachingNavbar from "@/app/components/teaching/TeachingNavbar";
import HeroSection from "@/app/components/teaching/HeroSection";
import ClassMomentsSection from "@/app/components/teaching/ClassMomentsSection";
import CoursesSection from "@/app/components/teaching/CoursesSection";
import AboutSection from "@/app/components/teaching/AboutSection";
import TestimonialsSection from "@/app/components/teaching/TestimonialsSection";
import CTASection from "@/app/components/teaching/CTASection";
import TeachingFooter from "@/app/components/teaching/TeachingFooter";
import TeachingGoToTop from "@/app/components/teaching/TeachingGoToTop";

export default function TeachingPage() {
  return (
    <main>
      <Cursor />
      <TeachingNavbar />
      <HeroSection />
      <ClassMomentsSection />
      <CoursesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <TeachingFooter />
      <TeachingGoToTop />
    </main>
  );
}
