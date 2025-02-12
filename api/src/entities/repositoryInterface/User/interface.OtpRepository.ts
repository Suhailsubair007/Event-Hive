import { IOTP } from "../../modelInterface/otp.interface";

export interface IOTPRepository {
  findByEmail(email: string): Promise<IOTP | null>;
  createOTP(otpData: Partial<IOTP>): Promise<IOTP>;
}
