import {Iuser} from '../modelInterface/User'

export interface IUserRepository {
    findByEmail(email: string): Promise<Iuser | null>;
  }