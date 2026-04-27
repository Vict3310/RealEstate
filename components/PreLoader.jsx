"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      },
    });

    tl.to(".preloader-progress", {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    })
      .to(".preloader-text", {
        opacity: 0,
        y: -20,
        duration: 0.5,
      }, "-=0.2")
      .to(".preloader-container", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-offwhite">
      <div className="overflow-hidden">
        <h1 className="preloader-text font-serif text-4xl tracking-[0.2em] mb-8 font-thin">OBSIDIAN</h1>
      </div>
      <div className="w-48 h-[1px] bg-offwhite/20 overflow-hidden relative">
        <div className="preloader-progress absolute top-0 left-0 h-full w-0 bg-offwhite"></div>
      </div>
    </div>
  );
}
