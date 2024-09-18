import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Separator } from '../ui/separator'
  

export default function Solflare() {
  return (
    <div className='flex flex-col h-screen w-full gap-10 px-10 overflow-hidden'>
        <h1 className='text-8xl font-bold'>About <span className='text-orange-500'>Sol</span>flare?</h1>
        <Separator />
        <div className='w-full'>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Solflare Wallet?</AccordionTrigger>
                        <AccordionContent>
                            Solflare is a full-featured crypto wallet built for Solana and SPL tokens, allowing users to buy, store, send, and receive tokens and non-fungible tokens (NFTs), as well as access decentralized applications (dApps). As the first non-custodial wallet for the Solana blockchain, it provides users with sole access to their private keys, allowing them full control over their funds without interference.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How Does Solflare Work?</AccordionTrigger>
                        <AccordionContent>
                        Solflare is a web3 wallet, which serves as your account on the Solana blockchain; only it isn&apos;t controlled by a bank but by you alone. You can use it to connect or log into different blockchain-based applications on Solana, such as lending platforms, NFT marketplaces, decentralized exchanges (DEXs), and many more.
Let&apos;s dive deep into the wallet&apos;s various features.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Download Solflare Wallet</AccordionTrigger>
                        <AccordionContent>
                        First, you need to download and install <a href="https://solflare.com/" className='text-blue-500 underline underline-offset-2'>Solflare</a>, which currently supports Chromium-based browsers (Chrome, Edge, Opera, Brave, etc.), as well as iPhone and Android devices. We highly recommend you primarily use the browser version since it has the fullest functionality, and is much faster to use. A time may come when speedy execution is required (such as minting in-demand NFT projects) and you won&apos;t regret having a browser extension wallet.
                        </AccordionContent>
                    </AccordionItem>
            </Accordion>
        </div>
    </div>
  )
}
