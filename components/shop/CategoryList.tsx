import { Category } from '@/sanity.types'
import React from 'react'
import { Title } from '../Text';

import { RadioGroup, RadioGroupItem  } from '../ui/radio-group';
import { Label } from '../ui/label';



interface Props {
    categories : Category[];
    selectedCategory?: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

function CategoryList({categories , selectedCategory , setSelectedCategory} : Props) {
  return (
    <div className='w-full bg-white'>
      <Title className='text-base md:text-base font-black mb-3'>
        Product Categoties
      </Title>
      <RadioGroup value={selectedCategory || ""} className='mt-2 space-y-1'>
        {categories?.map((category) => (
            <div  
            onClick={() =>  setSelectedCategory(category?.slug?.current as string)}
            key={category?._id}  className='flex items-center gap-2'>
                    <RadioGroupItem  value={category?.slug?.current as string} id={category?.slug?.current} className='rounded-sm' />
                    <Label 
                    htmlFor={category?.slug?.current as string} 
                    className={`${selectedCategory === category?.slug?.current ? 'font-semibold text-shop_dark_green' : 'font-normal'}`}
                    >{category?.name}</Label>
            </div>
        ))}
        {selectedCategory && (
            <button 
            onClick={() => setSelectedCategory(null)}
            className='text-shop_btn-dark_green 
            underline underline-offset-2 text-sm mt-2 
            font-medium hover:text-red-500 hoverEffect text-left'>
            Reset selection</button>
        )}
      </RadioGroup>
    </div>
  )
}

export default CategoryList
