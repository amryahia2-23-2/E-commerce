"use client"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { ORDERS_BY_USER_QUERY_RESULT } from '@/sanity.types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { format } from "date-fns"
import { Loader2, Trash, X } from 'lucide-react'
import { useState } from 'react'
import OrderDetails from './OrderDetails'
import { toast } from "react-hot-toast"
import { cancelOrder, hideOrder } from '@/app/(client)/orders/update-state/action'

// Extract the single order type from the array
type OrderFromQuery = ORDERS_BY_USER_QUERY_RESULT[number];

function OrdersLayout({ orders }: { orders: ORDERS_BY_USER_QUERY_RESULT }) {
    const [selectedOrder, setSelectedOrder] = useState<OrderFromQuery | null>(null);

    const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

    const isLoading = (id: string) => loadingIds.has(id)

    const addLoading = (id: string) =>
        setLoadingIds(prev => new Set(prev).add(id))

    const removeLoading = (id: string) =>
        setLoadingIds(prev => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    async function handleCancelOrder(orderId: string) {
        try {
            addLoading(orderId);

            const result = await cancelOrder(orderId);
            toast.success("Cancel Order successfully");

            if (result?._id) {
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel order. Please try again.");
        } finally {
            removeLoading(orderId);
        }
    }

    async function handlehideOrder(orderId: string) {
        try {
            addLoading(orderId);

            const result = await hideOrder(orderId);
            toast.success("Remove Order successfully");

            if (result?._id) {
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove order. Please try again.");
        } finally {
            removeLoading(orderId);
        }
    }
    return (
        <div>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Order List</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] md:w-auto" >
                                        Order Number
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Date
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Customer
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Email
                                    </TableHead>
                                    <TableHead>
                                        Total
                                    </TableHead>
                                    <TableHead>
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Invoice Number
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Action
                                    </TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TooltipProvider>
                                    {orders.map((order) => (
                                        <Tooltip key={order?._id}>
                                            <TooltipTrigger asChild>
                                                <TableRow
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="hover:bg-gray-50 cursor-pointer h-12">
                                                    <TableCell className="font-medium">
                                                        {(order?.orderNumber?.slice(-10) ?? "N/A")}...
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {order?.orderDate && format(new Date(order.orderDate), "yyyy-MM-dd")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order?.customerName ?? "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order?.email ?? "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order?.totalPrice ? `$${order.totalPrice.toFixed(2)}` : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order?.status && (
                                                            <span className={`p-2 py-1 rounded-full text-xs font-semibold ${order?.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} `}>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order?.invoice && (
                                                            <p className="font-medium line-clamp-1">{order?.invoice ? order?.invoice?.number : "____"}</p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="flex items-center justify-center group">
                                                        {order?.status === "cancelled" ? (
                                                            <>
                                                                {isLoading(order._id) ? (
                                                                    <Loader2 className="animate-spin text-gray-400 mt-2" size={15} />
                                                                ) : (
                                                                    <Trash
                                                                        onClick={
                                                                            (e) => {
                                                                                e.stopPropagation();
                                                                                handlehideOrder(order._id);
                                                                            }
                                                                        }
                                                                        size={15}
                                                                        className="group-hover:text-red-600 hoverEffect mt-2"
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {isLoading(order._id) ? (
                                                                    <Loader2 className="animate-spin text-gray-400 mt-2" size={15} />
                                                                ) : (
                                                                    <X
                                                                        onClick={
                                                                            (e) => {
                                                                                e.stopPropagation();
                                                                                handleCancelOrder(order._id);
                                                                            }
                                                                        }
                                                                        size={15}
                                                                        className="group-hover:text-blue-600 hoverEffect mt-2"
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </TooltipTrigger>
                                            <TooltipContent >
                                                <p>Click to view order details</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </TableBody>
                            <OrderDetails
                                order={selectedOrder}
                                isOpen={!!selectedOrder}
                                onClose={() => setSelectedOrder(null)}

                            />
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrdersLayout
