import { Iuser } from "../../modelInterface/User";

export interface IUpdateProfileRepository {
  updateUser(id: string, updates: Partial<Iuser>): Promise<Iuser | null>;
}
