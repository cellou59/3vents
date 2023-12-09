export interface Day {
    name: string
    date: React.ReactNode
    dateTime: string
    artists: Artist[]
}
export interface Artist{
    description: string | null
    type: string
    time: string
    image: string
    location: string
    price: number
    status: string
}