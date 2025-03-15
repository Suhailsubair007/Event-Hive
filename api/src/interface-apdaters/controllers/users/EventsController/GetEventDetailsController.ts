import { Request, Response } from "express";
import { GetEventDetails } from "../../../../use-cases/user/Events/GetEventDetails";

export class GetEventDetailsController {
  constructor(private getEventDetailsController: GetEventDetails) {}

  async getEventDetails(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.eventId;

      const event = await this.getEventDetailsController.execute(eventId);
      res.status(200).json({ success: true, event });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
