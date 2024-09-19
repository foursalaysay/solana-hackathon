

import React, { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey ] = useState(false);
  const router = useRouter();
  const { publicKey }  = useWallet();
  const [hasName, setHasName ] = useState(false)
  const { id } = router.query;

  const getHealthCode = process.env.NEXT_PUBLIC_OFFICER_CODE;

  useEffect(() => {

      async function saveUser() {
        try {
          const checkPB = await fetch(`/api/login?id=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (checkPB.ok) {
            const data = await checkPB.json();
            const { name } = data;

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
              body: JSON.stringify({ id : id, publicKey: publicKey }),
            });
    
            if (savePB.ok) {
              // Redirect to user dashboard after successful creation
              hasName ?  router.push(`/login/userdashboard/${publicKey}`) : router.push('/login/userdashboard')
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
        saveUser();
  }, [publicKey, id,router, hasName]);
  
  return (
    <div className='w-72'>
        <WalletMultiButton className='w-full'>
            {publicKey ? `${publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButton>
    </div>
  )
}
export default ConnectWalletButton