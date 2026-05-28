import Hero from "@/app/components/hero";
import Stats from "@/app/components/stats";
import FeaturedProperties from "@/app/components/featured-properties";
import PropertiesCarousel from "@/app/components/properties-carousel";
import Areas from "@/app/components/areas";
import Process from "@/app/components/process";
import WhyUs from "@/app/components/why-us";
import Testimonials from "@/app/components/testimonials";
import CtaBanner from "@/app/components/cta-banner";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Stats />
      <FeaturedProperties />
      <PropertiesCarousel />
      <Areas />
      <Process />
      <WhyUs />
      <Testimonials />
      {/* <CtaBanner /> */}
      <Footer />
    </main>
  );
}
