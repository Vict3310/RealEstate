"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Newsletter from "./Newsletter";
import { useCurrency } from "./CurrencyProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: "100%",
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      gsap.to(".marquee-container", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Newsletter />
      <footer ref={footerRef} className="bg-charcoal text-offwhite py-20 px-4 md:px-10 lg:px-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-offwhite/20 pb-10 mb-10 relative">
        {/* Massive Marquee Text Background */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none flex items-center">
          <div className="marquee-container flex whitespace-nowrap">
            <h2 className="font-serif text-[15rem] leading-none uppercase tracking-tighter pr-20">OBSIDIAN LUXURY ESTATES</h2>
            <h2 className="font-serif text-[15rem] leading-none uppercase tracking-tighter pr-20">OBSIDIAN LUXURY ESTATES</h2>
          </div>
        </div>
        
        <div className="overflow-hidden relative z-10">
          <h2 className="footer-reveal font-serif text-5xl md:text-8xl font-thin tracking-tight mb-4 md:mb-0">
            OBSIDIAN
          </h2>
        </div>
        <div className="flex gap-10 overflow-hidden">
          {["Instagram", "Twitter", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="footer-reveal font-sans text-xs uppercase tracking-widest hover:text-offwhite/60 transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-xs text-offwhite/50 uppercase tracking-widest font-sans overflow-hidden">
        <p className="footer-reveal">&copy; {new Date().getFullYear()} Obsidian Real Estate.</p>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <select 
            className="bg-transparent border-none outline-none font-sans text-xs uppercase tracking-widest text-offwhite/50 hover:text-offwhite transition-colors cursor-pointer appearance-none footer-reveal"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {availableCurrencies.map(c => <option key={c} value={c} className="bg-charcoal text-offwhite">{c}</option>)}
          </select>
          <a href="#" className="footer-reveal hover:text-offwhite transition-colors">Privacy Policy</a>
          <a href="#" className="footer-reveal hover:text-offwhite transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
    </>
  );
}
