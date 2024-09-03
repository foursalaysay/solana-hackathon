import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Donation, Participant } from '@/lib/types/types';
import { usePublicKey } from '../context/PublicKeyContext';

export default function ConfirmParticipation({ donation }: { donation: Donation }) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const publicKey = usePublicKey();
  
  const { donationId, participantId, name, address, age, contactEmail, contactNumber, sampleDiseases } = donation;

  useEffect(() => {
    console.log("Public Key:", publicKey); // Debugging log

    if (!publicKey) {
      console.error("publicKey is null or undefined");
      return; // Exit if publicKey is not available
    }
    try {
    const getDonation = async () => {
    
        const res = await fetch(`/api/userdashboard/${publicKey}`, {
          method: "GET"
        });

        if (!res.ok) {
          throw new Error('Data not fetched!');
        }

        const data = await res.json();
        setParticipant(data.participant);

    }
    getDonation();
  } catch (error) {
    console.log(error);
  };

   
  }, [publicKey]); // Run the effect only when publicKey changes

  const handleConfirmParticipation = async () => {
    if (!publicKey) {
      toast.error('publicKey is missing');
      return; // Exit early if publicKey is missing
    }

    try {
      const saveParticipation = await fetch(`/api/userdashboard/${publicKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      if (saveParticipation.ok) {
        toast.success('You are listed for donation');
      } else {
        throw new Error('Failed to save participation');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save participation');
    }
  };

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
              <Button
                type="button"
                className='w-full bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
                onClick={handleConfirmParticipation}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
