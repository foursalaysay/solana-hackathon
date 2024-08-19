'use client'

import { usePublicKey } from '@/components/context/PublicKeyContext'
import React from 'react'


const UserDashboard = () => {
 const publicKey = usePublicKey();


  return (
    <div>
     <nav className='flex flex-row justify-between px-16 py-5 items-center'>
      <h4 className='text-4xl font-bold'><span className='text-red-600'>Red</span>Bit</h4>
      <h3>{publicKey}</h3>
     </nav>
      
    </div>
  )
}

export default UserDashboard