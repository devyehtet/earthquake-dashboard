"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ExternalLink } from "lucide-react"
import { getEarthquakes, formatEarthquakeTime, getEarthquakeSeverity } from "@/lib/earthquake-service"

export function RealTimeEarthquakeInfo() {
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

    // Refresh every 5 minutes
    const intervalId = setInterval(fetchLatestEarthquake, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (isLoading) {
    return (
      <Card className="mb-6 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">Loading earthquake data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !latestEarthquake) {
    return (
      <Card className="mb-6 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">
              {error ? `Error loading earthquake data: ${error.message}` : "No significant earthquakes found."}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const magnitude = latestEarthquake.properties.mag
  const location = latestEarthquake.properties.place
  const time = latestEarthquake.properties.time
  const depth = latestEarthquake.geometry.coordinates[2]
  const formattedTime = formatEarthquakeTime(time)
  const severity = getEarthquakeSeverity(magnitude)
  const usgsUrl = latestEarthquake.properties.url

  return (
    <Card className="mb-6 border-2 border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-2xl font-bold">{magnitude} Magnitude Earthquake</h1>
              <p className="text-lg text-muted-foreground">{location}</p>
              <p className="text-sm text-muted-foreground">Data from USGS Earthquake API</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Magnitude</p>
                <p className="text-xl font-bold">{magnitude}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Depth</p>
                <p className="text-xl font-bold">{depth} km</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-xl font-bold">{new Date(time).toLocaleTimeString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-xl font-bold">{new Date(time).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={usgsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="font-medium gap-2 w-full">
                  View on USGS
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/reports/earthquake-details" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="font-medium w-full">
                  View Response Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

