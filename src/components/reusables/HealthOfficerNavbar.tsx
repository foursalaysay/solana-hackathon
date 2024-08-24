import React from 'react'
import HealthOfficerDropdown from './HealthOfficerDropdown'

const HealthOfficerNavbar = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full px-5 py-2'>
        <h5 className='text-lg font-bold'><span className='text-red-600'>Red</span>Bit</h5>
        <HealthOfficerDropdown />
    </div>
  )
}

export default HealthOfficerNavbar