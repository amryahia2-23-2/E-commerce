import ImageVeiw from '@/components/ImageVeiw';
import { getProductDetails } from '@/sanity/queries'
import Container from '@/components/Container';
import { StarIcon, GitCompareArrows, CircleQuestionMark, Truck, Share2, CornerDownLeft } from 'lucide-react';
import PriceVeiw from '@/components/PriceVeiw';
import AddToCartBUtton from '@/components/AddToCartBUtton';
import FavoriteButton from '@/components/FavoriteButton';
import ProductCharacteristics from '@/components/ProductCharacteristics';
import { PRODUCT_BY_SLUG_QUERY_RESULT } from '@/sanity.types';
;








async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
  const productDetails: PRODUCT_BY_SLUG_QUERY_RESULT | null = await getProductDetails(slug);

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  const isStock = (productDetails?.stock ?? 0) > 0;

  return (
    <Container className='flex flex-col md:flex-row gap-10 py-10'>

      {productDetails?.images && <ImageVeiw images={productDetails?.images} isStock={isStock} />}
      <div className='w-full md:w-1/2 flex flex-col gap-5'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold'>{productDetails?.name}</h2>
          <p className='text-sm text-gray-600 tracking-wide'>
            {productDetails?.description}
          </p>
          <div className='flex items-center gap-0.5'>
            {[...Array(5)].map((_, index) => (
              <StarIcon size={12} key={index} className={
                index < 4 ? "text-[#FAE251]" : "text-[#FFF799]"
              }
                fill={index < 4 ? "#FAE251" : "#FFF799"}
              />
            ))}
          </div>
          {productDetails?.Reviews && <p>{(productDetails?.Reviews?.length)} reviews</p>}
        </div>
        <div className='space-y-2 border-t border-b border-gray-200 py-5'>
          <PriceVeiw
            price={productDetails?.price}
            discount={productDetails?.discount}
            className="text-lg font-bold"
          />
          <p className={`px-4 py-1.5 text-sm text-center inline-block
              font-semibold rounded-lg  
              ${productDetails?.stock === 0 ?
              "bg-red-100 text-red-600" :
              "text-green-600 bg-green-100"}`}>
            {(isStock ? "In stock" : "Out of stock")}</p>
        </div>
        <div className='flex items-center gap-2.5 lg:gap-5'>
          <AddToCartBUtton product={productDetails} />
          <FavoriteButton showProduct={true} product={productDetails} />
        </div>
        <ProductCharacteristics product={productDetails} />
        <div className='flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2'>
          <div className='flex items-center gap-2 text-sm text-black/70 hover:text-red-600 hoverEffect'>
            <GitCompareArrows className="text-lg" />
            <p>Compare Color</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black/70 hover:text-red-600 hoverEffect'>
            <CircleQuestionMark className="text-lg" />
            <p>Ask a question</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black/70 hover:text-red-600 hoverEffect'>
            <Truck className="text-lg" />
            <p>Delivery & Return</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-black/70 hover:text-red-600 hoverEffect'>
            <Share2 className="text-lg" />
            <p>Share Product</p>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='border border-lightColor/25 border-b-0 p-3 flex items-center gap-3.5'>
            <Truck size={30} className='text-shop_orange ' />
            <div>
              <p className='text-base font-semibold text-black'>
                Free Delivery
              </p>
              <p className='text-sm text-gray-500 underline underline-offset-2'>
                Enter Your Postal code for Delivery Avaliability
              </p>
            </div>
          </div>
          <div className='border border-lightColor/25 p-3 flex items-center gap-3.5'>
            <CornerDownLeft size={30} className='text-shop_orange' />
            <div>
              <p className='text-base font-semibold text-black'>
                Return Delivery
              </p>
              <p className='text-sm text-gray-500'>
                Free 30days Delivery Returns.<span className='underline underline-offset-2'>Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetailsPage
