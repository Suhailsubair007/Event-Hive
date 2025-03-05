
import { Request, Response } from "express";
import { EditEvent } from "../../../../use-cases/user/Events/EditEvent";

export class EditEventController {
  constructor(private editEventUsecase: EditEvent) {}

  async editEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.eventId;
      const eventData = req.body;
      console.log(eventId, eventData);
      console.log("reached here");

      const event = await this.editEventUsecase.execute(eventId, eventData);
      res.status(200).json({ success: true, event });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}