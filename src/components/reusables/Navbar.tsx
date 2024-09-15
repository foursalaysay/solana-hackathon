'use client'

import React from 'react'
import HealthOfficerDropdown from './HealthOfficerDropdown'

import { usePathname } from 'next/navigation'
import UserDropdown from './UserDropdown';

const Navbar = () => {

  const pathname = usePathname();

  return (
    <div className='flex flex-row items-center justify-between w-full p-5'>
        <h5 className='text-lg font-bold'><span className='text-red-600'>Red</span>Bit</h5>
        {pathname.includes('userdashboard') ? (<UserDropdown />) : (<HealthOfficerDropdown />)}
    </div>
  )
}

export default Navbar