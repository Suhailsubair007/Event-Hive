// src/infrastructure/database/models/EventModel.ts
import { Schema, model, Document, Types } from "mongoose";
import { Event, Ticket } from "../../entities/modelInterface/Event";

const TicketSchema = new Schema<Ticket>({
  type: { type: String, enum: ["normal", "VIP"], required: true },
  price: { type: Number, required: true, min: 0 },
  availableSeats: { type: Number, required: true, min: 0 },
  sold: { type: Number, default: 0, min: 0 },
});

const EventSchema = new Schema<Event & Document>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    tickets: { type: [TicketSchema], required: true },
    tags: { type: [String], default: [] },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true },
    },
    posterImageUrl: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

EventSchema.virtual("status").get(function () {
  return this.eventDate < new Date() ? "Expired" : "Upcoming";
});

// Ensure virtuals are included in JSON output
EventSchema.set("toJSON", { virtuals: true });
EventSchema.set("toObject", { virtuals: true });

// Create the Event model
export const EventModel = model<Event & Document>("Event", EventSchema);
