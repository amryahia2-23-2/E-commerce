"use client"
import { AlignLeft } from 'lucide-react'
import { useState } from 'react'
import SideMenu from './SideMenu'

function MobileMenu() {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  return (
    <>
        <button onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} >
              <AlignLeft size={16} className='hover:text-darkColor hoverEffrct lg:hidden hover:cursor-pointer'/>
        </button>
        <div className='lg:hidden'>
                <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
        </div>
    </>
  )
}

export default MobileMenu
