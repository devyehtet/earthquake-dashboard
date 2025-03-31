"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getEarthquakes, formatEarthquakeTime, getEarthquakeSeverity } from "@/lib/earthquake-service"

export function EmergencyAlert() {
  const [isVisible, setIsVisible] = useState(true)
  const [latestEarthquake, setLatestEarthquake] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLatestEarthquake() {
      try {
        setIsLoading(true)
        // Get earthquakes with magnitude 5.0+ in the past 7 days
        const data = await getEarthquakes({
          minmagnitude: 5.0,
          limit: 1,
        })

        if (data.features.length > 0) {
          setLatestEarthquake(data.features[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestEarthquake()
  }, [])

  if (!isVisible || isLoading || !latestEarthquake) return null

  const magnitude = latestEarthquake.properties.mag
  const location = latestEarthquake.properties.place
  const time = formatEarthquakeTime(latestEarthquake.properties.time)
  const severity = getEarthquakeSeverity(magnitude)

  return (
    <div className="mb-6 animate-fade-in">
      <div
        className={cn(
          "relative rounded-lg border-2 border-red-500 bg-red-50 p-4",
          "dark:border-red-500 dark:bg-red-900/30",
        )}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Earthquake Alert</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-red-600 dark:text-red-400 hover:bg-red-500/10"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <p className="mt-2 text-base font-medium text-red-800 dark:text-red-300">
              A {magnitude} magnitude earthquake has been reported {location}.
              <span className="block text-sm mt-1">Detected: {time}</span>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href={latestEarthquake.properties.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="destructive" className="font-medium w-full">
                  View USGS Details
                </Button>
              </Link>
              <Link href="/resources#emergency-contacts" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 dark:border-red-500 dark:text-red-400 font-medium w-full"
                >
                  Emergency Contacts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

