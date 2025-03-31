"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getDailyImpactData, type ImpactData } from "@/lib/impact-data-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

interface DailyImpactDataProps {
  initialTab?:
    | "buildings"
    | "roads"
    | "affected"
    | "lost"
    | "infrastructure"
    | "economic"
    | "relief"
    | "medical"
    | "response"
}

export function DailyImpactData({ initialTab = "buildings" }: DailyImpactDataProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [data, setData] = useState<ImpactData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t, language } = useLanguage()

  // Update activeTab when initialTab changes (from parent)
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)

        // Get the data (will return sample data if table doesn't exist)
        const impactData = await getDailyImpactData()

        if (impactData && impactData.length > 0) {
          setData(impactData)
          setIsLoading(false)
          return
        }

        setError(t("error.nodata.description"))
      } catch (err) {
        console.error("Error fetching impact data:", err)
        setError(t("error.nodata.description"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [t])

  // Calculate totals
  const totals = data.reduce(
    (acc, day) => {
      return {
        buildings: acc.buildings + (day.buildings || 0),
        roads: acc.roads + (day.roads || 0),
        affected: acc.affected + (day.affected || 0),
        lost: acc.lost + (day.lost || 0),
        infrastructure: acc.infrastructure + (day.infrastructure || 0),
        economic: acc.economic + (day.economic_loss || 0),
        relief: acc.relief + (day.relief_centers || 0),
        medical: acc.medical + (day.medical || 0),
        response: acc.response + (day.response_teams || 0),
      }
    },
    {
      buildings: 0,
      roads: 0,
      affected: 0,
      lost: 0,
      infrastructure: 0,
      economic: 0,
      relief: 0,
      medical: 0,
      response: 0,
    },
  )

  // Get the appropriate color for the current tab
  const getTabColor = () => {
    switch (activeTab) {
      case "buildings":
        return "#ef4444" // red
      case "roads":
        return "#f97316" // orange
      case "affected":
        return "#3b82f6" // blue
      case "lost":
        return "#6b7280" // gray
      case "infrastructure":
        return "#8b5cf6" // purple
      case "economic":
        return "#10b981" // green
      case "relief":
        return "#0ea5e9" // sky blue
      case "medical":
        return "#ec4899" // pink
      case "response":
        return "#f59e0b" // amber
      default:
        return "#ef4444"
    }
  }

  // Get the appropriate data key for the current tab
  const getDataKey = () => {
    switch (activeTab) {
      case "buildings":
        return "buildings"
      case "roads":
        return "roads"
      case "affected":
        return "affected"
      case "lost":
        return "lost"
      case "infrastructure":
        return "infrastructure"
      case "economic":
        return "economic_loss"
      case "relief":
        return "relief_centers"
      case "medical":
        return "medical"
      case "response":
        return "response_teams"
      default:
        return "buildings"
    }
  }

  // Get the appropriate label for the current tab
  const getTabLabel = () => {
    switch (activeTab) {
      case "buildings":
        return t("label.buildings")
      case "roads":
        return t("label.roads")
      case "affected":
        return t("label.affected")
      case "lost":
        return t("label.lost")
      case "infrastructure":
        return t("label.infrastructure")
      case "economic":
        return t("label.economic")
      case "relief":
        return t("label.relief")
      case "medical":
        return t("label.medical")
      case "response":
        return t("label.response")
      default:
        return t("label.buildings")
    }
  }

  // Format the value based on the active tab
  const formatValue = (value: number) => {
    if (activeTab === "economic") {
      return formatCurrency(value)
    }
    return value.toLocaleString()
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{t("impact.title")}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">{t("loading")}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If error, show error state
  if (error && data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{t("impact.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("error.title")}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // If no data, show empty state
  if (data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{t("impact.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t("error.nodata.title")}</AlertTitle>
            <AlertDescription>{t("error.nodata.description")}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`text-xl font-bold ${language === "my" ? "myanmar-font" : ""}`}>
          {getTabLabel()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className={`text-sm font-medium ${language === "my" ? "myanmar-font" : ""}`}>
                {t("label.total")} {getTabLabel()}
              </div>
              <div className="text-2xl font-bold mt-1">
                {activeTab === "buildings"
                  ? formatValue(totals.buildings)
                  : activeTab === "roads"
                    ? formatValue(totals.roads)
                    : activeTab === "affected"
                      ? formatValue(totals.affected)
                      : activeTab === "lost"
                        ? formatValue(totals.lost)
                        : activeTab === "infrastructure"
                          ? formatValue(totals.infrastructure)
                          : activeTab === "economic"
                            ? formatValue(totals.economic)
                            : activeTab === "relief"
                              ? formatValue(totals.relief)
                              : activeTab === "medical"
                                ? formatValue(totals.medical)
                                : formatValue(totals.response)}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      activeTab === "economic" ? formatCurrency(value as number) : value,
                      getTabLabel(),
                    ]}
                    labelFormatter={(label) => formatDate(label)}
                  />
                  <Legend />
                  <Bar dataKey={getDataKey()} name={getTabLabel()} fill={getTabColor()} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className={`font-medium mb-2 ${language === "my" ? "myanmar-font" : ""}`}>{t("label.detailed")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className={`text-left py-2 px-4 ${language === "my" ? "myanmar-font" : ""}`}>
                    {t("label.date")}
                  </th>
                  <th className={`text-left py-2 px-4 ${language === "my" ? "myanmar-font" : ""}`}>
                    {t("label.location")}
                  </th>
                  <th className={`text-right py-2 px-4 ${language === "my" ? "myanmar-font" : ""}`}>{getTabLabel()}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4">{formatDate(item.date)}</td>
                    <td className="py-2 px-4">{item.location}</td>
                    <td className="text-right py-2 px-4">
                      {activeTab === "buildings"
                        ? formatValue(item.buildings)
                        : activeTab === "roads"
                          ? formatValue(item.roads)
                          : activeTab === "affected"
                            ? formatValue(item.affected)
                            : activeTab === "lost"
                              ? formatValue(item.lost)
                              : activeTab === "infrastructure"
                                ? formatValue(item.infrastructure)
                                : activeTab === "economic"
                                  ? formatValue(item.economic_loss)
                                  : activeTab === "relief"
                                    ? formatValue(item.relief_centers)
                                    : activeTab === "medical"
                                      ? formatValue(item.medical)
                                      : formatValue(item.response_teams)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

