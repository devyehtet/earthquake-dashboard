"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for affected areas
const affectedAreasData = [
  {
    region: "Sagaing",
    affected: 845,
    displaced: 320,
    casualties: 12,
  },
  {
    region: "Mandalay",
    affected: 620,
    displaced: 210,
    casualties: 8,
  },
  {
    region: "Magway",
    affected: 450,
    displaced: 180,
    casualties: 5,
  },
  {
    region: "Bago",
    affected: 380,
    displaced: 150,
    casualties: 3,
  },
  {
    region: "Yangon",
    affected: 320,
    displaced: 90,
    casualties: 2,
  },
  {
    region: "Ayeyarwady",
    affected: 230,
    displaced: 70,
    casualties: 1,
  },
]

// Sample data for infrastructure damage
const infrastructureDamageData = [
  {
    region: "Sagaing",
    buildings: 120,
    roads: 35,
    bridges: 8,
  },
  {
    region: "Mandalay",
    buildings: 85,
    roads: 28,
    bridges: 5,
  },
  {
    region: "Magway",
    buildings: 65,
    roads: 22,
    bridges: 4,
  },
  {
    region: "Bago",
    buildings: 50,
    roads: 18,
    bridges: 3,
  },
  {
    region: "Yangon",
    buildings: 40,
    roads: 12,
    bridges: 2,
  },
  {
    region: "Ayeyarwady",
    buildings: 30,
    roads: 10,
    bridges: 1,
  },
]

// Sample data for aid distribution
const aidDistributionData = [
  {
    region: "Sagaing",
    food: 80,
    water: 90,
    medical: 70,
    shelter: 65,
  },
  {
    region: "Mandalay",
    food: 70,
    water: 75,
    medical: 60,
    shelter: 55,
  },
  {
    region: "Magway",
    food: 60,
    water: 65,
    medical: 50,
    shelter: 45,
  },
  {
    region: "Bago",
    food: 50,
    water: 55,
    medical: 40,
    shelter: 35,
  },
  {
    region: "Yangon",
    food: 40,
    water: 45,
    medical: 30,
    shelter: 25,
  },
  {
    region: "Ayeyarwady",
    food: 30,
    water: 35,
    medical: 20,
    shelter: 15,
  },
]

export function AffectedAreaChart() {
  const [chartType, setChartType] = useState("affected")
  const [chartView, setChartView] = useState("bar")

  // Determine which data set to use based on the selected chart type
  const getChartData = () => {
    switch (chartType) {
      case "affected":
        return affectedAreasData
      case "infrastructure":
        return infrastructureDamageData
      case "aid":
        return aidDistributionData
      default:
        return affectedAreasData
    }
  }

  // Get the appropriate chart config based on the selected chart type
  const getChartConfig = () => {
    switch (chartType) {
      case "affected":
        return {
          affected: {
            label: "Affected People",
            color: "hsl(var(--chart-1))",
          },
          displaced: {
            label: "Displaced",
            color: "hsl(var(--chart-2))",
          },
          casualties: {
            label: "Casualties",
            color: "hsl(var(--chart-3))",
          },
        }
      case "infrastructure":
        return {
          buildings: {
            label: "Buildings",
            color: "hsl(var(--chart-1))",
          },
          roads: {
            label: "Roads",
            color: "hsl(var(--chart-2))",
          },
          bridges: {
            label: "Bridges",
            color: "hsl(var(--chart-3))",
          },
        }
      case "aid":
        return {
          food: {
            label: "Food",
            color: "hsl(var(--chart-1))",
          },
          water: {
            label: "Water",
            color: "hsl(var(--chart-2))",
          },
          medical: {
            label: "Medical",
            color: "hsl(var(--chart-3))",
          },
          shelter: {
            label: "Shelter",
            color: "hsl(var(--chart-4))",
          },
        }
      default:
        return {}
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="affected">People</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="aid">Aid</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant={chartView === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartView("bar")}
            className="w-full sm:w-auto"
          >
            Bar
          </Button>
          <Button
            variant={chartView === "stacked" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartView("stacked")}
            className="w-full sm:w-auto"
          >
            Stacked
          </Button>
        </div>
      </div>

      <Card className="p-2">
        <ChartContainer config={getChartConfig()} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />

              {chartType === "affected" && (
                <>
                  {chartView === "bar" ? (
                    <>
                      <Bar dataKey="affected" fill="var(--color-affected)" name="Affected People" />
                      <Bar dataKey="displaced" fill="var(--color-displaced)" name="Displaced" />
                      <Bar dataKey="casualties" fill="var(--color-casualties)" name="Casualties" />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="affected" stackId="a" fill="var(--color-affected)" name="Affected People" />
                      <Bar dataKey="displaced" stackId="a" fill="var(--color-displaced)" name="Displaced" />
                      <Bar dataKey="casualties" stackId="a" fill="var(--color-casualties)" name="Casualties" />
                    </>
                  )}
                </>
              )}

              {chartType === "infrastructure" && (
                <>
                  {chartView === "bar" ? (
                    <>
                      <Bar dataKey="buildings" fill="var(--color-buildings)" name="Buildings" />
                      <Bar dataKey="roads" fill="var(--color-roads)" name="Roads" />
                      <Bar dataKey="bridges" fill="var(--color-bridges)" name="Bridges" />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="buildings" stackId="a" fill="var(--color-buildings)" name="Buildings" />
                      <Bar dataKey="roads" stackId="a" fill="var(--color-roads)" name="Roads" />
                      <Bar dataKey="bridges" stackId="a" fill="var(--color-bridges)" name="Bridges" />
                    </>
                  )}
                </>
              )}

              {chartType === "aid" && (
                <>
                  {chartView === "bar" ? (
                    <>
                      <Bar dataKey="food" fill="var(--color-food)" name="Food" />
                      <Bar dataKey="water" fill="var(--color-water)" name="Water" />
                      <Bar dataKey="medical" fill="var(--color-medical)" name="Medical" />
                      <Bar dataKey="shelter" fill="var(--color-shelter)" name="Shelter" />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="food" stackId="a" fill="var(--color-food)" name="Food" />
                      <Bar dataKey="water" stackId="a" fill="var(--color-water)" name="Water" />
                      <Bar dataKey="medical" stackId="a" fill="var(--color-medical)" name="Medical" />
                      <Bar dataKey="shelter" stackId="a" fill="var(--color-shelter)" name="Shelter" />
                    </>
                  )}
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  )
}

