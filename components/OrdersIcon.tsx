"use client";

import { cn } from '@/lib/utils';
import { Order } from '@/sanity.types';


import { Logs } from 'lucide-react'
import Link from 'next/link'

function OrdersIcon({orders , userId , className}: {orders?: Order[] , userId?: string | null , className?: string}) {
    
  return (
    <Link href='/orders' className={cn(`w-10 h-10 rounded-full bg-gray-100  items-center justify-center hover:bg-gray-200 hoverEffect relative ${!userId && "hidden"}` , className)}>
        <Logs className='w-5 h-5 hover:text-shop_light_green hoverEffect' />
        <span className='absolute top-0 right-0 bg-shop_dark_green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
          {orders?.length ? orders.length : '0'}
        </span>
    </Link>
  )
}

export default OrdersIcon
