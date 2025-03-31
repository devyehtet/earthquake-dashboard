"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Clock, Calendar, Share2, Edit, CheckCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Mock data for a single report
const reportData = {
  id: "REP-2023-002",
  title: "Medical supplies needed in Bago",
  severity: "high",
  status: "pending",
  location: "Bago Region",
  coordinates: { lat: 17.335, lng: 96.4815 },
  timestamp: "2 hours ago",
  date: "3/31/2025",
  description:
    "Urgent need for medical supplies at Bago General Hospital. Treating 45+ earthquake victims. Specifically need bandages, antiseptics, pain medication, IV fluids, and antibiotics. Current supplies will be depleted within 24 hours. Hospital is operating on generator power due to ongoing outages.",
  assignedTeam: "Team 4",
  reporter: {
    name: "Thiri Aung",
    organization: "Medical Relief",
    phone: "+95 9 234 567 890",
    email: "thiri@example.com",
    avatar: "TA",
  },
}

export default function ReportDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("details")
  const [report, setReport] = useState(reportData)
  const { toast } = useToast()

  // Handle edit action
  const handleEdit = () => {
    // In a real app, this would navigate to an edit page or open a modal
    toast({
      title: "Edit functionality",
      description: "Edit functionality would open here",
    })
  }

  // Handle resolve action
  const handleResolve = () => {
    // In a real app, this would open a confirmation dialog
    setReport({
      ...report,
      status: "resolved",
    })
    toast({
      title: "Report resolved",
      description: "The report has been marked as resolved.",
    })
  }

  return (
    <div className="container py-6 max-w-7xl">
      <div className="mb-6">
        <Link
          href="/reports"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Incident Reports
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{report.title}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button variant="outline" size="sm" className="gap-1" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="default"
              size="sm"
              className="gap-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleResolve}
              disabled={report.status === "resolved"}
            >
              <CheckCircle className="h-4 w-4" />
              Mark as Resolved
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="p-6 pb-3 flex items-center gap-4">
                <Avatar className="h-12 w-12 bg-gray-100">
                  <AvatarFallback className="text-orange-500">{report.reporter.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{report.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
                      {report.severity}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        report.status === "resolved"
                          ? "bg-green-100 text-green-600 border-green-200"
                          : "bg-yellow-100 text-yellow-600 border-yellow-200"
                      }
                    >
                      {report.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{report.id}</span>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full rounded-none border-b bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="updates"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
                  >
                    Updates
                  </TabsTrigger>
                  <TabsTrigger
                    value="images"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
                  >
                    Images
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="p-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{report.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{report.date}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-sm">{report.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Assigned Team</h3>
                      <Badge variant="outline" className="bg-gray-100 rounded-full px-3 py-1">
                        {report.assignedTeam}
                      </Badge>
                    </div>

                    {report.status === "resolved" && (
                      <div>
                        <h3 className="font-medium mb-2">Resolution</h3>
                        <p className="text-sm">This report has been marked as resolved.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="updates" className="p-6">
                  <p className="text-sm text-muted-foreground">No updates available for this report.</p>
                </TabsContent>
                <TabsContent value="images" className="p-6">
                  <p className="text-sm text-muted-foreground">No images available for this report.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Reporter Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-10 w-10 bg-gray-100">
                  <AvatarFallback className="text-orange-500">{report.reporter.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.reporter.name}</p>
                  <p className="text-sm text-muted-foreground">{report.reporter.organization}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{report.reporter.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{report.reporter.email}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Contact Reporter
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Location</h3>
              <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-slate-400" />
                <span className="ml-2 text-slate-500">Map view</span>
              </div>
              <div>
                <p className="font-medium">{report.location}</p>
                <p className="text-sm text-muted-foreground">
                  Coordinates: {report.coordinates.lat}, {report.coordinates.lng}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Related Reports</h3>
              <p className="text-sm text-muted-foreground">No related reports found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

