'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'
import dynamic from 'next/dynamic'

const WalletMultiButtonDynamic = dynamic(() =>
  import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const UserDashboard = () => {
  const wallet = useWallet();


  return (
    <div>
     <nav className='flex flex-row justify-between px-16 py-5 items-center'>
      <h4 className='text-4xl font-bold'><span className='text-red-600'>Red</span>Bit</h4>
      <WalletMultiButtonDynamic className='w-full'>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButtonDynamic>
     </nav>
      
    </div>
  )
}

export default UserDashboard