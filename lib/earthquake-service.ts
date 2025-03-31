// USGS Earthquake API service
// Documentation: https://earthquake.usgs.gov/fdsnws/event/1/

export interface EarthquakeFeature {
  id: string
  type: string
  properties: {
    mag: number
    place: string
    time: number
    updated: number
    tz: number | null
    url: string
    detail: string
    felt: number | null
    cdi: number | null
    mmi: number | null
    alert: string | null
    status: string
    tsunami: number
    sig: number
    net: string
    code: string
    ids: string
    sources: string
    types: string
    nst: number | null
    dmin: number | null
    rms: number
    gap: number | null
    magType: string
    type: string
    title: string
  }
  geometry: {
    type: string
    coordinates: [number, number, number] // [longitude, latitude, depth]
  }
}

export interface EarthquakeData {
  type: string
  metadata: {
    generated: number
    url: string
    title: string
    status: number
    api: string
    count: number
  }
  features: EarthquakeFeature[]
}

export interface EarthquakeParams {
  starttime?: string // YYYY-MM-DD
  endtime?: string // YYYY-MM-DD
  minmagnitude?: number
  maxmagnitude?: number
  latitude?: number
  longitude?: number
  maxradiuskm?: number
  limit?: number
}

// Myanmar's approximate center coordinates
const MYANMAR_CENTER = {
  latitude: 19.7633,
  longitude: 96.0785,
}

// Default radius to cover Myanmar and nearby regions (in km)
const DEFAULT_RADIUS = 1000

export async function getEarthquakes(params: EarthquakeParams = {}): Promise<EarthquakeData> {
  // Set default parameters focused on Myanmar if not provided
  const queryParams = new URLSearchParams()

  // Default to significant earthquakes in the past 30 days if no time range specified
  if (!params.starttime) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    queryParams.append("starttime", thirtyDaysAgo.toISOString().split("T")[0])
  } else {
    queryParams.append("starttime", params.starttime)
  }

  if (params.endtime) queryParams.append("endtime", params.endtime)

  // Default to earthquakes of magnitude 4.0 or greater if not specified
  queryParams.append("minmagnitude", params.minmagnitude?.toString() || "4.0")
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

  // Limit results
  queryParams.append("limit", params.limit?.toString() || "100")

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
    console.error("Error fetching earthquake data:", error)
    throw error
  }
}

// Helper function to format earthquake time
export function formatEarthquakeTime(timestamp: number): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date)
}

// Helper function to determine severity based on magnitude
export function getEarthquakeSeverity(magnitude: number): "low" | "moderate" | "severe" | "critical" {
  if (magnitude < 4.0) return "low"
  if (magnitude < 5.5) return "moderate"
  if (magnitude < 6.5) return "severe"
  return "critical"
}

// Helper function to estimate affected radius based on magnitude
export function getAffectedRadiusKm(magnitude: number): number {
  // Simple formula to estimate affected radius in km
  // This is a rough approximation and would need refinement for real use
  return Math.pow(10, magnitude - 3) * 5
}

// Helper function to estimate people affected based on magnitude and location
// In a real system, this would use population density data
export function estimateAffectedPeople(magnitude: number): number {
  // Very rough estimate for demonstration purposes
  const baseNumber = Math.pow(10, magnitude - 4)
  return Math.round(baseNumber * 100)
}

