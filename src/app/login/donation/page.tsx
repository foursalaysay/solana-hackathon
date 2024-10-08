'use client'

import HealthOfficerDropdown from '@/components/reusables/HealthOfficerDropdown'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateDonationList  from '@/components/reusables/CreateDonationList'
import { Separator } from '@/components/ui/separator'
import HealthOfficerNavbar from '@/components/reusables/Navbar'
import DonationListCard from '@/components/reusables/DonationListCard'
import { Donation } from '@/lib/types/types'


const DonationPage = () => {

  const [donations, setDonations] = useState<Donation[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleSuccess = () => {
    // Close the dialog upon successful donation listing creation
    setIsOpen(false);
  }; 

    useEffect(() => {
      const getDonations = async () => {
          try {
            const data = await fetch('/api/donation',{
              method : "GET"
            });
            const res = await data.json();
            console.log(res.donations)
            setDonations(res);
            return res;
          } catch (error) {
          console.log(error);
          }
        }
      getDonations();
    },[])

  return (
    <div className='flex flex-col items-stretch justify-center'>
      <HealthOfficerNavbar />
      <Separator />
        <DonationListCard donations={donations || []} />
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button  onClick={() => setIsOpen(true)} className="w-full bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2 hover:bg-white">Create Donation Listing</Button>
          </DialogTrigger>
          <DialogContent className="w-[350px] rounded-md lg:w-full border-2 border-red-600">
            <DialogHeader>
              <DialogTitle>Blood Donation Listing</DialogTitle>
            </DialogHeader>
            <Separator />
            {/* THIS COMPONENT IS FOR CREATING THE DONATION LISTING */}
            <CreateDonationList onSuccess={handleSuccess} />
            <Separator />
            <DialogDescription>
              This will be an Official Blood Donation Listing.
            </DialogDescription>
          </DialogContent>
    </Dialog>
    </div>
  )
}

export default DonationPage