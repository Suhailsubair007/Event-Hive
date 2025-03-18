import { Booking, BookingTicket } from "../../modelInterface/Booking";

export interface IBookingRepository {
  createBooking(booking: Booking): Promise<Booking>;
  findEventById(eventId: string): Promise<Event | null>; 
  updateEventTickets(eventId: string, tickets: BookingTicket[]): Promise<void>;
}
