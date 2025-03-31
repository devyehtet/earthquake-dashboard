"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle, Users, Building, Route, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Status types and their corresponding colors and icons
const statusConfig = {
  operational: {
    label: "Operational",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500",
    icon: () => (
      <div className="rounded-full bg-green-500/10 p-1">
        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
  },
  degraded: {
    label: "Degraded",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500",
    icon: () => (
      <div className="rounded-full bg-yellow-500/10 p-1">
        <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8V12M12 16H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
  },
  outage: {
    label: "Outage",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500",
    icon: () => (
      <div className="rounded-full bg-red-500/10 p-1">
        <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
  },
  maintenance: {
    label: "Maintenance",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500",
    icon: () => (
      <div className="rounded-full bg-blue-500/10 p-1">
        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    ),
  },
}

// Sample data for system statuses
const systemStatuses = {
  emergency: [
    {
      name: "Emergency Response",
      status: "operational",
      uptime: 99.8,
      lastUpdated: "2 minutes ago",
    },
    {
      name: "Alert System",
      status: "operational",
      uptime: 99.9,
      lastUpdated: "1 minute ago",
    },
    {
      name: "Medical Services",
      status: "degraded",
      uptime: 92.4,
      lastUpdated: "5 minutes ago",
    },
  ],
  infrastructure: [
    {
      name: "Power Grid",
      status: "degraded",
      uptime: 78.5,
      lastUpdated: "10 minutes ago",
    },
    {
      name: "Water Supply",
      status: "outage",
      uptime: 45.2,
      lastUpdated: "15 minutes ago",
    },
    {
      name: "Transportation",
      status: "degraded",
      uptime: 68.7,
      lastUpdated: "8 minutes ago",
    },
    {
      name: "Public Buildings",
      status: "degraded",
      uptime: 72.3,
      lastUpdated: "12 minutes ago",
    },
    {
      name: "Data Centers",
      status: "operational",
      uptime: 99.1,
      lastUpdated: "3 minutes ago",
    },
  ],
  communication: [
    {
      name: "Cellular Network",
      status: "degraded",
      uptime: 82.1,
      lastUpdated: "7 minutes ago",
    },
    {
      name: "Internet Services",
      status: "degraded",
      uptime: 75.6,
      lastUpdated: "9 minutes ago",
    },
    {
      name: "Radio Communications",
      status: "operational",
      uptime: 98.3,
      lastUpdated: "3 minutes ago",
    },
  ],
  relief: [
    {
      name: "Aid Distribution",
      status: "operational",
      uptime: 94.7,
      lastUpdated: "4 minutes ago",
    },
    {
      name: "Shelter Management",
      status: "operational",
      uptime: 97.2,
      lastUpdated: "6 minutes ago",
    },
    {
      name: "Volunteer Coordination",
      status: "operational",
      uptime: 99.1,
      lastUpdated: "2 minutes ago",
    },
  ],
}

export function SystemStatusCard() {
  const [lastRefreshed, setLastRefreshed] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate overall system status
  const calculateOverallStatus = () => {
    const allSystems = [
      ...systemStatuses.emergency,
      ...systemStatuses.infrastructure,
      ...systemStatuses.communication,
      ...systemStatuses.relief,
    ]

    if (allSystems.some((system) => system.status === "outage")) {
      return "outage"
    } else if (allSystems.some((system) => system.status === "degraded")) {
      return "degraded"
    } else if (allSystems.some((system) => system.status === "maintenance")) {
      return "maintenance"
    } else {
      return "operational"
    }
  }

  // Calculate system health percentage
  const calculateSystemHealth = () => {
    const allSystems = [
      ...systemStatuses.emergency,
      ...systemStatuses.infrastructure,
      ...systemStatuses.communication,
      ...systemStatuses.relief,
    ]

    const totalSystems = allSystems.length
    const operationalCount = allSystems.filter((system) => system.status === "operational").length
    const degradedCount = allSystems.filter((system) => system.status === "degraded").length

    // Weight operational as 100%, degraded as 50%, others as 0%
    return ((operationalCount + degradedCount * 0.5) / totalSystems) * 100
  }

  const overallStatus = calculateOverallStatus()
  const systemHealth = calculateSystemHealth()

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true)
    // In a real app, this would fetch the latest status data
    setTimeout(() => {
      setLastRefreshed(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  // Get progress bar color based on health percentage
  const getHealthColor = (health: number) => {
    if (health > 90) return "bg-green-500"
    if (health > 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  const StatusIcon = statusConfig[overallStatus].icon

  return (
    <Card className="bg-gray-950 border-gray-800 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">System Status</h2>
            <p className="text-gray-400">Current status of critical systems</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 h-10 w-10"
          >
            <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>

        {/* Overall Status Section */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full border-2 border-red-500 h-14 w-7 flex items-center justify-center overflow-hidden">
                  <StatusIcon />
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-xs font-medium">OVERALL STATUS</p>
                  <p className="text-4xl font-bold text-white">{statusConfig[overallStatus].label}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">System Health</span>
                  <span className="text-2xl font-bold text-white">{systemHealth.toFixed(1)}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2 w-full overflow-hidden">
                  <div className="h-full rounded-full bg-yellow-500" style={{ width: `${systemHealth}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last updated: {lastRefreshed.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Link href="/data-collection/new" className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-blue-900/20 flex items-center justify-center mb-1">
              <AlertTriangle className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xs font-medium">Report Incident</span>
          </Link>

          <Link href="/resources#emergency-contacts" className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-green-900/20 flex items-center justify-center mb-1">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-xs font-medium">Emergency Contacts</span>
          </Link>

          <Link href="/resources#shelters" className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-amber-900/20 flex items-center justify-center mb-1">
              <Building className="h-6 w-6 text-amber-400" />
            </div>
            <span className="text-xs font-medium">Find Shelters</span>
          </Link>

          <Link href="/resources#road-conditions" className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-red-900/20 flex items-center justify-center mb-1">
              <Route className="h-6 w-6 text-red-400" />
            </div>
            <span className="text-xs font-medium">Road Conditions</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

