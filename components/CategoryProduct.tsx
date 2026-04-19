"use client"
import { Category, Product } from '@/sanity.types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { client } from '@/sanity/lib/client';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import NoProductAvaliable from './NoProductAvaliable';
import { AnimatePresence } from 'motion/react';
import { motion } from 'framer-motion';



interface CategoryProductProps {
  categories: Category[];
  slug: string;
}


function CategoryProduct({ categories, slug }: CategoryProductProps) {
  const [currentSlug, setCurrentSlug] = useState<string>(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function handleCategoryChange(newSlug: string) {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false })
  }

  async function getProductByCategory(categorySlug: string) {
    setLoading(true);
    try {
      const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"category": category->name}`;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data)
    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductByCategory(currentSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])


  return (
    <div className='py-5 flex flex-col md:flex-row items-start gap-5'>
      <div className='flex flex-col w-full md:w-45 shadow-md px-3 py-6 rounded-md gap-3 border'>
        {categories?.map((category) => (
          <Button key={category?._id}
            onClick={() => handleCategoryChange(category?.slug?.current as string)}
            className={`bg-transparent border-0 p-0 
            rounded-md text-darkColor shadow-none 
            hover:bg-shop_light_green hover:text-white font-semibold 
            hoverEffect capitalize ${category?.slug?.current === currentSlug ? 'bg-shop_light_green text-white' : ''}`}>
            <p className='w-full text-left px-2'>{category?.name}</p>
          </Button>
        ))}
      </div>
      <div className='flex-1'>
        {loading ? (
          <div className='flex flex-col items-center justify-center py-10 min-h-80 sapce-y-4 text-center bg-gray-100 rounded-lg w-full'>
            <div className='flex items-center sapce-x-2 text-blue-600'>
              <Loader2 className='w-10 h-10 animate-spin' />
              <span>Product is Loading</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products?.map((product) => (
              <AnimatePresence key={product?._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvaliable selectedTab={currentSlug} />
        )}
      </div>
    </div>
  )
}

export default CategoryProduct

