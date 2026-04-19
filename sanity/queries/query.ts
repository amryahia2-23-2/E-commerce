import { defineQuery } from 'next-sanity';




const BRANDS_QUERY = defineQuery(`*[_type== 'brand'] | order(name asc)`);

const LATEST_BLOG_QUERY = defineQuery(
    ` *[_type == "blogType" && islatest == true]
        | order(publishedAt desc)[0...5] {
            title,
            slug,
            mainImage,
            publishedAt,
            blogCategories[]->{
            title
            }
        }`
    
);

const  ALL_BLOGS_QUERY = defineQuery(
    `*[_type == "blogType"] | order(publishedAt desc) {
    ..., 
    blogCategories[]->{
        title  
    }
    }
`
);

const SINGLE_BLOG_QUERY = defineQuery(
    `*[_type == "blogType" && slug.current == $slug] | order(publishedAt desc)[0]{
    ...,
    author->{
        name,
        image
    },
    blogCategories[]->{
        title,
        "slug": slug.current
        }}`
);
const BLOG_CATEGORIES_QUERY = defineQuery(`*[_type == "blogType"]{
    blogCategories[]->{
    ...
    }
    }`

);
const BLOG_OTHER_CATEGORIES_QUERY = defineQuery(`*[
    _type == "blogType" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc)[0...$quantity] {
    ...,
    publishedAt,
    title,
    mainImage,
    slug,
    author->{
    name,
    image
},
categories[]->{
title,
"slug": slug.current
}
}`
);
const DEAL_PRODUCT_QUERY = defineQuery(
    `*[_type == "product" && "hot" in status]
| order(name asc){
    ...,
    "category": category->{
    _id,
    name},
    
    }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ...,"category": category->name,
    
    }`
);
const BRAND_PRODUCT_DETAILS_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug][0]{
    "brandName" : brand->title,
    
    }`
);
 const ORDERS_BY_USER_QUERY = defineQuery(`
*[_type == "order" && clerkUserId == $userId && isHidden != true]
| order(orderDate desc) {
  ...,
  products[]{
    _key,
    quantity,
    product->{
      _id,
      _type,
      name,
      slug,
      description,
      images,
      price,
      discount,
      status,
      stock
    }
  }
}
`);


    
    const SEARCH_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product" && name match $searchTerm + "*"] | order(name asc) [0...10] {
        _id,
        name,
        slug,
        price,
        images,
        "category": category->name
    }`
    );  



export {
    BRANDS_QUERY,
    LATEST_BLOG_QUERY,
    DEAL_PRODUCT_QUERY,
    PRODUCT_BY_SLUG_QUERY,
    BRAND_PRODUCT_DETAILS_QUERY,
    ORDERS_BY_USER_QUERY,
    ALL_BLOGS_QUERY,
    SINGLE_BLOG_QUERY,
    BLOG_CATEGORIES_QUERY,
    BLOG_OTHER_CATEGORIES_QUERY,
    SEARCH_PRODUCTS_QUERY

};