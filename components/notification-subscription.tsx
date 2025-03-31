"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"
import { subscribeToNotifications, unsubscribeFromNotifications } from "@/lib/notification-service"

export function NotificationSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscriptionChange = async (checked: boolean) => {
    setIsLoading(true)
    try {
      if (checked) {
        await subscribeToNotifications()
      } else {
        await unsubscribeFromNotifications()
      }
      setIsSubscribed(checked)
    } catch (error) {
      console.error("Error changing notification subscription:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-6 border-primary/10">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Earthquake Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Receive real-time notifications for significant earthquakes in your area.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <Switch
              id="notification-subscription"
              checked={isSubscribed}
              onCheckedChange={handleSubscriptionChange}
              disabled={isLoading}
            />
            <Label htmlFor="notification-subscription">
              {isSubscribed ? "Notifications enabled" : "Enable notifications"}
            </Label>
          </div>
        </div>
        {isSubscribed && (
          <p className="text-xs text-muted-foreground mt-2 ml-12">
            You'll only receive alerts for earthquakes matching your criteria.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

