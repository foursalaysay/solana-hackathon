'use client';

import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Donation } from '@/lib/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useWallet } from '@solana/wallet-adapter-react';
import CreateDonationList from './CreateDonationList';
import { useEffect } from 'react';


export default function DonationListCard({ donations }: { donations: Donation[] }) {
  const pathname = usePathname();
  const { publicKey } = useWallet();
  const publicKeyString = publicKey?.toBase58();
  const [isLoading, setIsLoading] = useState(false);  
  const [selectedDonationId, setSelectedDonationId] = useState("");

  const handleConfirmParticipation = async () => {

    if (!publicKeyString) {
      toast.error('Wallet not connected');
      return;
    }

    setIsLoading(true);

    const requestData = {
      publicKey: publicKeyString,
      donationId: selectedDonationId, 
    };

    console.log('Sending Request Data:', requestData); // Log request data

    try {
      const response = await fetch(`/api/userdashboard/${publicKeyString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('Response:', result); // Log the response

      if (response.ok) {
        toast.success('You are listed for donation');
        // Notify parent component of successful confirmation
      } else {
        throw new Error('Failed to save participation');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save participation');
    } finally {
      setIsLoading(false);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => setIsDialogOpen(true);

  // Function to close the dialog
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className='p-5 flex flex-col gap-5'>
      <div className='flex flex-col items-center lg:flex-row justify-between gap-5 lg:gap-0'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Donation Listing</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className={pathname.includes('userdashboard') ? 'hidden' : 'visible'}>
            <Button className="lg:w-1/6 w-[320px] bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2 hover:bg-white">Create Donation Listing</Button>
          </DialogTrigger>
          <DialogContent className="w-[350px] rounded-md lg:w-full border-2 border-red-600">
            <DialogHeader>
              <DialogTitle>Blood Donation Listing</DialogTitle>
            </DialogHeader>
            <Separator />
            {/* THIS COMPONENT IS FOR CREATING THE DONATION LISTING */}
            <CreateDonationList onSuccess={closeDialog}/>
            <Separator />
            <DialogDescription>
              This will be an Official Blood Donation Listing.
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
     
      <div className='flex flex-wrap gap-5'>
        {donations && donations.length > 0 ? (
          donations.map((donation, index) => (
            <div key={index} className='flex flex-col w-[320px] lg:w-[350px] border-2 border-black p-4 rounded-md'>
              <Image
                className='self-center m-2 rounded-md'
                src='/hospital.jpg'
                width={300}
                height={180} // Adjust height to match aspect ratio
                alt='Hospital'
              />
              <div className='flex items-center justify-start gap-1'>
                <Image
                  src='/date.png'
                  alt='Date'
                  width={24}
                  height={24}
                />
                <p className='text-sm'>{new Date(donation.donationDate).toDateString()}</p>
              </div>
              <div className='flex items-center justify-start gap-1'>
                <Image
                  src='/place.png'
                  alt='Location'
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
              {pathname.includes("userdashboard") && (
                <Dialog
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className='w-full bg-red-600 hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
                      disabled={isLoading}
                      onClick={() => setSelectedDonationId(donation.donationId)}
                    >
                      {isLoading ? 'Processing...' : 'Participate'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[320px] lg:w-96 rounded-md">
                    <DialogHeader>
                      <DialogTitle>Confirm Participation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to participate in donating blood?
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <DialogFooter className="flex flex-col gap-2">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className='w-full hover:bg-gray-200'
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        className='w-full bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
                        onClick={() => handleConfirmParticipation()} 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Confirm'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))
        ) : (
          <p>No donations available.</p>
        )}
      </div>
    </div>
  );
}
