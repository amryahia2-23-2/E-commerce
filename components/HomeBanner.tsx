
import { Title }from './Text'
import Link  from 'next/link'
import { banner_1 } from '@/assests'
import Image from 'next/image'


function HomeBanner() {
    return (
        <div className='py-16 md:py-0 bg-shop_light_pink rounded-lg lg:px-24 px-10  flex items-center justify-between'>
        <div>
            <Title>
                Grab Upto %50 off on <br />
                Selected Headphone
            </Title>
            <Link href="/shop" className='bg-shop_dark_green text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-shop_light_green hoverEffect'>
                Shop Now
            </Link>
        </div>
        <div>
            <Image src={banner_1} alt="Banner Image" className='hidden md:inline-flex  w-72  h-72 object-cover' />
        </div>
        </div>
    )
}

export default HomeBanner
