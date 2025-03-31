"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Building, FileText, MapPin, MoreHorizontal, Users, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for recent reports
const recentReports = [
  {
    id: "REP-2023-001",
    title: "Building collapse in Sagaing",
    location: "Sagaing Region",
    coordinates: [21.8787, 95.9797],
    type: "infrastructure",
    severity: "critical",
    status: "verified",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    reporter: {
      name: "Ye Htet",
      initials: "YH",
      avatar: null,
      organization: "Local Authority",
    },
    details: "Three-story building collapsed following aftershock. 12 people reported trapped.",
  },
  {
    id: "REP-2023-002",
    title: "Medical supplies needed in Bago",
    location: "Bago Region",
    coordinates: [17.335, 96.4815],
    type: "aid",
    severity: "high",
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    reporter: {
      name: "Thiri Aung",
      initials: "TA",
      avatar: null,
      organization: "Medical Relief",
    },
    details: "Urgent need for medical supplies at Bago General Hospital. Treating 45+ earthquake victims.",
  },
  {
    id: "REP-2023-003",
    title: "Road damage on Yangon-Mandalay Highway",
    location: "Naypyidaw",
    coordinates: [19.7633, 96.0785],
    type: "infrastructure",
    severity: "moderate",
    status: "verified",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    reporter: {
      name: "Kyaw Zaw",
      initials: "KZ",
      avatar: null,
      organization: "Transport Authority",
    },
    details: "Multiple cracks and surface damage reported on the highway. Traffic restricted to one lane.",
  },
  {
    id: "REP-2023-004",
    title: "Temporary shelter established",
    location: "Mandalay Region",
    coordinates: [21.9588, 96.0891],
    type: "shelter",
    severity: "info",
    status: "verified",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    reporter: {
      name: "Su Myat",
      initials: "SM",
      avatar: null,
      organization: "Relief Coordination",
    },
    details: "New temporary shelter established at Mandalay Sports Complex. Capacity for 200 people.",
  },
  {
    id: "REP-2023-005",
    title: "Aftershock reported in Magway",
    location: "Magway Region",
    coordinates: [20.15, 94.95],
    type: "earthquake",
    severity: "high",
    status: "verified",
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    reporter: {
      name: "Tun Lin",
      initials: "TL",
      avatar: null,
      organization: "Geological Department",
    },
    details: "Magnitude 4.8 aftershock reported. No additional damage reported yet.",
  },
]

// Helper function to get the icon for a report type
function getReportTypeIcon(type: string) {
  switch (type) {
    case "infrastructure":
      return <Building className="h-4 w-4" />
    case "aid":
      return <Users className="h-4 w-4" />
    case "shelter":
      return <Building className="h-4 w-4" />
    case "earthquake":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function to get the color for a severity level
function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-300"
    case "high":
      return "text-orange-500 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300"
    case "moderate":
      return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "low":
      return "text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300"
    case "info":
      return "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
    default:
      return "text-gray-500 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300"
  }
}

// Helper function to format relative time
function formatRelativeTime(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
}

export function RecentReports() {
  const [filter, setFilter] = useState("all")

  // Filter reports based on selected filter
  const filteredReports = filter === "all" ? recentReports : recentReports.filter((report) => report.type === filter)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-auto pb-2 -mx-1 px-1">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="whitespace-nowrap"
        >
          All Reports
        </Button>
        <Button
          variant={filter === "infrastructure" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("infrastructure")}
          className="whitespace-nowrap"
        >
          <Building className="mr-1 h-4 w-4" />
          Infrastructure
        </Button>
        <Button
          variant={filter === "aid" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("aid")}
          className="whitespace-nowrap"
        >
          <Users className="mr-1 h-4 w-4" />
          Aid Requests
        </Button>
        <Button
          variant={filter === "shelter" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("shelter")}
          className="whitespace-nowrap"
        >
          <Building className="mr-1 h-4 w-4" />
          Shelters
        </Button>
        <Button
          variant={filter === "earthquake" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("earthquake")}
          className="whitespace-nowrap"
        >
          <AlertTriangle className="mr-1 h-4 w-4" />
          Earthquakes
        </Button>
      </div>

      <div className="space-y-3">
        {filteredReports.map((report) => (
          <Link href={`/reports/${report.id}`} key={report.id} className="block">
            <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                  getSeverityColor(report.severity).split(" ")[1], // Use the background color class
                )}
              >
                {getReportTypeIcon(report.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {report.location}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatRelativeTime(report.timestamp)}
                      </div>
                    </div>
                  </div>

                  <Badge className={cn("px-2 py-0 h-5 text-xs", getSeverityColor(report.severity))}>
                    {report.severity}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{report.details}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      {report.reporter.avatar && (
                        <AvatarImage src={report.reporter.avatar} alt={report.reporter.name} />
                      )}
                      <AvatarFallback className="text-xs">{report.reporter.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{report.reporter.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 gap-1">
                      <span className="text-xs">Details</span>
                      <ChevronRight className="h-3 w-3" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link href="/reports">
          <Button variant="outline" size="sm">
            View All Reports
          </Button>
        </Link>
      </div>
    </div>
  )
}

