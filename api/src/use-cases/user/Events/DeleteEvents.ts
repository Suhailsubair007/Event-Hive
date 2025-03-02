// src/application/use-cases/DeleteEvent.ts
import { IEventRepository } from "../../../entities/repositoryInterface/User/interface.EventRepository";

export class DeleteEvent {
  constructor(private eventRepository: IEventRepository) {}

  async execute(eventId: string): Promise<void> {
    await this.eventRepository.deleteEvent(eventId);
  }
}