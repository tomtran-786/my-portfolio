import TeachingNavbar from "@/app/components/teaching/TeachingNavbar";
import HeroSection from "@/app/components/teaching/HeroSection";
import CoursesSection from "@/app/components/teaching/CoursesSection";
import AboutSection from "@/app/components/teaching/AboutSection";
import TestimonialsSection from "@/app/components/teaching/TestimonialsSection";
import CTASection from "@/app/components/teaching/CTASection";
import TeachingGoToTop from "@/app/components/teaching/TeachingGoToTop";

export default function TeachingPage() {
  return (
    // Không padding ngang ở đây — để Navbar tràn sát mép trái/phải.
    // Các section bên dưới tự có padding riêng (đã set trong từng component).
<main style={{ padding: "0 1rem" }}>
  <TeachingNavbar />
      <div style={{ padding: "0 1rem" }}>
        <HeroSection />
        <CoursesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </div>
      <TeachingGoToTop />
    </main>
  );
}