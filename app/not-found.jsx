"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  useEffect(() => {
    gsap.fromTo(
      ".not-found-content > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-20 pb-10 px-4">
        <div className="not-found-content text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-8xl md:text-[12rem] font-thin leading-none tracking-tight mb-4 text-charcoal/10 dark:text-offwhite/10">
            404
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">A Hidden Enclave.</h2>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-charcoal/60 dark:text-offwhite/60 mb-10 leading-relaxed">
            The estate you are looking for is either off-market or exists only in imagination. Let us guide you back to our curated collection.
          </p>
          <Link
            href="/"
            className="inline-block relative group font-sans text-xs uppercase tracking-widest pb-2"
          >
            Return to Directory
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-charcoal dark:bg-offwhite transition-transform origin-right group-hover:origin-left duration-300 transform scale-x-100 group-hover:scale-x-0"></span>
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-charcoal dark:bg-offwhite transition-transform origin-left group-hover:origin-right duration-300 transform scale-x-0 group-hover:scale-x-100 delay-150"></span>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
