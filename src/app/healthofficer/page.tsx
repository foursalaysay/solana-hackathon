'use client'

import HealthOfficerDropdown from '@/components/reusables/HealthOfficerDropdown'
import React from 'react'
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
import { CreateDonationList } from '@/components/reusables/CreateDonationList'

const HealthOfficer = () => {
  return (
    <div className='flex flex-col items-center justify-center p-5'>
        <div className='flex flex-row items-center justify-between w-full px-5 py-2'>
          <h5 className='text-lg font-bold'><span className='text-red-600'>Red</span>Bit</h5>
          <HealthOfficerDropdown />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-red-600 text-white hover:text-red-600 hover:border-red-600 border-2 hover:bg-white">Create Donation Listing</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Blood Donation Listing</DialogTitle>
            </DialogHeader>
            {/* THIS COMPONENT IS FOR CREATING THE DONATION LISTING */}
            <CreateDonationList />
          </DialogContent>
    </Dialog>
    </div>
  )
}

export default HealthOfficer