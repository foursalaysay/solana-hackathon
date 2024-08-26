'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { connected } from 'process';

const WalletMultiButtonDynamic = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

const ConnectWalletButton = () => {
  const [hasPublicKey, setHasPublicKey ] = useState(false);
  const router = useRouter();
  const wallet  = useWallet();
  const { connected } = useWallet()

  useEffect(() => {
    // Update the state based on whether the wallet is connected and has a public key
    if (connected && wallet?.publicKey) {
      setHasPublicKey(true);
      router.push('/');
    } else {
      setHasPublicKey(false);
    }
  }, [connected, wallet, router]);

  return (
    <div className='w-72'>
        <WalletMultiButtonDynamic className='w-full'>
            {wallet.publicKey ? `${wallet.publicKey.toBase58().substring(0,8)}...` : "Connect Wallet"}
        </WalletMultiButtonDynamic>
    </div>
  )
}
export default ConnectWalletButton