'use client';

import { useState, useEffect, useCallback } from "react";

// Viem
import { parseAbiItem } from "viem";

import { useAccount, usePublicClient } from "wagmi";

// Contract Infos
import { factoryAddress, factoryAbiContract, ticketingAbiContract } from "@/constants/contracts";

// Hook
import { useIsOwner } from "@/hooks/useIsOwner";

import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

export default function Home() {
  const client = usePublicClient();
  const { address: userAddress, isConnected } = useAccount();
  const [_isOwner, setIsOwner] = useState(false);

  const { isOwner,isOwnerStatus, isLoadingIsOwner } = useIsOwner(
    factoryAddress,
    factoryAbiContract,
    userAddress as `0x${string}`
    ); 
    
    useEffect(() => {
      const checkIsOwner = async () => {
        if (userAddress !== undefined) {
        try {
          console.log('🚀 ~ file: page.tsx:41 ~ checkIsOwner ~ setIsOwner')
          await isOwner();
          if (isOwnerStatus !== null) {
            setIsOwner(isOwnerStatus);
          }
        } catch (err) {
          console.error('index : IsOwner hook failed', err);
        }
      }
    };
    checkIsOwner();
   
  },[userAddress,isOwner,isOwnerStatus]);
  return (
    <>
    <div className="">
      <p>
      address : { userAddress}
      </p>
      <p>
      isConnected : { _isOwner && "true"}

      </p>
    </div>

      {/* <Hero />
      <Speakers />
      <Schedule />
      <Sponsors />
      <Newsletter /> */}
    </>
  )
}
