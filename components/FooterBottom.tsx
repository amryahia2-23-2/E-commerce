
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { SubText, SubTitle } from './Text'
import { categoryData, quickLinksData } from '@/constants/data'
import Link from 'next/link'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

function FooterBottom() {
    return (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8 ">
        <div className="space-y-4">
            <Logo />
            <SubText>
                Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia  bgColor={"white"} fgColor={"#BFC9D1"} tooltipClassName={"bg-black text-white"} />
        </div>
        <div>
            <SubTitle>
                Quick Links
            </SubTitle>
            <ul className='space-y-3'>
            {quickLinksData.map((item , index) => (
                <li key={index} className='text-gray-600 font-medium hover:text-shop_dark_green hoverEffect cursor-pointer text-sm'>
                    <Link href={item.href}>
                        {item.label}
                    </Link>
                </li>
            ))}
                
            </ul>
        </div>
        <div>
            <SubTitle>
                Categories
            </SubTitle>
            <ul className='space-y-3'>
            {categoryData.map((item , index) => (
                <li key={index} className='text-gray-600 font-medium hover:text-shop_dark_green hoverEffect cursor-pointer text-sm'>
                    <Link href={item.href}>
                        {item.label}
                    </Link>
                </li>
            ))}
                
            </ul>
        </div>
        <div className='space-y-4'>
            <SubTitle>
                Newsletter
            </SubTitle>
            <SubText>
                Subscribe to our newsletter to receive updates and exclusive offers.
            </SubText>
            <form className='space-y-4'>
                <Input type="email" placeholder="Enter your email" className='w-full px-4 py-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-shop_dark_green focus:border-transparent text-md' required />
                <Button type="submit" className='w-full bg-shop_dark_green text-white py-6 rounded-md text-md font-medium hover:bg-shop_light_green hoverEffect'>
                    Subscribe
                </Button>
            </form>

        </div>
        </div>
    )
}

export default FooterBottom
