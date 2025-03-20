// src/application/use-cases/BookEvent.ts
import { IBookingRepository } from "../../../entities/repositoryInterface/User/interface.BookingRepository";
import { Booking } from "../../../entities/modelInterface/Booking";
import { Transaction } from "../../../entities/modelInterface/Wallet";
import { CustomError } from "../../../shared/utils/CustomError";
import { Types } from "mongoose";
import { IWalletRepository } from "../../../entities/repositoryInterface/User/interface.WaleetRepository";

export class BookEvent {
  constructor(
    private bookingRepository: IBookingRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(booking: Booking): Promise<Booking> {
    const { userId, eventId, tickets, totalAmount, paymentMethod } = booking;
    const eventIdString = eventId.toString();

    const event = await this.bookingRepository.findEventById(eventIdString);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    if (paymentMethod === "wallet") {
      const userWallet = await this.walletRepository.findWalletByUser(userId);
      if (!userWallet) {
        throw new CustomError("Wallet not found", 404);
      }
      if (userWallet.balance < totalAmount) {
        throw new CustomError("Insufficient wallet balance", 400);
      }

      const transaction: Transaction = {
        booking_id: new Types.ObjectId(),
        transaction_date: new Date(),
        transaction_type: "debit",
        transaction_status: "completed",
        amount: totalAmount,
      };

      await this.walletRepository.updateWalletBalance(
        userId,
        -totalAmount,
        transaction
      );
    }

    await this.bookingRepository.updateEventTickets(eventIdString, tickets);
    return this.bookingRepository.createBooking(booking);
  }
}
