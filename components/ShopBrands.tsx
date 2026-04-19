import React from 'react'
import{ Title }from './Text'
import Link from 'next/link'
import { getAllBrands } from '../sanity/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { infoData } from '@/constants/data'
import { BRANDS_QUERY_RESULT } from '@/sanity.types'

export default async function ShopBrands() {
  const brands: BRANDS_QUERY_RESULT = await getAllBrands();

  return (
    <div className='mb-10 lg:pb-10 bg-shop_light_bg p-5  rounded-md overflow-hidden'>
      <div className='flex items-center gap-5 justify-between mb-10'>
        <Title className='text-sm md:text-medium mb-0'>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className='text-sm font-semibold tracking-wide hover:text-shop_btn-dark_green hoverEffect'
        >
          View All
        </Link>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 animate-marquee w-max">
          {[...brands, ...brands].map((brand, index) => (
            <Link
              key={index}
              href={{pathname: "/shop", query: { brand: brand?.slug?.current }}}
              className='bg-white w-20 h-20 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg hover:shadow-shop_btn-dark_green/20 hoverEffect'
            >
              {brand?.image && (
                <Image
                  src={urlFor(brand?.image).url()}
                  alt="brand image"
                  width={250}
                  height={250}
                  className="w-16 object-contain"
                />
              )}
            </Link>
          ))}
        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-5 mt-16 p-2 shadow-sm shadow-shop_light_green/20 py-5'>
          {infoData?.map((item, index) =>( 
            <div key={index} className='flex items-center gap-3 group text-lightColor hover:text-shop_light_green'>
              <span className='inline-flex scale-100 group-hover:scale-90 hoverEffect'>
                {item?.icon}
              </span>
              <div className='text-sm'>
                <p className='text-darkColor/80 font-bold capitalize'>
                  {item?.title}
                </p>
                <p className='text-lightColor'>{item?.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

