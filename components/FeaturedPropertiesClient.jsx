"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyCard from "./PropertyCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedPropertiesClient({ properties }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Cards Staggered Reveal
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="estates" ref={containerRef} className="py-32 px-4 md:px-10 lg:px-20 bg-offwhite dark:bg-charcoal transition-colors duration-500">
      <div className="flex justify-between items-end mb-16 border-b border-charcoal/20 dark:border-offwhite/20 pb-8" ref={headerRef}>
        <h2 className="reveal-text font-serif text-5xl md:text-7xl font-light text-charcoal dark:text-offwhite">Featured Estates</h2>
        <a href="#" className="font-sans text-xs uppercase tracking-widest text-charcoal dark:text-offwhite hover:opacity-60 transition-opacity pb-2">
          View All Directory
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties.map((prop, i) => (
          <div key={prop.id} ref={(el) => (cardsRef.current[i] = el)} className={prop.isLarge ? "lg:col-span-2" : ""}>
            <PropertyCard {...prop} />
          </div>
        ))}
      </div>
    </section>
  );
}
