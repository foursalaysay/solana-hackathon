import HealthOfficerDropdown from '@/components/reusables/healthOfficerInfo'
import React from 'react'

const HealthOfficer = () => {
  return (
    <div className='flex flex-col items-center justify-center p-5'>
        <div className='flex flex-row items-center justify-between w-full px-5 py-2'>
          <h5 className='text-lg font-bold'><span className='text-red-600'>Red</span>Bit</h5>
          <HealthOfficerDropdown />
        </div>
    </div>
  )
}

export default HealthOfficer