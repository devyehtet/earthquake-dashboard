"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShieldCheck, ShieldAlert, ShieldX, PencilIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth, UserRole } from "@/contexts/auth-context"

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

interface TeamPermissionsManagerProps {
  teamId: string
  teamName: string
  currentPermissionLevel: PermissionLevel
  onPermissionChange: (teamId: string, newLevel: PermissionLevel) => void
}

export function TeamPermissionsManager({
  teamId,
  teamName,
  currentPermissionLevel,
  onPermissionChange,
}: TeamPermissionsManagerProps) {
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newPermissionLevel, setNewPermissionLevel] = useState<PermissionLevel>(currentPermissionLevel)

  // Check if user can manage permissions (only SUPER_ADMIN can)
  const canManagePermissions = user?.role === UserRole.SUPER_ADMIN

  // Get current permission info
  const permInfo = permissionLevels[currentPermissionLevel]
  const PermIcon = permInfo.icon

  // Handle save button click
  const handleSave = () => {
    onPermissionChange(teamId, newPermissionLevel)
    setDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Team Access Permissions</CardTitle>
          <Badge
            className={`${permInfo.bgColor} ${permInfo.color} ${permInfo.darkBgColor} ${permInfo.darkTextColor} flex items-center gap-1`}
          >
            <PermIcon className="h-3.5 w-3.5" />
            <span>{permInfo.name}</span>
          </Badge>
        </div>
        <CardDescription>Current access level for {teamName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{permInfo.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2" disabled={!canManagePermissions}>
              <PencilIcon className="h-4 w-4" />
              <span>Edit Permissions</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Team Permissions</DialogTitle>
              <DialogDescription>Update access permissions for {teamName}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="permission-level">Permission Level</Label>
                <Select
                  value={newPermissionLevel}
                  onValueChange={(value) => setNewPermissionLevel(value as PermissionLevel)}
                >
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
                      const IconComponent = permissionLevels[newPermissionLevel].icon
                      return IconComponent ? (
                        <IconComponent className={`h-4 w-4 ${permissionLevels[newPermissionLevel].color}`} />
                      ) : null
                    })()}
                    {permissionLevels[newPermissionLevel].name}
                  </h4>
                  <p className="text-muted-foreground">{permissionLevels[newPermissionLevel].description}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

