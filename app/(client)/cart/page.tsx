"use client"

import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import { Address } from "@/sanity.types";
import useStore from "@/store"
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import EmptyCart from "@/components/EmptyCart";
import { Loader2, ShoppingBag, Trash } from "lucide-react";
import { Title } from "@/components/Text";
import Link from "next/link"
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AddbuttonWishlist from "@/components/AddbuttonWishlist";
import toast from "react-hot-toast";
import PriceFormater from "@/components/PriceFormater";
import QuantityButton from "@/components/QuantityButton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { createCheckOutSession } from "@/actions/CheckOutSession";
import RemoveModal from "@/components/RemoveModal";



function CartPage() {
    const { getTotalPrice, getItemCount, getSubTotalPrice, resetCart, deleteCartProduct } = useStore();
    const groupedItems = useStore((state) => state.getGroupedItems());
    const [loading, setLoading] = useState(false);
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [addresses, setAddresses] = useState<Address[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    function handleDeleteProduct(id: string) {
        if (id) {
            deleteCartProduct(id);
            toast.success("Product deleted from cart");
        } else {
            toast.error("Something went wrong");
        }

    }
    async function getAddresses() {
        setLoading(true);
        try {
            const query = `*[_type == "address"] | order(publishedAt desc)`
            const addresses = await client.fetch(query);

            setAddresses(addresses);
            const defaultAddress = addresses.find((address: Address) => address.isDefault);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            } else if (addresses.length > 0) {
                setSelectedAddress(addresses[0]);
            }

        } catch (error) {
            console.error("Address fetching error:", error);
            toast.error("Failed to load addresses");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (isSignedIn) {
            getAddresses();
        }
    }, [isSignedIn]);

    async function handleCheckout() {
        if (!selectedAddress) {
            toast.error("Please select a delivery address");
            return;
        }

        if (groupedItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setLoading(true);
        try {
            const metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName || "Guest User",
                customerEmail: user?.emailAddresses[0]?.emailAddress || "",
                clerkUserId: user?.id,
                address: selectedAddress,
            };

            const checkoutUrl = await createCheckOutSession(groupedItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                toast.error("Failed to create checkout session");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Failed to create checkout session");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-50 pb-52 md:pb-10">
            {isSignedIn ? (
                <Container>
                    {groupedItems?.length > 0 ? (
                        <>
                            <div className="flex items-center gap-2 py-5">
                                <ShoppingBag className="text-darkColor" />
                                <Title className="mb-0">Shopping Cart</Title>
                            </div>
                            <div className="grid lg:grid-cols-3 md:gap-5">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="bg-white border p-4 rounded-lg">
                                        {groupedItems?.map(({ product }) => {
                                            const itemCount = getItemCount(product._id);
                                            return (
                                                <div key={product?._id} className="border p-2.5 flex items-center justify-between gap-5 mb-3 rounded-lg shadow">
                                                    <div className="flex flex-1 items-start gap-2 h-36 md:h-44 ">
                                                        {product?.images &&
                                                            <Link href={`/product/${product?.slug?.current}`} className="border p-0.5 md:p-3 mr-2 rounded-md overflow-hidden group">
                                                                <Image
                                                                    src={urlFor(product?.images[0]).url()}
                                                                    alt="productImage"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                    className="w-32 h-32 md:w-40 md:h-36 object-contain group-hover:scale-105 hoverEffect"
                                                                />

                                                            </Link>
                                                        }
                                                        <div className="h-full flex flex-1 flex-col justify-between py-1">
                                                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                                <h2 className="txet-base font-semibold line-clamp-1">{product?.name}</h2>
                                                                <p className="text-sm capitalize">
                                                                    Category :{" "}
                                                                    <span className="font-semibold">
                                                                        {typeof product?.category === 'string'
                                                                            ? product?.category
                                                                            : product?.category?.name}
                                                                    </span>
                                                                </p>
                                                                {product?.status && <p className="text-sm capitalize">
                                                                    Status :{" "} <span className="font-semibold">{product?.status}</span>
                                                                </p>}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <AddbuttonWishlist product={product} className="relative top-0 right-0" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold">
                                                                            Add To Favorite
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                    <Tooltip>
                                                                        <TooltipTrigger >
                                                                            <Trash
                                                                                onClick={() => handleDeleteProduct(product._id)}
                                                                                className="w-4 h-4 md:w-5 md:h-5  text-gray-500 hover:text-red-500 hoverEffect "
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold ">
                                                                            Remove product
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-between h-36 md:h-44 p-0.5 md:p-1">
                                                        <PriceFormater amount={(product?.price as number) * itemCount} className="font-bold text-lg" />
                                                        <QuantityButton product={product} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <RemoveModal title={"Reset Cart"} Body={"Cart"} btnText={"Yes, reset"} action={resetCart} />
                                    </div>
                                </div>
                                <div>
                                    <div className="lg:col-span-1">
                                        <div className="hidden md:inline-block w-full bg-white p-5 pb-4 rounded-lg border">
                                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span>SubTotal</span>
                                                    <PriceFormater amount={getSubTotalPrice()} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Discount</span>
                                                    <PriceFormater amount={getSubTotalPrice() - getTotalPrice()} />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between text-lg font-semibold">
                                                    <span>Total</span>
                                                    <PriceFormater className="text-lg font-semibold" amount={getTotalPrice()} />
                                                </div>
                                                <Button
                                                    onClick={handleCheckout}
                                                    className="bg-shop_dark_green/80 w-full p-5 text-white font-semibold shadow rounded-full hover:bg-shop_dark_green hoverEffect">
                                                    {loading ? (
                                                        <span className="flex items-center gap-1 font-semibold">
                                                            <Loader2 className="text-white animate-spin text-lg" /> Proceeding...
                                                        </span>

                                                    ) : "Proceed to Checkout"}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            {addresses && (
                                                <div className="bg-white rounded-lg">
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Delivery Address</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <RadioGroup
                                                                defaultValue={addresses?.find((address) => address?.isDefault)?._id.toString()}>
                                                                {addresses.map((address) => (
                                                                    <div key={address?._id}
                                                                        onClick={() => setSelectedAddress(address)}
                                                                        className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"} `}
                                                                    >
                                                                        <RadioGroupItem value={address._id.toString()} />
                                                                        <Label htmlFor={`address-${address?._id}`} className="grid gap-1.5 flex-1">
                                                                            <span className="font-semibold">{address?.name}</span>
                                                                            <span className="text-sm text-darkColor/60">
                                                                                {address?.address}, {address?.city}, {address?.state}, {address?.zipCode}
                                                                            </span>
                                                                        </Label>


                                                                    </div>
                                                                ))}
                                                                <Button variant="outline" className="p-4 font-semibold">
                                                                    Add New Address
                                                                </Button>
                                                            </RadioGroup>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Order Summary Veiw Mobile */}
                                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 z-100">
                                    <div className="bg-white p-4 rounded-lg border mx-4">
                                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span>SubTotal</span>
                                                <PriceFormater amount={getSubTotalPrice()} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Discount</span>
                                                <PriceFormater amount={getSubTotalPrice() - getTotalPrice()} />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between text-lg font-semibold">
                                                <span>Total</span>
                                                <PriceFormater className="text-lg font-semibold" amount={getTotalPrice()} />
                                            </div>
                                            <Button
                                                onClick={handleCheckout}
                                                className="bg-shop_dark_green/80 w-full p-5 text-white font-semibold shadow rounded-full hover:bg-shop_dark_green hoverEffect">
                                                {loading ? (
                                                    <span className="flex items-center gap-1 font-semibold">
                                                        <Loader2 className="text-white animate-spin text-lg" /> Proceeding...
                                                    </span>

                                                ) : "Proceed to Checkout"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            ) : (
                <NoAccess />
            )}
        </div>
    )
}

export default CartPage
