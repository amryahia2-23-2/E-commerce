"use client"
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product, DEAL_PRODUCT_QUERY_RESULT, PRODUCT_BY_SLUG_QUERY_RESULT } from '@/sanity.types';

type WishlistProductType = Product | DEAL_PRODUCT_QUERY_RESULT[number] | PRODUCT_BY_SLUG_QUERY_RESULT;

function AddbuttonWishlist({ product, className }: { product: WishlistProductType, className?: string }) {

  const { addToFavorite, favoriteProduct } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);


  useEffect(() => {
    const avalibleProduct = favoriteProduct.find((item) => item._id === product._id);
    setExistingProduct(avalibleProduct || null);
  }, [product, favoriteProduct])

  function handleAddToFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product as Product).then(() => {
        toast.success(
          existingProduct ? "Product removed from wishlist" : "Product added to wishlist"
        )
      })
    }

  }


  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button aria-label="Add to wishlist"
        onClick={handleAddToFavorite}
        className={`p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect ${existingProduct ? 'bg-shop_dark_green/70 text-white' : 'bg-white text-shop_dark_green'}`}>
        <Heart
          size={15}

        />
      </button>
    </div>
  )
}

export default AddbuttonWishlist
