'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

// Create a context for the public key
const PublicKeyContext = createContext<string | null>(null);

export function PublicKeyProvider({ children }: { children: React.ReactNode }) {
    const { publicKey, connected } = useWallet(); // Also get the connection status
    const [storedPublicKey, setStoredPublicKey] = useState<string | null>(null);

    useEffect(() => {
        if (connected && publicKey) { // Ensure the wallet is connected before setting the publicKey
            setStoredPublicKey(publicKey.toString());
        }
    }, [publicKey, connected]); // Re-run effect when connection status or publicKey changes

    return (
        <PublicKeyContext.Provider value={storedPublicKey}>
            {children}
        </PublicKeyContext.Provider>
    );
}

// Custom hook to use the public key context
export function usePublicKey() {
    return useContext(PublicKeyContext);
}
