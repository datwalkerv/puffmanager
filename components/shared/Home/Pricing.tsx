import React from "react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Upload projects", "Chat with editors", "Email notifications"],
  },
  {
    name: "Pro",
    price: "$15 / month",
    features: [
      "Everything in Basic",
      "Priority support",
      "Advanced project tracking",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited projects",
    ],
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" id="pricing">
      <h1 className="text-4xl font-bold mb-10">Pricing Plans</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-2xl p-6 shadow-md bg-white dark:bg-neutral-900
                       transition-transform duration-300 hover:scale-105 hover:shadow-xl
                       hover:border-blue-500 dark:hover:border-blue-400"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-xl mb-4">{plan.price}</p>
            <ul className="space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="text-gray-700 dark:text-gray-300">
                  • {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
