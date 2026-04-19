import { productCategories } from '@/constants/data'
import Link from 'next/link'

interface HomeTabBarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

function HomeTabBar({ selectedTab, setSelectedTab }: HomeTabBarProps) {
  return (
    <div className='pt-5 flex items-cente justify-between flex-wrap gap-5'>
      <div className='flex items-center gap-3 flex-wrap'>
        {productCategories.map((category) => (
          <button
            onClick={() => setSelectedTab(category.value)}
            className={`py-1.5 px-4  border border-shop_light_green/30
            rounded-full text-sm font-semibold
            hover:bg-shop_light_green hover:text-white hoverEffect
            ${selectedTab.toLowerCase() === category.value.toLowerCase() ? 'bg-shop_light_green text-white border-shop_light_green' : 'bg-green-100'} `}
            key={category.value}>
            {category.title}
          </button>
        ))}

      </div>
      <Link className='py-1.5 px-4 text-sm font-semibold border-2 rounded-full hover:bg-shop_light_green hover:text-white  hoverEffect' href={"/shop"}>See all</Link>
    </div>
  )
}

export default HomeTabBar
