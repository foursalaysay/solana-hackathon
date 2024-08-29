'use client'


import * as React from 'react'
import { useRouter } from 'next/navigation'
import { usePublicKey } from '@/components/context/PublicKeyContext'
import DonationListCard, { DLCProps } from '@/components/reusables/DonationListCard';
import Navbar from '@/components/reusables/Navbar';

export default function UserMainPage() {

    const [donations, setDonations] = React.useState<DLCProps[]>([]);

    React.useEffect(() => {
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
