"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KeyScene from "./KeyScene";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef(null);
  const houseRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const house = houseRef.current;
    const textContainer = textRef.current;

    if (!section || !house || !textContainer) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%", // Longer duration for the complex path
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      house,
      { scale: 0.5, opacity: 0, rotateY: -180 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 2, ease: "power2.out" }
    )
    .fromTo(
      textContainer.querySelectorAll(".story-text"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: "power3.out" },
      "-=1"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-charcoal overflow-hidden flex items-center justify-center">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-bronze/5 rounded-full blur-[120px]" />

      <div ref={houseRef} className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <KeyScene />
        </div>
      </div>

      <div ref={textRef} className="relative z-20 text-offwhite max-w-2xl px-10 pointer-events-none">
        <h2 className="story-text font-serif text-5xl md:text-7xl mb-6 font-thin tracking-tight">
          The <br /> Skeleton Key.
        </h2>
        <p className="story-text font-sans text-sm md:text-base uppercase tracking-[0.3em] font-light text-offwhite/60 mb-8">
          Unlocking the world's most exclusive estates.
        </p>
        <div className="story-text w-20 h-[1px] bg-bronze" />
      </div>
    </section>
  );
}
