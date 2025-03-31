"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Info, Layers, MapPin } from "lucide-react"
import { useEarthquakeData } from "@/hooks/use-earthquake-data"
import { generateIntensityContours, MMIScale } from "@/lib/intensity-service"
import { formatEarthquakeTime } from "@/lib/earthquake-service"

export function IntensityMap() {
  const [isMounted, setIsMounted] = useState(false)
  const [mapView, setMapView] = useState("intensity")
  const [isLoading, setIsLoading] = useState(true)
  const [leafletComponents, setLeafletComponents] = useState<any>(null)

  // Fetch earthquake data
  const { selectedEarthquake, isLoading: isLoadingEarthquake, error: earthquakeError } = useEarthquakeData()

  // Default center position for Myanmar
  const defaultPosition: [number, number] = [19.7633, 96.0785]

  const mapRef = useRef<any>(null)

  useEffect(() => {
    // Only import Leaflet components on the client side
    const loadLeafletComponents = async () => {
      try {
        setIsLoading(true)

        // Dynamic imports to avoid SSR issues
        const L = await import("leaflet")
        const leafletDefaultIcon = await import("leaflet-defaulticon-compatibility")

        // Import the React Leaflet components
        const { MapContainer, TileLayer, Marker, Popup, Circle, useMap } = await import("react-leaflet")

        // Set the components after they're loaded
        setLeafletComponents({
          MapContainer,
          TileLayer,
          Marker,
          Popup,
          Circle,
          useMap,
        })

        setIsMounted(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading Leaflet components:", error)
        setIsLoading(false)
      }
    }

    loadLeafletComponents()
  }, [])

  // Add Leaflet CSS on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add Leaflet CSS dynamically
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""

      document.head.appendChild(linkElement)

      return () => {
        document.head.removeChild(linkElement)
      }
    }
  }, [])

  if (isLoading || isLoadingEarthquake || !selectedEarthquake) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shaking Intensity Map</CardTitle>
          <CardDescription>Loading intensity data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (earthquakeError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shaking Intensity Map</CardTitle>
          <CardDescription>Error loading intensity data</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
            <p className="text-muted-foreground">Error: {earthquakeError.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Generate intensity contours for the selected earthquake
  const intensityContours = generateIntensityContours(selectedEarthquake)

  // USGS provides coordinates as [longitude, latitude, depth]
  const epicenter: [number, number] = [
    selectedEarthquake.geometry.coordinates[1],
    selectedEarthquake.geometry.coordinates[0],
  ]

  // Create a MapController component only when leafletComponents is available
  const MapController = leafletComponents
    ? ({ center }: { center: [number, number] }) => {
        const map = leafletComponents.useMap()
        useEffect(() => {
          if (map) {
            map.setView(center, 7)
          }
        }, [map, center])
        return null
      }
    : () => null

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Shaking Intensity Map</CardTitle>
            <CardDescription>
              Estimated shaking intensity for M{selectedEarthquake.properties.mag} earthquake
            </CardDescription>
          </div>
          <Tabs value={mapView} onValueChange={setMapView}>
            <TabsList>
              <TabsTrigger value="intensity">Intensity</TabsTrigger>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-[400px] w-full rounded-md overflow-hidden border">
            {isMounted && leafletComponents && !isLoading ? (
              <leafletComponents.MapContainer
                center={epicenter}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
              >
                <MapController center={epicenter} />
                <leafletComponents.TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={
                    mapView === "satellite"
                      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  }
                />

                {/* Render intensity contours */}
                {intensityContours.map((contour) => (
                  <leafletComponents.Circle
                    key={`contour-${contour.mmi}`}
                    center={epicenter}
                    radius={contour.radiusKm * 1000} // Convert to meters
                    pathOptions={{
                      color: contour.color,
                      fillColor: contour.color,
                      fillOpacity: 0.2,
                      weight: 1,
                    }}
                  />
                ))}

                {/* Epicenter marker */}
                <leafletComponents.Marker position={epicenter}>
                  <leafletComponents.Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{selectedEarthquake.properties.title}</h3>
                      <p className="text-sm">Magnitude: {selectedEarthquake.properties.mag}</p>
                      <p className="text-sm">Depth: {selectedEarthquake.geometry.coordinates[2]} km</p>
                      <p className="text-sm">Time: {formatEarthquakeTime(selectedEarthquake.properties.time)}</p>
                      <p className="text-sm">
                        <a
                          href={selectedEarthquake.properties.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View on USGS
                        </a>
                      </p>
                    </div>
                  </leafletComponents.Popup>
                </leafletComponents.Marker>
              </leafletComponents.MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-muted/20">
                <div className="text-center">
                  <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {/* MMI Scale Legend */}
          <div className="border rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4" />
              <h3 className="font-medium text-sm">Modified Mercalli Intensity (MMI) Scale</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MMIScale.filter((level) => level.level >= 3).map((level) => (
                <div key={level.level} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: level.color }} />
                  <span className="text-xs">{level.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
              <p>
                Intensity estimates are based on magnitude, depth, and distance. Actual shaking may vary based on local
                geology.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

