// Historical earthquake data service

import type { EarthquakeParams, EarthquakeData } from "./earthquake-service"

// Interface for historical earthquake query parameters
export interface HistoricalEarthquakeParams extends EarthquakeParams {
  startYear?: number
  endYear?: number
  significantOnly?: boolean
}

// Myanmar's approximate center coordinates
const MYANMAR_CENTER = {
  latitude: 19.7633,
  longitude: 96.0785,
}

// Default radius to cover Myanmar and nearby regions (in km)
const DEFAULT_RADIUS = 1000

// Fetch historical earthquake data
export async function getHistoricalEarthquakes(params: HistoricalEarthquakeParams = {}): Promise<EarthquakeData> {
  // Set default parameters focused on Myanmar if not provided
  const queryParams = new URLSearchParams()

  // Handle date range
  if (params.startYear) {
    const startDate = `${params.startYear}-01-01`
    queryParams.append("starttime", startDate)
  } else {
    // Default to 10 years ago if no start year specified
    const tenYearsAgo = new Date()
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)
    queryParams.append("starttime", tenYearsAgo.toISOString().split("T")[0])
  }

  if (params.endYear) {
    const endDate = `${params.endYear}-12-31`
    queryParams.append("endtime", endDate)
  } else if (params.endtime) {
    queryParams.append("endtime", params.endtime)
  }

  // Default to earthquakes of magnitude 5.0 or greater for historical data
  queryParams.append("minmagnitude", params.minmagnitude?.toString() || "5.0")
  if (params.maxmagnitude) queryParams.append("maxmagnitude", params.maxmagnitude.toString())

  // Default to Myanmar region if no location specified
  if (!params.latitude && !params.longitude) {
    queryParams.append("latitude", MYANMAR_CENTER.latitude.toString())
    queryParams.append("longitude", MYANMAR_CENTER.longitude.toString())
    queryParams.append("maxradiuskm", params.maxradiuskm?.toString() || DEFAULT_RADIUS.toString())
  } else if (params.latitude && params.longitude) {
    queryParams.append("latitude", params.latitude.toString())
    queryParams.append("longitude", params.longitude.toString())
    queryParams.append("maxradiuskm", params.maxradiuskm?.toString() || DEFAULT_RADIUS.toString())
  }

  // For historical data, we might want to limit to significant earthquakes only
  if (params.significantOnly) {
    queryParams.append("catalog", "significant")
  }

  // Limit results
  queryParams.append("limit", params.limit?.toString() || "500")

  // Format
  queryParams.append("format", "geojson")

  // Order by time
  queryParams.append("orderby", "time")

  try {
    const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`)
    }

    const data: EarthquakeData = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching historical earthquake data:", error)
    throw error
  }
}

// Get significant historical earthquakes in Myanmar region
export async function getSignificantHistoricalEarthquakes(): Promise<EarthquakeData> {
  return getHistoricalEarthquakes({
    startYear: 1900,
    minmagnitude: 6.0,
    significantOnly: true,
    limit: 100,
  })
}

// Group earthquakes by year
export function groupEarthquakesByYear(earthquakes: EarthquakeData): Record<number, number> {
  const yearCounts: Record<number, number> = {}

  earthquakes.features.forEach((quake) => {
    const year = new Date(quake.properties.time).getFullYear()
    yearCounts[year] = (yearCounts[year] || 0) + 1
  })

  return yearCounts
}

// Group earthquakes by magnitude range
export function groupEarthquakesByMagnitude(earthquakes: EarthquakeData): Record<string, number> {
  const magnitudeCounts: Record<string, number> = {
    "3.0-3.9": 0,
    "4.0-4.9": 0,
    "5.0-5.9": 0,
    "6.0-6.9": 0,
    "7.0+": 0,
  }

  earthquakes.features.forEach((quake) => {
    const mag = quake.properties.mag

    if (mag >= 3.0 && mag < 4.0) magnitudeCounts["3.0-3.9"]++
    else if (mag >= 4.0 && mag < 5.0) magnitudeCounts["4.0-4.9"]++
    else if (mag >= 5.0 && mag < 6.0) magnitudeCounts["5.0-5.9"]++
    else if (mag >= 6.0 && mag < 7.0) magnitudeCounts["6.0-6.9"]++
    else if (mag >= 7.0) magnitudeCounts["7.0+"]++
  })

  return magnitudeCounts
}

