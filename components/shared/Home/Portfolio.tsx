"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import bg from "@/public/bg.png";

export default function Portfolio() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = [
    bg,
    bg,
    bg,
    bg,
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-darkgray to-dark"
      id="portfolio"
    >
      <h2 className="font-header text-4xl md:text-6xl mb-16 text-center tracking-tight">
        Quality that speaks for itself.
      </h2>

      {/* Carousel */}
      <div className="w-full max-w-6xl relative px-4">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((src, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all h-3 rounded-full ${
                selectedIndex === index ? "bg-white w-10" : "bg-white/40 w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
