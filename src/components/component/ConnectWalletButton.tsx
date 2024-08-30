'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { connected } from 'process';
import { toast } from 'sonner';

const WalletMultiButtonDynamic = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey ] = useState(false);
  const router = useRouter();
  const wallet  = useWallet();


  useEffect(() => {
    async function saveUser() {
      const PBkey = wallet.publicKey;

    
      try {

        const checkPK = await fetch(`/api/login?publicKey=${PBkey}`, {
          method : 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(checkPK.ok){
          router.push(`/userdashboard/${PBkey}`)
        }else{
          const response = await fetch('/api/login', { // Ensure this path matches your API route
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicKey: PBkey }), // Ensure body key matches your API expectation
          });

          if (response.ok) {
            await response.json(); // Handle or ignore the result if needed
            router.push('/userdashboard');
            toast.success('Participant added successfully');
          } else {
            const result = await response.json(); // Parse the error response
            toast.error(result.message || 'No Wallet Connected');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Server Error');
      }
    }

    if (wallet.publicKey) { // Ensure you only run this when wallet.publicKey is defined
      saveUser();
    }
  }, [wallet.publicKey, router]); 


  return (
    <div className='w-72'>
        <WalletMultiButtonDynamic className='w-full'>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButtonDynamic>
    </div>
  )
}
export default ConnectWalletButton