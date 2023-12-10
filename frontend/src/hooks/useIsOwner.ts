import { readContract } from "@wagmi/core";
import { useState, useCallback } from "react";

export const useIsOwner = (
  contractAddress: `0x${string}`,
  abi: unknown,
  userAddress: string
) => {
  const [isLoadingIsOwner, setIsLoading] = useState(false);
  const [isOwnerStatus, setIsOwnerStatus] = useState<boolean | null>(null);

  const isOwner = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "isOwner",
        args: [userAddress],
      });
      setIsOwnerStatus(result); 
    } catch (err) {
      console.error("Error useIsOwner hook: ", err.message);
      setIsOwnerStatus(null);
    } finally {
      setIsLoading(false);
    }
  }, [contractAddress, abi, userAddress]);

  return { isOwner, isLoadingIsOwner, isOwnerStatus };
};
