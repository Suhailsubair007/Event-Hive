// src/application/use-cases/ListEvents.ts
import { IEventRepository } from "../../../entities/repositoryInterface/User/interface.EventRepository";
import { Event } from "../../../entities/modelInterface/Event";

export class ListEvents {
  constructor(private eventRepository: IEventRepository) {}

  async execute(
    page: number,
    limit: number,
    clientId?: string
  ): Promise<Event[]> {
    return this.eventRepository.listEvents(page, limit, clientId);
  }
}
