import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Download, ExternalLink, FileText, MapPin, Phone, Route, Users } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationSubscription } from "@/components/notification-subscription"

export const metadata: Metadata = {
  title: "Earthquake Resources",
  description: "Emergency contacts, shelters, and resources for earthquake preparedness and response",
}

export default function ResourcesPage() {
  return (
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
            <h1 className="text-3xl font-bold mt-2">Earthquake Resources</h1>
            <p className="text-muted-foreground mt-1">
              Emergency contacts, shelters, and resources for earthquake preparedness and response
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Get Earthquake Alerts</CardTitle>
                <CardDescription>
                  Subscribe to receive real-time notifications about earthquakes in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSubscription />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Resources</CardTitle>
                <CardDescription>Preparedness guides and emergency information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span>Earthquake Preparedness Guide</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span>Emergency Contact Card</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span>Home Safety Checklist</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span>Family Emergency Plan Template</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="emergency-contacts" id="emergency-contacts">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="emergency-contacts" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>Emergency Contacts</span>
              </TabsTrigger>
              <TabsTrigger value="shelters" id="shelters" className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>Shelters</span>
              </TabsTrigger>
              <TabsTrigger value="road-conditions" id="road-conditions" className="flex items-center gap-1">
                <Route className="h-4 w-4" />
                <span>Road Conditions</span>
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Organizations</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emergency-contacts" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact Numbers</CardTitle>
                  <CardDescription>Important phone numbers for emergency services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Emergency Services</h3>
                          <p className="text-sm text-muted-foreground">For immediate emergency assistance</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Police</span>
                          <span className="font-medium">191</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fire</span>
                          <span className="font-medium">199</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Ambulance</span>
                          <span className="font-medium">192</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Hospitals</h3>
                          <p className="text-sm text-muted-foreground">Major medical facilities</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Yangon General Hospital</span>
                          <span className="font-medium">+95 1 256 112</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mandalay General Hospital</span>
                          <span className="font-medium">+95 2 36123</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Nay Pyi Taw Hospital</span>
                          <span className="font-medium">+95 67 420 096</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Relief Organizations</h3>
                          <p className="text-sm text-muted-foreground">Humanitarian assistance</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Myanmar Red Cross</span>
                          <span className="font-medium">+95 1 383 681</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Disaster Management Dept.</span>
                          <span className="font-medium">+95 1 544 666</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">UN OCHA Myanmar</span>
                          <span className="font-medium">+95 1 230 5663</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Government Agencies</h3>
                          <p className="text-sm text-muted-foreground">Official response coordination</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Dept. of Meteorology</span>
                          <span className="font-medium">+95 1 662 367</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Ministry of Social Welfare</span>
                          <span className="font-medium">+95 1 404 060</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">National Emergency Ops</span>
                          <span className="font-medium">+95 1 067 404 666</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shelters" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Shelters</CardTitle>
                  <CardDescription>Locations of designated emergency shelters and evacuation centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Yangon Region Shelters</h3>
                            <p className="text-sm text-muted-foreground">Designated evacuation centers in Yangon</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>View Map</span>
                        </Button>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Yangon University Stadium</h4>
                            <p className="text-sm text-muted-foreground mt-1">University Avenue, Kamayut Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 2000</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Aung San Stadium</h4>
                            <p className="text-sm text-muted-foreground mt-1">Mingalar Taung Nyunt Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 3000</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Thuwunna Youth Training Center</h4>
                            <p className="text-sm text-muted-foreground mt-1">Thingangyun Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 1500</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Hlaing Tharyar Sports Ground</h4>
                            <p className="text-sm text-muted-foreground mt-1">Hlaing Tharyar Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 1000</span>
                              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                                Limited
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Mandalay Region Shelters</h3>
                            <p className="text-sm text-muted-foreground">Designated evacuation centers in Mandalay</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>View Map</span>
                        </Button>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Mandalay Sports Complex</h4>
                            <p className="text-sm text-muted-foreground mt-1">Chan Aye Tharzan Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 2500</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Mandalay University Campus</h4>
                            <p className="text-sm text-muted-foreground mt-1">73rd Street, between 28th & 29th</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 1800</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Mahamuni Buddha Temple Grounds</h4>
                            <p className="text-sm text-muted-foreground mt-1">Chanmyathazi Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 1200</span>
                              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                                Limited
                              </span>
                            </div>
                          </div>
                          <div className="rounded border p-3">
                            <h4 className="font-medium">Amarapura Township Hall</h4>
                            <p className="text-sm text-muted-foreground mt-1">Amarapura Township</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs">Capacity: 800</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="road-conditions" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Road Conditions</CardTitle>
                  <CardDescription>Current status of major roads and transportation routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <Route className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Major Highways</h3>
                            <p className="text-sm text-muted-foreground">Status of primary transportation routes</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">Last updated: 30 minutes ago</div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="rounded border p-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Yangon-Mandalay Highway</h4>
                            <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 px-2 py-0.5 rounded">
                              Closed
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Multiple sections damaged between Nay Pyi Taw and Meiktila
                          </p>
                          <div className="mt-2 text-xs">
                            <span className="font-medium">Alternative route:</span> Use old Yangon-Mandalay Road via
                            Pyawbwe
                          </div>
                        </div>

                        <div className="rounded border p-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Yangon-Pathein Highway</h4>
                            <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                              Restricted
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Single lane open with weight restrictions
                          </p>
                          <div className="mt-2 text-xs">
                            <span className="font-medium">Note:</span> No vehicles over 10 tons allowed
                          </div>
                        </div>

                        <div className="rounded border p-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Mandalay-Lashio Road</h4>
                            <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                              Restricted
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Landslide at Gokteik area, temporary bypass in place
                          </p>
                          <div className="mt-2 text-xs">
                            <span className="font-medium">Delay:</span> Approximately 2-3 hours
                          </div>
                        </div>

                        <div className="rounded border p-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Yangon-Mawlamyine Highway</h4>
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                              Open
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Minor damage reported, all lanes open</p>
                          <div className="mt-2 text-xs">
                            <span className="font-medium">Note:</span> Reduced speed limits in effect
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Bridges and Crossings</h3>
                            <p className="text-sm text-muted-foreground">Status of major bridges</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>View Map</span>
                        </Button>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="rounded border p-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Sagaing Bridge</h4>
                              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 px-2 py-0.5 rounded">
                                Closed
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Structural damage reported, under assessment
                            </p>
                          </div>

                          <div className="rounded border p-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Yadanabon Bridge (Mandalay)</h4>
                              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                                Restricted
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Limited to emergency vehicles only</p>
                          </div>

                          <div className="rounded border p-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Thanlyin Bridge (Yangon)</h4>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded">
                                Open
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Inspected and cleared for traffic</p>
                          </div>

                          <div className="rounded border p-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Ayeyarwady Bridge (Pakokku)</h4>
                              <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-0.5 rounded">
                                Restricted
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Weight limit reduced to 15 tons</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organizations" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relief Organizations</CardTitle>
                  <CardDescription>Organizations providing assistance during earthquake emergencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <span className="text-xl font-bold text-red-600 dark:text-red-400">RC</span>
                          </div>
                          <div>
                            <h3 className="font-medium">Myanmar Red Cross Society</h3>
                            <p className="text-xs text-muted-foreground">Emergency response & medical aid</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            Provides emergency medical services, search and rescue, and relief supplies to affected
                            communities.
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span>+95 1 383 681</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Visit Website</span>
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">UN</span>
                          </div>
                          <div>
                            <h3 className="font-medium">UN OCHA Myanmar</h3>
                            <p className="text-xs text-muted-foreground">Coordination & humanitarian aid</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            Coordinates international humanitarian response and provides technical support for disaster
                            management.
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span>+95 1 230 5663</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Visit Website</span>
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">WV</span>
                          </div>
                          <div>
                            <h3 className="font-medium">World Vision Myanmar</h3>
                            <p className="text-xs text-muted-foreground">Child welfare & community support</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            Focuses on child protection, education in emergencies, and community-based disaster risk
                            reduction.
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span>+95 1 230 7700</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Visit Website</span>
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">SC</span>
                          </div>
                          <div>
                            <h3 className="font-medium">Save the Children Myanmar</h3>
                            <p className="text-xs text-muted-foreground">Child protection & education</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            Provides emergency education, child protection, and psychosocial support for children
                            affected by disasters.
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span>+95 1 375 739</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Visit Website</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

