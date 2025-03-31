"use client"

import { useDevice } from "@/contexts/device-context"
import type React from "react"

interface DeviceLayoutProps {
  children: React.ReactNode
  mobileContent?: React.ReactNode
  tabletContent?: React.ReactNode
  desktopContent?: React.ReactNode
}

export function DeviceLayout({ children, mobileContent, tabletContent, desktopContent }: DeviceLayoutProps) {
  const { deviceType } = useDevice()

  if (deviceType === "mobile" && mobileContent) {
    return <>{mobileContent}</>
  }

  if (deviceType === "tablet" && tabletContent) {
    return <>{tabletContent}</>
  }

  if (deviceType === "desktop" && desktopContent) {
    return <>{desktopContent}</>
  }

  return <>{children}</>
}

