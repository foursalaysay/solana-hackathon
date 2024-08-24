'use client'

import DonationListCard, { DLCProps } from '@/components/reusables/DonationListCard';
import React from 'react'
import { useState, useEffect } from 'react';
import HealthOfficerNavbar from '@/components/reusables/Navbar';



const Donation = () => {

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
    <div>
        <DonationListCard donations={donations}/>
    </div>
  )
}

export default Donation