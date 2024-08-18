'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react';

const WalletMultiButtonDynamic = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

const Navbar = () => {
    const wallet = useWallet();

  return (
    <div className=' flex items-center justify-around mt-10'>
        <WalletMultiButtonDynamic>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButtonDynamic>
    </div>
  )
}
export default Navbar