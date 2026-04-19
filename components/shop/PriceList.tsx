
import React from 'react'
import { Title } from '../Text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';




const priceArray = [
    {title: "Under 100" , value: "0-100"},
    {title: "100-200" , value: "100-200"},
    {title: "200-300" , value: "200-300"},
    {title: "300-400" , value: "300-400"},
    {title: "400-500" , value: "400-500"},
    {title: "Over 500" , value: "500-30000"},
]

interface Props{
    selectedPrice: string | null;
    setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}



function PriceList({selectedPrice, setSelectedPrice}: Props) {
  return (
    <div className='w-full bg-white'>
      <Title className='text-base md:text-base font-black mb-3'>
        Price
      </Title>
      <RadioGroup value={selectedPrice || ""} className='mt-2 space-y-1'>
        {priceArray?.map((price , index) => (
            <div  
            onClick={() =>  setSelectedPrice(price?.value as string)}
            key={index}  className='flex items-center gap-2'>
                    <RadioGroupItem  value={price?.value as string} id={price.value as string} className='rounded-sm' />
                    <Label 
                    htmlFor={price?.value as string} 
                    className={`${selectedPrice === price?.value ? 'font-semibold text-shop_dark_green' : 'font-normal'}`}
                    >{price?.title}</Label>
            </div>
        ))} 
        {selectedPrice && (
            <button 
            onClick={() => setSelectedPrice(null)}
            className='text-shop_btn-dark_green 
            underline underline-offset-2 text-sm mt-2 
            font-medium hover:text-red-500 hoverEffect text-left'>
            Reset selection</button>
        )}
      </RadioGroup>
    </div>
  )
}

export default PriceList
