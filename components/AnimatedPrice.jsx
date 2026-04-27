"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCurrency } from "./CurrencyProvider";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedPrice({ value }) {
  const priceRef = useRef(null);
  const { symbol, rate } = useCurrency();
  
  // Parse numeric value from a string like "$24,000,000" (Base is always USD)
  const baseValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const convertedValue = baseValue * rate;

  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    
    // We animate a proxy object
    const counter = { val: 0 };
    
    gsap.to(counter, {
      val: convertedValue,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      onUpdate: () => {
        if (el) {
          el.innerHTML = `${symbol}${Math.floor(counter.val).toLocaleString()}`;
        }
      }
    });
  }, [convertedValue, symbol]);

  return (
    <span ref={priceRef} className="font-sans font-medium">
      {symbol}0
    </span>
  );
}
