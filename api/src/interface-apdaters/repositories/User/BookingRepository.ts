// src/infrastructure/repositories/BookingRepository.ts
import { IBookingRepository } from "../../../entities/repositoryInterface/User/interface.BookingRepository";
import {
  Booking,
  BookingTicket,
} from "../../../entities/modelInterface/Booking";
import { BookingModel } from "../../../frameworks/databaseModels/BookingModel";
import { EventModel } from "../../../frameworks/databaseModels/EventModel";
import { CustomError } from "../../../shared/utils/CustomError";

export class BookingRepository implements IBookingRepository {
  async createBooking(booking: Booking): Promise<Booking> {
    const newBooking = new BookingModel(booking);
    await newBooking.save();
    return newBooking;
  }

  async findEventById(eventId: string): Promise<Event | null> {
    return EventModel.findById(eventId);
  }

  async updateEventTickets(
    eventId: string,
    tickets: BookingTicket[]
  ): Promise<void> {
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    // Update available seats for each ticket type
    for (const ticket of tickets) {
      const eventTicket = event.tickets.find((t) => t.type === ticket.type);
      if (!eventTicket) {
        throw new CustomError(`Ticket type ${ticket.type} not found`, 400);
      }
      if (eventTicket.availableSeats < ticket.quantity) {
        throw new CustomError(
          `Not enough seats available for ${ticket.type} tickets`,
          400
        );
      }
      eventTicket.availableSeats -= ticket.quantity;
      eventTicket.sold += ticket.quantity;
    }

    await event.save();
  }
}
