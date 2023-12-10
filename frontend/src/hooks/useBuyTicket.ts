import { prepareWriteContract, writeContract } from "@wagmi/core";
import { parseUnits } from "viem";
import { useState, useCallback } from "react";
import {ticketingAbiContract as abi} from "@/constants/contracts";
export const UseBuyTicket = (
  contractAddress: `0x${string}`,
  eventId: bigint,
  numberOfTickets: bigint,
  classOfTicket: number[]
) => {
  const [isLoading, setIsLoading] = useState(false);
  const buyTicket = useCallback(async () => {
    setIsLoading(true);
    const value = parseUnits("30", 1);
    console.log('🚀 ~ file: useBuyTicket.ts:18 ~ buyTicket :', value)
    try {
        
      if(contractAddress !== null ){
        console.log('dd')
        const { request } = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: "buyTickets",
            args: [eventId,numberOfTickets,classOfTicket],
            value,
        });
        console.log('🚀 ~ file: useBuyTicket.ts:23 ~ buyTicket ~ request:', request)
        
        return await writeContract(request);
      }
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [contractAddress, abi, eventId]);

  return { buyTicket, isLoading };
};