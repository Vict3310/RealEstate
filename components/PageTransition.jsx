"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const curtainRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const tl = gsap.timeline();

    tl.to(curtain, {
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
    .to(curtain, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2,
    });

    return () => tl.kill();
  }, [pathname]);

  return (
    <div 
      ref={curtainRef}
      className="fixed inset-0 z-[9999] bg-charcoal translate-y-full pointer-events-none"
    />
  );
}
