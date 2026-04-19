import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'

function Logo({className,spanDesign}: {className?: string , spanDesign?: string}) {
    return (
    <Link href="/" className="inline-flex">
        <h2 className={cn("text-2xl text-shop_dark_green font-black tracking-wider uppercase hover:text-shop_light_green hoverEffect group font-sans", className)}>
            <span className={cn("text-shop_light_green group-hover:text-shop_dark_green hoverEffect",spanDesign)}>F</span>reshCart
        </h2>
        </Link>
    )
}

export default Logo
