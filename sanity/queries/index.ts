
import { sanityFetch } from "../lib/live";
import { client } from "@/sanity/lib/client";
import {
    BRANDS_QUERY,
    ORDERS_BY_USER_QUERY,
    LATEST_BLOG_QUERY,
    DEAL_PRODUCT_QUERY,
    PRODUCT_BY_SLUG_QUERY,
    BRAND_PRODUCT_DETAILS_QUERY,
    ALL_BLOGS_QUERY,
    SINGLE_BLOG_QUERY,
    BLOG_CATEGORIES_QUERY,
    BLOG_OTHER_CATEGORIES_QUERY
} from "./query";

async function getCategories(quantity?: number) {
    try {
        const query = quantity
            ? `*[_type == "category"] | order(name asc) [0...$quantity] {
            ...,
            "productCount" : count(*[_type == "product" && references(^._id)])
        }`
            : `*[_type == "category"] | order(name asc) {
            ...,
            "productCount" : count(*[_type == "product" && references(^._id)])  
        }`;
        const { data } = await sanityFetch({
            query,
            params: quantity ? { quantity } : {}
        });
        return data;
    } catch (error) {
        console.log("Error fechting categories", error);
        return []
    };
};


async function getAllBrands() {
    try {
        const { data } = await sanityFetch({ query: BRANDS_QUERY });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching AllBrands", error);
        return []
    };
};
async function getLatestBlogs() {
    try {
        const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching LatestBlogs", error);
        return []
    };
};
async function getDealProducts() {
    try {
        const { data } = await sanityFetch({ query: DEAL_PRODUCT_QUERY });
        return data ?? [];

    } catch (error) {
        console.log("Error fetching products", error);
        return []
    };
};

async function getProductDetails(slug: string) {
  try {
    const data = await client.fetch(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { perspective: 'published' }
    );
    return data ?? null;
  } catch (error) {
    console.log("Error fetching productDetails", error);
    return null;
  }
}

async function getProductDetailsBrand(slug: string) {
    console.log("slug", slug);
    try {
        const { data } = await sanityFetch({
            query: BRAND_PRODUCT_DETAILS_QUERY,
            params: { slug }
        });
        return data ?? null;
    } catch (error) {
        console.log("Error fetching productDetailsBrand", error);
        return null;
    }
}

async function getOrdersByUser(userId: string) {
    try {
        const data = await client.fetch(
            ORDERS_BY_USER_QUERY,
            { userId },
            { cache: "no-store" }
        );
        return data ?? [];
    } catch (error) {
        console.log("Error fetching My Orders", error);
        return [];
    }
}
async function getAllBlogs(quantity: number) {
    try {
        const { data } = await sanityFetch({
            query: ALL_BLOGS_QUERY,
            params: { quantity }
        });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching All Blogs", error);
        return [];
    };
};
async function getSingleBlog(slug: string) {
    try {
        const { data } = await sanityFetch({
            query: SINGLE_BLOG_QUERY,
            params: { slug }
        });
        return data ?? null;
    } catch (error) {
        console.log("Error fetching Single Blog", error);
        return null;
    };
};

async function getBlogCategories() {
    try {
        const { data } = await sanityFetch({
            query: BLOG_CATEGORIES_QUERY
        });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching Blogs categories", error);
        return [];
    };
};

async function getBlogOtherCategories(slug: string, quantity: number) {
    try {
        const { data } = await sanityFetch({
            query: BLOG_OTHER_CATEGORIES_QUERY,
            params: { slug, quantity }
        });
        return data ?? [];
    } catch (error) {
        console.log("Error fetching Other Blogs", error);
        return [];
    }
}







export {
    getCategories,
    getAllBrands,
    getLatestBlogs,
    getDealProducts,
    getProductDetails,
    getProductDetailsBrand,
    getOrdersByUser,
    getAllBlogs,
    getSingleBlog,
    getBlogOtherCategories,
    getBlogCategories

}