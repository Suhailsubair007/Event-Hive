import axiosInstance from "@/config/axiosInstence";

export interface BookingTicket {
  type: string;
  quantity: number;
  price: number;
}

export interface BookingRequest {
  userId: string;
  eventId: string;
  tickets: BookingTicket[];
  qrCode?: string;
  totalAmount: number;
  paymentMethod: string;
}

export interface BookingResponse {
  bookingId: string;  
  userId: string;
  eventId: string;
  tickets: BookingTicket[];
  qrCode: string;
  totalAmount: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export const bookEvent = async (bookingData: BookingRequest): Promise<BookingResponse> => {
  try {
    const response = await axiosInstance.post("/event/book", bookingData);
    console.log("After booking responce ====>",response.data);
    const booking = response.data.booking;
    
    return {
      bookingId: booking._id || booking.bookingId,
      userId: booking.userId,
      eventId: booking.eventId,
      tickets: booking.tickets.map((ticket: any) => ({
        type: ticket.type,
        quantity: ticket.quantity,
        price: ticket.price
      })),
      qrCode: booking.qrCode,
      totalAmount: booking.totalAmount,
      paymentMethod: booking.paymentMethod,
      status: booking.status || "confirmed",
      createdAt: booking.createdAt || new Date().toISOString()
    };
  } catch (error) {
    console.error("Error booking event:", error);
    throw error;
  }
};

