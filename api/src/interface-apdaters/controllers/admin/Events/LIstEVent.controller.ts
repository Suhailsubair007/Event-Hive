// src/interface-adapters/controllers/ListAllEventsController.ts
import { Request, Response } from "express";
import { ListAllEvents } from "../../../../use-cases/admin/EVents/ListEvents";

export class ListAllEventsController {
  constructor(private listAllEventsController: ListAllEvents) {}

  async listAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const events = await this.listAllEventsController.execute(page, limit);
      res.status(200).json({ success: true, events });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
