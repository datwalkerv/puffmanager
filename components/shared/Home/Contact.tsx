"use client";

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GetInTouch() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-darkgray to-dark text-white py-20 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="font-header text-2xl text-yellow mb-2">Get in Touch</p>
        <h2 className="font-header text-4xl md:text-5xl w-2/4 mx-auto">
          Have a question or want to collaborate?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-4">
          Fill out the form below or reach out via our social links.<br />We'd love
          to hear from you!
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-12 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-6 py-4 bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-6 py-4 bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow"
          />
        </div>

        <input
          type="text"
          placeholder="Your Social URL (optional)"
          className="w-full px-6 py-4 bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow"
        />

        <Select>
          <SelectTrigger className="w-full px-6 py-8 bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray focus:outline-none focus:border-yellow">
            <SelectValue placeholder="Why are you reaching out?" />
          </SelectTrigger>
          <SelectContent className="bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white">
            <SelectItem
              value="start"
              className="text-white hover:bg-yellow/20 rounded-lg"
            >
              I want to start working with Puffcontent
            </SelectItem>
            <SelectItem
              value="enterprise"
              className="text-white hover:bg-yellow/20 rounded-lg"
            >
              I'm interested in the Enterprise plan
            </SelectItem>
            <SelectItem
              value="trial"
              className="text-white hover:bg-yellow/20 rounded-lg"
            >
                I want to try the paid trial
            </SelectItem>
            <SelectItem
              value="info"
              className="text-white hover:bg-yellow/20 rounded-lg"
            >
              I want more information before deciding
            </SelectItem>
            <SelectItem
              value="other"
              className="text-white hover:bg-yellow/20 rounded-lg"
            >
                Other inquiries
            </SelectItem>
          </SelectContent>
        </Select>

        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full px-6 py-4 bg-dark/70 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow resize-none"
        />

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-4 bg-yellow text-dark font-medium rounded-2xl hover:bg-yellow/90 transition-colors"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}
