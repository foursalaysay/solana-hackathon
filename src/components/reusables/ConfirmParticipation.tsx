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
import { Donation, Participant } from '@/lib/types/types'
import { usePublicKey } from '../context/PublicKeyContext'


  
export default async function ConfirmParticipation({donation } : { donation : Donation}) {
  const [participant, setParticipant] = useState<Participant | null>(null);


  const { donationId, participantId, publicKey,name, address, age, contactEmail, contactNumber, sampleDiseases  } = donation;
  useEffect(() => {
    const getDonation = async () => {
      try {
        const res = await fetch(`/api/userdashboard/${publicKey}`,
          {
            method : "GET"
          }
        );

        if(!res.ok){
          throw new Error('Data not fetched!');
        }
        const data = await res.json();
        setParticipant(data.participant);

      } catch (error) {
        console.log(error)
      }
    }
   getDonation();
  },[publicKey])


    try {
      const saveParticipation = await fetch(`/api/userdashboard/${publicKey}`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          donationId,
          participantId,
          publicKey,
          name,
          address,
          age,
          contactEmail,
          contactNumber,
          sampleDiseases,
        }),
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
