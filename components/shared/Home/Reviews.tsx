"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "John Carter",
    role: "CEO, VisionX Media",
    quote:
      "Working with this team completely transformed our content game. The results were beyond our expectations.",
    image: "/images/testimonial1.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Marketing Manager, NovaTech",
    quote:
      "They understood our brand instantly and delivered videos that truly connected with our audience.",
    image: "/images/testimonial2.jpg",
  },
  {
    name: "Alex Martinez",
    role: "Founder, Bold Agency",
    quote:
      "Fast, reliable, and creative. Exactly what we needed to scale our content production.",
    image: "/images/testimonial3.jpg",
  },
  {
    name: "Emily Zhang",
    role: "Creative Director, Apex Studio",
    quote:
      "Their attention to detail and understanding of storytelling is unmatched. Highly recommended.",
    image: "/images/testimonial4.jpg",
  },
  {
    name: "Daniel Novak",
    role: "Head of Content, Luma Co.",
    quote:
      "We’ve worked with many teams, but this collaboration felt like magic. Top-tier delivery every time.",
    image: "/images/testimonial5.jpg",
  },
];

const duplicated = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

export default function Reviews() {
  return (
    <section className="relative bg-gradient-to-b from-dark via-darkgray to-dark text-white py-24 overflow-hidden">
      <div className="text-center mb-14">
        <p className="text-yellow text-lg font-medium mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-semibold">
          What our clients say about us
        </h2>
      </div>

      <motion.div
        className="flex space-x-6 mb-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {[...duplicated].map((t, i) => (
          <div
            key={`top-${i}`}
            className="flex-shrink-0 w-[350px] bg-neutral-900 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden border border-yellow-400/40">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-header text-lg">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic leading-relaxed">
              “{t.quote}”
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex space-x-6"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {[...duplicated].map((t, i) => (
          <div
            key={`bottom-${i}`}
            className="flex-shrink-0 w-[350px] bg-neutral-900 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden border border-yellow/40">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-header text-lg">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic leading-relaxed">
              “{t.quote}”
            </p>
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark via-transparent to-dark" />
    </section>
  );
}
