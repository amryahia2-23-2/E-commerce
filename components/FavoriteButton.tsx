"use client"
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Product, PRODUCT_BY_SLUG_QUERY_RESULT } from '@/sanity.types'
import useStore from '@/store'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface Props {
  product?: Product | PRODUCT_BY_SLUG_QUERY_RESULT,
  showProduct?: boolean,
  className?: string,
}




function FavoriteButton({ product, showProduct = false, className }: Props) {

  const { addToFavorite, favoriteProduct } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);


  useEffect(() => {
    const avalibleProduct = favoriteProduct.find((item) => item._id === product?._id);
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
    <>
      {!showProduct ? (
        <Link href='/wishlist' className={cn('w-10 h-10 rounded-full bg-gray-100  items-center justify-center hover:bg-gray-200 hoverEffect relative', className)}>
          <Heart className='w-5 h-5 hover:text-shop_light_green hoverEffect' />
          <span className='absolute top-0 right-0 bg-shop_dark_green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
            {favoriteProduct.length ? favoriteProduct.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleAddToFavorite}
          className={`group relative hover:text-shop_light_green 
    hoverEffect border border-shop_light_green/80 
    hover:border-shop_light_green p-1.5 rounded-sm`}>
          {existingProduct ? (
            <Heart fill='#3b9c3c' className='w-5 h-5 text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect' />
          ) : (
            <Heart className='w-5 h-5 text-shop_light-green/80 group-hover:text-shop_light_green hoverEffect' />
          )}
        </button>

      )}
    </>
  )
}

export default FavoriteButton
