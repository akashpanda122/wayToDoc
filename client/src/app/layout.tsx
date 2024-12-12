"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { config } from './config';
//import { headers } from 'next/headers';
import { cookieToInitialState } from '@account-kit/core';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";

const inter = Inter({ subsets: ['latin'] });

const seatContractAddress = "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

{/*export const metadata: Metadata = {
    title: 'WayToDoc',
    description: 'NextGen Healthcare On-Chain',
};*/}

const legacyConfig = {
    contracts: [
      // Usually, you would have a list of different contracts here
      seatContractAddress,
      {
        address: seatContractAddress,
        amounts: [{ denom: "uxion", amount: "1000000" }],
      },
    ],
    stake: true,
    bank: [
      {
        denom: "uxion",
        amount: "1000000",
      },
    ],
    // Optional params to activate mainnet config
    // rpcUrl: "https://rpc.xion-mainnet-1.burnt.com:443",
    // restUrl: "https://api.xion-mainnet-1.burnt.com:443",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(
        config,
        //headers().get('cookie') ?? undefined
    );
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-900 text-gray-100`}>
                
            <AbstraxionProvider
                config={{
                    contracts: ["xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka"],
                }}
            >
                <Providers>
                    <Toaster position="top-center" reverseOrder={false} />
                    <Navbar />
                    <div className="container mx-auto">{children}</div>
                </Providers>
            </AbstraxionProvider>    
            </body>
        </html>
    );
}