import {  Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { Flame, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import { Title } from './Text';
import AddbuttonWishlist from './AddbuttonWishlist';
import PriceVeiw from './PriceVeiw';
import AddToCartBUtton from './AddToCartBUtton';


function ProductCard({
    product
}: {
    product: Product;
}) {
    return (
        <div className='text-sm border rounded-md group overflow-hidden'>
            <div className="relative group overflow-hidden bg-white">
                {product?.images && (
                    <Link href={`/product/${product?.slug?.current}`}>
                        <Image
                            src={urlFor(product.images[0]).url()}
                            loading="lazy"
                            alt="Product Image"
                            width={300} height={300}
                            className={`w-full px-7 py-4 h-56 object-contain overflow-hidden transition-transform duration-500 ${product?.stock !== 0 ? "group-hover:scale-105" : "grayscale"}`}
                        />
                    </Link>
                )}
                {product?.status?.includes("sale") && (
                    <div className="absolute top-2 left-2  text-xs font-bold px-2 py-1 rounded-full border border-darkColor/50 group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
                        {product.discount}% OFF
                    </div>)}
                {product?.status?.includes("new") && (
                    <div className="absolute top-2 left-2  text-xs font-bold px-2 py-1 rounded-full border border-darkColor/50 group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
                        NEW
                    </div>)}
                {product?.status?.includes("hot") && (
                    <Link href={"/deal"} className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-2 rounded-full border border-darkColor/50 group-hover:border-shop_orange hoverEffect">
                        <Flame
                            size={20}
                            fill='#fb6c08'
                            className='text-shop_orange/50 group-hover:text-shop_orange hoverEffect'
                        />
                    </Link>)}
                <AddbuttonWishlist product={product} />
            </div>
            <div className='flex flex-col gap-2 p-4 border border-t'>
                {product?.category && (
                    <p className='uppercase line-clamp-1 text-xs text-gray-400'>{product?.category.name}</p>

                )}
                <Title className='text-sm md:text-sm mb-0 line-clamp-1'>{product?.name}</Title>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center'>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon size={12} key={index} className={
                                index < 4 ? "text-[#FAE251]" : "text-[#FFF799]"
                            }
                                fill={index < 4 ? "#FAE251" : "#FFF799"}
                            />
                        ))}
                    </div>
                    <p className='text-xs font-bold text-gray-300'>{product?.Reviews?.length || 0} Reviews</p>

                </div>
                <div className='flex items-center gap-2.5'>
                    <p className='font-medium'>In stock</p>
                    <p className={` font-semibold ${product?.stock === 0 ? 'text-red-500' : "text-shop_light_green"}`}>{(product?.stock as number) > 0 ? product?.stock : 'unavailable'} </p>
                </div>
                <PriceVeiw
                    price={product?.price}
                    discount={product?.discount}
                    className='text-sm'
                />
                <AddToCartBUtton product={product} className={'w-36 rounded-full'} />
            </div>
        </div>
    )
}

export default ProductCard
