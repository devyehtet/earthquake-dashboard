"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define user roles
export enum UserRole {
  GUEST = "GUEST",
  TEAM_MEMBER = "TEAM_MEMBER",
  TEAM_ADMIN = "TEAM_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

// Define user and team interfaces
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  teamId?: string
  avatar?: string
}

export interface Team {
  id: string
  name: string
  adminId: string
  members: User[]
}

// Define auth context type
interface AuthContextType {
  user: User | null
  teams: Team[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  addTeamMember: (teamId: string, userData: Partial<User>) => Promise<void>
  removeTeamMember: (teamId: string, userId: string) => Promise<void>
  createTeam: (name: string) => Promise<void>
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample data for demonstration
const SAMPLE_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Yangon Response Team",
    adminId: "user-3",
    members: [
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
    ],
  },
  {
    id: "team-2",
    name: "Mandalay Response Team",
    adminId: "user-5",
    members: [
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
    ],
  },
]

const SAMPLE_USERS: Record<string, { password: string; user: User }> = {
  "member1@example.com": {
    password: "password123",
    user: {
      id: "user-2",
      name: "Team Member 1",
      email: "member1@example.com",
      role: UserRole.TEAM_MEMBER,
      teamId: "team-1",
    },
  },
  "admin1@example.com": {
    password: "password123",
    user: {
      id: "user-3",
      name: "Team Admin 1",
      email: "admin1@example.com",
      role: UserRole.TEAM_ADMIN,
      teamId: "team-1",
    },
  },
  "member2@example.com": {
    password: "password123",
    user: {
      id: "user-4",
      name: "Team Member 2",
      email: "member2@example.com",
      role: UserRole.TEAM_MEMBER,
      teamId: "team-2",
    },
  },
  "admin2@example.com": {
    password: "password123",
    user: {
      id: "user-5",
      name: "Team Admin 2",
      email: "admin2@example.com",
      role: UserRole.TEAM_ADMIN,
      teamId: "team-2",
    },
  },
  "superadmin@example.com": {
    password: "admin123",
    user: {
      id: "user-1",
      name: "Super Admin",
      email: "superadmin@example.com",
      role: UserRole.SUPER_ADMIN,
    },
  },
}

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [teams, setTeams] = useState<Team[]>(SAMPLE_TEAMS)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Set as guest user if no stored user
      setUser({
        id: "guest",
        name: "Guest User",
        email: "",
        role: UserRole.GUEST,
      })
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userRecord = SAMPLE_USERS[email]
      if (!userRecord || userRecord.password !== password) {
        throw new Error("Invalid email or password")
      }

      setUser(userRecord.user)
      localStorage.setItem("user", JSON.stringify(userRecord.user))
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    // Set user to guest
    const guestUser = {
      id: "guest",
      name: "Guest User",
      email: "",
      role: UserRole.GUEST,
    }

    setUser(guestUser)

    // Clear local storage
    localStorage.removeItem("user")

    // Force a page reload to ensure all components update properly
    window.location.href = "/"
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (SAMPLE_USERS[email]) {
        throw new Error("Email already in use")
      }

      const newUser: User = {
        id: `user-${Object.keys(SAMPLE_USERS).length + 1}`,
        name,
        email,
        role: UserRole.TEAM_MEMBER,
      }

      // In a real app, this would be a database operation
      SAMPLE_USERS[email] = {
        password,
        user: newUser,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push("/")
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Add team member function
  const addTeamMember = async (teamId: string, userData: Partial<User>) => {
    setIsLoading(true)
    try {
      // Check permissions
      if (user?.role !== UserRole.TEAM_ADMIN && user?.role !== UserRole.SUPER_ADMIN) {
        throw new Error("Unauthorized")
      }

      // If team admin, check if they're admin of this team
      if (user.role === UserRole.TEAM_ADMIN && user.teamId !== teamId) {
        throw new Error("You can only add members to your own team")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newMember: User = {
        id: `user-${Date.now()}`,
        name: userData.name || "New Member",
        email: userData.email || `member-${Date.now()}@example.com`,
        role: userData.role || UserRole.TEAM_MEMBER,
        teamId,
      }

      // Update teams state
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.id === teamId ? { ...team, members: [...team.members, newMember] } : team)),
      )

      // In a real app, this would be a database operation
      SAMPLE_USERS[newMember.email] = {
        password: "password123", // Default password, would be handled differently in a real app
        user: newMember,
      }
    } catch (error) {
      console.error("Add team member error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Remove team member function
  const removeTeamMember = async (teamId: string, userId: string) => {
    setIsLoading(true)
    try {
      // Check permissions
      if (user?.role !== UserRole.TEAM_ADMIN && user?.role !== UserRole.SUPER_ADMIN) {
        throw new Error("Unauthorized")
      }

      // If team admin, check if they're admin of this team
      if (user.role === UserRole.TEAM_ADMIN && user.teamId !== teamId) {
        throw new Error("You can only remove members from your own team")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update teams state
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamId ? { ...team, members: team.members.filter((member) => member.id !== userId) } : team,
        ),
      )

      // In a real app, this would update the user's team association in the database
    } catch (error) {
      console.error("Remove team member error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Create team function
  const createTeam = async (name: string) => {
    setIsLoading(true)
    try {
      // Check permissions
      if (user?.role !== UserRole.SUPER_ADMIN) {
        throw new Error("Only Super Admin can create teams")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newTeam: Team = {
        id: `team-${teams.length + 1}`,
        name,
        adminId: user.id,
        members: [user],
      }

      // Update teams state
      setTeams((prevTeams) => [...prevTeams, newTeam])
    } catch (error) {
      console.error("Create team error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        teams,
        isLoading,
        login,
        logout,
        register,
        addTeamMember,
        removeTeamMember,
        createTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

