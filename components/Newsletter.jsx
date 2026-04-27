"use client";

import { useState } from "react";
import { subscribeNewsletter } from "../lib/actions";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await subscribeNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal/5 dark:bg-offwhite/5 p-10 md:p-16 border border-charcoal/10 dark:border-offwhite/10 mt-20 mb-10 max-w-4xl mx-auto text-center">
      <h3 className="font-serif text-3xl md:text-5xl mb-4">Whisper Listings.</h3>
      <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-8 max-w-lg mx-auto">
        Join our private registry to receive exclusive access to off-market estates before they are public.
      </p>
      
      {status === "success" ? (
        <p className="font-sans text-xs uppercase tracking-widest text-bronze animate-fade-in">
          You have been registered for exclusive access.
        </p>
      ) : (
        <form className="flex flex-col md:flex-row gap-4 justify-center" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="bg-transparent border-b border-charcoal/30 dark:border-offwhite/30 px-4 py-2 font-serif text-lg outline-none min-w-[300px] focus:border-charcoal dark:focus:border-offwhite transition-colors placeholder:text-charcoal/30 dark:placeholder:text-offwhite/30"
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="font-sans text-xs uppercase tracking-[0.2em] bg-charcoal dark:bg-offwhite text-offwhite dark:text-charcoal px-8 py-3 hover:bg-bronze transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </form>
      )}
      
      {status === "error" && (
        <p className="mt-4 font-sans text-[10px] uppercase tracking-widest text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
