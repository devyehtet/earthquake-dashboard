"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Users,
  MapPin,
  Phone,
  Mail,
  Building,
  AlertTriangle,
  Search,
  PencilIcon,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample team data
const teamsData = [
  {
    id: "team-1",
    name: "Yangon Response Team",
    region: "Yangon Region",
    status: "active",
    responseRate: 92,
    completedMissions: 34,
    pendingMissions: 5,
    leadId: "user-3",
    permissionLevel: "standard",
    members: [
      {
        id: "user-2",
        name: "User-001 Yangon",
        email: "user001.yangon@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Medical",
        phone: "+95 9 123 456 789",
        initials: "TM",
      },
      {
        id: "user-3",
        name: "User-002 Yangon",
        email: "user002.yangon@example.com",
        role: UserRole.TEAM_ADMIN,
        avatar: null,
        specialty: "Coordination",
        phone: "+95 9 234 567 890",
        initials: "TA1",
      },
      {
        id: "user-6",
        name: "User-003 Yangon",
        email: "user003.yangon@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Rescue",
        phone: "+95 9 345 678 901",
        initials: "AM",
      },
      {
        id: "user-7",
        name: "User-004 Yangon",
        email: "user004.yangon@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Medical",
        phone: "+95 9 456 789 012",
        initials: "TA",
      },
    ],
  },
  {
    id: "team-2",
    name: "Mandalay Response Team",
    region: "Mandalay Region",
    status: "active",
    responseRate: 88,
    completedMissions: 28,
    pendingMissions: 3,
    leadId: "user-5",
    permissionLevel: "restricted",
    members: [
      {
        id: "user-4",
        name: "User-001 Mandalay",
        email: "user001.mandalay@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Logistics",
        phone: "+95 9 567 890 123",
        initials: "TM2",
      },
      {
        id: "user-5",
        name: "User-002 Mandalay",
        email: "user002.mandalay@example.com",
        role: UserRole.TEAM_ADMIN,
        avatar: null,
        specialty: "Coordination",
        phone: "+95 9 678 901 234",
        initials: "TA2",
      },
      {
        id: "user-8",
        name: "User-003 Mandalay",
        email: "user003.mandalay@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Engineering",
        phone: "+95 9 789 012 345",
        initials: "KZ",
      },
    ],
  },
  {
    id: "team-3",
    name: "Sagaing Response Team",
    region: "Sagaing Region",
    status: "active",
    responseRate: 95,
    completedMissions: 42,
    pendingMissions: 7,
    leadId: "user-9",
    permissionLevel: "elevated",
    members: [
      {
        id: "user-9",
        name: "User-001 Sagaing",
        email: "user001.sagaing@example.com",
        role: UserRole.TEAM_ADMIN,
        avatar: null,
        specialty: "Coordination",
        phone: "+95 9 890 123 456",
        initials: "HA",
      },
      {
        id: "user-10",
        name: "User-002 Sagaing",
        email: "user002.sagaing@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Medical",
        phone: "+95 9 901 234 567",
        initials: "SM",
      },
      {
        id: "user-11",
        name: "User-003 Sagaing",
        email: "user003.sagaing@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Rescue",
        phone: "+95 9 012 345 678",
        initials: "TL",
      },
      {
        id: "user-12",
        name: "User-004 Sagaing",
        email: "user004.sagaing@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Logistics",
        phone: "+95 9 123 456 789",
        initials: "MW",
      },
      {
        id: "user-13",
        name: "User-005 Sagaing",
        email: "user005.sagaing@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Engineering",
        phone: "+95 9 234 567 890",
        initials: "WH",
      },
    ],
  },
  {
    id: "team-4",
    name: "Bago Response Team",
    region: "Bago Region",
    status: "standby",
    responseRate: 85,
    completedMissions: 18,
    pendingMissions: 2,
    leadId: "user-14",
    permissionLevel: "standard",
    members: [
      {
        id: "user-14",
        name: "User-001 Bago",
        email: "user001.bago@example.com",
        role: UserRole.TEAM_ADMIN,
        avatar: null,
        specialty: "Coordination",
        phone: "+95 9 345 678 901",
        initials: "ZM",
      },
      {
        id: "user-15",
        name: "User-002 Bago",
        email: "user002.bago@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Medical",
        phone: "+95 9 456 789 012",
        initials: "AA",
      },
      {
        id: "user-16",
        name: "User-003 Bago",
        email: "user003.bago@example.com",
        role: UserRole.TEAM_MEMBER,
        avatar: null,
        specialty: "Rescue",
        phone: "+95 9 567 890 123",
        initials: "MM",
      },
    ],
  },
]

// Permission level descriptions
const permissionLevels = {
  restricted: {
    name: "Restricted",
    description: "Limited access to data collection and reporting only",
    icon: ShieldX,
    color: "text-red-500",
    bgColor: "bg-red-100",
    darkBgColor: "dark:bg-red-900/30",
    darkTextColor: "dark:text-red-300",
  },
  standard: {
    name: "Standard",
    description: "Normal access to team operations and regional data",
    icon: ShieldCheck,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    darkBgColor: "dark:bg-blue-900/30",
    darkTextColor: "dark:text-blue-300",
  },
  elevated: {
    name: "Elevated",
    description: "Extended access to sensitive data and cross-regional information",
    icon: ShieldAlert,
    color: "text-green-500",
    bgColor: "bg-green-100",
    darkBgColor: "dark:bg-green-900/30",
    darkTextColor: "dark:text-green-300",
  },
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
      return "Team Lead"
    case UserRole.TEAM_MEMBER:
      return "Team Member"
    default:
      return "Guest"
  }
}

// Get status badge color
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
    case "standby":
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Standby</Badge>
    case "deployed":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Deployed</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

// Get permission badge
const getPermissionBadge = (level: string) => {
  const permInfo = permissionLevels[level as keyof typeof permissionLevels]
  const IconComponent = permInfo.icon
  return (
    <Badge
      className={`${permInfo.bgColor} ${permInfo.color} ${permInfo.darkBgColor} ${permInfo.darkTextColor} flex items-center gap-1`}
    >
      <IconComponent className="h-3 w-3" />
      <span>{permInfo.name}</span>
    </Badge>
  )
}

export default function TeamsPage() {
  const { user } = useAuth()
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<any>(null)
  const [newPermissionLevel, setNewPermissionLevel] = useState<string>("")
  const [teamsState, setTeamsState] = useState(teamsData)

  // Check if user can manage permissions (only SUPER_ADMIN can)
  const canManagePermissions = user?.role === UserRole.SUPER_ADMIN

  // Filter teams based on search query and active tab
  const filteredTeams = teamsState
    .filter((team) => {
      if (activeTab === "all") return true
      return team.status === activeTab
    })
    .filter((team) => {
      if (!searchQuery) return true
      return (
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Get the selected team details
  const teamDetails = selectedTeam ? teamsState.find((team) => team.id === selectedTeam) : null

  // Handle opening the permissions dialog
  const handleOpenPermissionsDialog = (team: any) => {
    if (!canManagePermissions) return
    setEditingTeam(team)
    setNewPermissionLevel(team.permissionLevel)
    setPermissionsDialogOpen(true)
  }

  // Handle saving permission changes
  const handleSavePermissions = () => {
    if (!editingTeam || !newPermissionLevel) return

    // Update the team's permission level
    const updatedTeams = teamsState.map((team) =>
      team.id === editingTeam.id ? { ...team, permissionLevel: newPermissionLevel } : team,
    )

    setTeamsState(updatedTeams)

    // If this is the currently selected team, update that too
    if (selectedTeam === editingTeam.id) {
      setSelectedTeam(editingTeam.id)
    }

    // Close the dialog
    setPermissionsDialogOpen(false)
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4">
              <h1 className="text-3xl font-bold">Response Teams</h1>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  className="pl-9 pr-4 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Teams</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="standby">Standby</TabsTrigger>
              <TabsTrigger value="deployed">Deployed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className={`cursor-pointer transition-all hover:border-primary/50 ${
                  selectedTeam === team.id ? "border-2 border-primary" : ""
                }`}
                onClick={() => setSelectedTeam(team.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{team.name}</CardTitle>
                    {getStatusBadge(team.status)}
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {team.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-muted-foreground">Team Members</p>
                        <p className="text-xl font-bold">{team.members.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-xl font-bold">{team.responseRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-xl font-bold">{team.completedMissions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-xl font-bold">{team.pendingMissions}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Permission Level</p>
                      {getPermissionBadge(team.permissionLevel)}
                    </div>
                    {canManagePermissions && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpenPermissionsDialog(team)
                              }}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Permissions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <div className="flex -space-x-2 overflow-hidden">
                    {team.members.slice(0, 5).map((member) => (
                      <Avatar key={member.id} className="border-2 border-background">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members.length > 5 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{team.members.length - 5}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" onClick={() => setSelectedTeam(team.id)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedTeam && teamDetails && (
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {teamDetails.name}
                      {getStatusBadge(teamDetails.status)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {teamDetails.region}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2 mr-4">
                      <span className="text-sm text-muted-foreground">Permissions:</span>
                      {getPermissionBadge(teamDetails.permissionLevel)}
                      {canManagePermissions && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleOpenPermissionsDialog(teamDetails)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Contact Team
                    </Button>
                    <Button size="sm">Assign Mission</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Users className="h-8 w-8 mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Team Size</p>
                        <p className="text-2xl font-bold">{teamDetails.members.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <AlertTriangle className="h-8 w-8 mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-2xl font-bold">{teamDetails.responseRate}%</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Building className="h-8 w-8 mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Missions</p>
                        <p className="text-2xl font-bold">{teamDetails.completedMissions}</p>
                        <p className="text-xs text-muted-foreground">{teamDetails.pendingMissions} pending</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Permission Level:</span>
                    {getPermissionBadge(teamDetails.permissionLevel)}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 ml-1"
                            disabled={!canManagePermissions}
                            onClick={() => handleOpenPermissionsDialog(teamDetails)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {canManagePermissions ? "Edit Permissions" : "Only Administrators can edit permissions"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamDetails.members.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{getRoleDisplay(member.role)}</p>
                            <p className="text-xs text-muted-foreground mt-1">Specialty: {member.specialty}</p>
                            <div className="flex flex-col mt-2 gap-1">
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="h-3 w-3" />
                                <span>{member.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="text-lg font-medium mt-6 mb-4">Recent Missions</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Mission history will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Permission Edit Dialog */}
      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Team Permissions</DialogTitle>
            <DialogDescription>Update access permissions for {editingTeam?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="permission-level">Permission Level</Label>
              <Select value={newPermissionLevel} onValueChange={setNewPermissionLevel}>
                <SelectTrigger id="permission-level">
                  <SelectValue placeholder="Select permission level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restricted">
                    <div className="flex items-center gap-2">
                      <ShieldX className="h-4 w-4 text-red-500" />
                      <span>Restricted</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="standard">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>Standard</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="elevated">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-green-500" />
                      <span>Elevated</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newPermissionLevel && (
              <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                <h4 className="font-medium mb-1 flex items-center gap-2">
                  {(() => {
                    const IconComponent = permissionLevels[newPermissionLevel as keyof typeof permissionLevels].icon
                    return (
                      <IconComponent
                        className={`h-4 w-4 ${permissionLevels[newPermissionLevel as keyof typeof permissionLevels].color}`}
                      />
                    )
                  })()}
                  {permissionLevels[newPermissionLevel as keyof typeof permissionLevels].name}
                </h4>
                <p className="text-muted-foreground">
                  {permissionLevels[newPermissionLevel as keyof typeof permissionLevels].description}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePermissions}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

