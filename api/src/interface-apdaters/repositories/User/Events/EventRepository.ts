import { IEventRepository } from "../../../../entities/repositoryInterface/User/interface.EventRepository";
import { Event } from "../../../../entities/modelInterface/Event";
import { EventModel } from "../../../../frameworks/databaseModels/EventModel";
import { CustomError } from "../../../../shared/utils/CustomError";

export class EventRepository implements IEventRepository {
  async addEvent(event: Event): Promise<Event> {
    const existingEvent = await this.findEventByTitle(event.title);
    if (existingEvent) {
      throw new CustomError("Event with this title already exists", 400);
    }

    const newEvent = new EventModel(event);
    await newEvent.save();
    return newEvent;
  }

  async updateEvent(
    eventId: string,
    event: Partial<Event>
  ): Promise<Event | null> {
    if (event.title) {
      const existingEvent = await this.findEventByTitle(event.title);
      if (existingEvent && existingEvent?._id?.toString() !== eventId) {
        throw new CustomError("Event with this title already exists", 400);
      }
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, event, {
      new: true,
    });
    return updatedEvent;
  }

  async findEventByTitle(title: string): Promise<(Event & Document) | null> {
    return EventModel.findOne({ title });
  }

  async markExpiredEvents(): Promise<void> {
    const currentDate = new Date();
    await EventModel.updateMany(
      { eventDate: { $lt: currentDate }, isExpired: false },
      { isExpired: true }
    );
  }

  async listEvents(
    page: number,
    limit: number,
    clientId?: string
  ): Promise<Event[]> {
    const query = clientId ? { clientId } : {};
    return EventModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec()
      .then((events) =>
        events.map((event) => ({
          ...event,
          status: event.eventDate < new Date() ? "Expired" : "Upcoming",
        }))
      );
  }
  async deleteEvent(eventId: string): Promise<void> {
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw new CustomError("Event not found", 404);
    }
  }

  async findById(eventId: string): Promise<Event | null> {
    return EventModel.findById(eventId)
      .populate("clientId", "name email")
      .lean()
      .exec();
  }
}
