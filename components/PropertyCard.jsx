"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import AnimatedPrice from "./AnimatedPrice";

export default function PropertyCard({ id, title, location, price, image, isLarge = false }) {
  const imageRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("obsidian_saved") || "[]");
    if (saved.includes(id)) {
      setIsSaved(true);
    }
  }, [id]);

  const toggleSave = (e) => {
    e.preventDefault(); // Prevent navigating to PDP
    const saved = JSON.parse(localStorage.getItem("obsidian_saved") || "[]");
    if (isSaved) {
      const updated = saved.filter(savedId => savedId !== id);
      localStorage.setItem("obsidian_saved", JSON.stringify(updated));
    } else {
      saved.push(id);
      localStorage.setItem("obsidian_saved", JSON.stringify(saved));
    }
    setIsSaved(!isSaved);
  };

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.8, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power3.out" });
  };

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <Link href={`/property/${id}`} className={`block group cursor-none flex flex-col gap-4 ${isLarge ? "col-span-2 row-span-2" : "col-span-1"}`}
      data-cursor="View Estate"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden w-full h-[400px] md:h-[600px] bg-charcoal/10 dark:bg-offwhite/10">
        <button 
          onClick={toggleSave}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-offwhite/80 dark:bg-charcoal/80 rounded-full hover:bg-offwhite dark:hover:bg-charcoal transition-colors backdrop-blur-md"
        >
          <svg className={`w-5 h-5 transition-colors ${isSaved ? "fill-bronze text-bronze" : "fill-none text-charcoal dark:text-offwhite"}`} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <div ref={imageRef} className="w-full h-full relative origin-center">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            priority={isLarge}
          />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none" />
      </div>
      <div className="flex justify-between items-start pt-2 border-t border-charcoal/20 dark:border-offwhite/20">
        <div>
          <h3 className="font-serif text-2xl mb-1">{title}</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60">{location}</p>
        </div>
        <AnimatedPrice value={price} />
      </div>
    </Link>
  );
}
