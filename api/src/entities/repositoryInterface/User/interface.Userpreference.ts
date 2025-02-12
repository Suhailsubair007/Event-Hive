import { Iuser } from "../../modelInterface/User";

export interface IUserPreferenceRepository {
    findByEmail(email: string): Promise<Iuser | null>;
    updateUser(email: string, preferences: string[], location: { latitude: number; longitude: number }): Promise<Iuser>;
  }