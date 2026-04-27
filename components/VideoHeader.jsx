"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function VideoHeader({ videoSrc, title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".video-overlay-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-charcoal">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80"></div>
      <div className="absolute bottom-10 md:bottom-20 left-4 md:left-10 lg:left-20 z-10">
        <div className="overflow-hidden">
          <h1 className="video-overlay-text font-serif text-5xl md:text-8xl text-offwhite font-thin tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
