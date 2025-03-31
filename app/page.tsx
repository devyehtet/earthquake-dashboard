import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { EmergencyAlert } from "@/components/emergency-alert"
import { RealTimeEarthquakeInfo } from "@/components/real-time-earthquake-info"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardMap } from "@/components/dashboard-map"
import { DashboardFilter } from "@/components/dashboard-filter"
import { QuickActions } from "@/components/quick-actions"
import { RecentReports } from "@/components/recent-reports"
import { AffectedAreaChart } from "@/components/affected-area-chart"
import { HistoricalEarthquakeChart } from "@/components/historical-earthquake-chart"
import { IntensityMap } from "@/components/intensity-map"
import { NotificationSubscription } from "@/components/notification-subscription"
import { SystemStatusCard } from "@/components/system-status-card"
import { DailyImpactData } from "@/components/daily-impact-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto">
        <div className="py-6 space-y-6">
          <EmergencyAlert />
          <RealTimeEarthquakeInfo />
          <NotificationSubscription />
          <DashboardStats />
          <DashboardFilter />

          {/* Dashboard Tabs */}
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="buildings">Damaged Buildings</TabsTrigger>
              <TabsTrigger value="roads">Damaged Roads</TabsTrigger>
              <TabsTrigger value="affected">People Affected</TabsTrigger>
            </TabsList>

            {/* Map View Tab */}
            <TabsContent value="map" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <DashboardMap />
                  <AffectedAreaChart />
                  <HistoricalEarthquakeChart />
                </div>
                <div className="space-y-6">
                  <SystemStatusCard />
                  <QuickActions />
                  <RecentReports />
                </div>
              </div>
              <div className="mt-6">
                <IntensityMap />
              </div>
            </TabsContent>

            {/* Damaged Buildings Tab */}
            <TabsContent value="buildings" className="mt-4">
              <DailyImpactData initialTab="buildings" />
            </TabsContent>

            {/* Damaged Roads Tab */}
            <TabsContent value="roads" className="mt-4">
              <DailyImpactData initialTab="roads" />
            </TabsContent>

            {/* People Affected Tab */}
            <TabsContent value="affected" className="mt-4">
              <DailyImpactData initialTab="affected" />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div id="submit-button" className="fixed bottom-4 left-4 z-50 md:hidden">
        <Link href="/data-collection/new">
          <Button size="lg" className="shadow-lg rounded-full px-6">
            Submit New Report
          </Button>
        </Link>
      </div>
    </div>
  )
}

