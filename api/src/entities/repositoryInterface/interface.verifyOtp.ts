import { IOTP } from "../../entities/modelInterface/otp.interface";

export interface IOTPVerifyRepository {
  findLatestOTPByEmail(email: string): Promise<IOTP | null>;
}
