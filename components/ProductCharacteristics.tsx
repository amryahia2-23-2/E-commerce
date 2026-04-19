
import { getProductDetailsBrand } from '@/sanity/queries'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { PRODUCT_BY_SLUG_QUERY_RESULT , BRAND_PRODUCT_DETAILS_QUERY_RESULT} from "@/sanity.types"

type Props ={
    product: PRODUCT_BY_SLUG_QUERY_RESULT;
}

async function ProductCharacteristics( {product} : Props) {
  
  const brand: BRAND_PRODUCT_DETAILS_QUERY_RESULT = await getProductDetailsBrand(product?.slug?.current as string)
  console.log("product brand",brand)
  
  
    return (
    <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
            <AccordionTrigger>
                {product?.name}: Characteristics 
            </AccordionTrigger>
            <AccordionContent>
                <p className='flex items-center justify-between'>Brand : {brand && <span className='font-semibold tracking-wide'>{brand?.brandName}</span>}</p>
                <p className='flex items-center justify-between'>Collection :{" "} <span className='font-semibold tracking-wide'>2026</span></p>
                <p className='flex items-center justify-between'>Type :{" "} <span className='font-semibold tracking-wide'>{product?.category}</span></p>
                <p className='flex items-center justify-between'>Stock :{" "} <span className='font-semibold tracking-wide'>{product?.stock ? "Avaliable" : "Not Avaliable"}</span></p>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default ProductCharacteristics
