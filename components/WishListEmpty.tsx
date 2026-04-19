import { Heart } from 'lucide-react'

import { Button } from './ui/button'
import Link from 'next/link'

function WishListEmpty() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
      <div className="relative mb-4 ">
        <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20"/>
            <Heart
            className="h-12 w-12 text-muted-foreground"
            strokeWidth={1.5}
            />
        </div>
        <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
                Your wishlist is empty
            </h2>
            <p className="text-sm text-muted-foreground">
                Add some items to your wishlist to see them here
            </p>
        </div>
        <Button asChild className="p-5 bg-shop_dark_green/90 hover:bg-green-500">
            <Link href="/shop" className="font-semibold">Continue Shopping</Link>
        </Button>
    </div>
  )
}

export default WishListEmpty
