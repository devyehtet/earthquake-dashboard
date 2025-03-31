"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth, UserRole, type Team } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Plus, Trash2, UserPlus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function TeamManagementPage() {
  const { user, teams, addTeamMember, removeTeamMember, createTeam } = useAuth()
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState(UserRole.TEAM_MEMBER.toString())
  const [newTeamName, setNewTeamName] = useState("")

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== UserRole.TEAM_ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      window.location.href = "/"
    }
  }, [user])

  // Set initial selected team
  useEffect(() => {
    if (teams.length > 0 && user) {
      if (user.role === UserRole.TEAM_ADMIN && user.teamId) {
        // Team admins can only see their own team
        const adminTeam = teams.find((team) => team.id === user.teamId)
        if (adminTeam) {
          setSelectedTeam(adminTeam)
        }
      } else if (user.role === UserRole.SUPER_ADMIN) {
        // Super admins can see all teams, default to first one
        setSelectedTeam(teams[0])
      }
    }
  }, [teams, user])

  // Handle add member
  const handleAddMember = async () => {
    if (!selectedTeam) return

    try {
      await addTeamMember(selectedTeam.id, {
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole as UserRole,
      })

      // Reset form
      setNewMemberName("")
      setNewMemberEmail("")
      setNewMemberRole(UserRole.TEAM_MEMBER.toString())
      setShowAddMemberDialog(false)
    } catch (error) {
      console.error("Error adding team member:", error)
    }
  }

  // Handle remove member
  const handleRemoveMember = async (memberId: string) => {
    if (!selectedTeam) return

    try {
      await removeTeamMember(selectedTeam.id, memberId)
    } catch (error) {
      console.error("Error removing team member:", error)
    }
  }

  // Handle create team
  const handleCreateTeam = async () => {
    try {
      await createTeam(newTeamName)
      setNewTeamName("")
      setShowCreateTeamDialog(false)
    } catch (error) {
      console.error("Error creating team:", error)
    }
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

  if (!user || (user.role !== UserRole.TEAM_ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/95">
        <DashboardHeader />
        <main className="flex-1">
          <div className="container py-6">
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/95">
      <DashboardHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-3xl font-bold">Team Management</h1>
              {user.role === UserRole.SUPER_ADMIN && (
                <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Team</DialogTitle>
                      <DialogDescription>Create a new response team for earthquake management.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="team-name" className="col-span-4">
                          Team Name
                        </Label>
                        <Input
                          id="team-name"
                          value={newTeamName}
                          onChange={(e) => setNewTeamName(e.target.value)}
                          className="col-span-4"
                          placeholder="e.g., Bago Response Team"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateTeamDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTeam} disabled={!newTeamName.trim()}>
                        Create Team
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Team selection (for super admin only) */}
          {user.role === UserRole.SUPER_ADMIN && teams.length > 0 && (
            <div className="mb-6">
              <Label htmlFor="team-select">Select Team</Label>
              <Select
                value={selectedTeam?.id || ""}
                onValueChange={(value) => {
                  const team = teams.find((t) => t.id === value)
                  if (team) setSelectedTeam(team)
                }}
              >
                <SelectTrigger id="team-select" className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Team members */}
          {selectedTeam && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedTeam.name}</CardTitle>
                  <CardDescription>{selectedTeam.members.length} team members</CardDescription>
                </div>
                <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>Add a new member to {selectedTeam.name}.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="col-span-4">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          className="col-span-4"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="col-span-4">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          className="col-span-4"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="col-span-4">
                          Role
                        </Label>
                        <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                          <SelectTrigger id="role" className="col-span-4">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UserRole.TEAM_MEMBER}>Team Member</SelectItem>
                            {user.role === UserRole.SUPER_ADMIN && (
                              <SelectItem value={UserRole.TEAM_ADMIN}>Team Admin</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMember} disabled={!newMemberName.trim() || !newMemberEmail.trim()}>
                        Add Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTeam.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant={member.role === UserRole.TEAM_ADMIN ? "default" : "secondary"}>
                            {getRoleDisplay(member.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {/* Don't allow removing yourself or team admin if you're not super admin */}
                          {(user.role === UserRole.SUPER_ADMIN ||
                            (user.role === UserRole.TEAM_ADMIN &&
                              member.id !== user.id &&
                              member.role !== UserRole.TEAM_ADMIN)) && (
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

