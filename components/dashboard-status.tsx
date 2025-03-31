"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  Building,
  Truck,
  Radio,
  Phone,
  Wifi,
  Users,
  ShieldAlert,
  Siren,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Status types and their corresponding colors and icons
const statusConfig = {
  operational: {
    label: "Operational",
    color: "text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300",
    icon: CheckCircle2,
  },
  degraded: {
    label: "Degraded",
    color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300",
    icon: AlertCircle,
  },
  outage: {
    label: "Outage",
    color: "text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300",
    icon: XCircle,
  },
  maintenance: {
    label: "Maintenance",
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300",
    icon: Clock,
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
      icon: Siren,
    },
    {
      name: "Alert System",
      status: "operational",
      uptime: 99.9,
      lastUpdated: "1 minute ago",
      icon: AlertTriangle,
    },
    {
      name: "Medical Services",
      status: "degraded",
      uptime: 92.4,
      lastUpdated: "5 minutes ago",
      icon: ShieldAlert,
    },
  ],
  infrastructure: [
    {
      name: "Power Grid",
      status: "degraded",
      uptime: 78.5,
      lastUpdated: "10 minutes ago",
      icon: Zap,
    },
    {
      name: "Water Supply",
      status: "outage",
      uptime: 45.2,
      lastUpdated: "15 minutes ago",
      icon: Wifi,
    },
    {
      name: "Transportation",
      status: "degraded",
      uptime: 68.7,
      lastUpdated: "8 minutes ago",
      icon: Truck,
    },
    {
      name: "Public Buildings",
      status: "degraded",
      uptime: 72.3,
      lastUpdated: "12 minutes ago",
      icon: Building,
    },
  ],
  communication: [
    {
      name: "Cellular Network",
      status: "degraded",
      uptime: 82.1,
      lastUpdated: "7 minutes ago",
      icon: Phone,
    },
    {
      name: "Internet Services",
      status: "degraded",
      uptime: 75.6,
      lastUpdated: "9 minutes ago",
      icon: Wifi,
    },
    {
      name: "Radio Communications",
      status: "operational",
      uptime: 98.3,
      lastUpdated: "3 minutes ago",
      icon: Radio,
    },
  ],
  relief: [
    {
      name: "Aid Distribution",
      status: "operational",
      uptime: 94.7,
      lastUpdated: "4 minutes ago",
      icon: Truck,
    },
    {
      name: "Shelter Management",
      status: "operational",
      uptime: 97.2,
      lastUpdated: "6 minutes ago",
      icon: Building,
    },
    {
      name: "Volunteer Coordination",
      status: "operational",
      uptime: 99.1,
      lastUpdated: "2 minutes ago",
      icon: Users,
    },
  ],
}

// Helper function to get the status color class
function getStatusColor(status: string) {
  return statusConfig[status as keyof typeof statusConfig]?.color || "text-gray-500 bg-gray-100"
}

// Helper function to get the status icon
function getStatusIcon(status: string) {
  const IconComponent = statusConfig[status as keyof typeof statusConfig]?.icon || AlertCircle
  return <IconComponent className="h-4 w-4" />
}

export function DashboardStatus() {
  const [activeTab, setActiveTab] = useState("emergency")
  const [lastRefreshed, setLastRefreshed] = useState(new Date())

  // Calculate overall system status
  const calculateOverallStatus = (systems: typeof systemStatuses.emergency) => {
    if (systems.some((system) => system.status === "outage")) {
      return "outage"
    } else if (systems.some((system) => system.status === "degraded")) {
      return "degraded"
    } else if (systems.some((system) => system.status === "maintenance")) {
      return "maintenance"
    } else {
      return "operational"
    }
  }

  // Get the current systems based on the active tab
  const getCurrentSystems = () => {
    switch (activeTab) {
      case "emergency":
        return systemStatuses.emergency
      case "infrastructure":
        return systemStatuses.infrastructure
      case "communication":
        return systemStatuses.communication
      case "relief":
        return systemStatuses.relief
      default:
        return systemStatuses.emergency
    }
  }

  const currentSystems = getCurrentSystems()
  const overallStatus = calculateOverallStatus(currentSystems)

  // Calculate the percentage of operational systems
  const operationalPercentage =
    (currentSystems.filter((system) => system.status === "operational").length / currentSystems.length) * 100

  // Handle refresh button click
  const handleRefresh = () => {
    // In a real app, this would fetch the latest status data
    setLastRefreshed(new Date())
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of critical systems</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn("h-10 w-10 rounded-full flex items-center justify-center", getStatusColor(overallStatus))}
              >
                {getStatusIcon(overallStatus)}
              </div>
              <div>
                <p className="text-sm font-medium">Overall Status</p>
                <p className="text-2xl font-bold">{statusConfig[overallStatus as keyof typeof statusConfig]?.label}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1 min-w-[150px]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Operational</span>
                <span className="text-sm font-medium">{operationalPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={operationalPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Last updated: {lastRefreshed.toLocaleTimeString()}</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="relief">Relief</TabsTrigger>
            </TabsList>

            <div className="mt-4 grid gap-3">
              {currentSystems.map((system) => (
                <div key={system.name} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        getStatusColor(system.status),
                      )}
                    >
                      <system.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{system.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={cn("px-2 py-0 h-5 text-xs", getStatusColor(system.status))}>
                          {statusConfig[system.status as keyof typeof statusConfig]?.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Updated {system.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{system.uptime}%</span>
                    <span className="text-xs text-muted-foreground">Uptime</span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

