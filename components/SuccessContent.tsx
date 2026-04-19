"use client";
import useStore from "@/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Check , Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";


function SuccessContent() {
    const { resetCart } = useStore();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const orderNumber = searchParams.get("order_number");

    useEffect(() => {
        if(sessionId){
        resetCart();
        }
    }, [sessionId, resetCart])
return (
    <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
        <motion.div 
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full text-center">
            <motion.div
            initial={{ scale: 0}}
            animate={{ scale: 1}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200}}
            className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
                <Check className="text-white w-10 h-10" />

            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Order Confirmed!
            </h1>
            <div className="text-left space-y-4 mb-4 text-gray-700">
                <p>
                    Thank you for your purchase. We&apos;re processing your order and will ship it soon. A confirmation email with your order details will be sent to your inbox shortly.
                </p>
                <p>
                    Order Number:{orderNumber && <span className="font-semibold bg-gray-200 px-2 py-1 rounded">{orderNumber}</span>}
                </p>
            </div>
            <div className="p-5 border rounded-lg space-y-2 bg-gray-100 text-center">
                <h3 className="font-semibold">
                    What&apos;s Next?
                </h3>
                <ul className="text-sm  space-y-1 text-gray-600">
                    <li> Check your email for order confirmation</li>
                    <li> We&apos;ll notify you when your order ships</li>
                    <li> Track your order status anytime</li>
                </ul>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/" className="flex items-center justify-center mt-6  bg-black text-white px-6 py-3 rounded-lg  hover:bg-gray-800 hoverEffect">
                    <Home className="w-5 h-5 mr-2" />
                    Home
                </Link>
                <Link href="/orders" className="flex items-center justify-center mt-6  bg-green-200 text-black border shadow-lg px-6 py-3 rounded-lg hover:bg-gray-100 hoverEffect">
                    <Package className="w-5 h-5 mr-2" />
                    Orders
                </Link>
                <Link href="/shop" className="flex items-center justify-center mt-6  bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 hoverEffect">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop
                </Link>
                
            </div>
        </motion.div>
    </div>
);
};

export default SuccessContent;