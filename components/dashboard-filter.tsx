"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, MapPin, RefreshCw, X } from "lucide-react"
import { CustomCalendar } from "@/components/custom-calendar"

// Myanmar regions for the filter
const myanmarRegions = [
  { value: "all", label: "All Regions" },
  { value: "sagaing", label: "Sagaing Region" },
  { value: "mandalay", label: "Mandalay Region" },
  { value: "magway", label: "Magway Region" },
  { value: "bago", label: "Bago Region" },
  { value: "yangon", label: "Yangon Region" },
  { value: "ayeyarwady", label: "Ayeyarwady Region" },
  { value: "tanintharyi", label: "Tanintharyi Region" },
  { value: "shan", label: "Shan State" },
  { value: "kachin", label: "Kachin State" },
  { value: "kayah", label: "Kayah State" },
  { value: "kayin", label: "Kayin State" },
  { value: "chin", label: "Chin State" },
  { value: "mon", label: "Mon State" },
  { value: "rakhine", label: "Rakhine State" },
]

export function DashboardFilter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date>(new Date(2025, 2, 1)) // March 1st, 2025
  const [dateTo, setDateTo] = useState<Date>(new Date(2025, 2, 31)) // March 31st, 2025
  const [magnitudeRange, setMagnitudeRange] = useState([4.0, 8.0])
  const [region, setRegion] = useState("all")
  const [showOnlyVerified, setShowOnlyVerified] = useState(true)
  const [radius, setRadius] = useState(500)

  // Calendar state
  const [fromCalendarMonth, setFromCalendarMonth] = useState(2) // March (0-indexed)
  const [fromCalendarYear, setFromCalendarYear] = useState(2025)
  const [toCalendarMonth, setToCalendarMonth] = useState(2) // March (0-indexed)
  const [toCalendarYear, setToCalendarYear] = useState(2025)

  // Open state for the date pickers
  const [fromDateOpen, setFromDateOpen] = useState(false)
  const [toDateOpen, setToDateOpen] = useState(false)

  // Format date with ordinal suffix (1st, 2nd, 3rd, etc.)
  const formatDateWithOrdinal = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()

    let suffix = "th"
    if (day % 10 === 1 && day !== 11) suffix = "st"
    else if (day % 10 === 2 && day !== 12) suffix = "nd"
    else if (day % 10 === 3 && day !== 13) suffix = "rd"

    return `${month} ${day}${suffix}, ${year}`
  }

  // Handle previous month
  const handlePrevMonth = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    yearSetter: React.Dispatch<React.SetStateAction<number>>,
    month: number,
    year: number,
  ) => {
    if (month === 0) {
      setter(11)
      yearSetter(year - 1)
    } else {
      setter(month - 1)
    }
  }

  // Handle next month
  const handleNextMonth = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    yearSetter: React.Dispatch<React.SetStateAction<number>>,
    month: number,
    year: number,
  ) => {
    if (month === 11) {
      setter(0)
      yearSetter(year + 1)
    } else {
      setter(month + 1)
    }
  }

  // Handle filter reset
  const handleReset = () => {
    setDateFrom(new Date(2025, 2, 1)) // March 1st, 2025
    setDateTo(new Date(2025, 2, 31)) // March 31st, 2025
    setFromCalendarMonth(2)
    setFromCalendarYear(2025)
    setToCalendarMonth(2)
    setToCalendarYear(2025)
    setMagnitudeRange([4.0, 8.0])
    setRegion("all")
    setShowOnlyVerified(true)
    setRadius(500)
  }

  // Handle filter apply
  const handleApply = () => {
    // In a real app, this would update the global filter state or make an API call
    console.log("Applying filters:", {
      dateFrom,
      dateTo,
      magnitudeRange,
      region,
      showOnlyVerified,
      radius,
    })

    // Close the expanded filter after applying
    setIsExpanded(false)
  }

  return (
    <Card className="border-primary/10 mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Filter Data</h3>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="gap-1 w-full sm:w-auto"
              >
                {isExpanded ? (
                  <>
                    <X className="h-3.5 w-3.5" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <Filter className="h-3.5 w-3.5" />
                    <span>Expand Filters</span>
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1 w-full sm:w-auto">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>

              <Button size="sm" onClick={handleApply} className="gap-1 w-full sm:w-auto">
                <span>Apply Filters</span>
              </Button>
            </div>
          </div>

          {/* Basic filters always visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Date Range */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date-from">Date Range</Label>
              <div className="flex gap-2">
                <Popover open={fromDateOpen} onOpenChange={setFromDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-from"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setFromDateOpen(true)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateWithOrdinal(dateFrom)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CustomCalendar
                      month={fromCalendarMonth}
                      year={fromCalendarYear}
                      selectedDate={dateFrom}
                      onDateSelect={(date) => {
                        setDateFrom(date)
                        setFromDateOpen(false)
                      }}
                      onPrevMonth={() =>
                        handlePrevMonth(setFromCalendarMonth, setFromCalendarYear, fromCalendarMonth, fromCalendarYear)
                      }
                      onNextMonth={() =>
                        handleNextMonth(setFromCalendarMonth, setFromCalendarYear, fromCalendarMonth, fromCalendarYear)
                      }
                    />
                  </PopoverContent>
                </Popover>

                <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setToDateOpen(true)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateWithOrdinal(dateTo)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CustomCalendar
                      month={toCalendarMonth}
                      year={toCalendarYear}
                      selectedDate={dateTo}
                      onDateSelect={(date) => {
                        setDateTo(date)
                        setToDateOpen(false)
                      }}
                      onPrevMonth={() =>
                        handlePrevMonth(setToCalendarMonth, setToCalendarYear, toCalendarMonth, toCalendarYear)
                      }
                      onNextMonth={() =>
                        handleNextMonth(setToCalendarMonth, setToCalendarYear, toCalendarMonth, toCalendarYear)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Magnitude Range */}
            <div className="flex flex-col space-y-1.5">
              <Label>Magnitude Range</Label>
              <div className="pt-2 px-1">
                <Slider
                  defaultValue={magnitudeRange}
                  min={1.0}
                  max={10.0}
                  step={0.1}
                  value={magnitudeRange}
                  onValueChange={setMagnitudeRange}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{magnitudeRange[0].toFixed(1)}</span>
                  <span>{magnitudeRange[1].toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Region */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="region" className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {myanmarRegions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced filters only visible when expanded */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Verified Reports Only */}
              <div className="flex items-center space-x-2">
                <Switch id="verified-only" checked={showOnlyVerified} onCheckedChange={setShowOnlyVerified} />
                <Label htmlFor="verified-only">Show verified reports only</Label>
              </div>

              {/* Search Radius */}
              <div className="flex flex-col space-y-1.5">
                <Label>Search Radius (km)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[radius]}
                    min={50}
                    max={1000}
                    step={50}
                    value={[radius]}
                    onValueChange={(value) => setRadius(value[0])}
                    className="flex-1"
                  />
                  <div className="w-12 text-center font-medium">{radius}</div>
                </div>
              </div>

              {/* Custom Location */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="custom-location">Custom Location</Label>
                <div className="flex gap-2">
                  <Input id="custom-location" placeholder="Enter coordinates or location" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

