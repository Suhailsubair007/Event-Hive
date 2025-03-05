import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser, googleLogin } from "../../../services/Auth/authService";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { setUserDetails } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

interface GoogleLoginData {
  name: string;
  email: string;
  sub: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      const userData = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        hasCompletedPreferences: true,
        location: data.user.location,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      if (data.success) {
        toast.success("Login Successful");
        dispatch(setUserDetails(userData));
        navigate("/landing");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    },
    onError: () => {
      toast.error("An error occurred while logging in. Please try again.");
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      console.log(data, "data after google login");
      const userData = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        hasCompletedPreferences: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      dispatch(setUserDetails(userData));
      toast.success("Google Login successful!");
      navigate("/landing");
    },
    onError: (error: any) => {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Google login failed. Please try again.");
      }
    },
  });

  const handleLogin = () => {
    mutation.mutate({ email, password });
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed. No credentials received.");
      return;
    }

    const decodedToken: any = jwtDecode(credentialResponse.credential);

    const googleLoginData: GoogleLoginData = {
      name: decodedToken.name,
      email: decodedToken.email,
      sub: decodedToken.sub,
    };

    console.log("Decoded JWT Data:", googleLoginData);

    googleLoginMutation.mutate(googleLoginData);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <Card className="w-full max-w-md mx-auto my-auto p-8 shadow-none border-0">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          <div className="text-center">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Button
              variant="link"
              className="p-0 text-[#7848F4]"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block relative bg-[url('https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Hello Friend</h2>
          <p className="text-lg max-w-md">
            To keep connected with us provide us with your information
          </p>
          <Button
            variant="ghost"
            className="text-white bg-transparent border-transparent hover:bg-white/10"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
