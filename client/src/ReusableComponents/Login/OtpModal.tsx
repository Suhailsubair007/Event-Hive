import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type OTPVerificationProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email: string;
  resendOtp: () => void;
};

export function OTPVerification({ isOpen, onClose, onVerify, email, resendOtp }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const [timer, setTimer] = useState<number>(120); // 2 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === otp.length) {
      onVerify(enteredOtp);
    } else {
      alert('Please enter all OTP digits.');
    }
  };

  const handleResend = () => {
    setTimer(120);
    setOtp(['', '', '', '', '']);
    resendOtp();
  };

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Verify OTP</DialogTitle>
        </DialogHeader>
        <div className="text-center mb-4">
          We've sent an email with an activation code to your email {email}
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg border border-[#7848F4] focus:ring-[#7848F4] focus:border-[#7848F4]"
            />
          ))}
        </div>
        <div className="text-center mb-4">
          {timer > 0 ? (
            <p>Send code again in {formatTime(timer)}</p>
          ) : (
            <Button variant="link" onClick={handleResend} className="text-[#7848F4] hover:underline">
              Resend
            </Button>
          )}
        </div>
        <Button 
          onClick={handleVerify} 
          className="w-full bg-[#7848F4] hover:bg-[#6a40db] text-white"
        >
          Verify
        </Button>
      </DialogContent>
    </Dialog>
  );
}
