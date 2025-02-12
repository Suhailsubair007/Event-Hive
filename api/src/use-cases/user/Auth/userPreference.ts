import { IUserPreferenceRepository } from "../../../entities/repositoryInterface/User/interface.Userpreference";
import { UserPreferencesDTO } from "../../../shared/dto/userPreferenceDTO";
import { CustomError } from "../../../shared/utils/CustomError";

export class updateUserPreference {
  constructor(private userPreferenceRepository: IUserPreferenceRepository) {}

  async execute(userData: UserPreferencesDTO): Promise<void> {
    const {  email, preferences, location  } = userData;  

    const user = await this.userPreferenceRepository.findByEmail(email);

    if(!user) {
      throw new CustomError('User not found', 404);
    }

    await this.userPreferenceRepository.updateUser(email, preferences, location);
  }
}
