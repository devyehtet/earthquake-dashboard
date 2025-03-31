"use client"

import { useState, useEffect } from "react"

export function useTouch() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if the device supports touch
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}

