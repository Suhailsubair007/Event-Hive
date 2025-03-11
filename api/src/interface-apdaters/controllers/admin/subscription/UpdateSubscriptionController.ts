import { Request, Response } from "express";
import { UpdateSubscription } from "../../../../use-cases/admin/Subascription/UpdateSubscription";

export class UpdateSubscriptionController {
  constructor(private updateSubscription: UpdateSubscription) {}

  async update(req: Request, res: Response): Promise<void> {
    try {
      const subscriptionId = req.params.id;
      const updates = req.body;

      const subscription = await this.updateSubscription.execute(
        subscriptionId,
        updates
      );
      res.status(200).json({ success: true, subscription });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
