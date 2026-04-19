"use client"
import React, { FC } from 'react'
import Logo from './Logo';
import { X } from 'lucide-react'
import { menuItems } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathName = usePathname();
  const sidbarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div className={`fixed inset-y-0 left-0 h-screen w-full bg-black/50 text-white/50 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}  z-100 hoverEffect`}>
      <div ref={sidbarRef} className='min-w-72 max-w-96 bg-black h-full p-10 border-r border-r-shop_light_green flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-5'>
            <Logo className='text-white' spanDesign="group-hover:text-white"/>
            <X size={20} className='hover:text-shop_light_green hoverEffect cursor-pointer' onClick={onClose}/>
        </div>
        <div className='flex flex-col gap-4 items-start justify-start '>
          {menuItems.map((item,index) => (
            <Link key={index} href={item.href} className={`block text-lg font-semibold capitalize text-white hover:text-shop_light_green hoverEffect ${pathName === item.href && "text-shop_light_green"}`}>
              {item.label}
            </Link>
          ))
          }
        </div>
        <div>
          <SocialMedia className='justify-between' />
        </div>
      </div>
    </div>
  )
}

export default SideMenu