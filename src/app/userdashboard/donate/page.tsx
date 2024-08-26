'use client'


import { usePublicKey } from '@/components/context/PublicKeyContext'
import { DLCProps } from '@/components/reusables/DonationListCard'
import React from 'react'
import { useState, useEffect } from 'react'


const UserDonation = () => {
    const publicKey = usePublicKey();

    const [donations, setDonations] = useState<DLCProps[]>([]);

    useEffect(() => {
      const getDonations = async () => {
          try {
            const data = await fetch('/api/donation');
            const res = await data.json();
            setDonations(res.donations);
            return res;
          } catch (error) {
          console.log(error);
          }
        }
      getDonations();
    },[])
  

  return (
    <div className='flex items-center justify-center'>
      
    </div>
  )
}

export default UserDonation