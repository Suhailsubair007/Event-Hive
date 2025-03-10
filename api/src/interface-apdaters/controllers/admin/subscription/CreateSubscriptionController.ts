import { Request, Response } from "express";
import { CreateSubscription } from "../../../../use-cases/admin/Subascription/CreateSubscription";

export class CreateSubscriptionController {
  constructor(private createSubscription: CreateSubscription) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const subscriptionData = req.body;
      const subscription = await this.createSubscription.execute(
        subscriptionData
      );
      res.status(201).json({ success: true, subscription });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
