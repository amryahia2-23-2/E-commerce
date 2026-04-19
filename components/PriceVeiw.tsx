import React from 'react'
import PriceFormater from './PriceFormater';
import { cn } from '@/lib/utils';


interface PriceVeiwProps {
    price?: number;
    discount?: number | undefined;
    className?: string;
}


function PriceVeiw({
    price,
    discount,
    className
}: PriceVeiwProps) {
  return (
    <div className="flex items-center gap-2">
            <PriceFormater amount={price} className={cn(`text-shop_dark_green` , className)} />
            {price && discount && (
                <PriceFormater amount={price + (discount + price) / 100} className={cn(`font-normal text-shop_light_green line-through` , className)} />
            )}
    </div>
  )
}

export default PriceVeiw
