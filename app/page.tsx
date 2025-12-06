'use client';

import GetInTouch from "@/components/shared/Home/Contact";
import FAQ from "@/components/shared/Home/Faq";
import Footer from "@/components/shared/Home/Footer";
import Hero from "@/components/shared/Home/Hero";
import Portfolio from "@/components/shared/Home/Portfolio";
import Pricing from "@/components/shared/Home/Pricing";
import Process from "@/components/shared/Home/Process";
import Reviews from "@/components/shared/Home/Reviews";
import { useState } from 'react';
import ProjectDialog from '@/components/ProjectDialog';

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                    Új projekt
                </button>
            </div>

            <ProjectDialog open={open} onClose={() => setOpen(false)} />

            <Hero />
            <Portfolio />
            <Process />
            <Reviews />
            <Pricing />
            <FAQ />
            <GetInTouch />
            <Footer />
        </div>
    );
}