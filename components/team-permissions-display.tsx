import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, ShieldAlert, ShieldX, Check, X } from "lucide-react"

type PermissionLevel = "restricted" | "standard" | "elevated"

// Permission level details
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

// Permission capabilities by level
const permissionCapabilities = {
  dataAccess: {
    title: "Data Access",
    restricted: {
      local: true,
      regional: false,
      national: false,
    },
    standard: {
      local: true,
      regional: true,
      national: false,
    },
    elevated: {
      local: true,
      regional: true,
      national: true,
    },
  },
  reporting: {
    title: "Reporting",
    restricted: {
      submit: true,
      edit: true,
      approve: false,
    },
    standard: {
      submit: true,
      edit: true,
      approve: true,
    },
    elevated: {
      submit: true,
      edit: true,
      approve: true,
    },
  },
  teamManagement: {
    title: "Team Management",
    restricted: {
      view: true,
      assign: false,
      manage: false,
    },
    standard: {
      view: true,
      assign: true,
      manage: false,
    },
    elevated: {
      view: true,
      assign: true,
      manage: true,
    },
  },
  resourceAllocation: {
    title: "Resource Allocation",
    restricted: {
      request: true,
      approve: false,
      prioritize: false,
    },
    standard: {
      request: true,
      approve: false,
      prioritize: false,
    },
    elevated: {
      request: true,
      approve: true,
      prioritize: true,
    },
  },
}

interface TeamPermissionsDisplayProps {
  teamName: string
  permissionLevel: PermissionLevel
}

export function TeamPermissionsDisplay({ teamName, permissionLevel }: TeamPermissionsDisplayProps) {
  const permInfo = permissionLevels[permissionLevel]
  const IconComponent = permInfo.icon

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Permissions</CardTitle>
            <CardDescription>Access level for {teamName}</CardDescription>
          </div>
          <Badge
            className={`${permInfo.bgColor} ${permInfo.color} ${permInfo.darkBgColor} ${permInfo.darkTextColor} flex items-center gap-1 px-3 py-1`}
          >
            <IconComponent className="h-3.5 w-3.5" />
            <span>{permInfo.name}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">{permInfo.description}</div>

        <div className="grid gap-4">
          {Object.entries(permissionCapabilities).map(([key, capability]) => (
            <div key={key} className="border rounded-md p-3">
              <h3 className="font-medium mb-2">{capability.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(capability[permissionLevel as keyof typeof capability]).map(([action, allowed]) => (
                  <div key={action} className="flex items-center gap-2">
                    {allowed ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                    <span className="capitalize">{action.replace(/([A-Z])/g, " $1").trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

