"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".hero-image", {
        scale: 1,
        duration: 2,
        ease: "power3.out",
      })
        .fromTo(
          ".hero-title-line",
          { y: 150, opacity: 0, skewY: 10 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" },
          "-=1.5"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=1"
        );

      // Parallax effect
      gsap.to(".hero-image", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-title-line", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      <div className="hero-image absolute inset-0 w-full h-full opacity-60 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
          alt="Quiet Luxury Estate"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10 text-center text-offwhite px-4">
        <div className="overflow-hidden">
          <h1 className="hero-title-line font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none mb-2 font-thin tracking-tight">
            QUIET
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-title-line font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none mb-6 font-thin tracking-tight">
            LUXURY
          </h1>
        </div>
        <p className="hero-subtitle font-sans text-sm md:text-base uppercase tracking-[0.3em] font-light max-w-md mx-auto">
          Exclusive estates for the discerning few.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-offwhite/70">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-offwhite/30 overflow-hidden relative">
          <div className="w-full h-full bg-offwhite absolute top-0 -translate-y-full animate-scrolldown"></div>
        </div>
      </div>
    </section>
  );
}
