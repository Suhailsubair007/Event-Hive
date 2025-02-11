import { useState, ChangeEvent } from "react";
import { Mail, Phone, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPVerification } from "../../../ReusableComponents/Login/OtpModal"; // Import OTP modal
import axiosInstance from "@/config/axiosInstence";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ErrorsState {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Signup() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({});
  const [otpModal, setOtpModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error on change
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorsState = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid Email";
    if (!form.phone.match(/^\+?\d{10,15}$/))
      newErrors.phone = "Invalid Phone Number";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/send-otp", {
        email: form.email,
      });

      console.log("Respose data====>",response.data);

      if (response.data.success) {
        setOtpModal(true);
      } else {
        console.log("Failed to send OTP, try again.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      console.log("Error sending OTP.")
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative bg-[url('https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg max-w-md mb-8">
            Already have an account? Sign in to continue your journey with us
          </p>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign in
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto my-auto p-8 shadow-none border-0">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">
              Enter your details to register with us
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: "fullName", label: "Full Name", icon: User, type: "text" },
              { id: "email", label: "Email", icon: Mail, type: "email" },
              { id: "phone", label: "Phone Number", icon: Phone, type: "tel" },
              { id: "password", label: "Password", icon: Lock, type: "password" },
              { id: "confirmPassword", label: "Confirm Password", icon: Lock, type: "password" },
            ].map(({ id, label, icon: Icon, type }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id={id}
                    type={type}
                    placeholder={label}
                    className="h-12 pl-10"
                    value={form[id as keyof FormState]}
                    onChange={handleChange}
                  />
                </div>
                {errors[id as keyof ErrorsState] && <p className="text-red-500 text-sm">{errors[id as keyof ErrorsState]}</p>}
              </div>
            ))}
          </div>

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-12 text-lg bg-[#7848F4] hover:bg-[#7848F4]/90"
          >
            {loading ? "Sending OTP..." : "Create Account"}
          </Button>
        </CardContent>
      </Card>

      {/* OTP Modal */}
      <OTPVerification
        isOpen={otpModal}
        onClose={() => setOtpModal(false)}
        onVerify={(otp: string) => console.log("Verifying OTP:", otp)}
        email={form.email}
        resendOtp={() => console.log("Resending OTP")}
      />
    </div>
  );
}
