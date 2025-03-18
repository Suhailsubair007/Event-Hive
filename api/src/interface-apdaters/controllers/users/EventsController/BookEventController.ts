// src/interface-adapters/controllers/BookEventController.ts
import { Request, Response } from "express";
import { BookEvent } from "../../../../use-cases/user/Events/BookEvent";
import { Booking } from "../../../../entities/modelInterface/Booking";

export class BookEventController {
  constructor(private bookEventController: BookEvent) {}

  async bookEvent(req: Request, res: Response): Promise<void> {
    try {
      const { userId, eventId, tickets, qrCode, totalAmount, paymentMethod } =
        req.body;

      const booking: Booking = {
        userId,
        eventId,
        tickets,
        bookingStatus: "pending",
        bookingDate: new Date(),
        qrCode,
        totalAmount,
        paymentMethod,
      };

      const newBooking = await this.bookEventController.execute(booking);
      res.status(201).json({ success: true, booking: newBooking });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
