'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const WalletMultiButtonDynamic = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey ] = useState(false);
  const router = useRouter();
  const wallet  = useWallet();

  useEffect(() => {
    const getPBKey = wallet.publicKey;
  
    async function saveUser() {
      try {
        // Check if the public key already exists
        const checkPB = await fetch(`/api/login?publicKey=${encodeURIComponent(getPBKey)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (checkPB.ok) {
          // Redirect to user dashboard if the public key exists
          router.push(`/userdashboard/${getPBKey}`);
        } else if (checkPB.status === 404) {
          // Public key does not exist, so create a new participant
          const savePB = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicKey: getPBKey }),
          });
  
          if (savePB.ok) {
            // Redirect to user dashboard after successful creation
            router.push(`/userdashboard/${getPBKey}`);
          } else {
            const result = await savePB.json(); // Read the body of the POST request response
            toast.error(result.message || 'Failed to create participant.');
          }
        } else {
          const result = await checkPB.json(); // Read the body of the GET request response
          toast.error(result.message || 'Failed to check participant.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Server Error');
      }
    }
  
    if (getPBKey) {
      saveUser();
    }
  }, [wallet.publicKey, router]);
  
  return (
    <div className='w-72'>
        <WalletMultiButton className='w-full'>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButton>
    </div>
  )
}
export default ConnectWalletButton