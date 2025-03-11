

export interface ISubscription {
  name: string;
  description?: string;
  posterImage?: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  maxEvents: number;
  duration: number;
  expiresIn: Date;
}
