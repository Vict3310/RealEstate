"use client";

import { useState } from "react";
import gsap from "gsap";
import { useCurrency } from "./CurrencyProvider";

export default function MortgageCalculator({ price }) {
  const [isOpen, setIsOpen] = useState(false);
  const { symbol, rate } = useCurrency();

  const basePrice = parseInt(price.replace(/[^0-9]/g, ""), 10);
  const localPrice = basePrice * rate;

  const [downPayment, setDownPayment] = useState(20); // percentage
  const [interestRate, setInterestRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const calculateMonthly = () => {
    const principal = localPrice - (localPrice * (downPayment / 100));
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = years * 12;

    if (monthlyRate === 0) return principal / numberOfPayments;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  return (
    <div className="relative mt-20 border-t border-charcoal/20 dark:border-offwhite/20 pt-10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 font-sans text-xs uppercase tracking-widest text-charcoal/70 dark:text-offwhite/70 hover:text-charcoal dark:hover:text-offwhite transition-colors"
      >
        <span>{isOpen ? "- Close Calculator" : "+ Mortgage Calculator"}</span>
      </button>

      {isOpen && (
        <div className="mt-10 p-10 bg-charcoal/5 dark:bg-offwhite/5 border border-charcoal/10 dark:border-offwhite/10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50">Down Payment (%)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(e.target.value)}
                className="bg-transparent border-b border-charcoal/30 dark:border-offwhite/30 font-serif text-2xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)}
                className="bg-transparent border-b border-charcoal/30 dark:border-offwhite/30 font-serif text-2xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-offwhite/50">Loan Term (Years)</label>
              <select 
                value={years} 
                onChange={(e) => setYears(e.target.value)}
                className="bg-transparent border-b border-charcoal/30 dark:border-offwhite/30 font-serif text-2xl outline-none cursor-pointer"
              >
                <option value={15} className="bg-charcoal text-offwhite">15 Years</option>
                <option value={30} className="bg-charcoal text-offwhite">30 Years</option>
              </select>
            </div>

          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-end border-t border-charcoal/10 dark:border-offwhite/10 pt-10">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-2">Estimated Monthly</p>
              <p className="font-serif text-5xl">{symbol}{Math.round(calculateMonthly()).toLocaleString()}</p>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-offwhite/40 mt-4 md:mt-0 max-w-xs text-right">
              *Estimates are for informational purposes only. Taxes and insurance not included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
