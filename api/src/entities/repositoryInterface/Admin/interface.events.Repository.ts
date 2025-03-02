import { Event } from "../../../entities/modelInterface/Event";

export interface IEventRepository {
    listAllEvents(page: number, limit: number): Promise<Event[]>; 
  }