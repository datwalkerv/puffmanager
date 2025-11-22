import Image from "next/image";
import hero from "@/public/Hero.png";

export default function Hero() {
  return (
    <main className="relative h-screen flex flex-col items-center overflow-hidden w-full">
      <Image
        src={hero}
        alt="Hero background"
        fill
        priority
        className="object-cover absolute top-0 left-0 -z-10"
      />

      <h1 className="font-header mt-24 leading-none text-[10rem] font-extrabold bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] text-center">
        puffcontent
      </h1>

      <p className="text-white mt-4 text-3xl tracking-wide text-center">
        Editing at different level
      </p>
    </main>
  );
}
