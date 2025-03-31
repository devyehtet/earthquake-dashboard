"use client"

import { useState, useEffect } from "react"
import {
  getEarthquakes,
  type EarthquakeData,
  type EarthquakeParams,
  type EarthquakeFeature,
} from "@/lib/earthquake-service"

export function useEarthquakeData(initialParams: EarthquakeParams = {}) {
  const [data, setData] = useState<EarthquakeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [params, setParams] = useState<EarthquakeParams>(initialParams)
  const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)
        const earthquakeData = await getEarthquakes(params)

        if (isMounted) {
          setData(earthquakeData)

          // Select the most significant earthquake by default (usually the first one)
          if (earthquakeData.features.length > 0 && !selectedEarthquake) {
            setSelectedEarthquake(earthquakeData.features[0])
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error occurred"))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [params])

  // Function to update search parameters
  const updateParams = (newParams: EarthquakeParams) => {
    setParams((prev) => ({ ...prev, ...newParams }))
  }

  return {
    data,
    isLoading,
    error,
    params,
    updateParams,
    selectedEarthquake,
    setSelectedEarthquake,
    refresh: () => {
      setIsLoading(true)
      getEarthquakes(params)
        .then((data) => {
          setData(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err instanceof Error ? err : new Error("Unknown error occurred"))
          setIsLoading(false)
        })
    },
  }
}

