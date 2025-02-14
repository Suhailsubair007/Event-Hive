export interface Iuser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  profilePic?: string;
  role?: string;
  googleId?: string;
  isActive?: boolean;
  isPremiumUser?: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  preferences?: string[];
  timestamp?: Date;
  is_blocked?: boolean;
}

