"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Reset cursor on page change
    const cursor = cursorRef.current;
    if (cursor) {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        borderRadius: "50%",
        duration: 0.3,
        ease: "power2.out",
      });
      setText("");
      gsap.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
    }
  }, [pathname]);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    const cursor = cursorRef.current;
    
    // Move cursor
    const onMouseMove = (e) => {
      if (!cursor) return;
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });

      // Robust check: if not over a data-cursor element, ensure it's a dot
      if (!e.target.closest("[data-cursor]")) {
        gsap.to(cursor, {
          width: 12,
          height: 12,
          borderRadius: "50%",
          duration: 0.3,
          ease: "power2.out",
        });
        if (textRef.current) {
          gsap.to(textRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            onComplete: () => setText("")
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Hover logic
    const handleMouseEnter = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el && cursor) {
        setText(el.getAttribute("data-cursor") || "Explore");
        
        gsap.to(cursor, {
          width: 130,
          height: 45,
          borderRadius: "100px",
          duration: 0.4,
          ease: "back.out(1.5)",
          backgroundColor: "#fff",
        });
        if (textRef.current) {
          gsap.to(textRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: 0.1,
          });
        }
      }
    };

    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "white",
      }}
    >
      <span 
        ref={textRef}
        className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-black opacity-0 scale-50"
      >
        {text}
      </span>
    </div>
  );
}

