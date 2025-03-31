"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { DailyImpactData } from "@/components/daily-impact-data"

type TabType =
  | "buildings"
  | "roads"
  | "affected"
  | "lost"
  | "infrastructure"
  | "economic"
  | "relief"
  | "medical"
  | "response"

export function MyanmarImpactData() {
  const [activeTab, setActiveTab] = useState<TabType>("economic")
  const { t, language } = useLanguage()

  const tabs: TabType[] = [
    "buildings",
    "roads",
    "affected",
    "lost",
    "infrastructure",
    "economic",
    "relief",
    "medical",
    "response",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="myanmar-title">{t("impact.title")}</h1>
        <p className="myanmar-subtitle">{t("impact.description")}</p>
      </div>

      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {t(`tab.${tab}`)}
          </button>
        ))}
      </div>

      <DailyImpactData initialTab={activeTab} />
    </div>
  )
}

