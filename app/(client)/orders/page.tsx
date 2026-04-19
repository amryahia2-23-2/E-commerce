import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrdersByUser } from "@/sanity/queries";
import Container from "@/components/Container";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrdersLayout from "@/components/OrdersLayout";
import { ORDERS_BY_USER_QUERY_RESULT } from "@/sanity.types";




async function OrderPage() {
    
    const { userId } = await auth();
    
    if(!userId){
        return redirect("/");
    };
    
    const orders: ORDERS_BY_USER_QUERY_RESULT | null = await getOrdersByUser(userId);
    

    
return (
        <div>
            <Container className="py-10">
                {orders?.length ? (
                    <OrdersLayout  orders={orders}/>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
                        <FileX className="h-24 w-24 text-gray-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900">
                            No orders found
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
                            It looks like you haven&apos;t made any orders yet. Start shopping to see your orders here.
                        </p>
                        <Button asChild className="text-sm text-white px-4  py-5 font-semibold mt-4 bg-shop_dark_green hover:text-white/80 hover:bg-shop_dark_green/90">
                            <Link href="/" className="">
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    )
    

}

export default OrderPage

