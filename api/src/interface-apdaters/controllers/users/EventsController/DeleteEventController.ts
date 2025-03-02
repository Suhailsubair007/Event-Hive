// src/interface-adapters/controllers/DeleteEventController.ts
import { Request, Response } from "express";
import { DeleteEvent } from "../../../../use-cases/user/Events/DeleteEvents";

export class DeleteEventController {
  constructor(private deleteEventController: DeleteEvent) {}

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.eventId;
      await this.deleteEventController.execute(eventId);

      res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}