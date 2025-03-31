"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const usgsUrl = latestEarthquake.properties.url

  const onClose = () => {
    setIsVisible(false)
  }

  const onEmergencyContactsClick = () => {
    window.location.href = "/resources#emergency-contacts"
  }

  return (
    <div className="mb-6 animate-fade-in">
      <div className="w-full rounded-lg bg-red-600 p-4 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Earthquake Alert</h3>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white hover:text-gray-200"
                aria-label="Close alert"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-base font-medium text-white">
              A {magnitude} magnitude earthquake has been reported {location}.
              <span className="block text-sm mt-1">Detected: {time}</span>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/20"
                onClick={() => window.open(usgsUrl, "_blank")}
              >
                View USGS Details
              </Button>
              <Button
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/20"
                onClick={onEmergencyContactsClick}
              >
                Emergency Contacts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

