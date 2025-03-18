import { Types } from "mongoose";

export interface BookingTicket {
  type: "normal" | "VIP";
  quantity: number;
  price: number;
}

export interface Booking {
  userId: Types.ObjectId; 
  eventId: Types.ObjectId; 
  tickets: BookingTicket[]; 
  bookingStatus: "pending" | "confirmed" | "cancelled";
  bookingDate: Date;
  qrCode: string; 
  totalAmount: number; 
  paymentMethod: "stripe" | "wallet";
}