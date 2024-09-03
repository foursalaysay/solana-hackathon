'use client'


import * as React from 'react'
import { useRouter } from 'next/navigation'
import { usePublicKey } from '@/components/context/PublicKeyContext'
import DonationListCard from '@/components/reusables/DonationListCard';
import Navbar from '@/components/reusables/Navbar';
import { useEffect } from 'react';
import { Donation } from '@/lib/types/types';

export default function UserMainPage() {

    const [donations, setDonations] = React.useState<Donation[]>([]);
    const publicKey = usePublicKey();

    useEffect(() => {
      const getDonations = async () => {
          try {
            const data = await fetch(`/api/userdashboard/${publicKey}`);
            const res = await data.json();
            setDonations(res.donations);
            return res;
          } catch (error) {
          console.log(error);
          }
        }
      getDonations();
    },[publicKey])

  return (
    <div>
        <DonationListCard donations={donations}/>
    </div>
  )
}
