
import { Title } from './Text'
import { Category } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

function HomeCategories({categories}: {
  categories: Category[];
}
) {
  return (
    <div className='bg-white border border-shop_light_green/20 my-10 md:my-30 p-5 lg:p-7 rounded-md'>
      <Title className='border-b pb-3'>Populer Categries</Title>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {categories?.map((cat) => (
          <div key={cat._id} className='bg-shop_light_bg p-5 flex items-center gap-3 group'>
            {cat?.image && (
              <div className='overflow-hidden w-20 h-20 p-1 border border-shop_orange/30 hover:border-shop_orange hoverEffect '>
                <Link href={`/category/${cat?.slug?.current}`}>
                <Image 
                  src={urlFor(cat?.image).url()}
                  alt="category image"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain  group-hover:scale-110 hoverEffect"
              />  
              </Link>
              </div>
              
            )}
            <div className='space-y-1'>
              <h3 className='text-base font-semibold'>{cat?.name}</h3>
              <p className='text-sm'>
                <span className='font-bold text-shop_dark_green'>{`(${cat?.productCount})`}</span>{" "}
                items Available
              </p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default HomeCategories
