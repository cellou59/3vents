'use client';

import { useState, useEffect, useCallback } from "react";

// Viem
import { parseAbiItem } from "viem";

import { useAccount, usePublicClient } from "wagmi";

// Contract Infos
import { factoryAddress, factoryAbiContract, ticketingAbiContract } from "@/constants/contracts";

// Hook
import { useIsOwner } from "@/hooks/useIsOwner";
import { useGetLogs } from "@/hooks/useGetLogs";

import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

import { LogEvent, EventLogInfo, Event } from "@/types/types";

export default function Home() {
  const client = usePublicClient();
  const { address: userAddress } = useAccount();
  const [_isOwner, setIsOwner] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);;

  const { isOwner,isOwnerStatus, isLoadingIsOwner } = useIsOwner(
    factoryAddress,
    factoryAbiContract,
    userAddress as `0x${string}`
  ); 
  const { logs:eventCreatedLogs, loading } = useGetLogs(
    factoryAddress,
    'event EventCreated(uint256 indexed eventId, string name, uint8 _evenType,string location, uint256 date, uint256 ticketPrice, uint256 totalTickets,address indexed eventAddress)'
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
  },[userAddress,isOwner]);
  
  useEffect(() => {
    const EventTypeMap : { [key: number]: string } = {
      0: "Concert",
      1: "Performance",
      2: "Workshop",
      3: "Conference",
      4: "Exhibition",
    };
    const handleFormatEvents = async () => {
      if(eventCreatedLogs.length > 0){
        const eventsCreated = eventCreatedLogs.map((log: LogEvent) => {
          
          const eventInfo:EventLogInfo = log.args
  
          const eventId = Number(eventInfo.eventId);
          const date = Number(eventInfo.date);
          const ticketPrice = Number(eventInfo.ticketPrice);
          const totalTickets = Number(eventInfo.totalTickets);
    
          const evenTypeString = EventTypeMap[eventInfo._evenType] || "Unknown";
    
          return {
            date: date,
            eventAddress: eventInfo.eventAddress,
            eventId: eventId,
            location: eventInfo.location,
            name: eventInfo.name,
            ticketPrice: ticketPrice,
            totalTickets: totalTickets,
            evenType: evenTypeString,
          };
        });
        if(eventsCreated.length > 0 ){
          setEvents(eventsCreated);
          console.log('🚀 ~ file: page.tsx:94 ~ handleFormatEvents ~ events:')
        } 
      }
    };
    handleFormatEvents();
  },[eventCreatedLogs]);

  return (
    <>
      <Hero />
      <Speakers events={events} />
      <Schedule events={events} /> 
      <Sponsors />
      <Newsletter />
    </>
  )
}
