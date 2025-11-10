"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 text-white py-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl pt-6 mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="space-y-2 text-center md:text-left">
          <p className="text-yellow font-header text-2xl">puffcontent</p>
          <p className="text-gray-400">
            Editing at different level.
          </p>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-lg font-medium text-white mb-2">Impressum</p>
          <ul className="space-y-1 text-gray-400">
            <li>
              <Link href="#faq" className="hover:text-yellow transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-yellow transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2 text-center md:text-right">
          <p className="text-lg font-medium text-white mb-2">Follow Us</p>
          <div className="flex gap-4 text-gray-400 justify-center md:justify-end">
            <a
              href="https://instagram.com/puffcontent.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://youtube.com/@puffcontent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow transition-colors"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Puffcontent. All rights reserved.
      </div>
    </footer>
  );
}
