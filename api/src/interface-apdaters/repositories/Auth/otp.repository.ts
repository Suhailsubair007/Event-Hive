import { IOTPRepository } from "../../../entities/repositoryInterface/interface.OtpRepository";
import {IOTP } from "../../../entities/modelInterface/otp.interface";
import {OTP} from '../../../frameworks/databaseModels/otpModal'

export class OTPRepository implements IOTPRepository {
  async findByEmail(email: string): Promise<IOTP | null> {
    return OTP.findOne({ email });
  }

  async createOTP(otpData: Partial<IOTP>): Promise<IOTP> {
    return OTP.create(otpData);
  }
}
