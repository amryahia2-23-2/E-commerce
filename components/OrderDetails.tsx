import { ORDERS_BY_USER_QUERY_RESULT } from "@/sanity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormater from "./PriceFormater";

// Extract the single order type from the array
type OrderFromQuery = ORDERS_BY_USER_QUERY_RESULT[number];

interface Props {
    order: OrderFromQuery | null;
    isOpen: boolean;
    onClose: () => void;
}

function OrderDetails({ order, isOpen, onClose }: Props) {
    if (!isOpen || !order) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-4xl max-h-[90vh] overflow-x-scroll">
                <DialogHeader>
                    <DialogTitle className="leading-6">Order Details - {order?.orderNumber}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                    <p>
                        <strong>Customer Name:</strong>{" "} {order?.customerName}
                    </p>
                    <p>
                        <strong>Customer Email:</strong>{" "} {order?.email}
                    </p>
                    <p>
                        <strong>Date:</strong>{" "} {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                    </p>
                    <p>
                        <strong>Order Status:</strong>
                        <span className="capitalize text-green-600 font-medium">{" "}
                            {order?.status}
                        </span>
                    </p>
                    <p>
                        <strong>Invoice Number:</strong>{" "} {order?.invoice?.number ?? "N/A"}
                    </p>
                    {order?.invoice && (
                        <Button className="bg-transparent border mt-4 text-darkColor/80 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect">
                            {order?.invoice?.hosted_invoice_url && (
                                <Link href={order.invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                                    Download Invoice
                                </Link>
                            )}
                        </Button>
                    )}

                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Product
                            </TableHead>
                            <TableHead className="text-center">
                                Quantity
                            </TableHead>
                            <TableHead className="text-center">
                                Price
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order?.products?.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-2">
                                    {product?.product?.images && (<Image src={urlFor(product?.product?.images[0]).url()} alt={"productImage"} width={50} height={50} />)}
                                    {product?.product?.name ?? "N/A"}
                                </TableCell>
                                <TableCell className="text-center">
                                    {product.quantity}
                                </TableCell>
                                <TableCell className="text-center">
                                    <PriceFormater amount={product?.product?.price} className="text-black font-medium" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-4 text-right flex items-center justify-end">
                    <div className="w-44 flex flex-col gap-1">
                        {order?.amountDiscount !== 0 && (
                            <div className="w-full flex items-center justify-between">
                                <span>Discount:</span>
                                <PriceFormater amount={order.amountDiscount} className="text-red-500 font-bold" />
                            </div>
                        )}
                        {order?.amountDiscount !== 0 && (
                            <div>
                                <strong>Subtotal</strong>
                                <PriceFormater amount={(order?.totalPrice as number) + (order?.amountDiscount as number)} className="text-black font-bold" />
                            </div>
                        )}
                        <div className="w-full flex items-center justify-center gap-2">
                            <strong>Total:</strong>
                            <PriceFormater amount={order?.totalPrice} className="text-black font-bold" />

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetails
