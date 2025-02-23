import { IEventRepository } from "../../../entities/repositoryInterface/User/interface.EventRepository";
import { Event } from "../../../entities/modelInterface/Event";

export class EditEvent {
  constructor(private eventRepository: IEventRepository) {}

  async execute(eventId: string, event: Partial<Event>): Promise<Event | null> {

    await this.eventRepository.markExpiredEvents();

    return this.eventRepository.updateEvent(eventId, event);
  }
}