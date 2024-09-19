'use client'

import React, { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey ] = useState(false);
  const router = useRouter();
  const wallet  = useWallet();
  const [hasName, setHasName ] = useState(false)
  const [id, setId] = useState('')

  const getHealthCode = process.env.NEXT_PUBLIC_OFFICER_CODE;

  useEffect(() => {
    const getPBKey = wallet.publicKey;

      async function saveUser() {
        try {
          // Check if the public key already exists
          const checkPB = await fetch(`/api/login?publicKey=${getPBKey}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (checkPB.ok) {
            // REDIRECT TO COMPLETE PROFILE FORM
  
            const data = await checkPB.json();
            const { name, id } = data;
            setId(id);

            if(name){
              setHasName(true)
            }else{
              setHasName(false)
            }
            
          } else{
            // Public key does not exist, so create a new participant
            const savePB = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id : id, publicKey: getPBKey }),
            });
    
            if (savePB.ok) {
              // Redirect to user dashboard after successful creation
              hasName ?  router.push(`/login/userdashboard/${getPBKey}`) : router.push('/login/userdashboard')
            } else {
              const result = await savePB.json(); // Read the body of the POST request response
              toast.error(result.message || 'Failed to create participant.');
            }
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Server Error');
        }
      }
    
      if(getPBKey){
        saveUser()
      }
      
  }, [wallet.publicKey, hasName,id, router]);
  
  return (
    <div className='w-72'>
        <WalletMultiButton className='w-full'>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButton>
    </div>
  )
}
export default ConnectWalletButton