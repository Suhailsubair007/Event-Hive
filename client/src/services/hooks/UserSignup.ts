import { useMutation } from "@tanstack/react-query";
import { sendOtp, SignupData } from "../Auth/authService";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => sendOtp(data),
  });
};
