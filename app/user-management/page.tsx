"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Trash2, UserPlus, PencilIcon } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function UserManagementPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([
    {
      id: "user-1",
      name: "Super Admin",
      email: "superadmin@example.com",
      role: UserRole.SUPER_ADMIN,
    },
    {
      id: "user-2",
      name: "Team Member 1",
      email: "member1@example.com",
      role: UserRole.TEAM_MEMBER,
      teamId: "team-1",
    },
    {
      id: "user-3",
      name: "Team Admin 1",
      email: "admin1@example.com",
      role: UserRole.TEAM_ADMIN,
      teamId: "team-1",
    },
    {
      id: "user-4",
      name: "Team Member 2",
      email: "member2@example.com",
      role: UserRole.TEAM_MEMBER,
      teamId: "team-2",
    },
    {
      id: "user-5",
      name: "Team Admin 2",
      email: "admin2@example.com",
      role: UserRole.TEAM_ADMIN,
      teamId: "team-2",
    },
  ])

  // Redirect if not super admin
  if (user && user.role !== UserRole.SUPER_ADMIN) {
    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container mx-auto">
          <div className="py-6 space-y-6">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
              <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
              <Link href="/">
                <Button>Return to Dashboard</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

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

  // Get role badge variant
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

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto">
        <div className="py-6 space-y-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-3xl font-bold">User Management</h1>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleDisplay(user.role)}</Badge>
                      </TableCell>
                      <TableCell>{user.teamId ? `Team ${user.teamId.split("-")[1]}` : "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

