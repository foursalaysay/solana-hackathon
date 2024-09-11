'use client';

import React from 'react';
import { Separator } from '../ui/separator';
import BloodImage from './../../../public/blood.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Donation } from '@/lib/types/types';
import ConfirmParticipation from './ConfirmParticipation';

export default function DonationListCard({ donations }: { donations: Donation[] }) {
  const pathname = usePathname();

  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-2xl lg:text-4xl font-bold'>Donation Listing</h1>
      <div className='flex flex-wrap gap-5'>
        {Array.isArray(donations) && donations.length > 0 ? (
          donations.map((donation) => {
            console.log('Donation object:', donation); // Debugging line

            return (
              <div key={donation.donationId} className='flex flex-col w-72 lg:w-[460px] border-2 border-black p-5 rounded-md'>
                <Image
                  className='w-10 h-14 self-center m-5'
                  src={BloodImage}
                  alt='blood'
                />
                <h4>ID: {typeof donation.donationId === 'string' ? `${donation.donationId.substring(0, 12)}...` : 'N/A'}</h4>
                <p className='text-sm'>Donation Date: {new Date(donation.donationDate).toDateString()}</p>
                <p className='text-sm'>Location: {donation.address}</p>
                <Separator className='mt-2'/>
                <div className='flex flex-col lg:flex-row justify-between gap-2 my-5'>
                  <p className='text-xs'>Total Participants: {donation.totalParticipants}</p>
                  <p className='text-xs'>Bounty Amount: {donation.bountyAmount}</p>
                </div>
                {/* Uncomment if needed */}
                {pathname.includes("userdashboard") ? <ConfirmParticipation donation={donation} /> : null}
              </div>
            );
          })
        ) : (
          <p>No donations available.</p>
        )}
      </div>
    </div>
  );
}
