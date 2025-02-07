import {IOTPVerifyRepository} from '../../../../entities/repositoryInterface/interface.verifyOtp'
import {IOTP} from '../../../../entities/modelInterface/otp.interface'
import {OTP} from '../../../../frameworks/databaseModels/otpModal'

export class OTPrepository implements IOTPVerifyRepository {
    async findLatestOTPByEmail(email: string): Promise<IOTP | null> {
        return OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
    }
}