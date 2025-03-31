"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Minus, AlertTriangle, Building, Users, Home, RouteIcon as Road } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEarthquakeData } from "@/hooks/use-earthquake-data"
import { estimateAffectedPeople } from "@/lib/earthquake-service"

// Helper function to get trend icon
function TrendIcon({ value }: { value: number }) {
  if (value > 0) {
    return <ArrowUp className="h-3 w-3 text-emerald-500" />
  } else if (value < 0) {
    return <ArrowDown className="h-3 w-3 text-red-500" />
  }
  return <Minus className="h-3 w-3 text-muted-foreground" />
}

export function DashboardStats() {
  const [timeRange, setTimeRange] = useState("week")
  const { data: earthquakeData, isLoading, error } = useEarthquakeData()

  // Calculate statistics based on earthquake data
  const calculateStats = () => {
    if (!earthquakeData || earthquakeData.features.length === 0) {
      return {
        totalEarthquakes: 0,
        averageMagnitude: 0,
        highestMagnitude: 0,
        affectedPeople: 0,
        damagedBuildings: 0,
        damagedRoads: 0,
        evacuationCenters: 0,
      }
    }

    const features = earthquakeData.features

    // Calculate total earthquakes
    const totalEarthquakes = features.length

    // Calculate average magnitude
    const totalMagnitude = features.reduce((sum, quake) => sum + quake.properties.mag, 0)
    const averageMagnitude = totalMagnitude / totalEarthquakes

    // Find highest magnitude
    const highestMagnitude = Math.max(...features.map((quake) => quake.properties.mag))

    // Estimate affected people based on magnitude
    const affectedPeople = features.reduce((sum, quake) => {
      return sum + estimateAffectedPeople(quake.properties.mag)
    }, 0)

    // These would normally come from a real database
    // Using placeholder values for demonstration
    const damagedBuildings = Math.round(affectedPeople * 0.15)
    const damagedRoads = Math.round(totalEarthquakes * 1.5)
    const evacuationCenters = Math.round(affectedPeople / 500)

    return {
      totalEarthquakes,
      averageMagnitude,
      highestMagnitude,
      affectedPeople,
      damagedBuildings,
      damagedRoads,
      evacuationCenters,
    }
  }

  const stats = calculateStats()

  // Placeholder data for trends (would be calculated from historical data in a real app)
  const trends = {
    earthquakes: 12,
    magnitude: -0.3,
    affected: 245,
    buildings: 18,
    roads: 5,
    centers: 2,
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-muted-foreground">Loading statistics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-muted-foreground">Error loading statistics: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-6">
      <Tabs value={timeRange} onValueChange={setTimeRange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">Past Week</TabsTrigger>
          <TabsTrigger value="month">Past Month</TabsTrigger>
          <TabsTrigger value="year">Past Year</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Earthquakes</p>
                      <p className="text-2xl font-bold">{stats.totalEarthquakes}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5">
                      <TrendIcon value={trends.earthquakes} />
                      <span className="text-xs">{Math.abs(trends.earthquakes)}</span>
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Avg. Magnitude</span>
                    <span className="font-medium">{stats.averageMagnitude.toFixed(1)}</span>
                  </div>
                  <Progress value={stats.averageMagnitude * 10} className="h-2" />
                  <div className="flex justify-between text-xs mt-3 mb-1">
                    <span>Highest Magnitude</span>
                    <span className="font-medium">{stats.highestMagnitude.toFixed(1)}</span>
                  </div>
                  <Progress value={stats.highestMagnitude * 10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">People Affected</p>
                      <p className="text-2xl font-bold">{stats.affectedPeople.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5">
                      <TrendIcon value={trends.affected} />
                      <span className="text-xs">{Math.abs(trends.affected)}</span>
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">vs. previous</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Evacuation Centers</span>
                    <span className="font-medium">{stats.evacuationCenters}</span>
                  </div>
                  <Progress value={(stats.evacuationCenters / 20) * 100} max={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Building className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Damaged Buildings</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{stats.damagedBuildings.toLocaleString()}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1 px-2 py-0.5",
                          trends.buildings > 0 ? "text-red-500" : "text-emerald-500",
                        )}
                      >
                        <TrendIcon value={trends.buildings} />
                        <span className="text-xs">{Math.abs(trends.buildings)}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Road className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Damaged Roads</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{stats.damagedRoads}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1 px-2 py-0.5",
                          trends.roads > 0 ? "text-red-500" : "text-emerald-500",
                        )}
                      >
                        <TrendIcon value={trends.roads} />
                        <span className="text-xs">{Math.abs(trends.roads)}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Home className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Evacuation Centers</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">{stats.evacuationCenters}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1 px-2 py-0.5",
                          trends.centers > 0 ? "text-emerald-500" : "text-red-500",
                        )}
                      >
                        <TrendIcon value={trends.centers} />
                        <span className="text-xs">{Math.abs(trends.centers)}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="month" className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Monthly statistics will be displayed here</p>
        </TabsContent>

        <TabsContent value="year" className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Yearly statistics will be displayed here</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

