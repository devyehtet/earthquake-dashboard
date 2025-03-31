"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type DeviceType = "mobile" | "tablet" | "desktop"

interface DeviceContextProps {
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isPortrait: boolean
  isLandscape: boolean
}

const DeviceContext = createContext<DeviceContextProps>({
  deviceType: "desktop",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isPortrait: true,
  isLandscape: false,
})

export const useDevice = () => useContext(DeviceContext)

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [isPortrait, setIsPortrait] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDeviceType("mobile")
      } else if (width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }

      setIsPortrait(window.innerHeight > window.innerWidth)
    }

    // Initial check
    handleResize()

    // Listen for resize events
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <DeviceContext.Provider
      value={{
        deviceType,
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        isPortrait,
        isLandscape: !isPortrait,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

