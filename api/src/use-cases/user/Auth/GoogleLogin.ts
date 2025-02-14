import { IUserRepository } from "../../../entities/repositoryInterface/User/Interface.userRepository";
import { Iuser } from "../../../entities/modelInterface/User";


export class GoogleSignUp {
    constructor(private userRepository: IUserRepository) {}
  
    async execute(name: string, email: string, googleId: string): Promise<Iuser> {
      let user = await this.userRepository.findByEmail(email);
  
      if (!user) {
        user = await this.userRepository.createUser({
          name,
          email,
          googleId,
        });
      }
  
      return user;
    }
  }