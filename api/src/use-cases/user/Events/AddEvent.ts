// src/application/use-cases/AddEvent.ts
import { IEventRepository } from "../../../entities/repositoryInterface/User/interface.EventRepository";
import { Event } from "../../../entities/modelInterface/Event";

export class AddEvent {
  constructor(private eventRepository: IEventRepository) {}

  async execute(event: Event): Promise<Event> {
    await this.eventRepository.markExpiredEvents();
    return this.eventRepository.addEvent(event);
  }
}