import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axiosInstance from "@/config/axiosInstence";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../../redux/adminSlice";

interface AdminLoginData {
  email: string;
  password: string;
}
interface AdminLoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  success: boolean;
}

const loginAdmin = async (data: AdminLoginData) => {
  const response = await axiosInstance.post("/admin/login", data);
  return response.data;
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data:AdminLoginResponse) => {
      const adminData = {
        email: data.email,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      if (data.success) {
        dispatch(setAdminDetails(adminData));
        toast.success("Login Successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        toast.error("Invalid credentials try again!");
      } else {
        toast.error("An error occurred while logging in. Please try again.");
      }
    },
  });

  const handleLogin = () => {
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <Card className="w-full max-w-md mx-auto my-auto p-8 shadow-none border-0">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Sign In</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm leading-none">
                Remember me
              </label>
            </div>
            <Button variant="link" className="text-[#7848F4] p-0">
              Forgotten password
            </Button>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 text-lg bg-[#7848F4] hover:bg-[#7848F4]/90"
            size="lg"
          >
            Sign in
          </Button>
        </CardContent>
      </Card>

      <div className="hidden md:block relative bg-[url('https://res.cloudinary.com/dupo7yv88/image/upload/v1739121651/ta27jck9ry4frm5dakym.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Admin</h2>
          <p className="text-lg max-w-md">
            Manage the platform efficiently and securely
          </p>
          <Button
            variant="ghost"
            className="text-white bg-transparent border-transparent hover:bg-white/10"
          >
            Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
