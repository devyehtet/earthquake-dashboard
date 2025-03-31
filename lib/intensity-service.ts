// Intensity mapping service for earthquake shaking visualization

import type { EarthquakeFeature } from "./earthquake-service"

// Modified Mercalli Intensity (MMI) scale
export interface IntensityLevel {
  level: number
  name: string
  description: string
  color: string
  radius: number // Relative radius for visualization
}

export const MMIScale: IntensityLevel[] = [
  {
    level: 1,
    name: "I. Not felt",
    description: "Not felt except by a very few under especially favorable conditions.",
    color: "#FFFFFF",
    radius: 0.1,
  },
  {
    level: 2,
    name: "II. Weak",
    description: "Felt only by a few persons at rest, especially on upper floors of buildings.",
    color: "#ACD8E9",
    radius: 0.2,
  },
  {
    level: 3,
    name: "III. Weak",
    description: "Felt quite noticeably by persons indoors, especially on upper floors of buildings.",
    color: "#ACD8E9",
    radius: 0.3,
  },
  {
    level: 4,
    name: "IV. Light",
    description: "Felt indoors by many, outdoors by few during the day. Dishes, windows, doors disturbed.",
    color: "#83D0DA",
    radius: 0.4,
  },
  {
    level: 5,
    name: "V. Moderate",
    description: "Felt by nearly everyone; many awakened. Some dishes, windows broken.",
    color: "#7BC87F",
    radius: 0.5,
  },
  {
    level: 6,
    name: "VI. Strong",
    description: "Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster.",
    color: "#F9F518",
    radius: 0.6,
  },
  {
    level: 7,
    name: "VII. Very Strong",
    description:
      "Damage negligible in buildings of good design and construction; slight to moderate in well-built ordinary structures.",
    color: "#FAC611",
    radius: 0.7,
  },
  {
    level: 8,
    name: "VIII. Severe",
    description:
      "Damage slight in specially designed structures; considerable damage in ordinary substantial buildings.",
    color: "#FA8A11",
    radius: 0.8,
  },
  {
    level: 9,
    name: "IX. Violent",
    description: "Damage considerable in specially designed structures. Buildings shifted off foundations.",
    color: "#F7100C",
    radius: 0.9,
  },
  {
    level: 10,
    name: "X. Extreme",
    description: "Some well-built wooden structures destroyed; most masonry and frame structures destroyed.",
    color: "#C80F0A",
    radius: 1.0,
  },
]

// Calculate estimated MMI based on magnitude and distance
export function calculateMMI(magnitude: number, distanceKm: number): number {
  // This is a simplified formula - in real applications, use proper attenuation models
  // and consider depth, soil conditions, etc.
  const estimatedMMI = 1.5 * magnitude - 0.5 * Math.log10(distanceKm) - 0.5

  // Clamp between 1-10
  return Math.max(1, Math.min(10, Math.round(estimatedMMI)))
}

// Generate intensity contours for an earthquake
export function generateIntensityContours(earthquake: EarthquakeFeature): IntensityContour[] {
  const magnitude = earthquake.properties.mag
  const depth = earthquake.geometry.coordinates[2] // depth in km

  // Generate contours for MMI levels from 10 down to 3
  const contours: IntensityContour[] = []

  for (let mmi = 10; mmi >= 3; mmi--) {
    // Calculate radius where this intensity would be felt
    // This is a simplified formula - real models are more complex
    const radiusKm = Math.pow(10, (1.5 * magnitude - mmi - 0.5) / 0.5) * Math.sqrt(depth)

    if (radiusKm > 0 && radiusKm < 1000) {
      // Only include reasonable radii
      contours.push({
        mmi,
        radiusKm,
        color: MMIScale[mmi - 1].color,
      })
    }
  }

  return contours
}

export interface IntensityContour {
  mmi: number
  radiusKm: number
  color: string
}

// Calculate distance between two coordinates in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

