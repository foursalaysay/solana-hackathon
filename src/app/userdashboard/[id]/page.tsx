'use client';

import * as React from 'react';
import DonationListCard from '@/components/reusables/DonationListCard';
import { useEffect, useState } from 'react';
import { Donation } from '@/lib/types/types';
import { toast } from 'sonner';
import { useWallet } from '@solana/wallet-adapter-react';

export default function UserMainPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const { publicKey } = useWallet();
  const publicKeyString = publicKey?.toBase58();

  useEffect(() => {
    const getDonations = async () => {
      // Make sure we don't attempt to fetch if the public key isn't available
      if (!publicKeyString) {
        toast.error("No Public Key available!");
        return;
      }
      
      try {
        // Fetch donations with the public key query parameter
        const response = await  fetch(`/api/userdashboard?publicKey=${publicKeyString}`, {
          method: 'GET',
        });

        // Handle non-200 responses
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        setDonations(data.donations || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
        toast.error('Failed to fetch donations.');
      }
    };

    // Call the async function to fetch donations
    getDonations();
  }, [publicKeyString]); // Re-run the effect when the publicKey changes

  return (
    <div>
      <DonationListCard donations={donations} />
    </div>
  );
}
