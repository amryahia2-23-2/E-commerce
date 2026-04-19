import { Brand } from '@/sanity.types'
import React from 'react'
import { Title } from '../Text';
import { RadioGroupItem ,RadioGroup } from '../ui/radio-group';
import { Label } from '../ui/label';
import { BRANDS_QUERY_RESULT} from "@/sanity.types"

interface Props {
    brands: BRANDS_QUERY_RESULT;
    selectedBrand?: string | null;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

function BrandsList({ brands, selectedBrand, setSelectedBrand }: Props) {
  return (
    <div className='w-full bg-white'>
      <Title className='text-base md:text-base font-black mb-3'>
        Brands
      </Title>
      <RadioGroup value={selectedBrand || ""} className='mt-2 space-y-1'>
        {brands?.map((brand) => (
            <div  
            onClick={() =>  setSelectedBrand(brand?.slug?.current as string)}
            key={brand?._id}  className='flex items-center gap-2'>
                    <RadioGroupItem  value={brand?.slug?.current as string} id={brand?.slug?.current} className='rounded-sm' />
                    <Label 
                    htmlFor={brand?.slug?.current as string} 
                    className={`${selectedBrand === brand?.slug?.current ? 'font-semibold text-shop_dark_green' : 'font-normal'}`}
                    >{brand?.title}</Label>
            </div>
        ))}
        {selectedBrand && (
            <button 
            onClick={() => setSelectedBrand(null)}
            className='text-shop_btn-dark_green 
            underline underline-offset-2 text-sm mt-2 
            font-medium hover:text-red-500 hoverEffect'>
            Reset selection</button>
        )}
      </RadioGroup>
    </div>
  )
 
}

export default BrandsList
