"use client"
import { Category, BRANDS_QUERY_RESULT, Product, DEAL_PRODUCT_QUERY_RESULT } from '@/sanity.types'
import Container from './Container';
import { Title } from './Text';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryList from './shop/CategoryList';
import BrandsList from './shop/BrandsList';
import PriceList from './shop/PriceList';
import { client } from '@/sanity/lib/client';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import NoProductAvaliable from './NoProductAvaliable';



interface Props {
    categories: Category[];
    brands: BRANDS_QUERY_RESULT;
}




function Shop({ categories, brands }: Props) {

    const searchParams = useSearchParams();
    const brandParams = searchParams?.get("brand");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null)
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

    async function getProducts() {
        setLoading(true);
        try {
            let minPrice = 0;
            let maxPrice = 100000;
            if (selectedPrice) {
                const [min, max] = selectedPrice.split("-").map(Number);
                minPrice = min;
                maxPrice = max;
            }
            const query = `
            *[_type == "product"
                && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
                && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
                && price >= $minPrice
                && price <= $maxPrice
                ] | order(name asc) {
                ...,
                "category": category->name
                }
            
            `;
            const data: Product[] = await client.fetch(query, {
                selectedCategory,
                selectedBrand,
                minPrice,
                maxPrice
            }, { next: { revalidate: 0 } })
            setProducts(data);
        } catch (error) {
            console.log("Error fetching Filtered Products", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts()
    }, [selectedBrand, selectedCategory, selectedPrice])

    return (
        <div className='border-t'>
            <Container className='mt-5'>
                <div className='sticky top-0 z-10 mb-5'>
                    <div className='flex items-center justify-between'>
                        <Title className='text-lg md:text-lg uppercase tracking-wide mb-0'>Get the product as your needs</Title>
                        {(selectedCategory !== null ||
                            selectedBrand !== null ||
                            selectedPrice !== null) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedBrand(null);
                                        setSelectedPrice(null);
                                    }}
                                    className='text-shop_btn-dark_green underline 
                            underline-offset-2 text-sm mt-2 
                            font-medium hover:text-red-500 hoverEffect'
                                >
                                    Reset Filters
                                </button>
                            )}
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50'>
                    <div className='md:sticky flex flex-col gap-4 pt-4 md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto no-scrollbar md:min-w-64 pb-5 md:border-r border-r-shop_btn-dark_green/50'>
                        <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        <BrandsList brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                        <PriceList selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
                    </div>
                    <div className='flex-1 pt-5'>
                        <div className='h-[calc(100vh-160px)] overflow-y-auto pr-2 no-scrollbar'>
                            {loading ? (
                                <div className='p-20 flex flex-col gap-2 items-center justify-between bg-white'>
                                    <Loader2 className='w-10 h-10 text-shop_dark_green animate-spin' />
                                    <p className='font-semibold tracking-wide text-base'>Product is loading...</p>
                                </div>
                            ) : (
                                <div>
                                    {products?.length > 0 ? (
                                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5'>
                                            {products.map((product) => (
                                                <ProductCard key={product._id} product={product} />
                                            ))
                                            }
                                        </div>
                                    ) : (
                                        <NoProductAvaliable className='bg-white mt-0' />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Shop
