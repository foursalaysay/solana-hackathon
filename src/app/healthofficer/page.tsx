'use client'

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
import { CreateDonationList } from '@/components/reusables/CreateDonationList'
import { Separator } from '@/components/ui/separator'
import HealthOfficerNavbar from '@/components/reusables/Navbar'
import DonationListCard from '@/components/reusables/DonationListCard'
import { Donation } from '@/lib/types/types'
import { toast } from 'sonner'

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
      getDonations();
    },[])

  return (
    <div>
        <DonationListCard donations={donations || []} />
    </div>
  )
}

export default HealthOfficer