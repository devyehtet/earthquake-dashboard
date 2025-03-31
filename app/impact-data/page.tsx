"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DailyImpactData } from "@/components/daily-impact-data"
import { ImpactDataForm } from "@/components/impact-data-form"
import { useLanguage } from "@/contexts/language-context"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImpactDataPage() {
  const [activeTab, setActiveTab] = useState("buildings")
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const isLoggedIn = user && user.role !== UserRole.GUEST

  const tabs = [
    { id: "buildings", label: t("tab.buildings") },
    { id: "roads", label: t("tab.roads") },
    { id: "affected", label: t("tab.affected") },
    { id: "lost", label: t("tab.lost") },
    { id: "infrastructure", label: t("tab.infrastructure") },
    { id: "economic", label: t("tab.economic") },
    { id: "relief", label: t("tab.relief") },
    { id: "medical", label: t("tab.medical") },
    { id: "response", label: t("tab.response") },
  ]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <main className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("impact.title")}</h1>
          <p className="text-muted-foreground text-gray-500">{t("impact.description")}</p>
        </div>

        {/* Custom Tab Bar */}
        {/* <div className="bg-gray-50 py-3 px-4 rounded-lg overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === tab.id
                    ? "border-2 border-black bg-white shadow-sm font-medium"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div> */}

        <div className={`grid grid-cols-1 gap-8 ${isLoggedIn ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
          <div className={isLoggedIn ? "lg:col-span-2" : "lg:col-span-1"}>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab as any}>
              <TabsList className="bg-gray-50 py-3 px-4 rounded-lg overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      activeTab === tab.id
                        ? "border-2 border-black bg-white shadow-sm font-medium"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <DailyImpactData initialTab={tab.id as any} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          {isLoggedIn && (
            <div>
              <ImpactDataForm />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

