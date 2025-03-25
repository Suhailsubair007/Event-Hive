// src/interface-adapters/controllers/BookEventController.ts
import { Request, Response } from "express";
import { BookEvent } from "../../../../use-cases/user/Events/BookEvent";
import { Booking } from "../../../../entities/modelInterface/Booking";
import { IWalletRepository } from "../../../../entities/repositoryInterface/User/interface.WaleetRepository";

export class BookEventController {
  constructor(
    private bookEventController: BookEvent,
    private walletRepository: IWalletRepository
  ) {}

  async bookEvent(req: Request, res: Response): Promise<void> {
    try {
      const { userId, eventId, tickets, qrCode, totalAmount, paymentMethod } =
        req.body;
        console.log("User ID: ", userId);
        console.log("Event ID: ", eventId);
        console.log("Tickets: ", tickets);
        console.log("QR Code: ", qrCode);
        console.log("Total Amount: ", totalAmount);
        console.log("Payment Method: ", paymentMethod);
        

        console.log("I reached here");

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
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
