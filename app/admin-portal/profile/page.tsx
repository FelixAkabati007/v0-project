"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useAdmin } from "@/contexts/admin-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Key, Lock, Mail, Save, Bell, MessageSquare, Mic, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SmartInput } from "@/components/ui/smart-input"
import { SmartTextarea } from "@/components/ui/smart-textarea"
import { SmartFileUpload } from "@/components/ui/smart-file-upload"
import { SmartDatePicker } from "@/components/ui/smart-date-picker"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { addNotification } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "School administrator with 10+ years of experience in educational management.",
    phone: "+233 244 027477",
    location: "Ejisu-Ashanti, Ghana",
    birthdate: new Date(1980, 5, 15),
    joinDate: new Date(2020, 8, 1),
    department: "Administration",
    position: "Principal",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [profileImage, setProfileImage] = useState<File[] | null>(null)

  const bioTemplates = [
    {
      name: "Professional Educator",
      content:
        "Dedicated educator with over 10 years of experience in educational leadership and administration. Specializing in curriculum development, staff management, and fostering a positive learning environment for students of all backgrounds.",
    },
    {
      name: "School Administrator",
      content:
        "Experienced school administrator with a proven track record of implementing effective policies and procedures. Skilled in budget management, strategic planning, and community engagement to support educational excellence.",
    },
    {
      name: "Educational Leader",
      content:
        "Passionate educational leader committed to student success and continuous improvement. Expertise in data-driven decision making, technology integration, and professional development to enhance teaching and learning outcomes.",
    },
  ]

  const validateName = (value: string) => {
    if (!value) return { valid: false, message: "Name is required" }
    if (value.length < 3) return { valid: false, message: "Name must be at least 3 characters" }
    return { valid: true }
  }

  const validateEmail = (value: string) => {
    if (!value) return { valid: false, message: "Email is required" }
    if (!/\S+@\S+\.\S+/.test(value)) return { valid: false, message: "Please enter a valid email address" }
    return { valid: true }
  }

  const validatePhone = (value: string) => {
    if (!value) return { valid: true } // Not required
    if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)) {
      return { valid: false, message: "Please enter a valid phone number" }
    }
    return { valid: true }
  }

  const handleProfileChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when typing
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Validate confirm password match
    if (field === "confirmPassword" || (field === "newPassword" && passwordData.confirmPassword)) {
      if (field === "newPassword" && value !== passwordData.confirmPassword) {
        setPasswordErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
      } else if (field === "confirmPassword" && value !== passwordData.newPassword) {
        setPasswordErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
      } else {
        setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    return undefined
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await updateProfile({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        phone: profileData.phone,
        location: profileData.location,
        department: profileData.department,
        position: profileData.position,
        birthdate: profileData.birthdate,
      })

      // Handle profile image upload if present
      if (profileImage && profileImage.length > 0) {
        // Simulate image upload
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      addNotification("Profile updated successfully", "success")
    } catch (error) {
      addNotification("Failed to update profile", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    // Validate current password
    if (!passwordData.currentPassword) {
      setPasswordErrors((prev) => ({ ...prev, currentPassword: "Current password is required" }))
      return
    }

    // Validate new password
    const newPasswordError = validatePassword(passwordData.newPassword)
    if (newPasswordError) {
      setPasswordErrors((prev) => ({ ...prev, newPassword: newPasswordError }))
      return
    }

    // Validate confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would call an API to change the password
      addNotification("Password changed successfully", "success")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      addNotification("Failed to change password", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile picture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={
                          profileImage && profileImage.length > 0
                            ? URL.createObjectURL(profileImage[0])
                            : user?.avatar || "/placeholder.svg?height=128&width=128"
                        }
                      />
                      <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
                    </Avatar>

                    <SmartFileUpload
                      accept="image/*"
                      multiple={false}
                      maxSize={5}
                      preview={false}
                      value={profileImage}
                      onChange={setProfileImage}
                      className="w-full max-w-[200px]"
                      dropzoneClassName="py-2"
                    />

                    <div className="text-center">
                      <Badge variant="outline" className="mb-2">
                        Administrator
                      </Badge>
                      <p className="text-sm text-gray-500">Joined {profileData.joinDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SmartInput
                        label="Full Name"
                        value={profileData.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                        required
                        validateFn={validateName}
                        voiceInput
                        predictiveText
                        suggestions={["John Doe", "Jane Smith", "Admin User"]}
                      />

                      <SmartInput
                        label="Email Address"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        required
                        validateFn={validateEmail}
                        voiceInput
                      />

                      <SmartInput
                        label="Phone Number"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        validateFn={validatePhone}
                        voiceInput
                      />

                      <SmartInput
                        label="Location"
                        value={profileData.location}
                        onChange={(e) => handleProfileChange("location", e.target.value)}
                        voiceInput
                        aiAssist
                      />

                      <SmartInput
                        label="Department"
                        value={profileData.department}
                        onChange={(e) => handleProfileChange("department", e.target.value)}
                        voiceInput
                        suggestions={["Administration", "Teaching", "IT", "Finance", "Student Affairs"]}
                        predictiveText
                      />

                      <SmartInput
                        label="Position"
                        value={profileData.position}
                        onChange={(e) => handleProfileChange("position", e.target.value)}
                        voiceInput
                        suggestions={["Principal", "Vice Principal", "Department Head", "Administrator", "IT Manager"]}
                        predictiveText
                      />

                      <SmartDatePicker
                        label="Birth Date"
                        value={profileData.birthdate}
                        onChange={(date) => handleProfileChange("birthdate", date)}
                        maxDate={new Date()}
                      />

                      <SmartDatePicker
                        label="Join Date"
                        value={profileData.joinDate}
                        onChange={(date) => handleProfileChange("joinDate", date)}
                        maxDate={new Date()}
                      />
                    </div>

                    <SmartTextarea
                      label="Bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      className="h-32"
                      expandable
                      voiceInput
                      aiAssist
                      templates={bioTemplates}
                    />

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile} disabled={isLoading} className="flex items-center">
                        {isLoading ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <SmartInput
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      error={passwordErrors.currentPassword}
                      required
                    />

                    <SmartInput
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      error={passwordErrors.newPassword}
                      required
                    />

                    <SmartInput
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                      error={passwordErrors.confirmPassword}
                      required
                    />
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertTitle className="flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Password Requirements
                    </AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>At least 8 characters long</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-end">
                    <Button onClick={handleChangePassword} disabled={isLoading} className="flex items-center">
                      {isLoading ? (
                        <>Updating...</>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Protect your account with 2FA</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recovery Codes</h3>
                    <p className="text-sm text-gray-500">Generate backup codes for account recovery</p>
                  </div>
                  <Button variant="outline">Generate Codes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Communication Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                        </div>
                      </div>
                      <Switch
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                      </div>
                      <Switch
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mic className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Voice Notifications</p>
                          <p className="text-sm text-gray-500">Receive important alerts via voice call</p>
                        </div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">AI Digest</p>
                          <p className="text-sm text-gray-500">Receive AI-generated summaries of important updates</p>
                        </div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    {[
                      { name: "System Updates", description: "Important system updates and announcements" },
                      { name: "New Users", description: "Notifications when new users register" },
                      { name: "Course Changes", description: "Updates to course information or schedules" },
                      { name: "Reports", description: "New reports and analytics available" },
                      {
                        name: "Student Performance",
                        description: "Alerts about significant changes in student performance",
                      },
                      { name: "Security Alerts", description: "Notifications about security-related events" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Switch defaultChecked={index < 4} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

