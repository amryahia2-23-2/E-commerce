import { Product, DEAL_PRODUCT_QUERY_RESULT, PRODUCT_BY_SLUG_QUERY_RESULT } from '@/sanity.types';
import useStore from '@/store';
import React from 'react'
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

type QuantityProductType = Product | DEAL_PRODUCT_QUERY_RESULT[number] | PRODUCT_BY_SLUG_QUERY_RESULT;

interface Props {
    product: QuantityProductType
    className?: string
}

function QuantityButton({ product, className }: Props) {
    const { addItem, removeItem, getItemCount } = useStore();
    const itemCount = getItemCount(product._id);
    const isOutOfStock = product.stock === 0;

    function handleRemoveProduct() {
        removeItem(product._id);
        if (itemCount > 1) {
            toast.success("Quantity decreased successfully")
        } else {
            toast.success(`${product.name?.substring(0, 10)} removed from cart`);
        }
    }

    function handleAddProduct() {
        if ((product?.stock as number) > itemCount) {
            addItem(product as Product);
            toast.success("Quantity increased successfully")
        } else {
            toast.error("Product is out of stock")
        }
    }

    return (
        <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
            <Button
                onClick={handleRemoveProduct}
                className="w-5 h-5 rounded-sm border hover:bg-shop_dark_green/20 hoverEffect"
                variant="outline" size="icon"
                disabled={itemCount === 0 || isOutOfStock}
            >
                <Minus />
            </Button>
            <span className="font-semibold text-sm w-6 text-center text-darkColor">{itemCount}</span>
            <Button
                onClick={handleAddProduct}
                className="w-6 h-6 border rounded-sm hover:bg-shop_dark_green/20 hoverEffect"
                variant="outline" size="icon"
                disabled={isOutOfStock}
            >
                <Plus />
            </Button>
        </div>
    )
}

export default QuantityButton
