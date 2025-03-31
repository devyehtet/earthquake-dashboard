"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Building, FileText, MapPin, MoreHorizontal, Users, ChevronRight, Clock } from "lucide-react"

// Sample data for reports
const reports = [
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
      return "bg-red-100 text-red-700"
    case "high":
      return "bg-orange-100 text-orange-700"
    case "moderate":
      return "bg-yellow-100 text-yellow-700"
    case "info":
      return "bg-blue-100 text-blue-700"
    default:
      return "bg-gray-100 text-gray-700"
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

export function ReportsList() {
  const [filter, setFilter] = useState("all")

  // Filter reports based on selected filter
  const filteredReports = filter === "all" ? reports : reports.filter((report) => report.type === filter)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Incident Reports</h1>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          All Reports
        </Button>
        <Button
          variant={filter === "infrastructure" ? "default" : "outline"}
          onClick={() => setFilter("infrastructure")}
          className="flex items-center gap-1"
        >
          <FileText className="h-4 w-4" />
          Infrastructure
        </Button>
        <Button
          variant={filter === "aid" ? "default" : "outline"}
          onClick={() => setFilter("aid")}
          className="flex items-center gap-1"
        >
          <Users className="h-4 w-4" />
          Aid Requests
        </Button>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Link href={`/reports/${report.id}`} key={report.id} className="block">
            <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {getReportTypeIcon(report.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{report.title}</h3>
                    <Badge className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span>{report.location}</span>
                    <Clock className="h-3.5 w-3.5 text-gray-400 ml-2" />
                    <span>{formatRelativeTime(report.timestamp)}</span>
                  </div>

                  <p className="mt-2 text-gray-600">{report.details}</p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {report.reporter.initials}
                      </div>
                      <span className="text-sm text-gray-700">{report.reporter.name}</span>
                    </div>

                    <div className="flex items-center">
                      <Button variant="ghost" className="text-blue-600 p-0 h-auto">
                        Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button variant="ghost" className="text-gray-400 ml-4 p-0 h-auto">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline" className="border-gray-300 text-gray-700">
          View All Reports
        </Button>
      </div>
    </div>
  )
}

