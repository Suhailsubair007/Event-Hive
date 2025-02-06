import { IOTPRepository } from "../../../entities/repositoryInterface/interface.OtpRepository";
import { generateOTP } from "../../../shared/utils/otpGenarator";

export class SendOTP {
  constructor(private otpRepository: IOTPRepository) {}

  async execute(email: string): Promise<{ success: boolean; message: string; otp?: string }> {
    const existingOTP = await this.otpRepository.findByEmail(email);
    if (existingOTP) {
      return { success: false, message: "OTP already sent. Please wait." };
    }

    let otp = generateOTP();
    let existingOTPRecord = await this.otpRepository.findByEmail(otp);
    
    while (existingOTPRecord) {
      otp = generateOTP();
      existingOTPRecord = await this.otpRepository.findByEmail(otp);
    }

    await this.otpRepository.createOTP({ email, otp });

    return { success: true, message: "OTP sent successfully", otp };
  }
}
