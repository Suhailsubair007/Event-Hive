export interface Iuser {
  name: string;
  email: string;
  password: string;
  gender?: string;
  phone?: string;
  profilePic?: string;
  role?: string;
  isActive?: boolean;
  isPremiumUser?: boolean;
  timestamp?: Date;
}
