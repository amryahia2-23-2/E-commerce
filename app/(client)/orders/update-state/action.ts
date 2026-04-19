"use server";


import { backendClient } from '@/sanity/lib/backendClient';
import { revalidatePath } from 'next/cache';





export async function cancelOrder(orderId: string) {
  const result = await backendClient
  .patch(orderId)
  .set({ status: 'cancelled' })
  .commit()
  revalidatePath('/orders')
    console.log(result);
  return result;
};

export async function hideOrder(orderId: string) {
  const result = await backendClient
    .patch(orderId)
    .set({ isHidden: true }) // 👈 add this field to your Sanity schema
    .commit()

  revalidatePath('/orders')

  return result;
}