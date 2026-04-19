import { getDealProducts } from '@/sanity/queries'
import Container from '@/components/Container'
import { Title } from '@/components/Text';
import ProductCard from '@/components/ProductCard';
import {  DEAL_PRODUCT_QUERY_RESULT } from '@/sanity.types';

async function DealPage() {
    const dealProduct: DEAL_PRODUCT_QUERY_RESULT = await getDealProducts();
    
  return (
    <div className='py-10 bg-shop_light_bg'>
      <Container>
        <Title className='mb-5 underline underline-offset-4 decoration-1 text-base md:text-base uppercase tracking-wide'>Hot Deals of the week</Title>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
            {dealProduct.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </Container>
    </div>
  )
}

export default DealPage
