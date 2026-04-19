"use client"
import { ShoppingBagIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import useStore from '@/store';
import toast from 'react-hot-toast';
import PriceFormater from './PriceFormater';
import QuantityButton from './QuantityButton';
import { Product } from '@/sanity.types';


interface Props {
  product: Product;
  className?: string;
}

function AddToCartBUtton({ product, className }: Props) {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  function handleAddToCart() {
    if ((product.stock as number) > itemCount) {
      addItem(product)
      toast.success(`${product.name?.substring(0, 10)}... added successfully`)
    } else {
      toast.error("Cannot add more than available stock")
    }
  }
  return (
    <div className='flex-1'>
      {itemCount ? (
        <div className='text-sm w-full'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-darkColor/60'>Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className='flex items-center justify-between border-t pt-1'>
            <span>
              Subtotal
            </span>
            <PriceFormater amount={product?.price ? product?.price * itemCount : 0} />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className=
          {cn(` bg-shop_dark_green/80 
          w-full text-white 
          shadow-none border 
          border-shop_dark_green/80 
          font-semibold tracking-wide 
          hover:text-white 
          hover:bg-shop_dark_green 
          hover:border-shop_dark_green 
          hoverEffect` , className)}>
          <ShoppingBagIcon /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  )
}

export default AddToCartBUtton
