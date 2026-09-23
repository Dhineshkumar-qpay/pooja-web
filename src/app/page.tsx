import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { TrustSection } from "@/components/home/TrustSection";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewArrivals } from "@/components/home/NewArrivals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { BannersSection } from "@/components/home/BannersSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceStrip />
        <TrustSection />
        <Categories />
        <FeaturedProducts />
        <HowItWorks />
        <NewArrivals />
        <BannersSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
