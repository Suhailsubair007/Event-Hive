import { Event } from "../../modelInterface/Event";

export interface IEventRepository {
  addEvent(event: Event): Promise<Event>;
  updateEvent(eventId: string, event: Partial<Event>): Promise<Event | null>;
  findEventByTitle(title: string): Promise<Event | null>;
  markExpiredEvents(): Promise<void>;
  listEvents(page: number, limit: number): Promise<Event[]>;
  deleteEvent(eventId: string): Promise<void>
}
