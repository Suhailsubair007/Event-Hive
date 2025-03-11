export interface UserSubscription {
  userId: string;
  planId: string;
  startDate?: Date;
  endDate: Date;
  isActive?: boolean;
  paymentStatus?: "pending" | "paid" | "failed";
}