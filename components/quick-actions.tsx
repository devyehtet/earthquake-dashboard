"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Building2, Route, Users } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover border-primary/10 bg-gradient-to-br from-card to-card/80">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Link href="/data-collection/new" className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-center">Report Incident</p>
          </Link>
        </CardContent>
      </Card>

      <Card className="card-hover border-primary/10 bg-gradient-to-br from-card to-card/80">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Link href="/resources#emergency-contacts" className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-center">Emergency Contacts</p>
          </Link>
        </CardContent>
      </Card>

      <Card className="card-hover border-primary/10 bg-gradient-to-br from-card to-card/80">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Link href="/resources#shelters" className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
              <Building2 className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-center">Find Shelters</p>
          </Link>
        </CardContent>
      </Card>

      <Card className="card-hover border-primary/10 bg-gradient-to-br from-card to-card/80">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <Link href="/resources#road-conditions" className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <Route className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-sm font-medium text-center">Road Conditions</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

