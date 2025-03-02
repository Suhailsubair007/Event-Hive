"use client"

import { useState, useRef } from "react"
import { Mail, Phone, ChevronDown, Camera, LogOut, Settings, User, Bell } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface ProfileData {
  fullName: string
  nickName: string
  gender: string
  country: string
  mobile: string
  email: string
  profileImage: string
}

interface ProfileUpdateProps {
  initialData?: ProfileData
  onSave?: (data: ProfileData) => void
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({
  initialData = {
    fullName: "Alexa Rawles",
    nickName: "",
    gender: "",
    country: "",
    mobile: "",
    email: "alexarawles@gmail.com",
    profileImage:
      "https://res.cloudinary.com/dupo7yv88/image/upload/v1732614199/qdz6o8oynxlnsxwow3qd.jpg",
  },
  onSave = () => {},
}) => {
  const [profileData, setProfileData] = useState<ProfileData>(initialData)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave(profileData)
    setIsEditing(false)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with avatar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-gray-800"
        >
          My Profile
        </motion.h1>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Avatar className="h-9 w-9 ring-2 ring-primary/10 ring-offset-1">
                  <AvatarImage src={profileData.profileImage} alt={profileData.fullName} />
                  <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileData.profileImage} alt={profileData.fullName} />
                  <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{profileData.fullName}</p>
                  <p className="text-xs text-muted-foreground">{profileData.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10"
                >
                  <img
                    src={profileData.profileImage || "/placeholder.svg?height=80&width=80"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {isEditing && (
                  <button 
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg"
                  >
                    <Camera size={14} />
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          // In a real app, you'd upload this file and get a URL back
                          const fakeUrl = URL.createObjectURL(e.target.files[0])
                          handleChange("profileImage", fakeUrl)
                        }
                      }}
                    />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{profileData.fullName}</h2>
                <p className="text-gray-500">{profileData.email}</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                onClick={() => setIsEditing(!isEditing)} 
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  placeholder="Your Full Name"
                  value={profileData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nick Name</label>
                <Input
                  placeholder="Enter your Nick name"
                  value={profileData.nickName}
                  onChange={(e) => handleChange("nickName", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <Select
                  disabled={!isEditing}
                  value={profileData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary">
                    <SelectValue placeholder="Select your Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <Input
                  placeholder="Your Country"
                  value={profileData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile</label>
                <Input
                  placeholder="Enter mobile number"
                  value={profileData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mt-8"
            >
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-800">My email Address</h3>
                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{profileData.email}</p>
                    <p className="text-sm text-gray-500">1 month ago</p>
                  </div>
                </motion.div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-800">My mobile number</h3>
                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{profileData.mobile || "Not provided"}</p>
                    <p className="text-sm text-gray-500">1 month ago</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <AnimatePresence>
              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-8 flex justify-end"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button 
                      onClick={handleSave} 
                      className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8"
                    >
                      Save Changes
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default ProfileUpdate
