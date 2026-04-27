"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JournalPage({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && articles.length < 9) {
          setIsLoading(true);
          // Simulate network request
          setTimeout(() => {
            setArticles((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                title: "Archival: The Legacy of European Minimalism",
                category: "History",
                date: "August 04, 2024",
                image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
                excerpt: "Tracing the origins of minimal design and how it influences today's multi-million dollar coastal builds.",
              },
              {
                id: prev.length + 2,
                title: "The Art of Collecting: Finding Space for Masterpieces",
                category: "Lifestyle",
                date: "July 22, 2024",
                image: "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=2070&auto=format&fit=crop",
                excerpt: "Integrating private galleries and climate-controlled showrooms into modern luxury estates.",
              }
            ]);
            setIsLoading(false);
          }, 1500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, articles.length]);

  return (
    <main className="bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite transition-colors duration-500 min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-grow pt-40 pb-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="border-b border-charcoal/20 dark:border-offwhite/20 pb-10 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <h1 className="font-serif text-6xl md:text-8xl font-thin tracking-tight">
            THE JOURNAL
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 max-w-xs">
            Insights on luxury living, architecture, and the global market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer flex flex-col gap-4 animate-fade-in">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-charcoal/10 dark:bg-offwhite/10">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="flex justify-between items-center mt-2 border-t border-charcoal/10 dark:border-offwhite/10 pt-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60">{article.category}</span>
                <div className="flex gap-4">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-offwhite/40">3 min read</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60">{article.date}</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl leading-snug group-hover:text-charcoal/70 dark:group-hover:text-offwhite/70 transition-colors">
                {article.title}
              </h3>
              <p className="font-sans text-sm text-charcoal/70 dark:text-offwhite/70 leading-relaxed">
                {article.excerpt}
              </p>
              <span className="font-sans text-xs uppercase tracking-widest border-b border-charcoal dark:border-offwhite self-start pb-1 mt-2">
                Read Article
              </span>
            </article>
          ))}
        </div>

        <div ref={loaderRef} className="py-20 flex justify-center">
          {isLoading && (
            <div className="w-10 h-10 border-2 border-charcoal/20 dark:border-offwhite/20 border-t-charcoal dark:border-t-offwhite rounded-full animate-spin"></div>
          )}
          {!isLoading && articles.length >= 9 && (
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 dark:text-offwhite/40">No more articles</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
