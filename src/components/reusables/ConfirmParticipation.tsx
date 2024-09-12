import React, { useEffect, useState } from 'react';
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
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Donation, Participant } from '@/lib/types/types';
import { usePublicKey } from '../context/PublicKeyContext';
import { useWallet } from '@solana/wallet-adapter-react';

export default function ConfirmParticipation({ donation }: { donation: Donation }) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const { publicKey } = useWallet();
  const publicKeyString = publicKey?.toBase58();

  const { donationId, participantId, name, address, age, contactEmail, contactNumber, sampleDiseases } = donation;

  const handleConfirmParticipation = async () => {
    setIsLoading(true);  // Start loading
  
    try {
      // // Ensure all necessary fields are defined
      // if (!publicKeyString || !donationId || !name || !address || !age || !contactEmail || !contactNumber || !sampleDiseases) {
      //   toast.error('Missing required information');
      //   setIsLoading(false);
      //   return;
      // }
  
      const response = await fetch(`/api/userdashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey: publicKeyString,  // Correct publicKey
          donationId,
          participantId,
          name,
          address,
          age,
          contactEmail,
          contactNumber,
          sampleDiseases,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success('You are listed for donation');
      } else {
        throw new Error(result.message || 'Failed to save participation');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save participation');
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className='w-full bg-red-600 hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
            disabled={isLoading}  // Disable button during loading
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
                disabled={isLoading}  // Disable during loading
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className='w-full bg-redColor hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
                onClick={handleConfirmParticipation}
                disabled={isLoading}  // Disable during loading
              >
                {isLoading ? 'Processing...' : 'Confirm'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
