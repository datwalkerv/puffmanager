"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "What is puffcontent?",
      a: "Puffcontent is a Video Editing Agency, but unlike traditional agencies, we operate on a subscription basis, providing unlimited short video edits for a flat monthly fee. Our focus is on delivering high-quality, engaging short-form content quickly and efficiently to help you grow your online presence, all under a single monthly fee. No hidden costs, just great videos.",
    },
    {
      q: "Can I actually request unlimited videos?",
      a: "Yes! With our subscription plans, you can submit as many video requests as you want. Just keep in mind that we work on one or two videos at a time, depending on your plan, to ensure each video gets the attention it deserves.",
    },
    {
      q: "Can I have a paid trial before subscribing?",
      a: "We offer a 1-week paid trial for new users. This allows you to test our services and see if we're the right fit for you before committing to a subscription. Just contact us through the form below!",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Absolutely! You can cancel your subscription at any time. There are no long-term contracts or commitments. If you decide to cancel, you'll still have access to our services until the end of your current billing cycle. We also offer the option to pause your subscription if you need a break.",
    },
    {
      q: "What if I send more than one video request at a time?",
      a: "No problem! Your turnaround time will scale based on the number of requests in the queue.",
    },
    {
        q: "What if I'm not satisfied with the video?",
        a: "We proudly say that nearly every client is satisfied with our work. However, if you're not happy with the final product, we offer revisions based on your subscription plan. Just let us know what changes you'd like, and we'll work with you to make it right.",
    },
    {
        q: "Do you offer refund?",
        a: "We do not offer refunds as our services are subscription-based and we strive to deliver high-quality videos. However, if you encounter any issues or are unsatisfied with our service, please contact us and we will do our best to address your concerns.",
    }
  ];

  return (
    <section
      id="faq"
      className="relative bg-gradient-to-b from-dark to-darkgray text-white space-y-12 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="font-header text-2xl text-yellow mb-2">FAQ</p>
        <h2 className="font-header text-4xl md:text-5xl w-2/4 mx-auto">
          Curious? We've got answers.
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Can't find what you're looking for? <br />Reach out to our team, we're happy to help.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl mx-auto mb-16"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-white/10 rounded-2xl bg-dark/70 backdrop-blur-md shadow-md"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium text-left text-white hover:text-yellow no-underline hover:no-underline transition-colors">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
