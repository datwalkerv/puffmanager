"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CircleCheck, Star } from "lucide-react"; // icon for Most Popular badge

const plans = [
  {
    name: "Unlimited",
    price: "$997/month",
    description: "Ideal for individuals getting started.",
    features: [
      "Unlimited Requests",
      "One video at a time",
      "24 hour turnaround",
      "Turnaround scales with queue",
      "Exclusive Kanban board",
      "24/7 direct communication",
      "Dedicated editor",
      "3 revisions per video",
      "Pause or Cancel Anytime",
    ],
  },
  {
    name: "Unlimited+",
    price: "$1697 / month",
    description: "Perfect for creators who want more control and support.",
    features: [
      "Unlimited Requests",
      "Two video at a time",
      "24 hour turnaround",
      "Turnaround scales with queue",
      "Exclusive Kanban board",
      "24/7 direct communication",
      "Dedicated editor",
      "5 revisions per video",
      "Pause or Cancel Anytime",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored for teams and large-scale collaborations. Choose this plan if you want long form videos or have specific needs.",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited projects",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-dark text-white py-24 space-y-12 overflow-hidden"
    >
      <div className="text-center mb-16">
        <p className="font-header text-2xl text-yellow mb-2">Pricing</p>
        <h2 className="font-header text-4xl md:text-6xl w-2/4 mx-auto">
          Get unlimited short videos in a monthly subscription.
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto">
        {plans.map((plan, i) => {
          const isPopular = plan.popular;

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-[2px] h-fit ${
                isPopular
                  ? "bg-gradient-to-r from-yellow via-amber-500 to-yellow animate-gradient-x bg-[length:200%_200%]"
                  : "bg-neutral-800"
              }`}
            >
              <div className="relative rounded-2xl bg-neutral-950/70 backdrop-blur-md p-8 h-full flex flex-col border border-neutral-800/60">
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow text-black px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
                    <Star className="w-4 h-4 fill-black text-black" />
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-semibold mb-1 mt-4 text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <p className="text-3xl font-bold text-yellow mb-6">
                  {plan.price}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <span className="text-yellow">
                        <CircleCheck />
                      </span>{" "}
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="block w-full text-center bg-yellow text-black font-medium py-3 rounded-xl hover:bg-lightyellow transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center border border-4 border-neutral-800/60 bg-neutral-950/70 backdrop-blur-md rounded-2xl px-8 py-12 shadow-xl"
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
          Try Us Risk-Free
        </h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Not sure? Apply for our{" "}
          <span className="text-yellow-400 font-medium">1-week paid trial</span>{" "}
          and see the quality yourself before committing to a plan.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-yellow text-black font-medium px-8 py-3 rounded-xl hover:bg-lightyellow transition-all"
        >
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
