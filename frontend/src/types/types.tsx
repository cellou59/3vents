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