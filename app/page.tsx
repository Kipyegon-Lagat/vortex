"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} 
  from "@/components/ui/dropdown-menu"
import { Bell, Camera, MoreVertical, LogOut } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import CameraFeed from "@/components/camera-feed"
import LockControl from "@/components/lock-control"
import { Calendar } from "@/components/ui/calendar"
import NotificationCenter from "@/components/notification-center"
import { useUser } from "@/contexts/user-context"

export default function SecurityDashboard() {
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleLogout = () => {
    localStorage.removeItem("user")
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setUser(null)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg"
            width={40}
            height={40}
            alt="Home thumbnail"
            className="rounded-lg"
          />
          <div>
            <h2 className="font-semibold">Home</h2>
            <p className="text-xs text-muted-foreground">401 Magnetic Drive Unit 2</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
            <Camera className="h-4 w-4" />
            <span className="text-sm">Camera 8</span>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.username || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || "Administrator"}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-72 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Cameras <span className="text-sm text-muted-foreground">4</span>
              </h3>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {/* Camera 1 with live feed */}
              <Card className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Camera 1</h4>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <CameraFeed />
                  <p className="text-xs text-muted-foreground">Live Feed</p>
                </div>
              </Card>

              {/* Camera 2 */}
              <Card className="p-3">
                <div className="flex gap-3">
                  <Image
                    src="/placeholder.svg"
                    width={60}
                    height={60}
                    alt="Camera 2"
                    className="rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Camera 2</h4>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <p className="text-xs text-muted-foreground">12 pm - 6 pm</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Locks <span className="text-sm text-muted-foreground">2</span>
              </h3>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <LockControl name="Front Door" batteryLevel={60} />
              <LockControl name="Back Door" batteryLevel={45} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-xl font-semibold">Home</h1>
            <div className="flex gap-2">
              {["1 Flow", "2 Flow", "Garage"].map((floor, i) => (
                <Button
                  key={floor}
                  variant={i === 0 ? "default" : "outline"}
                  className={i === 0 ? "bg-green-100 text-green-900 hover:bg-green-200" : ""}
                >
                  {floor}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/9] bg-white rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="House 3D Model"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80">
          <h2 className="text-2xl font-semibold mb-2">Smart Home</h2>
          <h3 className="text-2xl font-semibold mb-6">Security Systems</h3>

          <div>
            <h4 className="font-medium mb-3">Activity Calendar</h4>
            <Calendar
              mode="single"
              selected={new Date()}
              className="mb-6"
              modifiers={{
                today: new Date()
              }}
              modifiersStyles={{
                today: {
                  backgroundColor: "#22c55e",
                  color: "white"
                }
              }}
            />
          </div>

          <NotificationCenter />
        </div>
      </div>

      <Toaster />
    </div>
  )
}
