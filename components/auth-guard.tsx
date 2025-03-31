"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/contexts/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function AuthGuard({ children, allowedRoles, redirectTo = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !allowedRoles.includes(user.role))) {
      router.push(redirectTo)
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}

