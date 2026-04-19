
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import SigIn from './SigIn'
import MobileMenu from './MobileMenu'
import OrdersIcon from './OrdersIcon'
import { getOrdersByUser } from '@/sanity/queries'
import { auth } from '@clerk/nextjs/server';
import { MobileDropdown } from './MobileDropDown'


async function Header() {
  const { userId } = await auth();

  let orders = null;
  if (userId) {
    orders = await getOrdersByUser(userId);

  }

  return (
    <header className='bg-white/70 py-3 shadow-sm sticky top-0 z-50 backdrop-blur-md'>
      <Container className='flex items-center justify-between text-lightColor'>
        <div className='flex items-center w-auto md:w-1/3 gap-2.5 justifiy-start lg:gap-0'>
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className='flex w-auto md:w-1/3 gap-3 items-center justify-end '>
          <SearchBar />
          <CartIcon className={"hidden md:flex"} />
          <FavoriteButton className={"hidden md:flex"} />
          <OrdersIcon orders={orders} userId={userId} className={"hidden md:flex"} />
          <MobileDropdown className="md:hidden" />
          <SigIn />
        </div>
      </Container>
    </header>
  )
}

export default Header
