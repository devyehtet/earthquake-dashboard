import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { FileText, Plus } from "lucide-react"

export default function DataCollectionPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto">
        <div className="py-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Data Collection</h1>
              <p className="text-muted-foreground mt-1">
                Submit and manage earthquake-related reports and observations
              </p>
            </div>
            <Link href="/data-collection/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>New Report</span>
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Reports submitted by you and your team</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
                <div className="text-center">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground/60" />
                  <p className="text-muted-foreground">No reports submitted yet</p>
                  <Link href="/data-collection/new" className="text-primary text-sm mt-2 inline-block">
                    Submit your first report
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

