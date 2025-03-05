import { Request, Response } from "express";
import { ListEvents } from "../../../../use-cases/user/Events/ListEvents";

export class ListEventsController {
  constructor(private listEventsController: ListEvents) {}

  async listEvents(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const clientId = req.query.clientId as string | undefined;

      const events = await this.listEventsController.execute(
        page,
        limit,
        clientId
      );
      res.status(200).json({ success: true, events });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
