import { IEventRepository } from "../../../entities/repositoryInterface/User/interface.EventRepository";
import { CustomError } from "../../../shared/utils/CustomError";
import { Event } from "../../../entities/modelInterface/Event";

export class GetEventDetails {
  constructor(private eventRepository: IEventRepository) {}

  async execute(eventId: string): Promise<Event | null> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }
    return event;
  }
}
