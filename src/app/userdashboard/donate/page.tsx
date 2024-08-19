import { usePublicKey } from '@/components/context/PublicKeyContext'
import React from 'react'

const UserDonation = () => {
    const publicKey = usePublicKey();

  return (
    <div className='flex items-center justify-center'>
        <h1 className='text-lg'>{publicKey}</h1>
    </div>
  )
}

export default UserDonation