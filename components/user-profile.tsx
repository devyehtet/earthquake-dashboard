"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, User, Users, Shield, ChevronDown } from "lucide-react"

export function UserProfile() {
  const { user, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get role display name
  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return "Super Admin"
      case UserRole.TEAM_ADMIN:
        return "Team Admin"
      case UserRole.TEAM_MEMBER:
        return "Team Member"
      default:
        return "Guest"
    }
  }

  // Get role badge color
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return "destructive"
      case UserRole.TEAM_ADMIN:
        return "default"
      case UserRole.TEAM_MEMBER:
        return "secondary"
      default:
        return "outline"
    }
  }

  // Get role icon
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return <Shield className="h-4 w-4" />
      case UserRole.TEAM_ADMIN:
        return <Users className="h-4 w-4" />
      case UserRole.TEAM_MEMBER:
        return <User className="h-4 w-4" />
      default:
        return null
    }
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          Login
        </Button>
      </Link>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user.name ? getInitials(user.name) : "G"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{user.name}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              <div className="flex items-center pt-1">
                <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 text-xs">
                  {getRoleIcon(user.role)}
                  {getRoleDisplay(user.role)}
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            {(user.role === UserRole.TEAM_ADMIN || user.role === UserRole.SUPER_ADMIN) && (
              <DropdownMenuItem asChild>
                <Link href="/team-management">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team Management</span>
                </Link>
              </DropdownMenuItem>
            )}
            {user.role === UserRole.SUPER_ADMIN && (
              <DropdownMenuItem asChild>
                <Link href="/user-management">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>User Management</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowLogoutConfirm(false)
                setTimeout(() => {
                  logout()
                }, 300)
              }}
            >
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

