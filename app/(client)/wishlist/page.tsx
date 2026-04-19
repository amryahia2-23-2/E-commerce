import NoAccess from '@/components/NoAccess';
import WishListProducts from '@/components/WishListProducts';
import { currentUser } from '@clerk/nextjs/server'



async function WishListPage() {
    const user = await currentUser();
  return (
    <>
    {user ? (
        <WishListProducts/>
    ) : (
        <NoAccess details="Log in to veiw your wishlist items. Don't miss out on your cart products to make the payment"/>
    )}
    
    </>
  )
}

export default WishListPage
