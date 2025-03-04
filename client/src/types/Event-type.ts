export interface Ticket {
  type: "normal" | "VIP"
  price: number
  availableSeats: number
  sold: number
}

export interface Location {
  latitude: number
  longitude: number
  address: string
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  tickets: Ticket[]; // Ensure Ticket interface supports both "normal" and "VIP"
  tags: string[];
  location: Location;
  posterImageUrl: string;
  category: string;
  status: "upcoming" | "completed";
}

export interface EventFormData {
  title: string
  description: string
  eventDate: string
  startTime: string
  endTime: string
  normalTicketPrice: number
  normalTicketCount: number
  hasVipTicket: boolean
  vipTicketPrice: number
  vipTicketCount: number
  tags: string[]
  location: Location
  posterImageUrl: string
  category: string
}