import otpGenerator from "otp-generator";

export const generateOTP = (): string => {
  return otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};
