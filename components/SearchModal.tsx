"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SEARCH_PRODUCTS_QUERY_RESULT } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { SEARCH_PRODUCTS_QUERY } from "@/sanity/queries/query";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SEARCH_PRODUCTS_QUERY_RESULT>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      if (query.trim().length < 2) {
        setProducts([]);
        return;
      }

      setLoading(true);

      try {
        const data = await client.fetch(SEARCH_PRODUCTS_QUERY, {
          searchTerm: `${query}*`,
        })
          ;
        setProducts(data);
      } catch (err) {
        console.log("Error fetching products search: ", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Close on Escape key + lock scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center z-[9999] pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-3">
          Product Search
        </h2>

        {/* Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {loading ? (
            <p className="text-center py-6">Loading...</p>
          ) : query.trim() === "" ? (
            <p className="text-center py-8 text-gray-500">
              Start typing to search products...
            </p>
          ) : products.length > 0 ? (
            products.map((item, i) => (
              <Link key={i} href={`/product/${item?.slug?.current}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={onClose}
              >
                <Search size={16} className="text-gray-400" />
                <span>{item.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">
              No results found for `${query}`
            </p>
          )}
        </div>
      </div>
    </div>
  );
}