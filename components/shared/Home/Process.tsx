"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "You will reach out to us and subscribe to one of our plans",
    image: "/images/step1.jpg",
  },
  {
    step: "Step 2",
    title: "We’ll get you onboarded on our system",
    image: "/images/step2.jpg",
  },
  {
    step: "Step 3",
    title: "You’ll start adding video requests",
    image: "/images/step3.jpg",
  },
  {
    step: "Step 4",
    title:
      "We’ll start working on it and you’ll get notification of the whole process",
    image: "/images/step4.jpg",
  },
  {
    step: "Step 5",
    title: "You’ll get a premium video which actually works",
    image: "/images/step5.jpg",
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      const middleY = viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(stepMiddle - middleY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 py-24"
    >
      <div className="text-center mb-16">
        <p className="font-header text-yellow-400 text-2xl font-medium mb-2">Process</p>
        <h2 className="font-header text-4xl md:text-6xl w-3/4 mx-auto font-semibold">
          Because great work deserves great execution.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full py-12">
        {/* Left side: steps */}
        <div className="flex flex-col space-y-10">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className={`rounded-xl p-6 transition-all duration-500 ease-out ${
                i === activeIndex
                  ? "bg-neutral-800 scale-[1.02] shadow-lg"
                  : "bg-transparent opacity-60"
              }`}
            >
              <p className="text-gray-400">{s.step}</p>
              <p className="text-white mt-1 leading-snug">{s.title}</p>
            </div>
          ))}
        </div>

        {/* Right side: sticky image */}
        <div className="relative">
          <div className="sticky top-24 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={steps[activeIndex].image}
                src={steps[activeIndex].image}
                alt={steps[activeIndex].title}
                initial={{ opacity: 0, y: 30, scale: 1.05 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
