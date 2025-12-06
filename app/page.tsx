import GetInTouch from "@/components/shared/Home/Contact";
import FAQ from "@/components/shared/Home/Faq";
import Footer from "@/components/shared/Home/Footer";
import Hero from "@/components/shared/Home/Hero";
import Portfolio from "@/components/shared/Home/Portfolio";
import Pricing from "@/components/shared/Home/Pricing";
import Process from "@/components/shared/Home/Process";
import Reviews from "@/components/shared/Home/Reviews";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Portfolio />
      <Process />
      <Reviews />
      <Pricing />
      <FAQ />
      <GetInTouch />
      <Footer />
    </div>
  );
}
