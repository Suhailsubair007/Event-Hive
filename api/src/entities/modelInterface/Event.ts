import { Types } from "mongoose";

export interface Ticket {
  type: "normal" | "VIP";
  price: number;
  availableSeats: number;
  sold: number;
}

export interface Event {
  _id?: Types.ObjectId;
  clientId: Types.ObjectId;
  title: string;
  description: string;
  eventDate: Date;
  startTime: string;
  endTime: string;
  tickets: Ticket[];
  tags: string[];
  location: {
    latitude: number;
    longitude: number;
    address: number;
  };
  posterImageUrl: string;
  category: string; 
  attendees: Types.ObjectId[];
  status?: "Upcoming" | "Expired"; 
}
