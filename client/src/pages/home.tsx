import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import MenuSection from "@/components/menu-section";
import GallerySection from "@/components/gallery-section";
import OrderTrackingSection from "@/components/order-tracking-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <OrderTrackingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
