'use client';
import { type Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

require("dotenv").config();
//rainbowkit
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";

//wagmi
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
//import { alchemyProvider} from 'wagmi/providers/alchemy';
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "wagmi/providers/public";


const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECTID_ID;

if (!infuraId) {
  throw new Error("NEXT_PUBLIC_INFURA_ID environment variable is not set");
}
if (!walletConnectId) {
  throw new Error(
    "NEXT_PUBLIC_WALLETCONNECTID_ID environment variable is not set"
  );
}

const { chains, publicClient } = configureChains(
  [hardhat, sepolia],
  [
    //alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    infuraProvider({ apiKey: infuraId }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: walletConnectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

// export const metadata: Metadata = {
//   title: {
//     template: '%s - 3vents',
//     default: '3vents - Your passport to unforgettable moments',
//   },
//   description:
//     'Immerse yourself in a world of boundless events - exhilarating concerts, inspiring lectures, family shows and more. Every ticket is a promise of memorable experiences and exciting discoveries.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-white antialiased',
        inter.variable,
        dmSans.variable,
      )}
    >
      <body className="flex min-h-full">
        <div className="flex w-full flex-col">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              theme={lightTheme({
                accentColor: '#3B82F6',
                accentColorForeground: 'white',
                borderRadius: 'medium',
              })}
              chains={chains}
            >
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </div>
      </body>
    </html>
  )
}
