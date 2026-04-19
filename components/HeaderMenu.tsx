"use client"
import Link from 'next/link'
import { menuItems } from '@/constants/data'
import { usePathname } from 'next/navigation';

function HeaderMenu() {
    const pathName = usePathname();
  return (
    <div className='hidden lg:inline-flex w-1/3 gap-7 items-center text-md capitalize font-semibold text-lightColor'>
     {
        menuItems?.map((item,index) => (
          <Link key={index} href={item.href} className={`text-gray-700 hover:text-shop_light_green hoverEffect relative group  ${pathName === item.href && "text-shop_light_green" }`}>
            {item.label}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-shop_light_green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300  ${pathName === item.href && "scale-x-100" } `}></span>
          </Link>
        ))
     }
    </div>
  )
}

export default HeaderMenu
