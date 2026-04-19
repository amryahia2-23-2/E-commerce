"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import SearchModal from "./SearchModal";

interface SearchContextType {
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}

export default function SearchProvider({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSearch = () => setOpen(true);
  const closeSearch = () => setOpen(false);

  return (
    <SearchContext.Provider value={{ openSearch, closeSearch }}>
      {children}
      <SearchModal open={open} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}