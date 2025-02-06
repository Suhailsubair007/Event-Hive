import {UserModal} from '../../../entities/models/User'
import {securePassword} from '../../../shared/utils/passwordHashUtil'
import {RegisterUserDTO} from '../../../shared/dto/UserDto'
import {CustomError}from '../../../shared/utils/CustomError'

export class RegisterUser {
    async execute(userData: RegisterUserDTO): Promise<{ email: string; name: string; phone: string }> {
      const { email, password } = userData;
  

      const existingUser = await UserModal.findOne({ email });
      if (existingUser) {
        throw new CustomError("User already exists" , 400);
      }

      const hashedPassword = await securePassword(password);
  
      // Create new user
      const newUser = new UserModal({ ...userData, password: hashedPassword });
      await newUser.save();
  
      // Return user data without password
      return {
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone || '',
      };
    }
  }