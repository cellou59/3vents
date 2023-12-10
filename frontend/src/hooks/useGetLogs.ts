import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { parseAbiItem } from 'viem'


export const useGetLogs = (contractAddress:`0x${string}`, eventSignature:string) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const parsedEvent = parseAbiItem(eventSignature);
        if (parsedEvent && parsedEvent.type === 'event') {
            const newLogs = await publicClient.getLogs({
                address: contractAddress,
                event: parsedEvent,
                fromBlock:BigInt(0),
                toBlock: "latest",
            });
            setLogs(newLogs);
           // console.log('🚀 ~ file: useGetLogs.ts:23 ~ fetchLogs ~ newLogs:', newLogs)
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [contractAddress,publicClient,eventSignature]);

  return { logs, loading };
};
