"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSlider({ images }) {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    
    if (!section || !container) return;

    // Calculate how far to move horizontally
    const getScrollAmount = () => {
      let containerWidth = container.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 20%",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden relative w-full h-screen flex items-center bg-charcoal/5 dark:bg-offwhite/5 py-20">
      <div 
        ref={scrollContainerRef}
        className="flex gap-10 px-10 h-[70vh] md:h-[80vh] items-center"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[50vw] h-full relative flex-shrink-0 bg-charcoal/10 dark:bg-offwhite/10 shadow-2xl">
            <Image 
              src={img} 
              alt={`Gallery image ${i + 1}`} 
              fill 
              className="object-cover pointer-events-none" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
