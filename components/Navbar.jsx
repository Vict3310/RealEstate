"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import InquiryModal from "./InquiryModal";
import SearchOverlay from "./SearchOverlay";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar-link",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play prevented", e));
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-ethereal-fairy-win-sound-2019.mp3" type="audio/mpeg" />
      </audio>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-4 md:px-10 py-6 ${
          isScrolled ? "bg-offwhite/80 dark:bg-charcoal/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
        }`}
      >
        <MagneticButton>
          <a href="/" className="font-serif text-2xl font-bold tracking-widest text-charcoal dark:text-offwhite navbar-link">
            OBSIDIAN
          </a>
        </MagneticButton>
        
        <div className="hidden md:flex gap-8 items-center">
          <MagneticButton>
            <button onClick={() => setIsSearchOpen(true)} className="navbar-link text-sm uppercase tracking-widest font-medium text-charcoal/70 dark:text-offwhite/70 hover:text-charcoal dark:hover:text-offwhite transition-colors relative group">
              Search
              <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-charcoal dark:bg-offwhite transition-all duration-300 group-hover:w-full"></span>
            </button>
          </MagneticButton>
          
          {[{name: "Estates", path: "/#estates"}, {name: "Team", path: "/team"}, {name: "Journal", path: "/journal"}].map((item) => (
            <MagneticButton key={item.name}>
              <a
                href={item.path}
                className="navbar-link text-sm uppercase tracking-widest font-medium text-charcoal/70 dark:text-offwhite/70 hover:text-charcoal dark:hover:text-offwhite transition-colors relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-charcoal dark:bg-offwhite transition-all duration-300 group-hover:w-full"></span>
              </a>
            </MagneticButton>
          ))}

          <MagneticButton>
            <button onClick={() => setIsInquiryOpen(true)} className="navbar-link text-sm uppercase tracking-widest font-medium text-charcoal/70 dark:text-offwhite/70 hover:text-charcoal dark:hover:text-offwhite transition-colors relative group">
              Contact
              <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-charcoal dark:bg-offwhite transition-all duration-300 group-hover:w-full"></span>
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <button onClick={toggleAudio} className="navbar-link text-xs uppercase tracking-widest px-3 py-2 text-charcoal/70 dark:text-offwhite/70 hover:text-charcoal dark:hover:text-offwhite transition-colors">
              {isAudioPlaying ? "Sound: On" : "Sound: Off"}
            </button>
          </MagneticButton>

          {mounted && (
            <MagneticButton>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="navbar-link text-xs uppercase tracking-widest px-4 py-2 border border-charcoal/20 dark:border-offwhite/20 hover:bg-charcoal hover:text-offwhite dark:hover:bg-offwhite dark:hover:text-charcoal transition-colors rounded-full"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </MagneticButton>
          )}
        </div>

        <button className="md:hidden flex flex-col gap-1.5 z-50">
          <span className="w-6 h-[2px] bg-charcoal dark:bg-offwhite block"></span>
          <span className="w-6 h-[2px] bg-charcoal dark:bg-offwhite block"></span>
        </button>
      </nav>
    </>
  );
}
