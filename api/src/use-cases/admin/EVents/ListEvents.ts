// src/application/use-cases/ListAllEvents.ts
import { IEventRepository } from "../../../entities/repositoryInterface/Admin/interface.events.Repository";
import { Event } from "../../../entities/modelInterface/Event";

export class ListAllEvents {
  constructor(private eventRepository: IEventRepository) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<Event[]> {
    return this.eventRepository.listAllEvents(page, limit);
  }
}
