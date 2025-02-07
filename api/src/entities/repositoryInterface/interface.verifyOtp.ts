import { IOTP } from "../../entities/modelInterface/otp.interface";

export interface IOTPVerifyRepository {
  findOTPByEmail(email: string): Promise<IOTP | null>;
}
