"use client";

import { useAccount, usePublicClient } from "wagmi";

import { useSearchParams  } from 'next/navigation'
import { useEffect,useState } from 'react'

import { Performer } from "@/types/types";
import Purchase from '@/components/Purchase';

export default function EventPage() {
  const searchParams = useSearchParams()
  const [performer, setPerformer] = useState<Performer | null>(null);
 
  useEffect(() => {
    const dataParams = searchParams.get('data');
    const dataObject = JSON.parse(dataParams || '{}');
    console.log('🚀 ~ file: page.tsx:16 ~ useEffect ~ dataObject:', dataObject)
    setPerformer(dataObject);
   
  }, [searchParams])

  return(
    <>
     <Purchase performer={performer}/>  
    </>
  ) 
}
  
 

