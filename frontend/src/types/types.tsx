export interface Day {
    name: string
    date: React.ReactNode
    dateTime: string
    performers: Performer[]
}
export interface Performer{
    name: string 
    description: string | null
    type: string
    time: string
    image: string
    location: string
    price: number
    status: string
}

export interface LogEvent {
    address: string;
    args: EventLogInfo;
    blockHash: string;
    blockNumber: bigint;
    data: string;
    eventName: string;
    logIndex: number;
    removed: boolean;
    topics: string[];
    transactionHash: string;
    transactionIndex: number;
  }
export interface EventLogInfo {
    eventId: bigint;
    name: string;
    _evenType: number;
    location: string;
    date: bigint;
    ticketPrice: bigint;
    totalTickets: bigint;
    eventAddress: `0x${string}`;
  }
export interface Event {
    eventId: number;
    name: string;
    evenType: string;
    location: string;
    date: number;
    ticketPrice: number;
    totalTickets: number;
    eventAddress: `0x${string}`;
}