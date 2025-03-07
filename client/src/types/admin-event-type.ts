export interface Location {
    latitude: number
    longitude: number
    address: string
  }
  
  export interface Client {
    _id: string
    name: string
    email: string
  }
  
  export interface Ticket {
    type: string
    price: number
    availableSeats: number
    sold: number
    _id: string
  }
  
  export interface Event {
    _id: string
    clientId: Client
    title: string
    description: string
    eventDate: string
    startTime: string
    endTime: string
    tickets: Ticket[]
    tags: string[]
    posterImageUrl: string
    category: string
    attendees: any[]
    location: Location
    createdAt: string
    updatedAt: string
    status: string
    id: string
  }
  
  export interface EventsResponse {
    success: boolean
    events: Event[]
  }
  
  export interface PaginationParams {
    page: number
    limit: number
  }
  
  