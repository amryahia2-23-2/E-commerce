"use client";

import { Search } from 'lucide-react'
import { useSearch } from './ٍSearchProvider'

function SearchBar() {
  const { openSearch } = useSearch();

  return (
    <button
      onClick={openSearch}
      className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 hoverEffect'
    >
      <Search className='w-5 h-5 hover:text-shop_light_green hoverEffect' />
    </button>
  )
}

export default SearchBar
