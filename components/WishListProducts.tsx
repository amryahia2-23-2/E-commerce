"use client"

import useStore from "@/store"
import Container from "./Container"
import { useState } from "react"
import WishListEmpty from "./WishListEmpty"
import { X } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import PriceFormater from "./PriceFormater"
import AddToCartBUtton from "./AddToCartBUtton"
import { Button } from "./ui/button"
import RemoveModal from "./RemoveModal"
import { Product } from "@/sanity.types"



function WishListProducts() {
    const [visibleProducts, setVisibleProducts] = useState(7)
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
    console.log(favoriteProduct)

    function loadMoreProducts() {
        setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length))
    }

    function loadLessProducts() {
        setVisibleProducts((prev) => Math.min(prev - 5, favoriteProduct.length))
    }

    return (
        <Container className="py-16">
            {favoriteProduct?.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left">Image</th>
                                    <th className="p-2 text-left hidden md:table-cell">Category</th>
                                    <th className="p-2 text-left hidden md:table-cell">Status</th>
                                    <th className="p-2 text-left">Price</th>
                                    <th className="p-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product) => (
                                    <tr key={product?._id} className="border-b">
                                        <td className="px-2 py-4 flex items-center gap-5">
                                            <X
                                                onClick={() => {
                                                    removeFromFavorite(product?._id)
                                                    toast.success("Product removed from wishList")

                                                }}
                                                size={18}
                                                className="hover:text-red-600 cursor-pointer hoverEffect"
                                            />
                                            {product?.images && (
                                                <Link
                                                    href={`/product/${product?.slug?.current}`}
                                                    className="border rounded-md group hidden md:inline-flex"
                                                >
                                                    <Image
                                                        src={urlFor(product?.images[0]).url()}
                                                        alt="productImage"
                                                        width={80}
                                                        height={80}
                                                        className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                                                    />
                                                </Link>
                                            )}
                                            <p className="line-clamp-1">{product?.name}</p>
                                        </td>
                                        <td className="p-2 hidden md:table-cell w-24">
                                            {product?.category && (
                                                <p className="uppercase text-xs font-medium line-clamp-1">{typeof product.category === "string" ? product.category : product.category.name}</p>
                                            )}
                                        </td>
                                        <td className="p-2 capitalize hidden md:table-cell">
                                            {(product?.stock as number) > 0 ? (
                                                <p className="text-sm font-semibold text-shop_light_green">In stock</p>
                                            ) : (
                                                <p className="text-xs font-semibold text-red-500">Unavaible</p>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <PriceFormater amount={product?.price} />
                                        </td>
                                        <td className="py-2 px-5">
                                            <AddToCartBUtton product={product} className="w-full" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-3 justify-center">
                        {visibleProducts < favoriteProduct?.length && (
                            <div className="my-5">
                                <Button variant={"outline"} onClick={loadMoreProducts}>
                                    Load More
                                </Button>
                            </div>
                        )}
                        {visibleProducts > 7 && (
                            <div className="my-5">
                                <Button variant={"outline"} onClick={loadLessProducts}>
                                    Load Less
                                </Button>
                            </div>
                        )}
                    </div>
                    {favoriteProduct?.length > 0 && (
                        <RemoveModal
                            title={"Reset WishList"}
                            Body={"WishList"}
                            btnText={"Yes, reset"} action={resetFavorite}
                            className="p-3 mt-4 text-md font-semibold border bg-gray-50 text-black 
                hover:border-shop_dark_green hover:text-shop_dark_green hover:bg-green-50 hoverEffect"/>
                    )}
                </>
            ) : (
                <WishListEmpty />
            )}
        </Container>

    )
}

export default WishListProducts
