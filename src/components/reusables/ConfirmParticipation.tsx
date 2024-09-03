import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import { Donation } from '@/lib/types/types'

export interface setButton {
  Donation?: Donation;
  setButtonType : () => void;
}

  
export default async function ConfirmParticipation() {

  const [participation, setParticipation ] = useState<Donation>()

  useEffect(() => {
    const getDonation = async () => {
      try {
        const data = await fetch(`/api/userdashboard/${publicKey}`,
          {
            method : "GET"
          }
        );

        if(!data.ok){
          throw new Error('Data not fetched!');
        }
        const res = await data.json();
        setParticipation(res.participation);

      } catch (error) {
        console.log(error)
      }
    }
   getDonation();
  })

  const { donationId, participantId, publicKey, name, address, age, contactEmail, contactNumber, sampleDiseases } = updatedDonation;
  try {
    const saveParticipation = await fetch(`/api/userdashboard/${publicKey}`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        donationId : donationId,
        id : participantId,
        publicKey: publicKey,
        name: name,
        address: address,
        age : age,
        contactEmail : contactEmail,
        contactNumber : contactNumber,
        sampleDiseases : sampleDiseases
      })
    });

    if(saveParticipation.ok){
      toast.success('You are listed for donation');
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <>
        <Dialog>
          <DialogTrigger asChild>
              <Button variant="default" className='w-full bg-red-600 hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'>Participate</Button>
          </DialogTrigger>
          <DialogContent className="w-[320px] lg:w-96 rounded-md">
              <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                  Are you sure you want to participate in donating blood?
              </DialogDescription>
              </DialogHeader>
              <Separator />
              <DialogFooter className="flex flex-col gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" className=' w-full hover:bg-gray-200'>
                      Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" className='w-full bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'>
                      Confirm
                    </Button>
                </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  )
}
