"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Building2, Layers, MapPin, Maximize, Minimize, Route, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEarthquakeData } from "@/hooks/use-earthquake-data"
import { getEarthquakeSeverity, getAffectedRadiusKm, formatEarthquakeTime } from "@/lib/earthquake-service"
import { DeviceLayout } from "@/components/device-layout"
import { useDevice } from "@/contexts/device-context"

// Define types for Leaflet components to avoid direct imports
type MapContainerProps = {
  center: [number, number]
  zoom: number
  style: React.CSSProperties
  children: React.ReactNode
}

type TileLayerProps = {
  attribution: string
  url: string
}

type MarkerProps = {
  position: [number, number]
  children?: React.ReactNode
}

type PopupProps = {
  children: React.ReactNode
}

type CircleProps = {
  center: [number, number]
  radius: number
  pathOptions: {
    color: string
    fillColor: string
    fillOpacity: number
  }
  eventHandlers: {
    click: () => void
  }
}

// This would normally be fetched from an API
const facilities = [
  { id: 1, name: "Yangon General Hospital", lat: 16.7861, lng: 96.1321, type: "hospital", status: "operational" },
  { id: 2, name: "Mandalay Medical Center", lat: 21.9688, lng: 96.0991, type: "hospital", status: "limited" },
  { id: 3, name: "Sagaing Relief Center", lat: 21.8887, lng: 95.9697, type: "relief", status: "operational" },
  { id: 4, name: "Bago Field Hospital", lat: 17.345, lng: 96.4915, type: "hospital", status: "operational" },
  { id: 5, name: "Magway Distribution Center", lat: 20.16, lng: 94.94, type: "relief", status: "operational" },
]

const roadDamage = [
  { id: 1, name: "Yangon-Mandalay Highway", lat: 19.4161, lng: 96.0951, severity: "severe", status: "closed" },
  { id: 2, name: "Bago-Yangon Road", lat: 17.135, lng: 96.3815, severity: "moderate", status: "limited" },
  { id: 3, name: "Sagaing Bridge", lat: 21.8887, lng: 95.9897, severity: "critical", status: "closed" },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "#ef4444"
    case "severe":
      return "#f97316"
    case "moderate":
      return "#facc15"
    default:
      return "#22c55e"
  }
}

function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onRefresh,
}: {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onRefresh: () => void
}) {
  return (
    <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
      <Button variant="secondary" size="icon" onClick={onZoomIn}>
        <Maximize className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onZoomOut}>
        <Minimize className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onReset}>
        <Layers className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  )
}

const MobileMapControls = ({ onZoomIn, onZoomOut, onReset, onRefresh }) => {
  return (
    <div className="absolute bottom-3 right-3 z-[1000] flex gap-2">
      <Button variant="secondary" size="sm" onClick={onZoomIn}>
        <Maximize className="h-3 w-3" />
      </Button>
      <Button variant="secondary" size="sm" onClick={onReset}>
        <Layers className="h-3 w-3" />
      </Button>
    </div>
  )
}

export function DashboardMap() {
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [mapTab, setMapTab] = useState("earthquakes")
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.7633, 96.0785])
  const [mapZoom, setMapZoom] = useState(6)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [leafletComponents, setLeafletComponents] = useState<{
    MapContainer: React.ComponentType<MapContainerProps>
    TileLayer: React.ComponentType<TileLayerProps>
    Marker: React.ComponentType<MarkerProps>
    Popup: React.ComponentType<PopupProps>
    Circle: React.ComponentType<CircleProps>
    useMap: () => any
  } | null>(null)

  // Fetch earthquake data
  const {
    data: earthquakeData,
    isLoading: isLoadingEarthquakes,
    error: earthquakeError,
    refresh: refreshEarthquakes,
    selectedEarthquake,
    setSelectedEarthquake,
  } = useEarthquakeData()

  // Default center position for Myanmar
  const defaultPosition: [number, number] = [19.7633, 96.0785]
  const { isMobile } = useDevice()

  const mapRef = useRef<any>(null)
  const map = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null) // Ref to store the map instance

  const loadLeafletComponents = useCallback(async () => {
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
    } catch (error) {
      console.error("Error loading Leaflet components:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Only import Leaflet components on the client side
    loadLeafletComponents()
  }, [loadLeafletComponents])

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

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 3))
  }

  const handleReset = () => {
    setMapCenter(defaultPosition)
    setMapZoom(6)
  }

  const handleRefresh = () => {
    refreshEarthquakes()
  }

  const handleEarthquakeClick = (earthquake: any) => {
    setSelectedEarthquake(earthquake)
    setActiveArea(earthquake.id)
    // Use the earthquake coordinates (swap lat/lng as USGS provides [lng, lat, depth])
    setMapCenter([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
    setMapZoom(9)
  }

  // Create a MapController component only when leafletComponents is available
  const MapController = leafletComponents
    ? ({ center, zoom, mapInstance }: { center: [number, number]; zoom: number; mapInstance: any }) => {
        useEffect(() => {
          mapRef.current = mapInstance
          map.current = mapInstance // Store the map instance
          mapInstanceRef.current = mapInstance
        }, [mapInstance])

        useEffect(() => {
          if (mapRef.current) {
            mapRef.current.setView(center, zoom)
          }
        }, [center, zoom])

        return null
      }
    : () => null

  const MapWrapper = leafletComponents
    ? () => {
        const mapInstance = leafletComponents.useMap()

        return <MapController center={mapCenter} zoom={mapZoom} mapInstance={mapInstance} />
      }
    : () => null

  return (
    <div className="space-y-4">
      <Tabs value={mapTab} onValueChange={setMapTab}>
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="earthquakes" className="flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Earthquakes</span>
            </TabsTrigger>
            <TabsTrigger value="facilities" className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>Facilities</span>
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="flex items-center gap-1">
              <Route className="h-3.5 w-3.5" />
              <span>Infrastructure</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <DeviceLayout
          mobileContent={<div className="relative h-[300px] w-full rounded-md overflow-hidden border" />}
          tabletContent={<div className="relative h-[375px] w-full rounded-md overflow-hidden border" />}
          desktopContent={<div className="relative h-[450px] w-full rounded-md overflow-hidden border" />}
        >
          <div className="relative h-[400px] w-full rounded-md overflow-hidden border">
            {isMounted && leafletComponents && !isLoading ? (
              <leafletComponents.MapContainer
                center={defaultPosition}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
              >
                {leafletComponents && <MapWrapper />}
                <leafletComponents.TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapTab === "earthquakes" &&
                  earthquakeData &&
                  earthquakeData.features.map((earthquake) => {
                    const magnitude = earthquake.properties.mag
                    const severity = getEarthquakeSeverity(magnitude)
                    const radius = getAffectedRadiusKm(magnitude) * 1000 // Convert to meters for Leaflet
                    // USGS provides coordinates as [longitude, latitude, depth]
                    const position: [number, number] = [
                      earthquake.geometry.coordinates[1],
                      earthquake.geometry.coordinates[0],
                    ]

                    return (
                      <div key={earthquake.id}>
                        <leafletComponents.Circle
                          center={position}
                          radius={radius}
                          pathOptions={{
                            color: getSeverityColor(severity),
                            fillColor: getSeverityColor(severity),
                            fillOpacity: 0.4,
                          }}
                          eventHandlers={{
                            click: () => handleEarthquakeClick(earthquake),
                          }}
                        />
                        <leafletComponents.Marker position={position}>
                          <leafletComponents.Popup>
                            <div className="p-2">
                              <h3 className="font-bold">{earthquake.properties.title}</h3>
                              <p className="text-sm">Magnitude: {earthquake.properties.mag}</p>
                              <p className="text-sm">Depth: {earthquake.geometry.coordinates[2]} km</p>
                              <p className="text-sm">Time: {formatEarthquakeTime(earthquake.properties.time)}</p>
                              <p className="text-sm">
                                <a
                                  href={earthquake.properties.url}
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
                      </div>
                    )
                  })}

                {mapTab === "facilities" &&
                  facilities.map((facility) => (
                    <leafletComponents.Marker key={facility.id} position={[facility.lat, facility.lng]}>
                      <leafletComponents.Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{facility.name}</h3>
                          <p className="text-sm">Type: {facility.type}</p>
                          <p className="text-sm">Status: {facility.status}</p>
                        </div>
                      </leafletComponents.Popup>
                    </leafletComponents.Marker>
                  ))}

                {mapTab === "infrastructure" &&
                  roadDamage.map((road) => (
                    <leafletComponents.Marker key={road.id} position={[road.lat, road.lng]}>
                      <leafletComponents.Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{road.name}</h3>
                          <p className="text-sm">Severity: {road.severity}</p>
                          <p className="text-sm">Status: {road.status}</p>
                        </div>
                      </leafletComponents.Popup>
                    </leafletComponents.Marker>
                  ))}
              </leafletComponents.MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-muted/20">
                <div className="text-center">
                  <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}

            <DeviceLayout
              mobileContent={
                <MobileMapControls
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onReset={handleReset}
                  onRefresh={handleRefresh}
                />
              }
            >
              <MapControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onRefresh={handleRefresh}
              />
            </DeviceLayout>
          </div>
        </DeviceLayout>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-x-auto pb-2">
        {earthquakeData &&
          earthquakeData.features.slice(0, 5).map((earthquake) => {
            const magnitude = earthquake.properties.mag
            const severity = getEarthquakeSeverity(magnitude)

            return (
              <Card
                key={earthquake.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  activeArea === earthquake.id && "ring-2 ring-primary",
                )}
                onClick={() => handleEarthquakeClick(earthquake)}
              >
                <CardContent className="p-3 flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{earthquake.properties.place}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-2 py-0 text-xs",
                        severity === "critical" && "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
                        severity === "severe" &&
                          "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
                        severity === "moderate" &&
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300",
                      )}
                    >
                      {severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>Magnitude {magnitude}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="font-medium">{new Date(earthquake.properties.time).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}

