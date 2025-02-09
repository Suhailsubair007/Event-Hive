import { Apple, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignIn() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Sign In Form */}
      <Card className="w-full max-w-md mx-auto my-auto p-8 shadow-none border-0">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Enter your Credentials to access your account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" placeholder="Enter your email" type="email" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" type="password" className="h-12" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button variant="link" className="text-primary p-0">
              Forgotten password
            </Button>
          </div>

          <Button className="w-full h-12 text-lg bg-primary" size="lg">
            Sign in
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" className="h-12">
              <Mail className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="h-12">
              <Apple className="mr-2 h-5 w-5" />
              Sign in with Apple
            </Button>
          </div>

          <div className="text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0">
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right side - Hero Image */}
      <div className="hidden md:block relative bg-[url('https://res.cloudinary.com/dupo7yv88/image/upload/v1739121652/j7pvzchdwhlyrn2ffxed.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">Hello Friend</h2>
          <p className="text-lg max-w-md">To keep connected with us provide us with your information</p>
            <Button variant="outline" className="mt-6 text-black border-white">
            Sign up
            </Button>
        </div>
      </div>
    </div>
  )
}

