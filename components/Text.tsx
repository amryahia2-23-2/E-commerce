import React from 'react'
import { cn } from '@/lib/utils'

function Title({children , className}: {children: React.ReactNode, className?: string}) {
  return (
    <h2 className={cn(
      "text-2xl md:text-3xl font-bold font-sans text-shop_dark_green capitalize tracking-wide mb-5",
      className
    )}>
      {children}    
    </h2>
  )
}

function SubTitle({children , className}: {children: React.ReactNode, className?: string}) {
  return (
    <h3 className={cn(
      "text-xl md:text-2xl font-semibold font-sans text-gray-900 capitalize tracking-wide mb-3",
      className
    )}>
      {children}    
    </h3>
  )
}


function SubText({children , className}: {children: React.ReactNode, className?: string}) {
  return (
    <p className={cn(  
  "text-gray-600 text-sm",
      className
    )}>
      {children}    
    </p>
  )
}

export { Title, SubTitle, SubText }