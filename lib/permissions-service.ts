// Define permission levels
export type PermissionLevel = "restricted" | "standard" | "elevated"

// Define user roles
export type UserRole = "member" | "team_admin" | "super_admin"

// Define team permissions interface
export interface TeamPermissions {
  id: string
  name: string
  permissionLevel: PermissionLevel
}

// Mock current user data
const currentUser = {
  id: "user-001",
  role: "team_admin" as UserRole,
  teamId: "team-4",
}

// Mock teams data with permission levels
const teamsPermissions: TeamPermissions[] = [
  { id: "team-1", name: "Team 1", permissionLevel: "standard" },
  { id: "team-2", name: "Team 2", permissionLevel: "restricted" },
  { id: "team-3", name: "Team 3", permissionLevel: "elevated" },
  { id: "team-4", name: "Team 4", permissionLevel: "standard" },
]

// Get current user's team permissions
export function getCurrentUserTeamPermissions(): TeamPermissions | undefined {
  if (currentUser.role === "super_admin") {
    // Super admins have elevated permissions regardless of team
    return { id: "admin", name: "Admin", permissionLevel: "elevated" }
  }

  return teamsPermissions.find((team) => team.id === currentUser.teamId)
}

// Check if user can edit a report
export function canEditReport(reportTeamId: string): boolean {
  console.log("Checking edit permission for team:", reportTeamId)
  console.log("Current user:", currentUser)

  // Super admins can edit any report
  if (currentUser.role === "super_admin") {
    console.log("User is super admin, can edit")
    return true
  }

  // Team members can only edit reports assigned to their team
  if (reportTeamId !== currentUser.teamId) {
    console.log("Report team doesn't match user team, cannot edit")
    return false
  }

  // Check permission level
  const teamPermissions = getCurrentUserTeamPermissions()
  console.log("Team permissions:", teamPermissions)

  if (!teamPermissions) {
    console.log("No team permissions found, cannot edit")
    return false
  }

  // Standard and elevated permission levels can edit reports
  const canEdit = ["standard", "elevated"].includes(teamPermissions.permissionLevel)
  console.log("Permission level check result:", canEdit)
  return canEdit
}

// Check if user can resolve a report
export function canResolveReport(reportTeamId: string): boolean {
  // Super admins can resolve any report
  if (currentUser.role === "super_admin") {
    return true
  }

  // Team members can only resolve reports assigned to their team
  if (reportTeamId !== currentUser.teamId) {
    return false
  }

  // Check permission level
  const teamPermissions = getCurrentUserTeamPermissions()
  if (!teamPermissions) {
    return false
  }

  // Only elevated permission level can resolve reports
  return teamPermissions.permissionLevel === "elevated"
}

