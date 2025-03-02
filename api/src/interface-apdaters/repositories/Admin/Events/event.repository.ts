// src/infrastructure/repositories/EventRepository.ts
import { IEventRepository } from "../../../../entities/repositoryInterface/Admin/interface.events.Repository";
import { Event } from "../../../../entities/modelInterface/Event";
import { EventModel } from "../../../../frameworks/databaseModels/EventModel";
import { CustomError } from "../../../../shared/utils/CustomError";

export class EventRepository implements IEventRepository {

  async listAllEvents(
    page: number,
    limit: number,
  ): Promise<Event[]> {
    const query: any = {};


    return EventModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}
