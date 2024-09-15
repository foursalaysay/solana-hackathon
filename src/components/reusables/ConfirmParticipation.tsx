import React, { useState } from 'react';
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
import { useWallet } from '@solana/wallet-adapter-react';

interface ConfirmParticipationProps {
  donationId: string;
  onConfirm: (id: string) => void; // Function to handle confirmation
}

const ConfirmParticipation: React.FC<ConfirmParticipationProps> = ({ donationId, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const { publicKey } = useWallet();
  const publicKeyString = publicKey?.toBase58();

  const handleConfirmParticipation = async () => {

    
    if (!publicKeyString) {
      toast.error('Wallet not connected');
      return;
    }

    setIsLoading(true);

    const requestData = {
      publicKey: publicKeyString,
      donationId,
    };

    console.log('Sending Request Data:', requestData); // Log request data

    try {
      const response = await fetch(`/api/userdashboard`, {
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
        onConfirm(donationId); // Notify parent component of successful confirmation
      } else {
        throw new Error(result.message || 'Failed to save participation');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save participation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className='w-full bg-red-600 hover:bg-white hover:border-2 hover:border-redColor hover:text-redColor'
          disabled={isLoading}
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
  );
}

export default ConfirmParticipation;
