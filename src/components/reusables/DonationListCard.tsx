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
              <div key={donation.donationId} className='flex flex-col w-[320px] lg:w-[350px] border-2 border-black p-4 rounded-md'>
                <Image
                  className='self-center m-2 rounded-md'
                  src='/hospital.jpg'
                  width={300}
                  height={24}
                  alt='blood'
                />
                <div className='flex items-center justify-start gap-1'>
                  <Image
                  src='/date.png'
                  alt='calendar'
                  width={24}
                  height={24}
                  />
                  <p className='text-sm'>{new Date(donation.donationDate).toDateString()}</p>
                </div>
                <div className='flex items-center justify-start gap-1'>
                  <Image
                  src='/place.png'
                  alt='calendar'
                  width={24}
                  height={24}
                  />
                  <p className='text-sm'>{donation.address}</p>
                </div>
               
               
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
