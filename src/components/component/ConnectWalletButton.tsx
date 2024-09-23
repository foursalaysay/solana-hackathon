import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';

const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey] = useState(false);
  const [hasName, setHasName] = useState(false);
  const { publicKey, connected } = useWallet(); 
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [hasUser, setHasUser] = useState(false)

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search); // Get the query params from URL
  //   const id = params.get('id'); // Extract 'id' from query
  //   if (id) {
  //     setUserId(id); // Save it in the state
  //   }
  // }, []);



  // useEffect(() => {
  //   if(connected){
  //     const checkPB = async () => {
  //       const res = await fetch(`/api/login?id=${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  
  //       const data = await res.json();
  //       const { id } = data;
  //       console.log(id)
  //       setHasUser(true)
  //     }
  
  //     checkPB()
  
  //     if(!hasUser){
  //         const saveUser = async () => {
  //               const res = await fetch('/api/login', {
  //                 method : 'POST',
  //                 headers : {
  //                   'Content-Type' : 'application/json'
  //                 },
  //                 body : JSON.stringify({
  //                   publicKey : publicKey,
  //                   id : userId
  //                 })
  //               })
  //               const data = await res.json();
  //               const { id } = data;
  //               console.log(id)
  //             }
  //         saveUser()
  //     }
  //   }
  // });
   

    
    



  // useEffect(() => {
  //   if (!publicKey) return; // If no publicKey, don't execute further

  //   async function saveUser() {
  //     try {
  //       // Check if the user exists by querying with publicKey and userId
  //       const checkPB = await fetch(`/api/login?id=${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if(!checkPB){
  //         toast.success('There is no record')
  //       }

  //       if (checkPB.ok) {
  //         const data = await checkPB.json();
  //         const { name } = data;

  //         setHasName(!!name);

  //         // Redirect to user dashboard if name exists
  //         if (name) {
  //           router.push(`/login/userdashboard/${publicKey}`);
  //         }
  //       } else {
  //         // Public key does not exist, so create a new participant
  //         const savePB = await fetch('/api/login', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ 
  //             publicKey: publicKey ? publicKey.toBase58() : null, 
  //             id: userId 
  //           }), // Ensure publicKey is converted to base58 string
  //         });

  //         if (savePB.ok) {
  //           // Redirect to user dashboard after successful creation
  //           const dashboardPath = hasName
  //             ? `/login/userdashboard/${publicKey}`
  //             : '/login/userdashboard';
  //           router.push(dashboardPath);
  //         } else {
  //           const result = await savePB.json(); // Read the body of the POST request response
  //           toast.error(result.message || 'Failed to create participant.');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       toast.error('Server Error');
  //     }
  //   }

  //   saveUser(); // Call the async function inside useEffect
  // }, [publicKey, userId, router, hasName]); // Ensure useEffect runs whenever these dependencies change


  
  return (
    <div className='w-72'>
      <WalletMultiButton className='w-full'>
        {publicKey ? `${publicKey.toBase58().substring(0, 8)}...` : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  );
};

export default ConnectWalletButton;
