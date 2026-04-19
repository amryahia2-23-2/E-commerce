import { type SchemaTypeDefinition } from 'sanity'
import { CategoryType } from './CategoryType'
import { AddressType } from './addressType'
import { AuthorType } from './authorType'
import { BlockCategory } from './blockCategory'
import { BlogType } from './blogType'
import { orderType } from './orderType'
import { BrandType } from './brandType'
import { ProductType } from './productType'
import { BlockContentType } from './blockContentType'
import { ReviewType } from './reviewType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
        CategoryType ,
        AddressType,
        AuthorType,
        BlockCategory,
        BlogType,
        orderType,
        BrandType,
        ProductType,
        BlockContentType,
        ReviewType,

  ],
}
