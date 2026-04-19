'use client'

import { useEffect, useState } from "react"
import HomeTabBar from "./HomeTabBar";
import { AnimatePresence, motion } from "motion/react"
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvaliable from "./NoProductAvaliable";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";




function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
  async function fetchProducts() {
    setLoading(true);
    try {
      let query: string;
      let params: Record<string, string> = {};

      if (selectedTab.toLowerCase() === "all") {
        // No filter — fetch everything
        query = `*[_type == "product"]{
          ...,
          "category": category->{name, slug}
        }`;
      } else {
        // Filter by category slug
        query = `*[
          _type == "product" &&
          category->slug.current == $variant
        ]{
          ...,
          "category": category->{name, slug}
        }`;
        params = { variant: selectedTab.toLowerCase() };
      }

      const data = await client.fetch(query, params, {
        cache: "no-store", // ✅ Bypass CDN cache in production
      });

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, [selectedTab]);


  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
          <motion.div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin" />
            <span className="ml-2">Loading products...</span>
          </motion.div>
        </div>
      ) : products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products?.map((product) => (
            <AnimatePresence key={product._id}>
              <motion.div layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>))}
        </div>
      ) : (
        <NoProductAvaliable selectedTab={selectedTab} className="mt-10" />
      )}
    </div>
  )
}

export default ProductGrid
