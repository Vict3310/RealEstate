"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
  useEffect(() => {
    // Basic setup for smooth scrolling text elements
    const splitTypes = document.querySelectorAll(".reveal-text");

    splitTypes.forEach((char, i) => {
      gsap.fromTo(
        char,
        {
          y: 100,
          opacity: 0,
          skewY: 7,
          rotateX: -30,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: char,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return null;
}
