import { Schema, model, Document, Types } from "mongoose";
import { Booking, BookingTicket } from "../../entities/modelInterface/Booking";

const BookingTicketSchema = new Schema<BookingTicket>({
  type: { type: String, enum: ["normal", "VIP"], required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const BookingSchema = new Schema<Booking & Document>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    tickets: { type: [BookingTicketSchema], required: true },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    bookingDate: { type: Date, default: Date.now },
    qrCode: { type: String, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ["stripe", "wallet"], required: true },
  },
  { timestamps: true }
);

// Create the Booking model
export const BookingModel = model<Booking & Document>("Booking", BookingSchema);