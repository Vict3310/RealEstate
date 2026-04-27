"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { searchProperties } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";

export default function SearchOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { y: "0%", duration: 0.8, ease: "power4.inOut" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, { y: "-100%", duration: 0.8, ease: "power4.inOut" });
      document.body.style.overflow = "auto";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const data = await searchProperties(query);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[90] -translate-y-full flex flex-col bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite">
      <div className="flex justify-end p-10">
        <button onClick={onClose} className="text-3xl hover:opacity-50 transition-opacity">&times;</button>
      </div>
      <div className="flex-grow flex flex-col items-center pt-20 px-4 overflow-y-auto">
        <h2 className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-8">Search the Collection</h2>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Location, Lifestyle, or Property Name..." 
          className="w-full max-w-4xl bg-transparent font-serif text-3xl md:text-6xl text-center outline-none border-b border-charcoal/20 dark:border-offwhite/20 pb-4 placeholder:text-charcoal/20 dark:placeholder:text-offwhite/20"
          autoFocus={isOpen}
        />
        
        <div className="w-full max-w-4xl mt-20">
          {isSearching && <p className="text-center font-sans text-xs uppercase tracking-widest animate-pulse">Searching...</p>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {results.map((result) => (
              <Link 
                key={result.id} 
                href={`/property/${result.id}`} 
                onClick={onClose}
                className="group flex items-center gap-6 p-4 border border-charcoal/5 dark:border-offwhite/5 hover:bg-charcoal/5 dark:hover:bg-offwhite/5 transition-colors"
              >
                <div className="relative w-20 h-20 overflow-hidden shrink-0">
                  <Image src={result.image} alt={result.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-serif text-xl">{result.title}</h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60">{result.location}</p>
                </div>
              </Link>
            ))}
          </div>

          {!isSearching && query.length >= 2 && results.length === 0 && (
            <p className="text-center font-sans text-xs uppercase tracking-widest text-charcoal/40 dark:text-offwhite/40">No estates found matches your search.</p>
          )}

          {query.length < 2 && (
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {["Beverly Hills", "Miami", "Aspen", "Waterfront"].map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setQuery(tag)}
                  className="font-sans text-[10px] uppercase tracking-widest border border-charcoal/20 dark:border-offwhite/20 px-4 py-2 hover:bg-charcoal hover:text-offwhite dark:hover:bg-offwhite dark:hover:text-charcoal transition-colors rounded-full"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
