"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function AuthGuard({ children, allowedRoles, redirectTo = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isLoading && (!user || !allowedRoles.includes(user.role))) {
      router.push(redirectTo)
    }
  }, [user, isLoading, allowedRoles, redirectTo, router, isClient])

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">{t("auth.loading")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            <h2 className="text-xl font-bold">{t("auth.accessDenied")}</h2>
            <p className="text-center text-muted-foreground">{t("auth.loginRequired")}</p>
            <Link href={redirectTo} className="w-full">
              <Button className="w-full">{t("auth.login")}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

