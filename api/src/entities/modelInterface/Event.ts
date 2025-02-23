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
  };
  posterImageUrl: string;
  category: Types.ObjectId; // Reference to the Category collection
  attendees: Types.ObjectId[]; // Array of user IDs who booked tickets
  isExpired: boolean; // To mark expired events
}
