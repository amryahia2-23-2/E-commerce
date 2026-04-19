import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import HomeCategories from '@/components/HomeCategories'
import LatestBlog from '@/components/LatestBlog'
import ProductGrid from '@/components/ProductGrid'
import ShopBrands from '@/components/ShopBrands'
import { getCategories } from '@/sanity/queries'
import React from 'react'

async function Home() {
  const categories = await getCategories(6)
  
  return (
    <Container className="py-4">
        <HomeBanner />
        <ProductGrid />
        <HomeCategories categories={categories}/>
        <ShopBrands/>
        <LatestBlog/>
    </Container>
  )
}

export default Home
