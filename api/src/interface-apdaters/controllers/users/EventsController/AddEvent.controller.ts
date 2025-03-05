// src/interface-adapters/controllers/AddEventController.ts
import { Request, Response } from "express";
import { AddEvent } from "../../../../use-cases/user/Events/AddEvent";
import { Event } from "../../../../entities/modelInterface/Event";

export class AddEventController {
    constructor(private addEventUseCase: AddEvent) {} 
  
    async addEvent(req: Request, res: Response): Promise<void> {
      try {
        const eventData: Event = req.body;
  
        const event = await this.addEventUseCase.execute(eventData); 
        res.status(201).json({ success: true, event });
      } catch (error: any) {
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message,
        });
      }
    }
  }