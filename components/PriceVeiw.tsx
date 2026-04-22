import React from 'react'
import PriceFormater from './PriceFormater';
import { cn } from '@/lib/utils';


interface PriceVeiwProps {
  price?: number;
  discount?: number;
  className?: string;
}


function PriceVeiw({
  price,
  discount,
  className
}: PriceVeiwProps) {
  // Calculate the original price before discount
  const originalPrice = price && discount ? price / (1 - discount / 100) : undefined;

  return (
    <div className="flex items-center gap-2">
      <PriceFormater amount={price} className={cn(`text-shop_dark_green`, className)} />
      {originalPrice && (
        <PriceFormater amount={originalPrice} className={cn(`font-normal text-shop_light_green line-through`, className)} />
      )}
    </div>
  )
}

export default PriceVeiw
