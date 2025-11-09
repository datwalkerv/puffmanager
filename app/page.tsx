import Hero from "@/components/shared/Home/Hero";
import Portfolio from "@/components/shared/Home/Portfolio";
import Pricing from "@/components/shared/Home/Pricing";
import Process from "@/components/shared/Home/Process";
import Review from "@/components/shared/Home/Review";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Portfolio />
      <Process />
      <Review />
      <Pricing />
    </div>
  );
}
