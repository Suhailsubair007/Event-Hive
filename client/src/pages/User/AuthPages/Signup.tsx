import { Mail, Phone, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block relative bg-[url('https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg max-w-md mb-8">
            Already have an account? Sign in to continue your journey with us
          </p>
          <Button
            variant="ghost"
            className="text-white bg-transparent border-transparent hover:bg-white/10"
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <Card className="w-full max-w-md mx-auto my-auto p-8 shadow-none border-0">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">
              Enter your details to register with us
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className="h-12 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="h-12 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="h-12 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-12 pl-10"
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg bg-[#7848F4] hover:bg-[#7848F4]/90"
            size="lg"
          >
            Create Account
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" className="h-12">
              <Mail className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </div>

          <div className="text-center md:hidden">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Button variant="link" className="p-0">
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
