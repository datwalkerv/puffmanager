import Portfolio from "@/components/shared/Home/Portfolio";
import Pricing from "@/components/shared/Home/Pricing";
import Process from "@/components/shared/Home/Process";
import Review from "@/components/shared/Home/Review";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Portfolio />
      <Process />
      <Review />
      <Pricing />
    </div>
  );
}
