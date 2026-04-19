"use client"

import useStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import{ cn }from  "@/lib/utils"


function CartIcon({className}: {className?: string}) {
  const { items } = useStore()
  return (
    <Link href='/cart' className={cn('w-10 h-10 rounded-full bg-gray-100  items-center justify-center hover:bg-gray-200 hoverEffect relative', className)}>
        <ShoppingBag className='w-5 h-5 hover:text-shop_light_green hoverEffect' />
        <span className='absolute top-0 right-0 bg-shop_dark_green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
          {items.length ? items.length : '0'}
        </span>
    </Link>
  )
}

export default CartIcon
