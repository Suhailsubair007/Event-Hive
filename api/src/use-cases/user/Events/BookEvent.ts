// src/application/use-cases/BookEvent.ts
import { IBookingRepository } from "../../../entities/repositoryInterface/User/interface.BookingRepository";
import {
  Booking,
  BookingTicket,
} from "../../../entities/modelInterface/Booking";
import { CustomError } from "../../../shared/utils/CustomError";

export class BookEvent {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(booking: Booking): Promise<Booking> {
    const { eventId, tickets } = booking;

    const eventIdString = eventId.toString();

    const event = await this.bookingRepository.findEventById(eventIdString);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    await this.bookingRepository.updateEventTickets(eventIdString, tickets);

    return this.bookingRepository.createBooking(booking);
  }
}
