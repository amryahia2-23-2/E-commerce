import Shop from '@/components/Shop';
import { getAllBrands, getCategories } from '@/sanity/queries'
import { BRANDS_QUERY_RESULT } from '@/sanity.types';

async function  ShopPage() {
    const categories = await getCategories();
    const brands: BRANDS_QUERY_RESULT = await getAllBrands();





  return (
    <div>
      <Shop  categories={categories} brands={brands} />
    </div>
  )
}

export default  ShopPage
