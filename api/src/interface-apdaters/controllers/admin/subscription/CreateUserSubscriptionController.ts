import { Request, Response } from "express";
import { CreateUserSubscription } from "../../../../use-cases/admin/Subascription/CreateUserSubscription";

export class CreateUserSubscriptionController {
  constructor(private createUserSubscription: CreateUserSubscription) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userSubscriptionData = req.body;
      const userSubscription = await this.createUserSubscription.execute(
        userSubscriptionData
      );
      res.status(201).json({ success: true, userSubscription });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
