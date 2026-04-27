"use client";

import { createContext, useContext, useState, useEffect } from "react";

const rates = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  AED: { symbol: "د.إ", rate: 3.67 },
};

const CurrencyContext = createContext({
  currency: "USD",
  symbol: "$",
  rate: 1,
  setCurrency: () => {},
  availableCurrencies: Object.keys(rates),
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCurrency = localStorage.getItem("obsidian_currency");
    if (savedCurrency && rates[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (curr) => {
    if (rates[curr]) {
      setCurrencyState(curr);
      localStorage.setItem("obsidian_currency", curr);
    }
  };

  if (!mounted) return <>{children}</>;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        symbol: rates[currency].symbol,
        rate: rates[currency].rate,
        setCurrency,
        availableCurrencies: Object.keys(rates),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
