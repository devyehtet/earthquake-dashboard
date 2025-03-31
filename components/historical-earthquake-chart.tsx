"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { AlertTriangle, BarChart3, LineChartIcon, RefreshCw } from "lucide-react"
import {
  getHistoricalEarthquakes,
  groupEarthquakesByYear,
  groupEarthquakesByMagnitude,
} from "@/lib/historical-earthquake-service"

export function HistoricalEarthquakeChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [chartType, setChartType] = useState("yearly")
  const [chartView, setChartView] = useState("bar")
  const [timeRange, setTimeRange] = useState("50")
  const [minMagnitude, setMinMagnitude] = useState("5.0")
  const [yearlyData, setYearlyData] = useState<any[]>([])
  const [magnitudeData, setMagnitudeData] = useState<any[]>([])

  // Fetch historical earthquake data
  useEffect(() => {
    async function fetchHistoricalData() {
      try {
        setIsLoading(true)
        setError(null)

        // Calculate start year based on selected time range
        const currentYear = new Date().getFullYear()
        const startYear = currentYear - Number.parseInt(timeRange)

        // Fetch historical earthquake data
        const data = await getHistoricalEarthquakes({
          startYear,
          minmagnitude: Number.parseFloat(minMagnitude),
          maxradiuskm: 1000, // Cover Myanmar and surrounding regions
        })

        // Process data for charts
        if (data.features.length > 0) {
          // Group by year
          const yearCounts = groupEarthquakesByYear(data)
          const yearlyChartData = Object.entries(yearCounts)
            .map(([year, count]) => ({
              year,
              earthquakes: count,
            }))
            .sort((a, b) => Number.parseInt(a.year) - Number.parseInt(b.year))

          // Group by magnitude
          const magCounts = groupEarthquakesByMagnitude(data)
          const magnitudeChartData = Object.entries(magCounts).map(([range, count]) => ({
            range,
            earthquakes: count,
          }))

          setYearlyData(yearlyChartData)
          setMagnitudeData(magnitudeChartData)
        } else {
          setYearlyData([])
          setMagnitudeData([])
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoricalData()
  }, [timeRange, minMagnitude])

  // Handle refresh button click
  const handleRefresh = () => {
    // Re-fetch data with current settings
    setIsLoading(true)
    // The useEffect will handle the actual data fetching
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Earthquake Data</CardTitle>
          <CardDescription>Loading historical data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Earthquake Data</CardTitle>
          <CardDescription>Error loading historical data</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
            <p className="text-muted-foreground">Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Historical Earthquake Data</CardTitle>
            <CardDescription>Earthquake history for Myanmar and surrounding regions</CardDescription>
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
            <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="yearly">Yearly Trend</TabsTrigger>
                <TabsTrigger value="magnitude">By Magnitude</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Last 10 Years</SelectItem>
                  <SelectItem value="25">Last 25 Years</SelectItem>
                  <SelectItem value="50">Last 50 Years</SelectItem>
                  <SelectItem value="100">Last 100 Years</SelectItem>
                </SelectContent>
              </Select>

              <Select value={minMagnitude} onValueChange={setMinMagnitude}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Min Magnitude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.0">Magnitude 4.0+</SelectItem>
                  <SelectItem value="5.0">Magnitude 5.0+</SelectItem>
                  <SelectItem value="6.0">Magnitude 6.0+</SelectItem>
                  <SelectItem value="7.0">Magnitude 7.0+</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={chartView === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartView("bar")}
                  className="w-10 p-0"
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartView === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartView("line")}
                  className="w-10 p-0"
                >
                  <LineChartIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "yearly" ? (
                chartView === "bar" ? (
                  <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="year"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        // Only show some years to avoid overcrowding
                        const year = Number.parseInt(value)
                        return year % 5 === 0 ? value : ""
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${value} earthquakes`, "Count"]}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="earthquakes" name="Earthquakes" fill="var(--primary)" />
                  </BarChart>
                ) : (
                  <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="year"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        // Only show some years to avoid overcrowding
                        const year = Number.parseInt(value)
                        return year % 5 === 0 ? value : ""
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${value} earthquakes`, "Count"]}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="earthquakes"
                      name="Earthquakes"
                      stroke="var(--primary)"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                )
              ) : (
                <BarChart data={magnitudeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`${value} earthquakes`, "Count"]}
                    labelFormatter={(label) => `Magnitude: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="earthquakes" name="Earthquakes" fill="var(--primary)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-muted-foreground">
            Data source: USGS Earthquake Catalog. Chart shows earthquakes of magnitude {minMagnitude}+ within 1000km of
            Myanmar in the past {timeRange} years.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

