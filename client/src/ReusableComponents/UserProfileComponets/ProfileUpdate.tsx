import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  return (
    <div className="flex-1 p-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={profileData.profileImage || "/placeholder.svg?height=64&width=64"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#7848F4] hover:bg-[#6a3dd8]">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input
              placeholder="Your First Name"
              value={profileData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nick Name</label>
            <Input
              placeholder="Enter you Nick name"
              value={profileData.nickName}
              onChange={(e) => handleChange("nickName", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <Select
              disabled={!isEditing}
              value={profileData.gender}
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger>
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
              placeholder="Your First Name"
              value={profileData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mobile</label>
            <Input
              placeholder="Enter mobile number"
              value={profileData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">My email Address</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Mail size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{profileData.email}</p>
                <p className="text-sm text-gray-500">1 month ago</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">My mobile number</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Mail size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{profileData.email}</p>
                <p className="text-sm text-gray-500">1 month ago</p>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8">
            <Button onClick={handleSave} className="bg-[#7848F4] hover:bg-[#6a3dd8]">
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileUpdate

