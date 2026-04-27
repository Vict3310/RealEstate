"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const accolades = [
  { quote: "Obsidian redefines what a luxury estate should feel like.", source: "Architectural Digest" },
  { quote: "The undisputed gatekeepers of the world's most coveted homes.", source: "Forbes" },
  { quote: "Mastering the art of quiet luxury in real estate.", source: "Vogue Living" },
  { quote: "A seamless, bespoke experience for the ultra-high-net-worth.", source: "Wall Street Journal" }
];

export default function Accolades() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Simple marquee effect using GSAP
    const el = scrollRef.current;
    
    // Duplicate the content to make the loop seamless
    if (el) {
      el.innerHTML += el.innerHTML;
    }

    gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-20 border-y border-charcoal/10 dark:border-offwhite/10 overflow-hidden bg-offwhite dark:bg-charcoal transition-colors duration-500">
      <div className="mb-10 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-charcoal/50 dark:text-offwhite/50">Global Recognition</span>
      </div>
      
      <div className="relative w-full flex whitespace-nowrap overflow-hidden">
        <div ref={scrollRef} className="flex gap-20 px-10">
          {accolades.map((acc, i) => (
            <div key={i} className="flex flex-col gap-2 min-w-[400px]">
              <p className="font-serif text-2xl md:text-3xl italic">"{acc.quote}"</p>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60">— {acc.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
