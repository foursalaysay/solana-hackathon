'use client'

import React, { useEffect, useState } from 'react'
import DonationListCard from '@/components/reusables/DonationListCard'
import { Donation } from '@/lib/types/types'


const HealthOfficer = () => {

  const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
      const getDonations = async () => {
          try {
            const data = await fetch('/api/healthofficer', {
              method : 'GET'
            });
            const res = await data.json();
            console.log(res.donations)
            setDonations(res);
            return res;
          } catch (error) {
          console.log(error);
          }
        }
      // Poll every 30 seconds
  const interval = setInterval(getDonations, 5000);

  // Cleanup interval on component unmount
  return () => clearInterval(interval);
    },[])

  return (
    <div>
        <DonationListCard donations={donations || []} />
    </div>
  )
}

export default HealthOfficer