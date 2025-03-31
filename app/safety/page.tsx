import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, ArrowRight, Clock, Home, Info, ShieldAlert } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export const metadata: Metadata = {
  title: "Earthquake Safety Information",
  description: "Learn how to prepare for, survive during, and recover after an earthquake",
}

export default function SafetyPage() {
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
            <h1 className="text-3xl font-bold mt-2">Earthquake Safety Information</h1>
            <p className="text-muted-foreground mt-1">
              Learn how to prepare for, survive during, and recover after an earthquake
            </p>
          </div>

          <Tabs defaultValue="before">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="before" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Before</span>
              </TabsTrigger>
              <TabsTrigger value="during" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span>During</span>
              </TabsTrigger>
              <TabsTrigger value="after" className="flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" />
                <span>After</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="before" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prepare Before an Earthquake</CardTitle>
                  <CardDescription>Steps to take before an earthquake strikes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Create an Emergency Plan</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Develop a family emergency plan that includes meeting locations and communication strategies.
                      </li>
                      <li>
                        Identify safe spots in each room, such as under sturdy furniture or against interior walls.
                      </li>
                      <li>Practice "drop, cover, and hold on" drills with all household members.</li>
                      <li>Learn how to shut off utilities like gas, water, and electricity.</li>
                      <li>
                        Keep a list of emergency contacts, including out-of-area contacts who can serve as a central
                        point of communication.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Prepare Emergency Supplies</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Create an emergency kit with enough supplies to last at least 72 hours, including:</li>
                      <li>Water (4 liters per person per day)</li>
                      <li>Non-perishable food</li>
                      <li>First aid supplies</li>
                      <li>Flashlights and extra batteries</li>
                      <li>Battery-powered or hand-crank radio</li>
                      <li>Medications and medical supplies</li>
                      <li>Cash and important documents in waterproof container</li>
                      <li>Blankets and warm clothing</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Secure Your Home</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Secure heavy furniture to walls using straps or brackets.</li>
                      <li>Move heavy objects to lower shelves.</li>
                      <li>Install latches on cabinets to prevent contents from spilling out.</li>
                      <li>Secure water heaters with straps to wall studs.</li>
                      <li>Repair any deep cracks in ceilings or foundations.</li>
                      <li>Consider having your house evaluated for structural weaknesses.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Stay Informed</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Learn about the earthquake risk in your area.</li>
                      <li>Sign up for emergency alerts and notifications.</li>
                      <li>Know the emergency response plan for your workplace and children's schools.</li>
                      <li>Identify evacuation routes and emergency shelters in your community.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Kit Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Water (4 liters per person per day)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Non-perishable food</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>First aid kit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Flashlights and extra batteries</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Battery-powered or hand-crank radio</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Whistle to signal for help</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Dust masks and plastic sheeting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Moist towelettes and garbage bags</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Wrench or pliers to turn off utilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Manual can opener</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Local maps</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Cell phone with chargers and backup battery</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Home Safety Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Secure tall furniture to wall studs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Move heavy items to lower shelves</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Install latches on cabinets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Secure water heater with straps</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Secure hanging items like mirrors and pictures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Repair deep cracks in ceilings or foundations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Know how to turn off utilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Identify safe spots in each room</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Install flexible connectors on gas appliances</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Secure ceiling fans and light fixtures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Anchor large appliances to walls or floor</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button className="gap-1">
                  <span>Next: During an Earthquake</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="during" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What to Do During an Earthquake</CardTitle>
                  <CardDescription>Actions to take when an earthquake strikes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Drop, Cover, and Hold On</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>DROP</strong> to the ground before the earthquake drops you.
                      </li>
                      <li>
                        <strong>COVER</strong> your head and neck with your arms. If possible, get under a sturdy table
                        or desk. Stay away from glass, windows, outside doors, and walls.
                      </li>
                      <li>
                        <strong>HOLD ON</strong> to any sturdy furniture until the shaking stops. Be prepared to move
                        with your shelter if the shaking shifts it around.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">If You Are Indoors</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Stay where you are until the shaking stops. Do not run outside.</li>
                      <li>
                        Do not get in a doorway as this does not provide protection from falling or flying objects.
                      </li>
                      <li>Stay away from glass, windows, outside doors and walls, and anything that could fall.</li>
                      <li>If you are in bed, stay there and cover your head and neck with a pillow.</li>
                      <li>Do not use elevators.</li>
                      <li>Be aware that electricity may go out and sprinkler systems or fire alarms may turn on.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">If You Are Outdoors</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Move away from buildings, streetlights, and utility wires.</li>
                      <li>Once in the open, drop to the ground and stay there until the shaking stops.</li>
                      <li>
                        The greatest danger is directly outside buildings, at exits, and alongside exterior walls.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">If You Are in a Vehicle</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Pull over to a clear location, away from buildings, trees, overpasses, underpasses, or utility
                        wires.
                      </li>
                      <li>Stop and stay in the vehicle with your seatbelt fastened until the shaking stops.</li>
                      <li>
                        After the shaking stops, proceed with caution. Avoid bridges or ramps that might have been
                        damaged.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">If You Are Trapped Under Debris</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Do not light a match or lighter.</li>
                      <li>Do not move around or kick up dust.</li>
                      <li>Cover your mouth with a handkerchief or clothing.</li>
                      <li>Tap on a pipe or wall so rescuers can locate you. Use a whistle if available.</li>
                      <li>Shout only as a last resort to avoid inhaling dangerous amounts of dust.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <span>Common Mistakes to Avoid</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                          ✗
                        </div>
                        <span>Running outside during shaking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                          ✗
                        </div>
                        <span>Standing in doorways (modern doorways are no stronger than the rest of the house)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                          ✗
                        </div>
                        <span>Using elevators to evacuate buildings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                          ✗
                        </div>
                        <span>Staying near windows or glass</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                          ✗
                        </div>
                        <span>Ignoring aftershocks (they can cause additional damage)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>Drop, Cover, and Hold On</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <span className="font-medium">DROP</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
                        </div>
                        <span className="font-medium">COVER</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">3</span>
                        </div>
                        <span className="font-medium">HOLD ON</span>
                      </div>
                    </div>
                    <p className="text-sm text-center">
                      This is the recommended action to reduce injury and death during earthquakes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous: Before an Earthquake</span>
                </Button>
                <Button className="gap-1">
                  <span>Next: After an Earthquake</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="after" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What to Do After an Earthquake</CardTitle>
                  <CardDescription>Steps to take following an earthquake</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Immediate Actions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Check yourself and others for injuries. Provide first aid if needed.</li>
                      <li>
                        Be prepared for aftershocks. These secondary shockwaves are usually less violent but can cause
                        additional damage.
                      </li>
                      <li>
                        If you are in a damaged building, go outside and move away from the building and any utility
                        wires.
                      </li>
                      <li>
                        If you're trapped, do not move about or kick up dust. Cover your mouth with a handkerchief or
                        clothing.
                      </li>
                      <li>Tap on a pipe or wall so rescuers can locate you, or use a whistle if available.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Safety Check</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Look for and extinguish small fires. Fire is the most common hazard after an earthquake.</li>
                      <li>
                        Check for gas leaks. If you smell gas or hear a blowing or hissing noise, open a window and
                        leave the building. Turn off the gas at the main valve if you can, and call the gas company.
                      </li>
                      <li>
                        Look for electrical system damage. If you see sparks or broken or frayed wires, turn off the
                        electricity at the main fuse box or circuit breaker.
                      </li>
                      <li>
                        Check for sewage and water line damage. If you suspect sewage lines are damaged, avoid using
                        toilets. If water pipes are damaged, avoid using water from the tap.
                      </li>
                      <li>
                        Check your home for cracks and damage, particularly in the foundation. If the building looks
                        unsafe, do not enter.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Communication and Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Turn on a battery-operated or hand-crank radio for information and instructions.</li>
                      <li>Use phones only for emergency calls to avoid overloading the network.</li>
                      <li>Text messages may go through when phone calls cannot.</li>
                      <li>Check on neighbors, especially those who are elderly or disabled.</li>
                      <li>Stay away from damaged areas unless specifically requested by authorities to assist.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recovery</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Be careful when driving after an earthquake and anticipate traffic light outages.</li>
                      <li>Open cabinets cautiously as contents may have shifted.</li>
                      <li>Help people who require special assistance.</li>
                      <li>Clean up spilled medicines, bleaches, gasoline, or other flammable liquids immediately.</li>
                      <li>
                        Inspect utilities. Check for gas leaks, look for electrical system damage, and check for sewage
                        and water line damage.
                      </li>
                      <li>Document property damage with photographs. Contact your insurance company for assistance.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>Home Safety Inspection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Check for cracks in walls, floors, and foundation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Inspect chimneys for damage or cracks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Look for damaged or leaning utility poles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Check for water and sewage line damage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Inspect gas connections for leaks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Look for electrical system damage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Check appliances for damage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">✓</div>
                        <span>Inspect roof and foundation for damage</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span>Emergency Contacts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                          !
                        </div>
                        <div>
                          <span className="font-medium">Emergency Services:</span>
                          <span className="block">Call 191 (Police) or 199 (Fire)</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                          !
                        </div>
                        <div>
                          <span className="font-medium">Medical Emergency:</span>
                          <span className="block">Call 192 (Ambulance)</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                          !
                        </div>
                        <div>
                          <span className="font-medium">Myanmar Red Cross Society:</span>
                          <span className="block">+95 1 383 681</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                          !
                        </div>
                        <div>
                          <span className="font-medium">Department of Meteorology and Hydrology:</span>
                          <span className="block">+95 1 662 367</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-start">
                <Button variant="outline" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous: During an Earthquake</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

