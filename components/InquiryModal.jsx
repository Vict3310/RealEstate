"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { createInquiry } from "../lib/actions";

export default function InquiryModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, display: "flex", ease: "power2.out" });
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0, scale: 0.9, rotateX: 10 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: "power4.out", delay: 0.2 });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, display: "none", ease: "power2.in" });
      document.body.style.overflow = "auto";
      setTimeout(() => setIsSuccess(false), 500);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await createInquiry(data);
      setIsSuccess(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] hidden items-center justify-center bg-charcoal/40 dark:bg-charcoal/60 backdrop-blur-xl p-4">
      <div ref={contentRef} className="relative w-full max-w-2xl bg-offwhite/80 dark:bg-charcoal/80 backdrop-blur-2xl text-charcoal dark:text-offwhite p-10 md:p-16 border border-offwhite/20 dark:border-charcoal/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] perspective-1000">
        <button onClick={onClose} className="absolute top-6 right-6 text-2xl hover:opacity-50 transition-opacity">&times;</button>
        
        {isSuccess ? (
          <div className="text-center py-20 animate-fade-in">
            <h2 className="font-serif text-5xl mb-4">Received.</h2>
            <p className="font-sans text-xs uppercase tracking-widest text-bronze">Our advisory team will reach out shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-4xl md:text-5xl font-thin mb-4">Inquire.</h2>
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-10">
              Request a private viewing or connect with our advisory team.
            </p>
            
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col border-b border-charcoal/20 dark:border-offwhite/20 pb-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50 mb-1">Name</label>
                <input name="name" type="text" required className="bg-transparent font-serif text-xl outline-none" placeholder="Your full name" />
              </div>
              <div className="flex flex-col border-b border-charcoal/20 dark:border-offwhite/20 pb-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50 mb-1">Email</label>
                <input name="email" type="email" required className="bg-transparent font-serif text-xl outline-none" placeholder="Your email address" />
              </div>
              <div className="flex flex-col border-b border-charcoal/20 dark:border-offwhite/20 pb-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50 mb-1">Message</label>
                <textarea name="message" rows="3" className="bg-transparent font-serif text-xl outline-none resize-none" placeholder="How can we assist you?"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-6 font-sans text-xs uppercase tracking-[0.3em] bg-charcoal dark:bg-offwhite text-offwhite dark:text-charcoal py-4 px-8 hover:bg-bronze transition-colors self-start disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
