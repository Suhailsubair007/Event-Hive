import { Request, Response } from "express";
import { VerifyOtp } from "../../../../use-cases/user/Auth/verifyOtp";

export class VerifyOtpController {
  constructor(private verifyOtp: VerifyOtp) {}

  async verifyOTP(req: Request, res: Response) {
    try {
        const {email,otp} = req.body;
        await this.verifyOtp.execute(email,otp);
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  }
}
