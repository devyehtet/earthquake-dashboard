"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Upload } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthGuard } from "@/components/auth-guard"

export default function NewReportPage() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [reportType, setReportType] = useState("")
  const [severity, setSeverity] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would send the report to your API
      console.log("Report submitted:", {
        title,
        location,
        reportType,
        severity,
        details,
        userId: user?.id,
        userName: user?.name,
        timestamp: new Date().toISOString(),
      })

      setIsSuccess(true)

      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("")
        setLocation("")
        setReportType("")
        setSeverity("")
        setDetails("")
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthGuard allowedRoles={[UserRole.TEAM_MEMBER, UserRole.TEAM_ADMIN, UserRole.SUPER_ADMIN]}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/95">
        <DashboardHeader />
        <main className="flex-1">
          <div className="container py-6">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-3xl font-bold mt-2">Submit New Report</h1>
              <p className="text-muted-foreground mt-1">Report an incident or observation related to the earthquake</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Incident Report Form</CardTitle>
                <CardDescription>
                  Please provide as much detail as possible to help coordinate response efforts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the incident"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, township, or specific address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select value={reportType} onValueChange={setReportType} required>
                        <SelectTrigger id="report-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure Damage</SelectItem>
                          <SelectItem value="aid">Aid Request</SelectItem>
                          <SelectItem value="shelter">Shelter Information</SelectItem>
                          <SelectItem value="aftershock">Aftershock Report</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select value={severity} onValueChange={setSeverity} required>
                        <SelectTrigger id="severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Details</Label>
                    <Textarea
                      id="details"
                      placeholder="Provide detailed information about the incident"
                      rows={5}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <div className="border border-input rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click or drag files to upload photos or documents</p>
                      <Input id="attachments" type="file" className="hidden" multiple />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : isSuccess ? (
                        "Report Submitted Successfully!"
                      ) : (
                        "Submit Report"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Your report will be reviewed by the response team and appropriate action will be taken.
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

